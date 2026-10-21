import React, { useState } from 'react';
import { STRATEGY_PATHS } from '../data/cardsCatalog';
import { soundEngine } from '../engine/soundEngine';

export function computeRankAndSummary(gameState) {
  const { status, score, quarter, causalHistory, auditStats } = gameState;
  const totalTurns = Math.max(1, causalHistory.length);
  const homeostasisIndex = Math.round((auditStats.homeostasisTurns / totalTurns) * 100);

  let rank = 'Gerente en Prueba';
  let rankBadgeColor = 'text-white border-white bg-[#192853]';

  if (status === 'VICTORY') {
    if (homeostasisIndex >= 65 && auditStats.r1LoopCount <= 1 && score >= 2800) {
      rank = 'Maestro Cafetero Sistémico';
      rankBadgeColor = 'text-[#0B1020] border-white bg-[#42F58B]';
    } else if (homeostasisIndex >= 40 || score >= 2300) {
      rank = 'Director Agroindustrial';
      rankBadgeColor = 'text-[#0B1020] border-white bg-[#FFD400]';
    } else {
      rank = 'Gestor de Crisis';
      rankBadgeColor = 'text-[#0B1020] border-white bg-[#7CD1CF]';
    }
  } else {
    if (quarter >= 14) {
      rank = 'Gestor de Crisis';
      rankBadgeColor = 'text-[#0B1020] border-white bg-[#FFD400]';
    } else {
      rank = 'Gerente en Prueba';
    }
  }

  const top3Decisions = [...causalHistory]
    .sort((a, b) => b.totalMagnitude - a.totalMagnitude)
    .slice(0, 3);

  return {
    rank,
    rankBadgeColor,
    homeostasisIndex,
    totalTurns,
    top3Decisions,
  };
}

const TABS = [
  { id: 'MAIN', label: '★ RESUMEN' },
  { id: 'STAT_1', label: '1. VENTAJA INICIAL' },
  { id: 'STAT_2', label: '2. HOMEOSTASIS' },
  { id: 'STAT_3', label: '3. BUCLES' },
  { id: 'STAT_4', label: '4. TOP DECISIONES' },
];

