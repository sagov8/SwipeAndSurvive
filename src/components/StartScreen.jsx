import React, { useState } from 'react';
import { soundEngine } from '../engine/soundEngine';

/**
 * Ícono de Corazón Pixel Art (estilo gabinete arcade clásico)
 */
function PixelHeart({ broken = false }) {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-[2px_2px_0px_#0B1020]" viewBox="0 0 12 11" fill="none">
      {broken ? (
        <>
          <path
            d="M2 1h3v1h1v2H5v1H4v2h1v2H4v1H3V8H1V6H0V3h1V2h1V1z"
            fill="#E53945"
          />
          <path
            d="M7 1h3v1h1v1h1v3h-1v2H9v2H7V9h1V7H7V5h1V3H7V1z"
            fill="#B71C28"
          />
        </>
      ) : (
        <>
          <path
            d="M2 1h3v1h2V1h3v1h1v1h1v3h-1v2H9v1H8v1H7v1H5v-1H4V9H3V8H1V6H0V3h1V2h1V1z"
            fill="#E53945"
          />
          <path d="M2 2h2v1H2V2zm-1 1h1v2H1V3z" fill="#FF8A93" />
        </>
      )}
    </svg>
  );
}

const ARCADE_STRATEGIES = [
  {
    id: 'AUTOMATIZACION',
    title: 'PLANTA Y LOGÍSTICA',
    subtitle: 'Escudo Operativo (-20% caída en Planta/Rutas)',
    icon: '⚙️',
    bgActive: 'bg-[#FFD800] text-[#0B1020] border-white',
  },
  {
    id: 'CAPACITACION',
    title: 'TALENTO CAFETERO',
    subtitle: 'Escudo Humano (-20% caída en Personal)',
    icon: '👥',
    bgActive: 'bg-[#42F58B] text-[#0B1020] border-white',
  },
  {
    id: 'INNOVACION',
    title: 'CAFÉ ESPECIAL Y WEB',
    subtitle: 'Escudo Comercial (-20% caída en Ventas)',
    icon: '☕',
    bgActive: 'bg-[#FF5E7E] text-white border-white',
  },
  {
    id: 'MEJORA_CONTINUA',
    title: 'CONTROL DE COSTOS',
    subtitle: 'Escudo Financiero (-20% caída en Caja)',
    icon: '💰',
    bgActive: 'bg-[#36E2F8] text-[#0B1020] border-white',
  },
];

