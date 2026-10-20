import { STRATEGY_PATHS } from '../data/cardsCatalog';
import { buildInitialDeck, drawNextCard } from './deckManager';

export const initialGameState = {
  quarter: 1,
  maxQuarters: 20,
  status: 'START', // 'START' | 'PLAYING' | 'CRISIS_MODAL' | 'VICTORY' | 'GAMEOVER'
  gameMode: 'SOLO', // 'SOLO' (1 Jugador) | 'BOARD' (Cooperativo Junta Directiva 2-4J)
  strategyPath: null, // 'AUTOMATIZACION' | 'CAPACITACION' | 'INNOVACION' | 'MEJORA_CONTINUA'
  metrics: {
    liquidity: 55, // Rango 0 - 100
    morale: 55,    // Rango 0 - 100
    demand: 50,    // Rango 0 - 100
    tech: 55,      // Rango 0 - 100
  },
  radarCharges: 3,
  radarActiveForTurn: false,
  overloadCounter: 0, // Cuenta cuántos trimestres seguidos lleva el sistema en desequilibrio severo
  delayedQueue: [],   // [{ triggerQuarter: 5, cardId: 'DEBT_01', reason: '...', originQuarter: 2 }]
  causalHistory: [],  // Registro de decisiones, bucles activados y efectos dominó para el Informe Final
  deck: [],
  recentCardIds: [],
  resolvedUniqueIds: [],
  currentCard: null,
  lastCausalTicker: 'AgroCafé Colombiano S.A.S. (Popayán) en operación. Esperando primera decisión en Trimestre 1...',
  activeDominoLinks: [], // [' DEMAND_TECH ', ' HR_TECH ', ' ALL_SYNERGY ']
  score: 0,
  auditStats: {
    homeostasisTurns: 0,
    synergyTurns: 0,
    r1LoopCount: 0,
    b1ControlCount: 0,
    radarUses: 0,
    equifinalitySavedPoints: 0,
    delayedDebtsTriggered: 0,
  },
  endReason: null,
};

function clampMetric(val) {
  return Math.max(0, Math.min(100, Math.round(val)));
}

/**
 * Simula una previsualización de la opción (usado por el Radar Cibernético para advertir efectos dominó)
 */
