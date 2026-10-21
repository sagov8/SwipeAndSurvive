import React, { useReducer, useState, useEffect, useCallback, useRef } from 'react';
import { gameReducer, initialGameState } from './engine/gameReducer';
import { soundEngine } from './engine/soundEngine';
import { loadTournamentRecords, saveTournamentRecord } from './engine/storage';
import StartScreen from './components/StartScreen';
import HeaderHUD from './components/HeaderHUD';
import SystemicNetwork from './components/SystemicNetwork';
import SwipeCard from './components/SwipeCard';
import BottomControl from './components/BottomControl';
import CrisisModal from './components/CrisisModal';
import DiceModal from './components/DiceModal';
import AuditReport, { computeRankAndSummary } from './components/AuditReport';
import DecisionFeedbackOverlay from './components/DecisionFeedbackOverlay';

export default function App() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState(null);
  const [previewDirection, setPreviewDirection] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [records, setRecords] = useState(() => loadTournamentRecords());
  const [transientFeedback, setTransientFeedback] = useState(null);
  const [isDiceModalOpen, setIsDiceModalOpen] = useState(false);

  const savedEndRef = useRef(false);
  const feedbackTimeoutRef = useRef(null);

  // Iniciar simulación e inicializar Web Audio API dentro del evento de usuario
  const handleStartSimulation = useCallback(({ strategyPath, gameMode }) => {
    soundEngine.init();
    soundEngine.playCardAppear();
    savedEndRef.current = false;
    setPreviewDirection(null);
    setIsAnimating(false);
    setAnimatingDirection(null);
    dispatch({
      type: 'START_GAME',
      payload: { strategyPath, gameMode },
    });
  }, []);

  // Activar Radar Cibernético (Control Anticipativo Feedforward)
  const handleActivateRadar = useCallback(() => {
    if (gameState.radarCharges <= 0 || gameState.radarActiveForTurn || isAnimating) return;
    soundEngine.playRadarScan();
    dispatch({ type: 'ACTIVATE_RADAR' });
  }, [gameState.radarCharges, gameState.radarActiveForTurn, isAnimating]);

  // Alternar silencio de Web Audio API
  const handleToggleMute = useCallback(() => {
    const mutedState = soundEngine.toggleMute();
    setIsMuted(mutedState);
  }, []);

  // Cerrar el modal de Crisis del Entorno Externo (Trimestres 5, 10, 15, 19)
  const handleAcknowledgeCrisis = useCallback(() => {
    soundEngine.playCardAppear();
    dispatch({ type: 'DISMISS_CRISIS_MODAL' });
  }, []);

  // Abrir y cerrar el modal del Dado de la Suerte (desbloqueado a 1.200 pts)
  const handleOpenDice = useCallback(() => {
    if (!gameState.diceUnlocked || gameState.diceUsed || isAnimating || gameState.status !== 'PLAYING') return;
    setIsDiceModalOpen(true);
  }, [gameState.diceUnlocked, gameState.diceUsed, isAnimating, gameState.status]);

  const handleCloseDice = useCallback(() => {
    setIsDiceModalOpen(false);
  }, []);

  // Aplicar evento fortuito del dado sobre el sistema
  const handleApplyDiceEvent = useCallback((event) => {
    dispatch({
      type: 'APPLY_DICE_EVENT',
      payload: { event },
    });
  }, []);

  // Confirmar decisión con Lock de Input de ~450ms para evitar condiciones de carrera y disparar efectos transitorios
  const handleConfirmDecision = useCallback(
    (direction) => {
      if (isAnimating || gameState.status !== 'PLAYING' || !gameState.currentCard) return;

      const card = gameState.currentCard;
      const choice = direction === 'left' ? card.left : card.right;
      const deltas = choice?.effects || {};

      setIsAnimating(true);
      setAnimatingDirection(direction);
      setPreviewDirection(null);
      soundEngine.playSwipe(direction);

      // Disparar audio contextual según el impacto de la decisión
      setTimeout(() => {
        if (deltas.liquidity > 0) {
          soundEngine.playCoinVictory();
        } else if (deltas.morale < 0 || deltas.demand < 0) {
          soundEngine.playBooCrowd();
        } else if (deltas.tech < 0) {
          soundEngine.playIndustrialBreak();
        } else if (deltas.liquidity < 0) {
          soundEngine.playCashLoss();
        }
      }, 150);

      // Mostrar overlay visual transitorio (desaparece a los 5 segundos)
      setTransientFeedback({ deltas });
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
      feedbackTimeoutRef.current = setTimeout(() => {
        setTransientFeedback(null);
      }, 5000);

      setTimeout(() => {
        dispatch({
          type: 'RESOLVE_TURN',
          payload: { direction },
        });
        setIsAnimating(false);
        setAnimatingDirection(null);
      }, 450);
    },
    [isAnimating, gameState.status, gameState.currentCard]
  );

  // Efectos sonoros reactivos al cambiar de trimestre o activarse un efecto dominó / crisis
  useEffect(() => {
    if (gameState.status === 'CRISIS_MODAL') {
      soundEngine.playCrisisAlert();
    } else if (gameState.status === 'PLAYING' && gameState.quarter > 1) {
      if (gameState.activeDominoLinks.includes('DEMAND_TECH') || gameState.activeDominoLinks.includes('HR_TECH')) {
        soundEngine.playDominoChain(false);
      } else if (gameState.activeDominoLinks.includes('ALL_SYNERGY')) {
        soundEngine.playDominoChain(true);
      } else {
        soundEngine.playCardAppear();
      }
    }
  }, [gameState.quarter, gameState.status, gameState.activeDominoLinks]);

  // Guardar récord histórico en localStorage al terminar la partida (Victoria o Derrota)
  useEffect(() => {
    if ((gameState.status === 'VICTORY' || gameState.status === 'GAMEOVER') && !savedEndRef.current) {
      savedEndRef.current = true;
      const { rank, homeostasisIndex } = computeRankAndSummary(gameState);
      const updated = saveTournamentRecord({
        score: gameState.score,
        rank,
        quarterReached: gameState.quarter,
        victory: gameState.status === 'VICTORY',
        strategyPath: gameState.strategyPath,
        gameMode: gameState.gameMode,
        homeostasisIndex,
      });
      setRecords(updated);

      if (gameState.status === 'VICTORY') {
        soundEngine.playDominoChain(true);
      } else {
        soundEngine.playDominoChain(false);
      }
    }
  }, [gameState]);

  // Soporte de Teclado (ArrowLeft / ArrowRight) como respaldo infalible
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState.status === 'CRISIS_MODAL' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleAcknowledgeCrisis();
        return;
      }
      if (gameState.status !== 'PLAYING' || isAnimating) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleConfirmDecision('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleConfirmDecision('right');
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleActivateRadar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    gameState.status,
    isAnimating,
    handleConfirmDecision,
    handleAcknowledgeCrisis,
    handleActivateRadar,
  ]);

  const handleRestart = () => {
    dispatch({ type: 'RESET_TO_START' });
  };

  return (
    <div className="relative w-full h-[100dvh] arcade-crt text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Red Sistémica Central Interactiva de Fondo ("La Empresa Respira") */}
      <SystemicNetwork
        metrics={gameState.metrics}
        activeDominoLinks={gameState.activeDominoLinks}
      />

      {/* Pantalla Inicial Arcade en 2 Fases */}
      {gameState.status === 'START' && (
        <StartScreen
          onStartSimulation={handleStartSimulation}
          records={records}
        />
      )}

      {/* Pantalla Principal de Simulación (100dvh sin scroll) */}
      {(gameState.status === 'PLAYING' || gameState.status === 'CRISIS_MODAL') && (
        <>
          <HeaderHUD
            quarter={gameState.quarter}
            maxQuarters={gameState.maxQuarters}
            metrics={gameState.metrics}
            radarCharges={gameState.radarCharges}
            radarActiveForTurn={gameState.radarActiveForTurn}
            onActivateRadar={handleActivateRadar}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            previewDirection={previewDirection}
            currentCard={gameState.currentCard}
            gameMode={gameState.gameMode}
            score={gameState.score}
            overloadCounter={gameState.overloadCounter}
            diceUnlocked={gameState.diceUnlocked}
            diceUsed={gameState.diceUsed}
            onOpenDice={handleOpenDice}
          />

          <main className="flex-1 min-h-0 flex items-center justify-center relative z-10 overflow-y-auto px-1 sm:px-2 py-0.5 sm:py-1">
            <SwipeCard
              gameState={gameState}
              card={gameState.currentCard}
              isAnimating={isAnimating}
              animatingDirection={animatingDirection}
              previewDirection={previewDirection}
              onPreviewChange={setPreviewDirection}
              onConfirmDecision={handleConfirmDecision}
            />
          </main>

          <BottomControl gameState={gameState} />

          {/* Efectos Visuales Transitorios tras Decisiones (Monedas, Humo, Protestas, Caída de dinero) */}
          <DecisionFeedbackOverlay feedback={transientFeedback} />
        </>
      )}

      {/* Modal de Crisis del Entorno Externo (Trimestres 5, 10, 15, 19) */}
      {gameState.status === 'CRISIS_MODAL' && (
        <CrisisModal
          card={gameState.currentCard}
          quarter={gameState.quarter}
          onAcknowledge={handleAcknowledgeCrisis}
        />
      )}

      {/* Modal del Dado de la Suerte (Desbloqueado a 1.200 pts) */}
      <DiceModal
        isOpen={isDiceModalOpen}
        onClose={handleCloseDice}
        onApplyEvent={handleApplyDiceEvent}
      />

      {/* Pantalla Final: Informe de Auditoría Sistémica para Evaluación Docente */}
      {(gameState.status === 'VICTORY' || gameState.status === 'GAMEOVER') && (
        <AuditReport
          gameState={gameState}
          records={records}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
