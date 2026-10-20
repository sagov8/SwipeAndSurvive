import React, { useState, useRef } from 'react';
import { simulateOptionPreview } from '../engine/gameReducer';

/**
 * Avatares Pixel Art estilo Arcade 8-Bit
 */
function DepartmentAvatar({ avatarType }) {
  switch (avatarType) {
    case 'tech':
      return (
        <svg className="w-10 h-10 text-[#36E2F8]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 2h8v2h2v8h-2v2H4v-2H2V4h2V2zm2 4v4h4V6H6z" />
        </svg>
      );
    case 'hr':
      return (
        <svg className="w-10 h-10 text-[#42F58B]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5 2h6v4H5V2zm-2 6h10v2h1v4H2v-4h1V8z" />
        </svg>
      );
    case 'market':
      return (
        <svg className="w-10 h-10 text-[#FFD400]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 3h4v4h-2V5h-2V3zM2 11h2V9h2V7h2v2h2V7h2v6H2v-2z" />
        </svg>
      );
    case 'finance':
      return (
        <svg className="w-10 h-10 text-[#FFD400]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M7 1h2v2h3v2H6v2h6v4H9v2H7v-2H4V9h6V7H4V3h3V1z" />
        </svg>
      );
    case 'security':
      return (
        <svg className="w-10 h-10 text-[#7CD1CF]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 2h10v6H11v3H9v2H7v-2H5V8H3V2zm3 3v3h4V5H6z" />
        </svg>
      );
    case 'nexus':
      return (
        <svg className="w-10 h-10 text-[#FF73A1]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 2h8v2h2v8h-2v2h-2v-2H6v2H4v-2H2V4h2V2zm2 4v2h1V6H6zm4 0v2h1V6h-1z" />
        </svg>
      );
    case 'crisis':
    default:
      return (
        <svg className="w-10 h-10 text-[#E53945]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M7 2h2v3h2v3h2v5H3V8h2V5h2V2zm0 4v4h2V6H7zm0 5v1h2v-1H7z" />
        </svg>
      );
  }
}

/**
 * Panel Lateral del Radar Predictivo (Izquierda o Derecha)
 */
function RadarSidePanel({ side, title, optionLabel, sim, isHighlighted, onSelect }) {
  if (!sim) return null;

  const items = [
    { k: 'liquidity', name: 'FINANZAS', icon: '💰', v: sim.adjustedEffects.liquidity },
    { k: 'morale', name: 'TALENTO', icon: '👥', v: sim.adjustedEffects.morale },
    { k: 'demand', name: 'COMERCIAL', icon: '☕', v: sim.adjustedEffects.demand },
    { k: 'tech', name: 'PLANTA/LOG.', icon: '⚙️', v: sim.adjustedEffects.tech },
  ];

  return (
    <div
      onClick={onSelect}
      className={`w-full lg:w-60 xl:w-72 shrink-0 rounded-2xl bg-[#08182B]/95 border-4 p-3 sm:p-4 shadow-[0_6px_0_#0B1020] transition-all cursor-pointer ${
        isHighlighted
          ? 'border-[#FFD400] scale-[1.02]'
          : 'border-[#7CD1CF]'
      }`}
    >
      {/* Cabecera del Radar Lateral con Lupa */}
      <div className="flex items-center justify-between gap-1 pb-2 mb-2 border-b-2 border-white/25">
        <span className="font-pixel text-[9px] sm:text-[10px] text-[#FFD400] uppercase flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#FFD400]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>{side === 'left' ? '◀ RADAR IZQ' : 'RADAR DER ▶'}</span>
        </span>
        <span className="px-1.5 py-0.5 rounded bg-[#7CD1CF] text-[#0B1020] font-pixel text-[8px] flex items-center gap-1">
          <span>🔍</span>
          <span>SCAN</span>
        </span>
      </div>

      {/* Nombre de la opción sin truncar */}
      <div className="font-vt text-lg sm:text-xl text-white font-bold leading-tight mb-2.5 break-words">
        <span className="text-[#7CD1CF]">{title}:</span> {optionLabel}
      </div>

      {/* Lista de Impactos en los 4 Subsistemas */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
        {items.map((it) => (
          <div
            key={it.k}
            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0F2C4C] border border-white/25"
          >
            <span className="font-pixel text-[8px] sm:text-[9px] text-white flex items-center gap-1.5">
              <span>{it.icon}</span>
              <span>{it.name}</span>
            </span>

            <span
              className={`font-pixel text-[10px] sm:text-xs ${
                it.v > 0
                  ? 'text-[#42F58B]'
                  : it.v < 0
                  ? 'text-[#FF6478]'
                  : 'text-white/50'
              }`}
            >
              {it.v > 0 ? `+${it.v}%` : `${it.v}%`}
            </span>
          </div>
        ))}
      </div>

      {/* Advertencias de Deuda Diferida (+3T) o Efecto Dominó */}
      {sim.warnings.length > 0 ? (
        <div className="mt-2.5 p-2 rounded-lg bg-[#3B1022] border-2 border-[#E53945] font-vt text-base sm:text-lg text-[#FF8A93] leading-tight">
          ⚠️ {sim.warnings.join(' | ')}
        </div>
      ) : (
        <div className="mt-2.5 p-1.5 rounded-lg bg-[#0F332B] border border-[#42F58B]/60 font-vt text-base text-[#42F58B] text-center leading-tight">
          ✓ Sin deuda diferida oculta
        </div>
      )}
    </div>
  );
}