export function simulateOptionPreview(state, direction) {
  const card = state.currentCard;
  if (!card) return null;
  const choice = direction === 'left' ? card.left : card.right;
  if (!choice) return null;

  const strategyInfo = STRATEGY_PATHS[state.strategyPath];
  const protectedKey = strategyInfo?.subsystem;

  const adjustedEffects = {};
  ['liquidity', 'morale', 'demand', 'tech'].forEach((key) => {
    const raw = choice.effects[key] || 0;
    if (raw < 0 && key === protectedKey) {
      adjustedEffects[key] = Math.round(raw * 0.8);
    } else {
      adjustedEffects[key] = raw;
    }
  });

  // Proyección tras Fase 1 + Fase 2 (Entropía -2 en tech y morale)
  const proj = {
    liquidity: state.metrics.liquidity + adjustedEffects.liquidity,
    morale: state.metrics.morale + adjustedEffects.morale - 2,
    demand: state.metrics.demand + adjustedEffects.demand,
    tech: state.metrics.tech + adjustedEffects.tech - 2,
  };

  const warnings = [];
  if (proj.demand >= 80 && (proj.tech <= 35 || proj.morale <= 35)) {
    warnings.push('¡Dispara Bucle Positivo R1 (Sobrecarga Operativa)!');
  }
  if (proj.morale <= 25) {
    warnings.push('¡Dispara Fuga de Cerebros (-8% TI adicional)!');
  }
  if (choice.delayedEffect) {
    warnings.push(`Inyecta Deuda Sistémica en Trimestre ${state.quarter + choice.delayedEffect.delay}`);
  }

  return {
    adjustedEffects,
    warnings,
    delayedEffect: choice.delayedEffect || null,
    grantRadarCharge: choice.grantRadarCharge || 0,
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const { strategyPath, gameMode } = action.payload;
      const initialDeck = buildInitialDeck();
      const firstDraw = drawNextCard({
        targetQuarter: 1,
        deck: initialDeck,
        delayedQueue: [],
        recentCardIds: [],
        resolvedUniqueIds: [],
      });

      const stratName = STRATEGY_PATHS[strategyPath]?.name || 'Estándar';

      return {
        ...initialGameState,
        status: 'PLAYING',
        gameMode: gameMode || 'SOLO',
        strategyPath,
        deck: firstDraw.deck,
        delayedQueue: firstDraw.delayedQueue,
        resolvedUniqueIds: firstDraw.resolvedUniqueIds,
        currentCard: firstDraw.card,
        recentCardIds: [firstDraw.card.id],
        lastCausalTicker: `Ruta de Equifinalidad activa: ${stratName} (Mitigación -20% en ${STRATEGY_PATHS[strategyPath]?.subsystemLabel}).`,
      };
    }

    case 'ACTIVATE_RADAR': {
      if (state.radarCharges <= 0 || state.radarActiveForTurn) {
        return state;
      }
      return {
        ...state,
        radarCharges: state.radarCharges - 1,
        radarActiveForTurn: true,
        auditStats: {
          ...state.auditStats,
          radarUses: state.auditStats.radarUses + 1,
          b1ControlCount: state.auditStats.b1ControlCount + 1,
        },
        lastCausalTicker:
          'Auditoría Predictiva activada (Feedforward): Impactos exactos y riesgos a +3 trimestres revelados.',
      };
    }

    case 'DISMISS_CRISIS_MODAL': {
      return {
        ...state,
        status: 'PLAYING',
      };
    }

    case 'RESOLVE_TURN': {
      const { direction } = action.payload; // 'left' | 'right'
      const card = state.currentCard;
      if (!card) return state;

      const choice = direction === 'left' ? card.left : card.right;
      const strategyInfo = STRATEGY_PATHS[state.strategyPath];
      const protectedSubsystem = strategyInfo?.subsystem;

      let { liquidity, morale, demand, tech } = state.metrics;
      let equifinalitySavedThisTurn = 0;

      // =====================================================================
      // FASE 1: Impacto Directo + Modificador de Equifinalidad (20% mitigación)
      // =====================================================================
      const appliedDeltas = {};
      ['liquidity', 'morale', 'demand', 'tech'].forEach((key) => {
        const rawDelta = choice.effects[key] || 0;
        if (rawDelta < 0 && key === protectedSubsystem) {
          const mitigated = Math.round(rawDelta * 0.8);
          equifinalitySavedThisTurn += Math.abs(rawDelta - mitigated);
          appliedDeltas[key] = mitigated;
        } else {
          appliedDeltas[key] = rawDelta;
        }
      });

      liquidity += appliedDeltas.liquidity;
      morale += appliedDeltas.morale;
      demand += appliedDeltas.demand;
      tech += appliedDeltas.tech;

      // Encolar carta de consecuencia diferida si la decisión tomó un atajo reduccionista
      let updatedDelayedQueue = [...state.delayedQueue];
      if (choice.delayedEffect) {
        const targetQ = state.quarter + choice.delayedEffect.delay;
        const alreadyQueued = updatedDelayedQueue.some(
          (item) => item.cardId === choice.delayedEffect.cardId
        );
        if (!alreadyQueued) {
          updatedDelayedQueue.push({
            triggerQuarter: targetQ,
            cardId: choice.delayedEffect.cardId,
            reason: choice.delayedEffect.reason,
            originQuarter: state.quarter,
          });
        }
      }

      // Recarga de Radar Cibernético si aplica (ej. carta NEG_02)
      let updatedRadarCharges = state.radarCharges + (choice.grantRadarCharge || 0);

      // =====================================================================
      // FASE 2: Entropía Pasiva Trimestral (-2 a Capacidad Técnica y -2 a Clima)
      // =====================================================================
      tech -= 2;
      morale -= 2;

      // =====================================================================
      // FASE 3: Evaluación de Efecto Dominó y Desequilibrio Relacional (1 sola pasada)
      // =====================================================================
      const dominoEvents = [];
      const activeDominoLinks = [];
      let updatedOverloadCounter = state.overloadCounter;
      let r1TriggeredThisTurn = false;
      let b1RegulatedThisTurn = false;
      let synergyTriggeredThisTurn = false;
      let dominoImpactMagnitude = 0;

      // Regla Dominó 1 (Sobrecarga Operativa - Bucle Positivo R1):
      // Si Demanda >= 80 mientras Capacidad Técnica <= 35 o Clima Laboral <= 35
      if (demand >= 80 && (tech <= 35 || morale <= 35)) {
        demand -= 12;
        liquidity -= 10;
        morale -= 8;
        updatedOverloadCounter += 1;
        r1TriggeredThisTurn = true;
        dominoImpactMagnitude += 30;
        activeDominoLinks.push('DEMAND_TECH', 'FINANCE_TECH');
        dominoEvents.push(
          'Bucle Positivo R1 (Sobrecarga Ventas vs Planta: Comercial -12%, Finanzas -10%, Talento -8%)'
        );
      } else if (state.overloadCounter > 0) {
        // El jugador aplicó Retroalimentación Negativa (B1) estabilizando la sobrecarga
        updatedOverloadCounter = 0;
        b1RegulatedThisTurn = true;
        dominoEvents.push('Regulación Homeostática B1 (Flujo de pedidos y planta estabilizado)');
      }

      // Si la decisión redujo activamente una Demanda peligrosa o inyectó Neguentropía, contabilizar B1
      if (
        card.category === 'NEGENTROPY' ||
        (state.metrics.demand >= 75 && appliedDeltas.demand < 0 && appliedDeltas.tech > 0)
      ) {
        b1RegulatedThisTurn = true;
      }

      // Regla Dominó 2 (Rotación y Fatiga en Planta por Clima Crítico):
      // Si Talento <= 25, degrada la operación y logística (tech -8)
      if (morale <= 25) {
        tech -= 8;
        dominoImpactMagnitude += 16;
        activeDominoLinks.push('HR_TECH');
        dominoEvents.push('Efecto Dominó: Renuncias y Fatiga en Planta (-8% Producción y Logística)');
      }

      // Regla Dominó 3 (Sinergia Organizacional):
      // Si las 4 barras están simultáneamente entre 45% y 75%
      const isSynergy = [liquidity, morale, demand, tech].every((v) => v >= 45 && v <= 75);
      if (isSynergy) {
        liquidity += 3;
        synergyTriggeredThisTurn = true;
        dominoImpactMagnitude += 10;
        activeDominoLinks.push('ALL_SYNERGY');
        dominoEvents.push('Bono de Sinergia Organizacional (+3% Liquidez y +75 pts)');
      }

      // =====================================================================
      // FASE 4: Clamping y Verificación de Victoria / Derrota
      // =====================================================================
      const clampedMetrics = {
        liquidity: clampMetric(liquidity),
        morale: clampMetric(morale),
        demand: clampMetric(demand),
        tech: clampMetric(tech),
      };

      const isHomeostasis = Object.values(clampedMetrics).every((v) => v >= 35 && v <= 75);

      // Cálculo de Puntuación del Turno (Sección 9 de Juego.md):
      // +100 pts por trimestre sobrevivido
      // +50 pts por Bono de Homeostasis (35% - 75%)
      // +75 pts por Bono de Sinergia (45% - 75%)
      // -40 pts de penalización por trimestre en sobrecarga
      let turnScore = 100;
      if (isHomeostasis) turnScore += 50;
      if (synergyTriggeredThisTurn) turnScore += 75;
      if (r1TriggeredThisTurn) turnScore -= 40;

      const updatedScore = Math.max(0, state.score + turnScore);

      // Construcción de cadena causal para el Ticker y el Historial Docente
      const deltaLabels = [];
      if (appliedDeltas.liquidity !== 0)
        deltaLabels.push(`Finanzas (${appliedDeltas.liquidity > 0 ? '+' : ''}${appliedDeltas.liquidity}%)`);
      if (appliedDeltas.morale !== 0)
        deltaLabels.push(`Talento (${appliedDeltas.morale > 0 ? '+' : ''}${appliedDeltas.morale}%)`);
      if (appliedDeltas.demand !== 0)
        deltaLabels.push(`Comercial (${appliedDeltas.demand > 0 ? '+' : ''}${appliedDeltas.demand}%)`);
      if (appliedDeltas.tech !== 0)
        deltaLabels.push(`Operaciones (${appliedDeltas.tech > 0 ? '+' : ''}${appliedDeltas.tech}%)`);

      const dominoSuffix =
        dominoEvents.length > 0
          ? ` → ${dominoEvents.join(' | ')}`
          : ' → Desgaste Trimestral (-2% Planta, -2% Talento)';

      const tickerText = `T${state.quarter} [${choice.label}] → ${deltaLabels.join(', ')}${dominoSuffix}`;

      const totalMagnitude =
        Math.abs(appliedDeltas.liquidity) +
        Math.abs(appliedDeltas.morale) +
        Math.abs(appliedDeltas.demand) +
        Math.abs(appliedDeltas.tech) +
        dominoImpactMagnitude +
        (choice.delayedEffect ? 18 : 0);

      const historyEntry = {
        quarter: state.quarter,
        cardId: card.id,
        cardTitle: card.title,
        category: card.categoryLabel,
        tgsConcept: card.tgsConcept,
        decisionLabel: choice.label,
        causalSummary: choice.causalSummary,
        tickerText,
        dominoEvents,
        r1Triggered: r1TriggeredThisTurn,
        synergyTriggered: synergyTriggeredThisTurn,
        delayedSpawned: choice.delayedEffect ? choice.delayedEffect.reason : null,
        totalMagnitude,
        metricsAfter: { ...clampedMetrics },
      };

      const updatedAuditStats = {
        homeostasisTurns: state.auditStats.homeostasisTurns + (isHomeostasis ? 1 : 0),
        synergyTurns: state.auditStats.synergyTurns + (synergyTriggeredThisTurn ? 1 : 0),
        r1LoopCount: state.auditStats.r1LoopCount + (r1TriggeredThisTurn ? 1 : 0),
        b1ControlCount: state.auditStats.b1ControlCount + (b1RegulatedThisTurn ? 1 : 0),
        radarUses: state.auditStats.radarUses,
        equifinalitySavedPoints:
          state.auditStats.equifinalitySavedPoints + equifinalitySavedThisTurn,
        delayedDebtsTriggered:
          state.auditStats.delayedDebtsTriggered + (card.category === 'DELAYED' ? 1 : 0),
      };

      // Verificación de Derrota por Entropía Máxima (cualquier barra llega a 0%)
      const collapsedSubsystem = Object.entries(clampedMetrics).find(([, val]) => val <= 0);
      if (collapsedSubsystem) {
        const subNames = {
          liquidity: 'Finanzas y Liquidez (Falta de caja para comprar café pergamino y pagar nómina)',
          morale: 'Talento Humano (Parálisis laboral entre los 80 trabajadores en Popayán)',
          demand: 'Comercial y Mercadeo (Pérdida total de clientes, supermercados y cafeterías)',
          tech: 'Producción y Logística (Colapso de planta torrefactora y cadena de abastecimiento)',
        };
        return {
          ...state,
          status: 'GAMEOVER',
          metrics: clampedMetrics,
          overloadCounter: updatedOverloadCounter,
          causalHistory: [...state.causalHistory, historyEntry],
          lastCausalTicker: tickerText,
          activeDominoLinks,
          score: updatedScore,
          auditStats: updatedAuditStats,
          endReason: {
            type: 'ENTROPY_ZERO',
            title: 'CIERRE OPERATIVO POR COLAPSO DE SUBSISTEMA (0%)',
            detail: `El área de ${subNames[collapsedSubsystem[0]]} cayó a 0% en el Trimestre ${state.quarter}. En AgroCafé Colombiano S.A.S., ningún subsistema es independiente: el colapso de uno detiene toda la empresa.`,
          },
        };
      }

      // Verificación de Derrota por Sobrecarga Sistémica Incontrolada (overloadCounter >= 3)
      if (updatedOverloadCounter >= 3) {
        return {
          ...state,
          status: 'GAMEOVER',
          metrics: clampedMetrics,
          overloadCounter: updatedOverloadCounter,
          causalHistory: [...state.causalHistory, historyEntry],
          lastCausalTicker: tickerText,
          activeDominoLinks,
          score: updatedScore,
          auditStats: updatedAuditStats,
          endReason: {
            type: 'OVERLOAD_R1',
            title: 'COLAPSO POR DESINCRONIZACIÓN VENTAS - PLANTA (BUCLE R1)',
            detail: `AgroCafé acumuló 3 trimestres seguidos con sobreventa comercial (>80%) mientras Producción/Logística o Talento estaban por debajo del 35%. Los incumplimientos y devoluciones quebraron la operación.`,
          },
        };
      }

      // Verificación de Victoria (Superar el trimestre 20 manteniendo el sistema vivo)
      if (state.quarter >= state.maxQuarters) {
        return {
          ...state,
          status: 'VICTORY',
          metrics: clampedMetrics,
          overloadCounter: updatedOverloadCounter,
          causalHistory: [...state.causalHistory, historyEntry],
          lastCausalTicker: tickerText,
          activeDominoLinks,
          score: updatedScore + 300, // Bono de supervivencia al Trimestre 20
          auditStats: updatedAuditStats,
          endReason: {
            type: 'HOMEOSTASIS_VICTORY',
            title: '¡META CUMPLIDA! — AGROCAFÉ COLOMBIANO S.A.S. CONSOLIDADA',
            detail:
              'Lideraste desde Popayán los 20 trimestres equilibrando Finanzas, Talento Humano, Comercial, Producción y Logística frente a los desafíos del mercado nacional.',
          },
        };
      }

      // Avanzar al siguiente trimestre y robar la siguiente carta
      const nextQuarter = state.quarter + 1;
      const updatedRecent = [...state.recentCardIds, card.id].slice(-5);

      const nextDraw = drawNextCard({
        targetQuarter: nextQuarter,
        deck: state.deck,
        delayedQueue: updatedDelayedQueue,
        recentCardIds: updatedRecent,
        resolvedUniqueIds: state.resolvedUniqueIds,
      });

      const nextIsCrisisModal = nextDraw.card.category === 'ENVIRONMENT';

      return {
        ...state,
        quarter: nextQuarter,
        status: nextIsCrisisModal ? 'CRISIS_MODAL' : 'PLAYING',
        metrics: clampedMetrics,
        radarCharges: updatedRadarCharges,
        radarActiveForTurn: false,
        overloadCounter: updatedOverloadCounter,
        delayedQueue: nextDraw.delayedQueue,
        causalHistory: [...state.causalHistory, historyEntry],
        deck: nextDraw.deck,
        recentCardIds: [...updatedRecent, nextDraw.card.id].slice(-5),
        resolvedUniqueIds: nextDraw.resolvedUniqueIds,
        currentCard: nextDraw.card,
        lastCausalTicker: tickerText,
        activeDominoLinks,
        score: updatedScore,
        auditStats: updatedAuditStats,
      };
    }

    case 'RESET_TO_START': {
      return {
        ...initialGameState,
      };
    }

    default:
      return state;
  }
}
