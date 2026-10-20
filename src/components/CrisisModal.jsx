import React from 'react';

export default function CrisisModal({ card, quarter, onAcknowledge }) {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="max-w-lg w-full bg-[#3B1022] border-4 border-white rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden shadow-[0_10px_0_#0B1020]">
        {/* Ícono Pixelado de Alerta */}
        <div className="w-14 h-14 rounded-xl bg-[#E53945] border-4 border-white flex items-center justify-center mx-auto mb-3 shadow-[0_4px_0_#0B1020]">
          <span className="font-pixel text-2xl text-[#FFD400] animate-bounce">!</span>
        </div>

        <div className="inline-block px-3 py-1 rounded bg-[#FFD400] border-2 border-[#0B1020] text-[#0B1020] font-pixel text-[9px] sm:text-[10px] uppercase mb-3">
          WARNING // CRISIS TRIMESTRE {quarter}
        </div>

        <h2 className="font-pixel text-sm sm:text-base text-white mb-2.5 leading-snug arcade-text-shadow">
          {card.title}
        </h2>

        <p className="font-vt text-xl sm:text-2xl text-white leading-snug mb-4">
          {card.description}
        </p>

        <div className="rounded-xl bg-[#08182B] border-2 border-[#FFD400] p-3 text-left mb-5">
          <div className="font-pixel text-[9px] text-[#FFD400] mb-1">
            SISTEMA ABIERTO // ADAPTABILIDAD
          </div>
          <p className="font-vt text-lg text-[#7CD1CF] leading-tight">
            Choque externo del entorno detectado. Regula el impacto sin disparar el bucle destructivo{' '}
            <strong className="text-[#FF8A93]">R1</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={onAcknowledge}
          className="pixel-box w-full py-3 px-5 rounded-xl font-pixel text-xs sm:text-sm uppercase bg-[#42F58B] hover:bg-[#5ef79f] border-4 border-white text-[#0B1020] transition cursor-pointer"
        >
          CONTINUE ▶
        </button>
      </div>
    </div>
  );
}
