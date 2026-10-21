import React from 'react';

/**
 * Componente que proyecta efectos visuales arcade transitorios alineados en la parte superior:
 * - Esquina superior izquierda: Efectos en Finanzas y Planta/Operaciones
 * - Esquina superior derecha: Efectos en Talento Humano y Clientes/Comercial
 * - Duración: 5 segundos
 */
export default function DecisionFeedbackOverlay({ feedback }) {
  if (!feedback) return null;

  const { deltas } = feedback;
  const { liquidity = 0, morale = 0, demand = 0, tech = 0 } = deltas;

  return (
    <aside aria-label="Efectos de decisión" className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* ============================================================== */}
      {/* ESQUINA SUPERIOR IZQUIERDA (FINANZAS Y PLANTA/LOGÍSTICA)       */}
      {/* ============================================================== */}
      <div className="absolute left-3 sm:left-6 top-3 sm:top-5 flex flex-col gap-2.5 items-start">
        {/* Ganancia Financiera */}
        {liquidity > 0 && (
          <div className="flex items-center gap-2 bg-[#08182B]/95 border-2 border-[#42F58B] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-bounce">
            <span className="text-xl sm:text-2xl animate-pulse">💰</span>
            <div className="flex flex-col">
              <span className="font-pixel text-[8px] text-[#FFD400]">FINANZAS</span>
              <span className="font-pixel text-[10px] sm:text-xs text-[#42F58B]">
                +{liquidity}%
              </span>
            </div>
          </div>
        )}

        {/* Pérdida Financiera */}
        {liquidity < 0 && (
          <div className="flex items-center gap-2 bg-[#3B1022]/95 border-2 border-[#E53945] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-pulse">
            <span className="text-xl sm:text-2xl">🔻💸</span>
            <div className="flex flex-col">
              <span className="font-pixel text-[8px] text-white">FINANZAS</span>
              <span className="font-pixel text-[10px] sm:text-xs text-[#FF8A93]">
                {liquidity}%
              </span>
            </div>
          </div>
        )}

        {/* Desgaste / Avería en Planta */}
        {tech < 0 && (
          <div className="flex items-center gap-2 bg-[#3B1022]/95 border-2 border-[#E53945] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-pulse">
            <span className="text-xl sm:text-2xl">🏭💥</span>
            <div className="flex flex-col">
              <span className="font-pixel text-[8px] text-[#FF8A93]">PLANTA/LOG</span>
              <span className="font-pixel text-[10px] sm:text-xs text-[#FF6478]">
                {tech}%
              </span>
            </div>
          </div>
        )}

        {/* Mejora en Planta */}
        {tech > 0 && (
          <div className="flex items-center gap-2 bg-[#08182B]/95 border-2 border-[#36E2F8] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-bounce">
            <span className="text-xl sm:text-2xl animate-spin" style={{ animationDuration: '3s' }}>⚙️</span>
            <div className="flex flex-col">
              <span className="font-pixel text-[8px] text-[#7CD1CF]">PLANTA</span>
              <span className="font-pixel text-[10px] sm:text-xs text-[#36E2F8]">
                +{tech}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* ESQUINA SUPERIOR DERECHA (TALENTO HUMANO Y COMERCIAL/VENTAS)   */}
      {/* ============================================================== */}
      <div className="absolute right-3 sm:right-6 top-3 sm:top-5 flex flex-col gap-2.5 items-end">
        {/* Descontento en Talento Humano */}
        {morale < 0 && (
          <div className="flex items-center gap-2 bg-[#3B1022]/95 border-2 border-[#E53945] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-bounce">
            <div className="flex flex-col text-right">
              <span className="font-pixel text-[8px] text-[#FF8A93]">PROTESTA</span>
              <span className="font-pixel text-[10px] sm:text-xs text-white">
                {morale}%
              </span>
            </div>
            <span className="text-xl sm:text-2xl">😡👎</span>
          </div>
        )}

        {/* Apoyo y Bienestar en Personal */}
        {morale > 0 && (
          <div className="flex items-center gap-2 bg-[#08182B]/95 border-2 border-[#42F58B] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-bounce">
            <div className="flex flex-col text-right">
              <span className="font-pixel text-[8px] text-[#42F58B]">TALENTO</span>
              <span className="font-pixel text-[10px] sm:text-xs text-[#FFD400]">
                +{morale}%
              </span>
            </div>
            <span className="text-xl sm:text-2xl">👏❤️</span>
          </div>
        )}

        {/* Quejas de Clientes / Caída Comercial */}
        {demand < 0 && (
          <div className="flex items-center gap-2 bg-[#3B1022]/95 border-2 border-[#FF6478] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-pulse">
            <div className="flex flex-col text-right">
              <span className="font-pixel text-[8px] text-[#FF8A93]">COMERCIAL</span>
              <span className="font-pixel text-[10px] sm:text-xs text-[#FF6478]">
                {demand}%
              </span>
            </div>
            <span className="text-xl sm:text-2xl">📉😠</span>
          </div>
        )}

        {/* Éxito Comercial / Ventas de Café */}
        {demand > 0 && (
          <div className="flex items-center gap-2 bg-[#08182B]/95 border-2 border-[#FFD400] px-3 py-1.5 rounded-xl shadow-[0_4px_0_#0B1020] animate-bounce">
            <div className="flex flex-col text-right">
              <span className="font-pixel text-[8px] text-[#FFD400]">PEDIDOS</span>
              <span className="font-pixel text-[10px] sm:text-xs text-[#42F58B]">
                +{demand}%
              </span>
            </div>
            <span className="text-xl sm:text-2xl">☕🎉</span>
          </div>
        )}
      </div>
    </aside>
  );
}