export default function StartScreen({ onStartSimulation, records }) {
  const [step, setStep] = useState(1); // Fase 1: Título + Modo | Fase 2: Objetivo breve + Ruta Estratégica
  const [selectedMode, setSelectedMode] = useState('SOLO');
  const [selectedStrategy, setSelectedStrategy] = useState('AUTOMATIZACION');

  const highScore = String(records?.bestScore || 0).padStart(5, '0');

  const handleSelectModeAndAdvance = (mode) => {
    soundEngine.init();
    soundEngine.playCardAppear();
    setSelectedMode(mode);
    setStep(2);
  };

  const handleLaunchGame = () => {
    soundEngine.init();
    soundEngine.playSwipe('right');
    onStartSimulation({
      strategyPath: selectedStrategy,
      gameMode: selectedMode,
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-1 sm:p-3 relative z-20 bg-[#055B8C] select-none overflow-hidden">
      {/* Marco Exterior de la Máquina Arcade */}
      <div className="w-full max-w-3xl h-full max-h-[98dvh] bg-[#192853] border-[4px] sm:border-[5px] border-white rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden">
        
        {/* 1. MARQUESINA SUPERIOR AMARILLA ("ARCADE") */}
        <div className="bg-[#192853] p-1.5 sm:p-2.5 shrink-0">
          <div className="w-full bg-[#FFD400] border-3 sm:border-4 border-[#F59E0B] rounded-lg py-1.5 sm:py-2 px-3 sm:px-4 relative overflow-hidden shadow-inner flex items-center justify-center">
            <div className="absolute top-0.5 left-4 right-4 h-1 sm:h-1.5 bg-white/80 rounded-full" />
            <h1 className="font-pixel text-sm sm:text-xl md:text-2xl tracking-widest text-[#D62818] arcade-marquee-text uppercase text-center">
              AGROCAFÉ ARCADE
            </h1>
          </div>
        </div>

        {/* Cornisa biselada bajo la marquesina */}
        <div className="h-2 sm:h-3 bg-[#2E899E] border-y-2 border-white shrink-0" />

        {/* 2. PANTALLA CRT CURVA CENTRAL */}
        <div className="flex-1 bg-[#1D4858] px-2 sm:px-5 py-1.5 sm:py-2.5 flex items-center justify-center min-h-0">
          <div className="w-full h-full arcade-crt rounded-[18px] sm:rounded-[24px] border-3 sm:border-4 border-[#0E131D] relative p-2.5 sm:p-4 md:p-5 flex flex-col justify-between overflow-y-auto">
            {/* Estrellas pixeladas de fondo en el CRT */}
            <div className="absolute inset-0 pointer-events-none opacity-65">
              <div className="w-1.5 h-1.5 bg-white absolute top-6 left-10" />
              <div className="w-1.5 h-1.5 bg-white absolute top-12 left-1/3" />
              <div className="w-2 h-2 bg-[#FFD400] absolute top-8 right-16" />
              <div className="w-1.5 h-1.5 bg-white absolute bottom-12 left-14" />
              <div className="w-1.5 h-1.5 bg-white absolute bottom-8 right-24" />
            </div>

            {/* Barra Superior CRT: HI-SCORE & Corazones Pixel */}
            <div className="relative z-10 flex items-center justify-between gap-2 border-b-2 border-white/20 pb-1.5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[9px] sm:text-xs text-[#FFD400] arcade-text-shadow">
                  HI-SCORE:
                </span>
                <span className="font-pixel text-[11px] sm:text-sm text-white arcade-text-shadow">
                  {highScore}
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 scale-90 sm:scale-100">
                <PixelHeart />
                <PixelHeart />
                <PixelHeart />
                <PixelHeart broken={step === 2} />
              </div>
            </div>

            {/* ============================================================== */}
            {/* FASE 1: TÍTULO + PUNTAJE MÁXIMO + SELECCIÓN DE JUGADORES       */}
            {/* ============================================================== */}
            {step === 1 && (
              <div className="relative z-10 flex-1 flex flex-col items-center justify-evenly text-center py-1 sm:py-2">
                {/* Título Principal Pixelado */}
                <div>
                  <h2 className="font-pixel text-base sm:text-xl md:text-2xl text-[#FFD400] arcade-text-shadow leading-tight">
                    AGROCAFÉ COLOMBIANO
                  </h2>
                  <div className="font-pixel text-[10px] sm:text-xs text-[#5CE1E6] arcade-text-shadow mt-1 sm:mt-1.5 tracking-wider">
                    SWIPE &amp; SURVIVE S.A.S.
                  </div>
                </div>

                {/* Instrucción de Selección */}
                <div className="w-full max-w-xl">
                  <div className="font-pixel text-[10px] sm:text-xs text-white arcade-text-shadow mb-2 sm:mb-3 animate-pulse">
                    SELECCIONA JUGADORES
                  </div>

                  {/* Botones Grandes de Selección de Modo (Siempre 2 Columnas) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectModeAndAdvance('SOLO')}
                      className="pixel-box group rounded-xl p-2.5 sm:p-4 bg-[#FFD400] hover:bg-[#ffe144] border-3 sm:border-4 border-white text-[#0B1020] transition-transform cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-1.5"
                    >
                      <span className="text-2xl sm:text-3xl">☕</span>
                      <span className="font-pixel text-[10px] sm:text-xs font-bold tracking-wider">
                        1 JUGADOR
                      </span>
                      <span className="font-vt text-lg sm:text-xl md:text-2xl font-bold text-[#192853] leading-none">
                        GERENTE GENERAL
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectModeAndAdvance('BOARD')}
                      className="pixel-box group rounded-xl p-2.5 sm:p-4 bg-[#E53945] hover:bg-[#f24a56] border-3 sm:border-4 border-white text-white transition-transform cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-1.5"
                    >
                      <span className="text-2xl sm:text-3xl">👥</span>
                      <span className="font-pixel text-[10px] sm:text-xs font-bold tracking-wider">
                        2 - 4 JUGADORES
                      </span>
                      <span className="font-vt text-lg sm:text-xl md:text-2xl font-bold text-[#FFD400] leading-none">
                        JUNTA DIRECTIVA
                      </span>
                    </button>
                  </div>
                </div>

                <div className="font-pixel text-[8px] sm:text-[9px] text-white/80 tracking-wider">
                  ¿Podrás sobrevivir como gerente de Agrocafé Colombiano S.A.S.?
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* FASE 2: OBJETIVO BREVE + SELECCIÓN DE VENTAJA INICIAL          */}
            {/* ============================================================== */}
            {step === 2 && (
              <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-between py-1 gap-1.5">
                {/* Explicación Breve del Objetivo */}
                <div className="bg-[#0B1E33]/90 border-2 border-[#5CE1E6] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-center shrink-0">
                  <div className="font-pixel text-[9px] sm:text-[10px] text-[#FFD400] mb-0.5 sm:mb-1">
                    MISIÓN EN POPAYÁN: 20 TRIMESTRES
                  </div>
                  <p className="font-vt text-base sm:text-xl md:text-2xl text-white leading-tight">
                    Compra, procesa y distribuye café coordinando <span className="text-[#FFD400]">Finanzas, Talento, Ventas y Planta/Logística</span> sin que ningún área caiga a <span className="text-[#FF6478]">0%</span>.
                  </p>
                </div>

                {/* Selección Grande de Ruta Estratégica (Ventaja Inicial) */}
                <div className="my-auto py-1">
                  <div className="font-pixel text-[9px] sm:text-[10px] text-center text-white arcade-text-shadow mb-1.5">
                    ELIGE TU VENTAJA INICIAL:
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {ARCADE_STRATEGIES.map((strat) => {
                      const isSelected = selectedStrategy === strat.id;
                      return (
                        <button
                          key={strat.id}
                          type="button"
                          onClick={() => {
                            soundEngine.playCardAppear();
                            setSelectedStrategy(strat.id);
                          }}
                          className={`pixel-box rounded-lg sm:rounded-xl p-2 sm:p-2.5 border-2 sm:border-3 text-left transition-all cursor-pointer flex items-center gap-2 sm:gap-2.5 ${
                            isSelected
                              ? strat.bgActive
                              : 'bg-[#0F2942]/90 border-white/40 text-white hover:border-white'
                          }`}
                        >
                          <div className="text-xl sm:text-2xl md:text-3xl shrink-0">{strat.icon}</div>
                          <div className="min-w-0 flex-1">
                            <div className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] leading-tight break-words">
                              {strat.title}
                            </div>
                            <div
                              className={`font-vt text-sm sm:text-base md:text-lg leading-tight mt-0.5 font-bold ${
                                isSelected ? 'opacity-95' : 'text-[#FFD400]'
                              }`}
                            >
                              {strat.subtitle}
                            </div>
                          </div>
                          {isSelected && (
                            <span className="font-pixel text-[9px] shrink-0">◀</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Botones de Navegación Fase 2 (Volver / Start) */}
                <div className="flex items-center justify-between gap-2.5 pt-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playCardAppear();
                      setStep(1);
                    }}
                    className="pixel-box px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#192853] hover:bg-[#243870] border-2 border-white font-pixel text-[9px] sm:text-[10px] md:text-xs text-white cursor-pointer"
                  >
                    ← ATRÁS
                  </button>

                  <button
                    type="button"
                    onClick={handleLaunchGame}
                    className="pixel-box flex-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg bg-[#42F58B] hover:bg-[#5ef79f] border-3 sm:border-4 border-white font-pixel text-[10px] sm:text-xs md:text-sm text-[#0B1020] cursor-pointer text-center"
                  >
                    INICIAR PARTIDA (20 T) →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. PANEL DE CONTROL ARCADE INFERIOR (JOYSTICK Y BOTONES COMPACTOS) */}
        <div className="bg-[#7CD1CF] border-t-3 sm:border-t-4 border-white px-3 py-1.5 sm:py-2.5 shrink-0 flex items-center justify-around relative">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="w-6 sm:w-9 h-2.5 sm:h-3.5 rounded-t-full bg-[#FFB800] border-2 border-[#0B1020] shadow-md" />
              <div className="w-8 sm:w-12 h-1.5 bg-white border-x-2 border-b-2 border-[#0B1020]" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 sm:w-9 h-2.5 sm:h-3.5 rounded-t-full bg-[#E53945] border-2 border-[#0B1020] shadow-md" />
              <div className="w-8 sm:w-12 h-1.5 bg-white border-x-2 border-b-2 border-[#0B1020]" />
            </div>
          </div>

          <div className="flex flex-col items-center -mt-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E53945] border-2 border-[#0B1020] shadow-md" />
            <div className="w-1.5 h-3 sm:h-4 bg-[#2A324B] border-x border-[#0B1020]" />
            <div className="w-9 sm:w-12 h-2 bg-white border-2 border-[#0B1020]" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="w-6 sm:w-9 h-2.5 sm:h-3.5 rounded-t-full bg-[#FFB800] border-2 border-[#0B1020] shadow-md" />
              <div className="w-8 sm:w-12 h-1.5 bg-white border-x-2 border-b-2 border-[#0B1020]" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 sm:w-9 h-2.5 sm:h-3.5 rounded-t-full bg-[#E53945] border-2 border-[#0B1020] shadow-md" />
              <div className="w-8 sm:w-12 h-1.5 bg-white border-x-2 border-b-2 border-[#0B1020]" />
            </div>
          </div>
        </div>

        {/* Ranura de Monedas Inferior (Coin Door) */}
        <div className="bg-[#0B3559] border-t-2 sm:border-t-4 border-white px-4 sm:px-6 py-1 sm:py-1.5 flex items-center justify-between shrink-0">
          <div className="flex flex-col gap-0.5 sm:gap-1 w-20 sm:w-28">
            <div className="h-0.5 sm:h-1 bg-[#061E36] rounded" />
            <div className="h-0.5 sm:h-1 bg-[#061E36] rounded" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FF451C] border-2 border-[#0B1020] animate-pulse" />
            <div className="w-12 sm:w-16 h-4 sm:h-5 rounded bg-[#7CD1CF] border-2 border-[#2A6F7B] flex items-center justify-center">
              <div className="w-8 sm:w-10 h-0.5 sm:h-1 bg-[#0B3559]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
