import React, { useState, useEffect, useRef } from 'react';
import { DICE_EVENTS } from '../data/diceEvents';
import { soundEngine } from '../engine/soundEngine';
import { SubsystemIcon } from './SubsystemIcons';

/**
 * Renderiza los puntos de una cara de dado 1..6 en estilo pixel art SVG
 */
function PixelDiceFace({ face, size = 64 }) {
  // Coordenadas de puntos en cuadrícula 5x5
  const dotMap = {
    1: [[2, 2]],
    2: [[1, 1], [3, 3]],
    3: [[1, 1], [2, 2], [3, 3]],
    4: [[1, 1], [3, 1], [1, 3], [3, 3]],
    5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]],
    6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]],
  };

  const dots = dotMap[face] || dotMap[1];

  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className="drop-shadow-[0_4px_0_#0B1020]">
      {/* Cuerpo del dado */}
      <rect x="2" y="2" width="36" height="36" rx="6" fill="#F8F9FA" stroke="#0B1020" strokeWidth="3" />
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#FFFFFF" />
      {/* Puntos del dado */}
      {dots.map(([col, row], idx) => {
        const cx = 8 + col * 8;
        const cy = 8 + row * 8;
        return (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r="3.2"
            fill={face === 1 ? '#E53945' : '#0B1020'}
          />
        );
      })}
    </svg>
  );
}

export default function DiceModal({ isOpen, onClose, onApplyEvent }) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hasRolled, setHasRolled] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setIsRolling(false);
      setSelectedEvent(null);
      setHasRolled(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartRoll = () => {
    if (isRolling || hasRolled) return;
    setIsRolling(true);
    soundEngine.playDiceRoll();

    let counter = 0;
    const maxTicks = 18;
    intervalRef.current = setInterval(() => {
      counter++;
      const randomFace = Math.floor(Math.random() * 6) + 1;
      setCurrentFace(randomFace);

      if (counter >= maxTicks) {
        clearInterval(intervalRef.current);
        // Seleccionar evento final (1 a 6)
        const finalIndex = Math.floor(Math.random() * DICE_EVENTS.length);
        const finalEvent = DICE_EVENTS[finalIndex];
        setCurrentFace(finalEvent.face);
        setSelectedEvent(finalEvent);
        setIsRolling(false);
        setHasRolled(true);
        soundEngine.playDiceLand();
      }
    }, 75);
  };

  const handleApply = () => {
    if (!selectedEvent) return;
    onApplyEvent(selectedEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 animate-fadeIn">
      <div className="max-w-md w-full bg-[#0D2742] border-4 border-white rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden shadow-[0_10px_0_#0B1020]">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b-2 border-white/20 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎲</span>
            <span className="font-pixel text-[10px] sm:text-xs text-[#FFD400] arcade-text-shadow tracking-wider">
              DADO DE LA SUERTE
            </span>
          </div>
          <span className="font-pixel text-[8px] sm:text-[9px] px-2 py-0.5 rounded bg-[#192853] text-[#7CD1CF] border border-white/40">
            1 USO ÚNICO
          </span>
        </div>

        {/* Visual del Dado */}
        <div className="my-3 flex flex-col items-center justify-center">
          <div
            className={`transition-transform duration-100 ${
              isRolling ? 'rotate-12 scale-110 animate-bounce' : 'scale-100'
            }`}
          >
            <PixelDiceFace face={currentFace} size={72} />
          </div>
          <span className="font-pixel text-[9px] text-[#7CD1CF] mt-2">
            {isRolling ? '¡RODANDO DADOS...' : hasRolled ? `CARA ${currentFace} OBTENIDA` : 'LISTO PARA LANZAR'}
          </span>
        </div>

        {/* Estado previo a lanzar */}
        {!hasRolled && (
          <div className="space-y-3">
            <p className="font-vt text-lg sm:text-xl text-white leading-snug">
              Alcanzaste <strong>1.200 puntos</strong>. Lanza el dado para activar un evento fortuito
              que alterará los subsistemas organizacionales de AgroCafé. Prueba tu suerte.
            </p>

            <div className="rounded-xl bg-[#08182B] border-2 border-[#7CD1CF]/50 p-2.5 text-left">
              <span className="font-pixel text-[8px] text-[#FFD400] block mb-1">
                REGLA DE CONSERVACIÓN:
              </span>
              <p className="font-vt text-base text-[#7CD1CF] leading-tight">
                Puedes guardarlo para usarlo en cualquier turno posterior cuando más lo necesites.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleStartRoll}
                disabled={isRolling}
                className="pixel-box flex-1 py-3 px-4 rounded-xl font-pixel text-xs sm:text-sm uppercase bg-[#FFD400] hover:bg-[#ffe14d] border-4 border-white text-[#0B1020] transition cursor-pointer"
              >
                {isRolling ? 'RODANDO...' : '¡LANZAR DADO! 🎲'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isRolling}
                className="pixel-box py-3 px-3 rounded-xl font-pixel text-[9px] sm:text-[10px] uppercase bg-[#192853] hover:bg-[#253974] border-2 border-white text-white transition cursor-pointer"
              >
                GUARDAR
              </button>
            </div>
          </div>
        )}

        {/* Estado posterior a lanzar (Resultado obtenido) */}
        {hasRolled && selectedEvent && (
          <div className="space-y-3 animate-fadeIn">
            <div className="rounded-xl bg-[#08182B] border-2 border-[#FFD400] p-3 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{selectedEvent.icon}</span>
                <h3 className="font-pixel text-xs sm:text-sm text-[#FFD400] leading-tight">
                  {selectedEvent.title}
                </h3>
              </div>
              <p className="font-vt text-lg sm:text-xl text-white leading-snug mb-2.5">
                {selectedEvent.narrative}
              </p>

              {/* Deltas aplicados */}
              <div className="border-t border-white/20 pt-2 grid grid-cols-2 gap-1.5 text-xs">
                {Object.entries(selectedEvent.effects).map(([key, val]) => {
                  if (val === 0) return null;
                  const isPositive = val > 0;
                  const labelMap = {
                    liquidity: 'Finanzas',
                    morale: 'Talento',
                    demand: 'Comercial',
                    tech: 'Operaciones',
                  };
                  return (
                    <div
                      key={key}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded bg-[#0D2742] border ${
                        isPositive ? 'border-[#42F58B]/40 text-[#42F58B]' : 'border-[#FF6478]/40 text-[#FF6478]'
                      } font-pixel text-[9px]`}
                    >
                      <SubsystemIcon type={key} size={14} />
                      <span>{labelMap[key]}:</span>
                      <strong className="ml-auto font-vt text-base leading-none">
                        {isPositive ? `+${val}%` : `${val}%`}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="pixel-box w-full py-3 px-4 rounded-xl font-pixel text-xs sm:text-sm uppercase bg-[#42F58B] hover:bg-[#5ef79f] border-4 border-white text-[#0B1020] transition cursor-pointer"
            >
              APLICAR AL SISTEMA ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