export default function AuditReport({
  gameState,
  records,
  onRestart,
}) {
  const [activeTab, setActiveTab] = useState('MAIN');

  const { status, score, quarter, maxQuarters, strategyPath, metrics, auditStats, endReason } =
    gameState;
  const isVictory = status === 'VICTORY';
  const strategyInfo = STRATEGY_PATHS[strategyPath] || STRATEGY_PATHS.AUTOMATIZACION;
  const { rank, rankBadgeColor, homeostasisIndex, totalTurns, top3Decisions } =
    computeRankAndSummary(gameState);

  const handleSelectTab = (tabId) => {
    soundEngine.playCardAppear();
    setActiveTab(tabId);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 relative z-20 overflow-hidden select-none">
      <div
        className={`max-w-3xl w-full h-full max-h-[92dvh] rounded-2xl p-4 sm:p-6 border-4 border-white shadow-[0_10px_0_#0B1020] flex flex-col justify-between overflow-hidden ${
          isVictory ? 'bg-[#0F2C4C]/95' : 'bg-[#3B1022]/95'
        }`}
      >
        {/* 1. BARRA SUPERIOR DE PESTAÑAS ARCADE */}
        <div className="shrink-0">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="font-pixel text-[9px] sm:text-[10px] text-[#7CD1CF]">
              Sobreviviste: {quarter}/{maxQuarters} trimestres
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-3 border-b-2 border-white/30">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`pixel-box px-2.5 sm:px-3 py-1.5 rounded-lg font-pixel text-[8px] sm:text-[10px] border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD400] border-white text-[#0B1020]'
                      : 'bg-[#08182B] border-white/40 text-white/80 hover:border-white hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. CONTENIDO CENTRAL SEGÚN PESTAÑA ACTIVA */}
        <div className="flex-1 flex flex-col justify-center my-3 overflow-y-auto audit-scroll px-1">
          {/* ============================================================== */}
          {/* PESTAÑA PRINCIPAL: GAME OVER + SCORE + RANGO + CAUSA           */}
          {/* ============================================================== */}
          {activeTab === 'MAIN' && (
            <div className="flex flex-col items-center justify-evenly text-center h-full py-2 gap-4">
              <div>
                <h1
                  className={`font-pixel text-2xl sm:text-4xl arcade-text-shadow leading-tight ${
                    isVictory ? 'text-[#42F58B]' : 'text-[#FFD400]'
                  }`}
                >
                  {isVictory ? 'STAGE CLEAR!' : 'GAME OVER'}
                </h1>
                <div className="font-pixel text-xs sm:text-sm text-white arcade-text-shadow mt-2">
                  {endReason?.title || (isVictory ? 'VICTORIA SISTÉMICA' : 'COLAPSO ORGANIZACIONAL')}
                </div>
              </div>

              {/* Tarjetas Grandes de Rango y Score */}
              <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-lg">
                <div
                  className={`flex-1 min-w-[180px] p-4 rounded-xl border-4 shadow-[0_5px_0_#0B1020] ${rankBadgeColor}`}
                >
                  <div className="font-pixel text-[9px] uppercase opacity-80 mb-1">
                    RANGO ALCANZADO
                  </div>
                  <div className="font-pixel text-xs sm:text-sm leading-snug">{rank}</div>
                </div>

                <div className="flex-1 min-w-[160px] p-4 rounded-xl bg-[#08182B] border-4 border-[#FFD400] shadow-[0_5px_0_#0B1020]">
                  <div className="font-pixel text-[9px] uppercase text-[#7CD1CF] mb-1">
                    SCORE FINAL
                  </div>
                  <div className="font-pixel text-lg sm:text-2xl text-[#FFD400]">
                    {String(score).padStart(5, '0')}
                  </div>
                </div>
              </div>

              {/* Descripción del motivo de derrota o victoria */}
              <div className="w-full max-w-xl rounded-xl bg-[#08182B]/95 border-2 border-white/50 p-4">
                <div className="font-pixel text-[9px] text-[#FFD400] mb-1.5 uppercase">
                  {isVictory ? 'RESUMEN DE GESTIÓN' : '¿POR QUÉ COLAPSÓ LA EMPRESA?'}
                </div>
                <p className="font-vt text-xl sm:text-2xl text-white leading-snug">
                  {endReason?.detail}
                </p>
              </div>

              {/* Estado Final de los 4 Indicadores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-xl">
                {[
                  { label: 'FINANZAS', icon: '💰', val: metrics.liquidity },
                  { label: 'TALENTO', icon: '👥', val: metrics.morale },
                  { label: 'COMERCIAL', icon: '☕', val: metrics.demand },
                  { label: 'PLANTA/LOG.', icon: '⚙️', val: metrics.tech },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl bg-[#08182B] border-2 border-white/40 p-2.5 flex flex-col items-center justify-center shadow-[0_3px_0_#0B1020]"
                  >
                    {/* Porcentaje más grande arriba */}
                    <span
                      className={`font-pixel text-base sm:text-lg mb-1 leading-none ${
                        m.val <= 0
                          ? 'text-[#FF6478]'
                          : m.val >= 35 && m.val <= 75
                          ? 'text-[#42F58B]'
                          : 'text-[#FFD400]'
                      }`}
                    >
                      {m.val}%
                    </span>

                    {/* Título de cada subsistema abajo */}
                    <span className="font-pixel text-[8px] sm:text-[9px] text-white flex items-center gap-1 text-center">
                      <span>{m.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PESTAÑA 1: VENTAJA INICIAL (EQUIFINALIDAD)                    */}
          {/* ============================================================== */}
          {activeTab === 'STAT_1' && (
            <div className="w-full max-w-xl mx-auto rounded-2xl bg-[#08182B] border-4 border-[#7CD1CF] p-5 sm:p-6 shadow-[0_6px_0_#0B1020] text-center space-y-4">
              <div className="inline-block px-3 py-1 rounded bg-[#7CD1CF] text-[#0B1020] font-pixel text-[10px]">
                ESTADÍSTICA 1 // VENTAJA INICIAL
              </div>

              <h2 className="font-pixel text-base sm:text-xl text-[#FFD400] arcade-text-shadow">
                {strategyInfo.name}
              </h2>

              <p className="font-vt text-xl sm:text-2xl text-white leading-snug">
                {strategyInfo.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl bg-[#0F2C4C] border-2 border-white/40 p-3">
                  <div className="font-pixel text-[9px] text-[#7CD1CF] mb-1">ÁREA PROTEGIDA</div>
                  <div className="font-vt text-2xl font-bold text-[#FFD400]">
                    {strategyInfo.subsystemLabel}
                  </div>
                </div>

                <div className="rounded-xl bg-[#0F2C4C] border-2 border-[#42F58B] p-3">
                  <div className="font-pixel text-[9px] text-[#42F58B] mb-1">DAÑO MITIGADO</div>
                  <div className="font-pixel text-base sm:text-lg text-white">
                    +{auditStats.equifinalitySavedPoints}% AHORRADO
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PESTAÑA 2: ÍNDICE DE HOMEOSTASIS Y SINERGIA                    */}
          {/* ============================================================== */}
          {activeTab === 'STAT_2' && (
            <div className="w-full max-w-xl mx-auto rounded-2xl bg-[#08182B] border-4 border-[#42F58B] p-5 sm:p-6 shadow-[0_6px_0_#0B1020] text-center space-y-4">
              <div className="inline-block px-3 py-1 rounded bg-[#42F58B] text-[#0B1020] font-pixel text-[10px]">
                ESTADÍSTICA 2 // HOMEOSTASIS Y SINERGIA
              </div>

              <div>
                <div className="font-pixel text-3xl sm:text-5xl text-white arcade-text-shadow">
                  {homeostasisIndex}%
                </div>
                <div className="font-vt text-xl text-[#7CD1CF] mt-1">
                  Índice de Equilibrio Homeostático Promedio
                </div>
              </div>

              <p className="font-vt text-xl sm:text-2xl text-white/90 leading-snug">
                Mide el porcentaje de trimestres en los que las 4 áreas de AgroCafé se mantuvieron
                simultáneamente en la zona segura (<span className="text-[#42F58B]">35% a 75%</span>).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-[#0F2C4C] border-2 border-white/40 p-3">
                  <div className="font-pixel text-[9px] text-[#7CD1CF] mb-1">
                    TURNOS EN EQUILIBRIO
                  </div>
                  <div className="font-pixel text-sm sm:text-base text-white">
                    {auditStats.homeostasisTurns} DE {totalTurns} TRIMESTRES
                  </div>
                </div>

                <div className="rounded-xl bg-[#0F2C4C] border-2 border-[#FFD400] p-3">
                  <div className="font-pixel text-[9px] text-[#FFD400] mb-1">
                    BONOS DE SINERGIA (45%-75%)
                  </div>
                  <div className="font-pixel text-sm sm:text-base text-[#42F58B]">
                    {auditStats.synergyTurns} TRIMESTRE(S)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PESTAÑA 3: REGISTRO DE BUCLES CIBERNÉTICOS                     */}
          {/* ============================================================== */}
          {activeTab === 'STAT_3' && (
            <div className="w-full max-w-xl mx-auto rounded-2xl bg-[#08182B] border-4 border-[#FFD400] p-5 sm:p-6 shadow-[0_6px_0_#0B1020] space-y-3">
              <div className="text-center">
                <div className="inline-block px-3 py-1 rounded bg-[#FFD400] text-[#0B1020] font-pixel text-[10px] mb-2">
                  ESTADÍSTICA 3 // CONTROL CIBERNÉTICO
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#0F2C4C] border-2 border-[#E53945] p-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-pixel text-[9px] text-[#FF8A93]">BUCLE POSITIVO R1</div>
                    <div className="font-vt text-lg text-white leading-tight mt-0.5">
                      Sobrecarga Ventas vs Planta
                    </div>
                  </div>
                  <span className="font-pixel text-lg text-[#FF6478]">
                    {auditStats.r1LoopCount}x
                  </span>
                </div>

                <div className="rounded-xl bg-[#0F2C4C] border-2 border-[#42F58B] p-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-pixel text-[9px] text-[#42F58B]">REGULACIÓN B1</div>
                    <div className="font-vt text-lg text-white leading-tight mt-0.5">
                      Ajustes y Neguentropía
                    </div>
                  </div>
                  <span className="font-pixel text-lg text-[#42F58B]">
                    {auditStats.b1ControlCount}x
                  </span>
                </div>

                <div className="rounded-xl bg-[#0F2C4C] border-2 border-[#FFD400] p-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-pixel text-[9px] text-[#FFD400]">RADAR FEEDFORWARD</div>
                    <div className="font-vt text-lg text-white leading-tight mt-0.5">
                      Escaneos Anticipativos
                    </div>
                  </div>
                  <span className="font-pixel text-lg text-[#FFD400]">
                    {auditStats.radarUses}x
                  </span>
                </div>

                <div className="rounded-xl bg-[#0F2C4C] border-2 border-[#7CD1CF] p-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-pixel text-[9px] text-[#7CD1CF]">DEUDAS DIFERIDAS</div>
                    <div className="font-vt text-lg text-white leading-tight mt-0.5">
                      Problemas desplazados (+3T)
                    </div>
                  </div>
                  <span className="font-pixel text-lg text-[#7CD1CF]">
                    {auditStats.delayedDebtsTriggered}x
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PESTAÑA 4: TOP DECISIONES — ESCALAFÓN TIPO PODIO               */}
          {/* ============================================================== */}
          {activeTab === 'STAT_4' && (
            <div className="w-full max-w-2xl mx-auto space-y-3">
              <div className="text-center mb-1">
                <span className="inline-block px-3 py-1 rounded bg-[#7CD1CF] text-[#0B1020] font-pixel text-[9px] uppercase">
                  ESTADÍSTICA 4 // PODIO DE DECISIONES DE MAYOR IMPACTO
                </span>
              </div>

              {top3Decisions.length === 0 ? (
                <div className="rounded-xl bg-[#08182B] border-2 border-white/40 p-6 text-center font-vt text-xl text-white">
                  No se registraron decisiones en esta partida.
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {top3Decisions.map((item, idx) => {
                    const podiumRanks = [
                      {
                        place: '1ER LUGAR',
                        badge: 'bg-[#FFD400] text-[#0B1020] border-[#0B1020]',
                        borderColor: 'border-[#FFD400]',
                        icon: '🥇',
                        titleColor: 'text-[#FFD400]',
                      },
                      {
                        place: '2DO LUGAR',
                        badge: 'bg-[#E2E8F0] text-[#0B1020] border-[#0B1020]',
                        borderColor: 'border-[#E2E8F0]',
                        icon: '🥈',
                        titleColor: 'text-[#E2E8F0]',
                      },
                      {
                        place: '3ER LUGAR',
                        badge: 'bg-[#CD7F32] text-white border-[#0B1020]',
                        borderColor: 'border-[#CD7F32]',
                        icon: '🥉',
                        titleColor: 'text-[#CD7F32]',
                      },
                    ];
                    const p = podiumRanks[idx] || podiumRanks[2];

                    return (
                      <div
                        key={`${item.quarter}-${idx}`}
                        className={`rounded-2xl bg-[#08182B] border-4 ${p.borderColor} p-4 sm:p-4.5 shadow-[0_5px_0_#0B1020] flex items-start gap-3.5 transition-all`}
                      >
                        {/* Escalafón / Medalla de podio */}
                        <div className="flex flex-col items-center justify-center shrink-0 w-14 sm:w-16">
                          <span className="text-2xl sm:text-3xl">{p.icon}</span>
                          <span className={`font-pixel text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded border mt-1.5 text-center leading-none ${p.badge}`}>
                            {p.place}
                          </span>
                        </div>

                        {/* Contenido limpio: Título + Breve descripción de la decisión */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                            <h3 className={`font-pixel text-[10px] sm:text-xs leading-snug break-words ${p.titleColor}`}>
                              {item.cardTitle}
                            </h3>
                            <span className="font-pixel text-[8px] text-[#5CE1E6] shrink-0">
                              T{item.quarter}
                            </span>
                          </div>

                          {/* Decisión tomada: sin flecha, color azul (#5CE1E6) y mayor tamaño */}
                          <div className="font-vt text-xl sm:text-2xl text-[#5CE1E6] font-bold leading-tight mb-1.5">
                            <span className="text-white/80">Decisión:</span> &ldquo;{item.decisionLabel}&rdquo;
                          </div>

                          {/* Breve descripción explicativa */}
                          <p className="font-vt text-lg sm:text-xl text-white/90 leading-tight">
                            {item.causalSummary}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. BARRA INFERIOR FIJA: HI-SCORE Y BOTÓN PLAY AGAIN SIEMPRE VISIBLE */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-white/30 shrink-0">
          <div className="font-pixel text-[9px] sm:text-[10px] text-white">
            HI-SCORE:{' '}
            <span className="text-[#FFD400]">
              {String(records?.bestScore || score).padStart(5, '0')}
            </span>{' '}
            | VICTORIAS: <span className="text-[#42F58B]">{records?.victories || 0}</span>
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="pixel-box px-6 py-2.5 sm:py-3 rounded-xl font-pixel text-xs sm:text-sm uppercase bg-[#FFD400] hover:bg-[#ffe34d] border-4 border-white text-[#0B1020] transition cursor-pointer flex items-center justify-center gap-2.5"
          >
            <span>JUGAR DE NUEVO</span>
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 stroke-[3]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
