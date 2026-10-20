import React from 'react';
import { getNexusDiagnostic } from '../engine/nexusAdvisor';

export default function BottomControl({ gameState }) {
  const nexus = getNexusDiagnostic(gameState);

  let nexusBorder = 'border-white/60 bg-[#0D2742]/95';
  let nexusBadge = 'bg-[#7CD1CF] text-[#0B1020] border-[#0B1020]';

  if (nexus.level === 'CRISIS') {
    nexusBorder = 'border-[#E53945] bg-[#3B1022]/95';
    nexusBadge = 'bg-[#E53945] text-white border-white animate-pulse';
  } else if (nexus.level === 'WARN') {
    nexusBorder = 'border-[#FFD400] bg-[#0D2742]/95';
    nexusBadge = 'bg-[#FFD400] text-[#0B1020] border-[#0B1020]';
  } else if (nexus.level === 'SYNERGY') {
    nexusBorder = 'border-[#42F58B] bg-[#0F332B]/95';
    nexusBadge = 'bg-[#42F58B] text-[#0B1020] border-[#0B1020]';
  }

  return (
    <footer className="w-full px-2.5 sm:px-4 pb-3 pt-1 z-20 shrink-0">
      <div className="max-w-5xl mx-auto">
        {/* Banner de Dirección Estratégica (Consejos, Diagnósticos y Alertas) */}
        <div
          className={`rounded-xl px-4 py-2.5 border-2 shadow-[0_4px_0_#0B1020] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 ${nexusBorder}`}
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`font-pixel text-[9px] sm:text-[10px] uppercase px-2.5 py-1 rounded border-2 ${nexusBadge}`}
            >
              {nexus.tag}
            </span>
          </div>
          <p className="font-vt text-xl sm:text-2xl text-white leading-tight">
            {nexus.message}
          </p>
        </div>
      </div>
    </footer>
  );
}