export default function SwipeCard({
  gameState,
  card,
  isAnimating,
  animatingDirection,
  previewDirection,
  onPreviewChange,
  onConfirmDecision,
}) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(null);

  if (!card) return null;

  const isCrisisCard = card.category === 'ENVIRONMENT' || card.category === 'DELAYED';
  const isNegentropyCard = card.category === 'NEGENTROPY';

  const handlePointerDown = (e) => {
    if (e.target.closest('button[data-choice-btn="true"]')) {
      return;
    }
    if (isAnimating) return;
    startXRef.current = e.clientX;
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture errors
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging || startXRef.current === null || isAnimating) return;
    const deltaX = e.clientX - startXRef.current;
    setDragX(deltaX);

    if (deltaX < -25) {
      if (previewDirection !== 'left') onPreviewChange('left');
    } else if (deltaX > 25) {
      if (previewDirection !== 'right') onPreviewChange('right');
    } else if (previewDirection !== null) {
      onPreviewChange(null);
    }
  };

  const handlePointerUpOrCancel = () => {
    if (!isDragging) return;
    setIsDragging(false);
    startXRef.current = null;

    if (Math.abs(dragX) > 95 && !isAnimating) {
      const dir = dragX < 0 ? 'left' : 'right';
      setDragX(0);
      onConfirmDecision(dir);
    } else {
      setDragX(0);
      onPreviewChange(null);
    }
  };

  let transformStyle = `translate3d(${dragX}px, 0px, 0px) rotate(${dragX * 0.045}deg)`;
  let transitionStyle = isDragging
    ? 'none'
    : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease';
  let opacityVal = 1;

  if (isAnimating && animatingDirection) {
    const exitX = animatingDirection === 'left' ? -420 : 420;
    const exitRot = animatingDirection === 'left' ? -16 : 16;
    transformStyle = `translate3d(${exitX}px, 15px, 0px) rotate(${exitRot}deg)`;
    transitionStyle = 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.32s ease';
    opacityVal = 0;
  }

  const activeDir =
    previewDirection || (dragX < -25 ? 'left' : dragX > 25 ? 'right' : null);

  const leftSim = gameState.radarActiveForTurn
    ? simulateOptionPreview(gameState, 'left')
    : null;
  const rightSim = gameState.radarActiveForTurn
    ? simulateOptionPreview(gameState, 'right')
    : null;

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 my-auto">
      {/* PANEL DE RADAR LATERAL IZQUIERDO (Desktop) */}
      {gameState.radarActiveForTurn && leftSim && (
        <div className="hidden lg:block">
          <RadarSidePanel
            side="left"
            title="OPCIÓN IZQ"
            optionLabel={card.left.label}
            sim={leftSim}
            isHighlighted={activeDir === 'left'}
            onSelect={() => !isAnimating && onConfirmDecision('left')}
          />
        </div>
      )}

      {/* TARJETA CENTRAL PRINCIPAL */}
      <div className="w-full max-w-xl flex items-center justify-center">
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          style={{
            transform: transformStyle,
            transition: transitionStyle,
            opacity: opacityVal,
            touchAction: 'none',
          }}
          className={`w-full rounded-2xl p-4 sm:p-5 cursor-grab active:cursor-grabbing relative overflow-hidden border-4 shadow-[0_8px_0_#0B1020] ${
            isCrisisCard
              ? 'bg-[#3B1022]/95 border-[#E53945]'
              : isNegentropyCard
              ? 'bg-[#1D1B4B]/95 border-[#FFD400]'
              : 'bg-[#0F2C4C]/95 border-white'
          }`}
        >
          {/* Top Category & TGS Concept Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span
              className={`font-pixel text-[9px] sm:text-[10px] uppercase px-2.5 py-1 rounded border-2 ${
                card.category === 'ENVIRONMENT'
                  ? 'bg-[#E53945] border-white text-white'
                  : card.category === 'DELAYED'
                  ? 'bg-[#FFD400] border-[#0B1020] text-[#0B1020]'
                  : card.category === 'NEGENTROPY'
                  ? 'bg-[#7CD1CF] border-[#0B1020] text-[#0B1020]'
                  : 'bg-[#192853] border-[#7CD1CF] text-[#FFD400]'
              }`}
            >
              {card.categoryLabel}
            </span>

            <span className="font-vt text-lg sm:text-xl text-[#7CD1CF] truncate max-w-[280px]">
              {card.tgsConcept}
            </span>
          </div>

          {/* Sender & Avatar Header */}
          <div className="flex items-center gap-3 pb-2.5 mb-2.5 border-b-2 border-white/25">
            <div className="w-12 h-12 p-1.5 rounded-lg bg-[#08182B] border-2 border-white flex items-center justify-center shrink-0 shadow-[0_3px_0_#0B1020]">
              <DepartmentAvatar avatarType={card.avatarType} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-pixel text-xs sm:text-sm text-[#FFD400] truncate arcade-text-shadow">
                {card.sender}
              </div>
              <div className="font-vt text-xl sm:text-2xl text-white/90 truncate leading-none mt-1">
                {card.role}
              </div>
            </div>

            {activeDir && (
              <div className="px-3 py-1 rounded font-pixel text-[9px] sm:text-[10px] uppercase border-2 bg-[#7CD1CF] border-[#0B1020] text-[#0B1020]">
                {activeDir === 'left' ? '◀ OPCIÓN A' : 'OPCIÓN B ▶'}
              </div>
            )}
          </div>

          {/* Dilemma Title & Narrative */}
          <h2 className="font-pixel text-sm sm:text-base text-white mb-2 leading-snug arcade-text-shadow">
            {card.title}
          </h2>
          <p className="font-vt text-2xl sm:text-[25px] text-white leading-snug mb-4">
            {card.description}
          </p>

          {/* Botones Únicos de Decisión dentro de la Tarjeta (Colores Simétricos y Neutros) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              data-choice-btn="true"
              disabled={isAnimating}
              onMouseEnter={() => !isAnimating && onPreviewChange('left')}
              onMouseLeave={() => !isAnimating && onPreviewChange(null)}
              onFocus={() => !isAnimating && onPreviewChange('left')}
              onBlur={() => !isAnimating && onPreviewChange(null)}
              onClick={() => !isAnimating && onConfirmDecision('left')}
              className={`pixel-box rounded-xl p-3 sm:p-4 border-4 transition-all text-left cursor-pointer flex flex-col justify-between ${
                activeDir === 'left'
                  ? 'bg-[#7CD1CF] border-white text-[#0B1020] scale-[1.02]'
                  : 'bg-[#192853] hover:bg-[#22356F] border-white/80 text-white'
              }`}
            >
              <div
                className={`font-pixel text-[9px] sm:text-[10px] uppercase mb-1 flex items-center gap-1.5 ${
                  activeDir === 'left' ? 'text-[#0B1020]' : 'text-[#7CD1CF]'
                }`}
              >
                <span>◀</span>
                <span>OPCIÓN IZQUIERDA</span>
              </div>
              <div className="font-vt text-xl sm:text-2xl font-bold leading-tight">
                {card.left.label}
              </div>
            </button>

            <button
              type="button"
              data-choice-btn="true"
              disabled={isAnimating}
              onMouseEnter={() => !isAnimating && onPreviewChange('right')}
              onMouseLeave={() => !isAnimating && onPreviewChange(null)}
              onFocus={() => !isAnimating && onPreviewChange('right')}
              onBlur={() => !isAnimating && onPreviewChange(null)}
              onClick={() => !isAnimating && onConfirmDecision('right')}
              className={`pixel-box rounded-xl p-3 sm:p-4 border-4 transition-all text-left sm:text-right cursor-pointer flex flex-col justify-between ${
                activeDir === 'right'
                  ? 'bg-[#7CD1CF] border-white text-[#0B1020] scale-[1.02]'
                  : 'bg-[#192853] hover:bg-[#22356F] border-white/80 text-white'
              }`}
            >
              <div
                className={`font-pixel text-[9px] sm:text-[10px] uppercase mb-1 flex items-center sm:justify-end gap-1.5 ${
                  activeDir === 'right' ? 'text-[#0B1020]' : 'text-[#7CD1CF]'
                }`}
              >
                <span>OPCIÓN DERECHA</span>
                <span>▶</span>
              </div>
              <div className="font-vt text-xl sm:text-2xl font-bold leading-tight">
                {card.right.label}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* PANEL DE RADAR LATERAL DERECHO (Desktop) */}
      {gameState.radarActiveForTurn && rightSim && (
        <div className="hidden lg:block">
          <RadarSidePanel
            side="right"
            title="OPCIÓN DER"
            optionLabel={card.right.label}
            sim={rightSim}
            isHighlighted={activeDir === 'right'}
            onSelect={() => !isAnimating && onConfirmDecision('right')}
          />
        </div>
      )}

      {/* PANELES DE RADAR PARA PANTALLAS PEQUEÑAS / TABLETS (< lg) */}
      {gameState.radarActiveForTurn && leftSim && rightSim && (
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-xl lg:hidden">
          <RadarSidePanel
            side="left"
            title="IZQ"
            optionLabel={card.left.label}
            sim={leftSim}
            isHighlighted={activeDir === 'left'}
            onSelect={() => !isAnimating && onConfirmDecision('left')}
          />
          <RadarSidePanel
            side="right"
            title="DER"
            optionLabel={card.right.label}
            sim={rightSim}
            isHighlighted={activeDir === 'right'}
            onSelect={() => !isAnimating && onConfirmDecision('right')}
          />
        </div>
      )}
    </div>
  );
}
