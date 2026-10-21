import React from 'react';
import {
  PixelIconFinance,
  PixelIconTalent,
  PixelIconCommercial,
  PixelIconTech,
} from './SubsystemIcons';

const SUBSYSTEMS = [
  {
    key: 'liquidity',
    label: 'FINANZAS',
    Icon: PixelIconFinance,
  },
  {
    key: 'morale',
    label: 'TALENTO',
    Icon: PixelIconTalent,
  },
  {
    key: 'demand',
    label: 'COMERCIAL',
    Icon: PixelIconCommercial,
  },
  {
    key: 'tech',
    label: 'PLANTA/LOG.',
    Icon: PixelIconTech,
  },
];

/**
 * Calcula los puntos pulsantes (•, ••, •••) de Previsualización Anticipativa (Feedforward)
 */
function getFeedforwardDots(delta) {
  const abs = Math.abs(delta || 0);
  if (abs === 0) return null;
  if (abs <= 5) return '•';
  if (abs <= 11) return '••';
  return '•••';
}

export default function HeaderHUD({
  quarter,
  maxQuarters,
  metrics,
  radarCharges,
  radarActiveForTurn,
  onActivateRadar,
  isMuted,
  onToggleMute,
  previewDirection,
  currentCard,
  gameMode,
  score,
  overloadCounter,
  diceUnlocked = false,
  diceUsed = false,
  onOpenDice,
}) {
  const activeOption =
    previewDirection === 'left'
      ? currentCard?.left
      : previewDirection === 'right'
      ? currentCard?.right
      : null;

  const isOverloadR1 =
    metrics.demand >= 80 && (metrics.tech <= 35 || metrics.morale <= 35);

  return (
    <header className="w-full px-2 sm:px-4 pt-0.5 sm:pt-1 pb-0.5 z-20 shrink-0">
      <div className="max-w-5xl mx-auto bg-[#0D2742]/95 border-2 sm:border-3 border-white rounded-lg sm:rounded-xl px-2 sm:px-3.5 py-1 sm:py-1.5 shadow-[0_3px_0_#0B1020]">
        {/* Top Row: Stage/Quarter, Score, Mode, Radar & Audio Controls */}
        <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 pb-1 sm:pb-1.5 border-b-2 border-white/20">
          {/* Left: Quarter & Mode / Turno Player */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#FFD400] border-2 border-[#0B1020] text-[#0B1020] font-pixel text-[9px] sm:text-xs shadow-[0_2px_0_#0B1020]">
              TRIMESTRE {String(quarter).padStart(2, '0')}/{maxQuarters}
            </div>

            {gameMode === 'BOARD' ? (
              (() => {
                const playerTurn = ((quarter - 1) % 4) + 1;
                const playerRoles = {
                  1: { name: 'FINANZAS', Icon: PixelIconFinance, color: 'bg-[#FFD400] text-[#0B1020]' },
                  2: { name: 'TALENTO', Icon: PixelIconTalent, color: 'bg-[#42F58B] text-[#0B1020]' },
                  3: { name: 'COMERCIAL', Icon: PixelIconCommercial, color: 'bg-[#FF5E7E] text-white' },
                  4: { name: 'PLANTA/LOG', Icon: PixelIconTech, color: 'bg-[#36E2F8] text-[#0B1020]' },
                };
                const p = playerRoles[playerTurn];
                const PIcon = p.Icon;
                return (
                  <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-pixel text-[7px] sm:text-[8px] md:text-[9px] border border-white flex items-center gap-1 shadow-[0_1px_0_#0B1020] animate-pulse ${p.color}`}>
                    <PIcon className="w-3 h-3 shrink-0" />
                    <span>TURNO: P{playerTurn} ({p.name})</span>
                  </div>
                );
              })()
            ) : (
              <span className="hidden md:inline-block font-pixel text-[9px] px-2 py-0.5 rounded bg-[#192853] text-[#7CD1CF] border border-white/40">
                1P GERENCIA POPAYÁN
              </span>
            )}
          </div>

          {/* Center: Arcade Score & Overload Alert */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#08182B] border border-[#7CD1CF] flex items-center gap-1 sm:gap-1.5 shadow-[0_2px_0_#0B1020]">
              <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-[#FFD400]">SCORE:</span>
              <span className="font-pixel text-[10px] sm:text-xs md:text-sm text-white tracking-wider">
                {String(score).padStart(5, '0')}
              </span>
            </div>

            {overloadCounter > 0 && (
              <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-[#E53945] border border-white text-white font-pixel text-[8px] sm:text-[9px] animate-pulse">
                ALERTA R1: {overloadCounter}/3
              </div>
            )}
          </div>

          {/* Right Controls: Radar, Dado de la Suerte & Speaker Audio Icon */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={onActivateRadar}
              disabled={radarCharges <= 0 || radarActiveForTurn}
              title="Control Anticipativo (Feedforward): Revela impactos exactos y deudas diferidas"
              className={`pixel-box px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded font-pixel text-[8px] sm:text-[9px] md:text-[10px] transition-all flex items-center gap-1 border ${
                radarActiveForTurn
                  ? 'bg-[#7CD1CF] border-white text-[#0B1020]'
                  : radarCharges > 0
                  ? 'bg-[#FFD400] hover:bg-[#ffe34d] border-white text-[#0B1020] cursor-pointer'
                  : 'bg-[#102238] border-white/30 text-white/40 cursor-not-allowed'
              }`}
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 1h4v2H6V1zm4 2h2v2h-2V3zm2 2h1v4h-1V5zm-1 4h-1v1h-1v1H8v-1H7v-1H5V7H4V5h1V3h1v2h2v2h2V5zM3 5h1v4H3V5zm1 4h1v1h1v1h2v-1h1v1H8v1H6v-1H5v-1H4V9zm7 2h2v2h-2v-2zm2 2h2v2h-2v-2z" />
              </svg>
              <span>RADAR {radarActiveForTurn ? 'ACTIVO' : `${radarCharges}/3`}</span>
            </button>

            {/* Botón de Dado de la Suerte (Desbloqueado a 1.200 puntos) */}
            {diceUsed ? (
              <button
                type="button"
                disabled
                title="Dado de la Suerte: Ya utilizado en esta partida"
                className="pixel-box px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-pixel text-[8px] sm:text-[9px] md:text-[10px] flex items-center gap-1 border border-white/20 bg-[#0c192c] text-white/40 cursor-not-allowed"
              >
                <span className="text-[10px] sm:text-xs">🎲</span>
                <span className="hidden sm:inline">DADO</span>
                <span className="text-[#42F58B]">✓</span>
              </button>
            ) : diceUnlocked ? (
              <button
                type="button"
                onClick={onOpenDice}
                title="¡Dado de la Suerte disponible! Haz clic para lanzar o guardar"
                className="pixel-box px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded font-pixel text-[8px] sm:text-[9px] md:text-[10px] transition-all flex items-center gap-1 border-2 border-white bg-[#42F58B] hover:bg-[#5ef79f] text-[#0B1020] cursor-pointer animate-pulse shadow-[0_0_8px_#42F58B]"
              >
                <span className="text-[10px] sm:text-xs">🎲</span>
                <span>DADO</span>
                <span className="bg-[#E53945] text-white text-[7px] px-1 rounded-sm animate-bounce font-pixel">!</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                title="Dado de la Suerte: Se desbloquea al alcanzar 1.200 puntos"
                className="pixel-box px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-pixel text-[8px] sm:text-[9px] md:text-[10px] flex items-center gap-1 border border-white/20 bg-[#0c192c] text-white/40 cursor-not-allowed opacity-80"
              >
                <span className="text-[10px] sm:text-xs">🎲</span>
                <span className="hidden sm:inline">DADO</span>
                <span className="text-[7px] text-[#FFD400]">🔒1200</span>
              </button>
            )}

            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? 'Activar Audio' : 'Silenciar Audio'}
              className={`pixel-box p-1 sm:p-1.5 rounded border border-white cursor-pointer flex items-center justify-center transition ${
                isMuted
                  ? 'bg-[#E53945] text-white'
                  : 'bg-[#192853] hover:bg-[#233872] text-[#FFD400]'
              }`}
              aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
            >
              {isMuted ? (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row: Las 4 Barras de Subsistemas en 4 columnas en sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 pt-1 sm:pt-1.5">
          {SUBSYSTEMS.map((sub) => {
            const val = metrics[sub.key];
            const rawDelta = activeOption?.effects?.[sub.key] || 0;
            const dots = getFeedforwardDots(rawDelta);

            const isDangerLow = val <= 25;
            const isOverloadPair =
              isOverloadR1 && (sub.key === 'demand' || sub.key === 'tech' || sub.key === 'morale');
            const isHomeostasisZone = val >= 35 && val <= 75;

            let barColor = 'bg-[#42F58B]';
            let textColor = 'text-[#42F58B]';
            if (isDangerLow || isOverloadPair) {
              barColor = 'bg-[#E53945]';
              textColor = 'text-[#FF6478]';
            } else if (!isHomeostasisZone) {
              barColor = 'bg-[#FFD400]';
              textColor = 'text-[#FFD400]';
            }

            return (
              <div
                key={sub.key}
                className={`relative rounded-md sm:rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#08182B] border transition-all ${
                  dots
                    ? 'border-[#7CD1CF] shadow-[0_0_8px_rgba(124,209,207,0.5)]'
                    : isDangerLow || isOverloadPair
                    ? 'border-[#E53945]'
                    : 'border-white/50'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <sub.Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-white truncate">
                      {sub.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Previsualización Anticipativa (Feedforward dots) */}
                    {dots && (
                      <span
                        title="Previsualización Anticipativa (Feedforward): Magnitud de cambio"
                        className="px-1 py-0.2 rounded bg-[#7CD1CF] text-[#0B1020] font-pixel text-[8px] tracking-tighter animate-pulse"
                      >
                        {dots}
                      </span>
                    )}

                    {/* Si el Radar Cibernético está activo y hay preview, muestra el delta exacto */}
                    {radarActiveForTurn && activeOption && rawDelta !== 0 && (
                      <span
                        className={`font-pixel text-[8px] sm:text-[9px] ${
                          rawDelta > 0 ? 'text-[#42F58B]' : 'text-[#FF6478]'
                        }`}
                      >
                        {rawDelta > 0 ? `+${rawDelta}` : rawDelta}
                      </span>
                    )}

                    <span className={`font-pixel text-[10px] sm:text-[11px] md:text-xs ${textColor}`}>
                      {val}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar Track Pixelated with Homeostasis Zone Markers (35% - 75%) */}
                <div className="relative w-full h-1.5 sm:h-2 md:h-2.5 bg-[#050D1A] border border-white/60 rounded overflow-hidden">
                  {/* Zona de Homeostasis de referencia (35% a 75%) */}
                  <div
                    className="absolute top-0 bottom-0 border-x border-white/50 bg-white/10 z-10 pointer-events-none"
                    style={{ left: '35%', width: '40%' }}
                    title="Zona de Homeostasis (35% - 75%)"
                  />
                  <div
                    className={`h-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
