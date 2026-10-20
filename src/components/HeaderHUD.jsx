import React from 'react';

const SUBSYSTEMS = [
  {
    key: 'liquidity',
    label: 'FINANZAS',
    icon: '💰',
  },
  {
    key: 'morale',
    label: 'TALENTO',
    icon: '👥',
  },
  {
    key: 'demand',
    label: 'COMERCIAL',
    icon: '☕',
  },
  {
    key: 'tech',
    label: 'PLANTA/LOG.',
    icon: '⚙️',
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
    <header className="w-full px-2.5 sm:px-4 pt-2.5 pb-1.5 z-20 shrink-0">
      <div className="max-w-5xl mx-auto bg-[#0D2742]/95 border-4 border-white rounded-2xl px-3.5 sm:px-5 py-3 shadow-[0_6px_0_#0B1020]">
        {/* Top Row: Stage/Quarter, Score, Mode, Radar & Audio Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b-2 border-white/25">
          {/* Left: Quarter & Mode */}
          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-lg bg-[#FFD400] border-2 border-[#0B1020] text-[#0B1020] font-pixel text-xs sm:text-sm shadow-[0_3px_0_#0B1020]">
              TRIMESTRE {String(quarter).padStart(2, '0')}/{maxQuarters}
            </div>

            <span className="hidden md:inline-block font-pixel text-[10px] px-2.5 py-1.5 rounded-lg bg-[#192853] text-[#7CD1CF] border-2 border-white/40">
              {gameMode === 'BOARD' ? '2-4P JUNTA DIRECTIVA' : '1P GERENCIA POPAYÁN'}
            </span>
          </div>

          {/* Center: Arcade Score & Overload Alert */}
          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-lg bg-[#08182B] border-2 border-[#7CD1CF] flex items-center gap-2 shadow-[0_3px_0_#0B1020]">
              <span className="font-pixel text-[10px] sm:text-xs text-[#FFD400]">SCORE:</span>
              <span className="font-pixel text-xs sm:text-base text-white tracking-wider">
                {String(score).padStart(5, '0')}
              </span>
            </div>

            {overloadCounter > 0 && (
              <div className="px-2.5 py-1.5 rounded-lg bg-[#E53945] border-2 border-white text-white font-pixel text-[10px] sm:text-xs animate-pulse">
                ALERTA R1: {overloadCounter}/3
              </div>
            )}
          </div>

          {/* Right Controls: Radar Cibernético & Speaker Audio Icon */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onActivateRadar}
              disabled={radarCharges <= 0 || radarActiveForTurn}
              title="Control Anticipativo (Feedforward): Revela impactos exactos y deudas diferidas"
              className={`pixel-box px-3 py-1.5 rounded-lg font-pixel text-[10px] sm:text-xs transition-all flex items-center gap-1.5 border-2 ${
                radarActiveForTurn
                  ? 'bg-[#7CD1CF] border-white text-[#0B1020]'
                  : radarCharges > 0
                  ? 'bg-[#FFD400] hover:bg-[#ffe34d] border-white text-[#0B1020] cursor-pointer'
                  : 'bg-[#102238] border-white/30 text-white/40 cursor-not-allowed'
              }`}
            >
              <span>📡 RADAR {radarActiveForTurn ? 'ACTIVO' : `${radarCharges}/3`}</span>
            </button>

            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? 'Activar Audio' : 'Silenciar Audio'}
              className={`pixel-box p-2 rounded-lg border-2 border-white cursor-pointer flex items-center justify-center transition ${
                isMuted
                  ? 'bg-[#E53945] text-white'
                  : 'bg-[#192853] hover:bg-[#233872] text-[#FFD400]'
              }`}
              aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
            >
              {isMuted ? (
                /* Bocina con raya diagonal atravesada */
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                /* Bocina activa */
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row: Las 4 Barras de Subsistemas Aumentadas de Tamaño */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-3">
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
                className={`relative rounded-xl px-3 py-2 bg-[#08182B] border-2 transition-all ${
                  dots
                    ? 'border-[#7CD1CF] shadow-[0_0_12px_rgba(124,209,207,0.5)]'
                    : isDangerLow || isOverloadPair
                    ? 'border-[#E53945]'
                    : 'border-white/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-base sm:text-lg">{sub.icon}</span>
                    <span className="font-pixel text-[10px] sm:text-xs text-white truncate">
                      {sub.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Previsualización Anticipativa (Feedforward dots) */}
                    {dots && (
                      <span
                        title="Previsualización Anticipativa (Feedforward): Magnitud de cambio"
                        className="px-1.5 py-0.5 rounded bg-[#7CD1CF] text-[#0B1020] font-pixel text-[10px] tracking-tighter animate-pulse"
                      >
                        {dots}
                      </span>
                    )}

                    {/* Si el Radar Cibernético está activo y hay preview, muestra el delta exacto */}
                    {radarActiveForTurn && activeOption && rawDelta !== 0 && (
                      <span
                        className={`font-pixel text-[10px] ${
                          rawDelta > 0 ? 'text-[#42F58B]' : 'text-[#FF6478]'
                        }`}
                      >
                        {rawDelta > 0 ? `+${rawDelta}` : rawDelta}
                      </span>
                    )}

                    <span className={`font-pixel text-xs sm:text-sm ${textColor}`}>
                      {val}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar Track Pixelated with Homeostasis Zone Markers (35% - 75%) */}
                <div className="relative w-full h-3.5 sm:h-4 bg-[#050D1A] border-2 border-white/70 rounded overflow-hidden">
                  {/* Zona de Homeostasis de referencia (35% a 75%) */}
                  <div
                    className="absolute top-0 bottom-0 border-x-2 border-white/50 bg-white/10 z-10 pointer-events-none"
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
