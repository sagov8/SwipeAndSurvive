import React from 'react';

/**
 * Pixel Art Icons para los 4 Subsistemas Organizacionales
 * Diseñados en cuadrícula 16x16 auténtica estilo Arcade 8-Bit.
 */

// 1. FINANZAS: Moneda de oro arcade con signo $
export function PixelIconFinance({ className = 'w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      {/* Contorno exterior pixelado */}
      <rect x="4" y="1" width="8" height="14" fill="#0B1020" />
      <rect x="2" y="3" width="12" height="10" fill="#0B1020" />
      <rect x="1" y="5" width="14" height="6" fill="#0B1020" />

      {/* Relleno dorado principal */}
      <rect x="4" y="2" width="8" height="12" fill="#FFD400" />
      <rect x="2" y="4" width="12" height="8" fill="#FFD400" />
      <rect x="3" y="3" width="10" height="10" fill="#FFD400" />

      {/* Brillo superior izquierdo */}
      <rect x="4" y="2" width="6" height="2" fill="#FFF59D" />
      <rect x="2" y="4" width="2" height="4" fill="#FFF59D" />

      {/* Sombra inferior derecha */}
      <rect x="6" y="12" width="6" height="2" fill="#D97706" />
      <rect x="12" y="6" width="2" height="6" fill="#D97706" />

      {/* Signo $ pixel art en contraste marrón oscuro */}
      <rect x="7" y="3" width="2" height="10" fill="#3D2000" />
      <rect x="5" y="4" width="6" height="2" fill="#3D2000" />
      <rect x="5" y="7" width="6" height="2" fill="#3D2000" />
      <rect x="5" y="10" width="6" height="2" fill="#3D2000" />
      <rect x="5" y="5" width="2" height="2" fill="#3D2000" />
      <rect x="9" y="8" width="2" height="2" fill="#3D2000" />
    </svg>
  );
}

// 2. TALENTO HUMANO: Equipo / Siluetas de trabajadores pixel art en azul claro / cian
export function PixelIconTalent({ className = 'w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      {/* Figura trasera (derecha) */}
      <rect x="9" y="2" width="5" height="5" fill="#0B1020" />
      <rect x="10" y="3" width="3" height="3" fill="#5BB5B3" />
      <rect x="8" y="7" width="7" height="6" fill="#0B1020" />
      <rect x="9" y="8" width="5" height="4" fill="#4B9593" />

      {/* Contorno figura frontal (izquierda) */}
      <rect x="1" y="4" width="8" height="11" fill="#0B1020" />
      <rect x="2" y="3" width="6" height="8" fill="#0B1020" />

      {/* Cabeza / Sombrero cafetero en azul claro */}
      <rect x="3" y="3" width="5" height="2" fill="#38BDF8" />
      <rect x="2" y="4" width="7" height="1" fill="#38BDF8" />
      <rect x="3" y="5" width="5" height="4" fill="#BAE6FD" />
      {/* Ojos pixel */}
      <rect x="4" y="6" width="1" height="1" fill="#0B1020" />
      <rect x="6" y="6" width="1" height="1" fill="#0B1020" />

      {/* Torso / Overol en cian retro */}
      <rect x="2" y="9" width="7" height="5" fill="#38BDF8" />
      <rect x="3" y="10" width="5" height="4" fill="#7CD1CF" />
      <rect x="4" y="9" width="3" height="2" fill="#BAE6FD" />
    </svg>
  );
}

// 3. COMERCIAL: Taza humeante de café colombiano en pixel art
export function PixelIconCommercial({ className = 'w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      {/* Vapor / humo pixel art */}
      <rect x="4" y="1" width="1" height="2" fill="#E2E8F0" />
      <rect x="5" y="2" width="1" height="1" fill="#E2E8F0" />
      <rect x="7" y="0" width="1" height="2" fill="#FFFFFF" />
      <rect x="8" y="2" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="1" width="1" height="2" fill="#E2E8F0" />

      {/* Borde exterior taza */}
      <rect x="2" y="4" width="10" height="9" fill="#0B1020" />
      <rect x="11" y="6" width="4" height="5" fill="#0B1020" />
      <rect x="1" y="13" width="12" height="2" fill="#0B1020" />

      {/* Asa */}
      <rect x="11" y="7" width="3" height="3" fill="#F59E0B" />
      <rect x="12" y="8" width="1" height="1" fill="#0B1020" />

      {/* Taza cerámica y café */}
      <rect x="3" y="5" width="8" height="7" fill="#FDE68A" />
      <rect x="3" y="5" width="8" height="2" fill="#78350F" />
      <rect x="4" y="5" width="2" height="1" fill="#B45309" />
      <rect x="3" y="7" width="8" height="5" fill="#FFFBEB" />
      <rect x="3" y="11" width="8" height="1" fill="#F59E0B" />

      {/* Platillo base */}
      <rect x="2" y="13" width="10" height="1" fill="#F59E0B" />
    </svg>
  );
}

// 4. PLANTA/LOGÍSTICA: Engranaje mecánico industrial en pixel art
export function PixelIconTech({ className = 'w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      {/* Contorno exterior */}
      <rect x="5" y="0" width="6" height="16" fill="#0B1020" />
      <rect x="0" y="5" width="16" height="6" fill="#0B1020" />
      <rect x="2" y="2" width="12" height="12" fill="#0B1020" />

      {/* Relleno metálico cian arcade */}
      <rect x="6" y="1" width="4" height="14" fill="#36E2F8" />
      <rect x="1" y="6" width="14" height="4" fill="#36E2F8" />
      <rect x="3" y="3" width="10" height="10" fill="#36E2F8" />

      {/* Dientes superiores con brillo */}
      <rect x="6" y="1" width="4" height="2" fill="#A5F3FC" />
      <rect x="1" y="6" width="2" height="4" fill="#A5F3FC" />
      <rect x="3" y="3" width="3" height="3" fill="#A5F3FC" />

      {/* Sombras inferiores */}
      <rect x="6" y="13" width="4" height="2" fill="#0E7490" />
      <rect x="13" y="6" width="2" height="4" fill="#0E7490" />
      <rect x="10" y="10" width="3" height="3" fill="#0E7490" />

      {/* Orificio central del engranaje */}
      <rect x="5" y="5" width="6" height="6" fill="#0B1020" />
      <rect x="6" y="6" width="4" height="4" fill="#08182B" />
      <rect x="7" y="7" width="2" height="2" fill="#030712" />
    </svg>
  );
}

/**
 * Renderizador helper según la clave de subsistema
 */
export function SubsystemIcon({ subsystemKey, className }) {
  switch (subsystemKey) {
    case 'liquidity':
      return <PixelIconFinance className={className} />;
    case 'morale':
      return <PixelIconTalent className={className} />;
    case 'demand':
      return <PixelIconCommercial className={className} />;
    case 'tech':
      return <PixelIconTech className={className} />;
    default:
      return null;
  }
}
