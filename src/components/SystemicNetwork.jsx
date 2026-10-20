import React from 'react';

/**
 * Red Sistémica SVG + CSS ("La Empresa Respira") adaptada a pantalla CRT Arcade
 * - En Homeostasis (barras entre 35% y 75%), el núcleo pulsa suavemente a 0.5 Hz.
 * - En Sobrecarga o Peligro (alguna barra < 20% o desincronización R1 activa), el pulso se acelera
 *   a 2.2 Hz en rojo (#E53945) y las líneas entre los departamentos afectados disparan destellos animados.
 */
export default function SystemicNetwork({ metrics, activeDominoLinks = [] }) {
  const { liquidity, morale, demand, tech } = metrics;

  const isOverloadR1 = demand >= 80 && (tech <= 35 || morale <= 35);
  const isCriticalLow = [liquidity, morale, demand, tech].some((v) => v < 20);
  const isBrainDrain = morale <= 25;
  const isDangerState = isOverloadR1 || isCriticalLow || isBrainDrain;

  const isHomeostasis = [liquidity, morale, demand, tech].every((v) => v >= 35 && v <= 75);
  const isSynergy = [liquidity, morale, demand, tech].every((v) => v >= 45 && v <= 75);

  const coreColor = isDangerState
    ? '#E53945'
    : isSynergy
    ? '#FFD400'
    : isHomeostasis
    ? '#42F58B'
    : '#7CD1CF';

  const pulseClass = isDangerState ? 'animate-overload' : 'animate-homeostasis';

  const demandTechHighlighted =
    isOverloadR1 || activeDominoLinks.includes('DEMAND_TECH');
  const hrTechHighlighted =
    isBrainDrain || activeDominoLinks.includes('HR_TECH');
  const synergyHighlighted =
    isSynergy || activeDominoLinks.includes('ALL_SYNERGY');

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-45 z-0">
      {/* Estrellas Pixel Art del Fondo CRT */}
      <div className="w-2 h-2 bg-white/70 absolute top-14 left-12" />
      <div className="w-2 h-2 bg-[#FFD400]/80 absolute top-24 right-16" />
      <div className="w-1.5 h-1.5 bg-white/60 absolute bottom-24 left-20" />
      <div className="w-2 h-2 bg-white/70 absolute bottom-16 right-14" />

      <svg
        viewBox="0 0 600 420"
        className="w-full h-full max-w-4xl max-h-[500px]"
        aria-hidden="true"
      >
        {/* Anillos octagonales/rectangulares retro y orbitales */}
        <circle
          cx="300"
          cy="210"
          r="150"
          fill="none"
          stroke={coreColor}
          strokeOpacity="0.35"
          strokeWidth="2.5"
          strokeDasharray="8 8"
        />
        <circle
          cx="300"
          cy="210"
          r="105"
          fill="none"
          stroke={coreColor}
          strokeOpacity="0.45"
          strokeWidth="2"
        />

        {/* Enlaces Interdepartamentales */}
        {/* Finanzas (110,75) <-> RRHH (490,75) */}
        <line
          x1="110"
          y1="75"
          x2="490"
          y2="75"
          stroke={synergyHighlighted ? '#FFD400' : 'rgba(255,255,255,0.35)'}
          strokeWidth={synergyHighlighted ? '3.5' : '2'}
          className={synergyHighlighted ? 'animate-domino-line' : ''}
        />

        {/* Clientes/Demanda (110,345) <-> TI/Capacidad (490,345) [Enlace crítico Bucle R1] */}
        <line
          x1="110"
          y1="345"
          x2="490"
          y2="345"
          stroke={
            demandTechHighlighted
              ? '#E53945'
              : synergyHighlighted
              ? '#FFD400'
              : 'rgba(255,255,255,0.4)'
          }
          strokeWidth={demandTechHighlighted ? '5' : '2.5'}
          className={demandTechHighlighted || synergyHighlighted ? 'animate-domino-line' : ''}
        />

        {/* RRHH/Clima (490,75) <-> TI/Capacidad (490,345) [Enlace Fuga de Cerebros] */}
        <line
          x1="490"
          y1="75"
          x2="490"
          y2="345"
          stroke={
            hrTechHighlighted
              ? '#E53945'
              : synergyHighlighted
              ? '#FFD400'
              : 'rgba(255,255,255,0.4)'
          }
          strokeWidth={hrTechHighlighted ? '5' : '2.5'}
          className={hrTechHighlighted || synergyHighlighted ? 'animate-domino-line' : ''}
        />

        {/* Finanzas (110,75) <-> Clientes (110,345) */}
        <line
          x1="110"
          y1="75"
          x2="110"
          y2="345"
          stroke={
            demandTechHighlighted
              ? '#E53945'
              : synergyHighlighted
              ? '#FFD400'
              : 'rgba(255,255,255,0.35)'
          }
          strokeWidth={demandTechHighlighted ? '4' : '2'}
          className={demandTechHighlighted || synergyHighlighted ? 'animate-domino-line' : ''}
        />

        {/* Líneas desde los 4 nodos hacia el Núcleo Central (300,210) */}
        {[
          { x: 110, y: 75, active: demandTechHighlighted },
          { x: 490, y: 75, active: hrTechHighlighted },
          { x: 110, y: 345, active: demandTechHighlighted },
          { x: 490, y: 345, active: demandTechHighlighted || hrTechHighlighted },
        ].map((node, i) => (
          <line
            key={i}
            x1={node.x}
            y1={node.y}
            x2="300"
            y2="210"
            stroke={node.active ? '#E53945' : coreColor}
            strokeOpacity={node.active ? '0.95' : '0.5'}
            strokeWidth={node.active ? '4' : '2.2'}
            className={node.active || synergyHighlighted ? 'animate-domino-line' : ''}
          />
        ))}

        {/* Núcleo Central NEXUS */}
        <g className={pulseClass}>
          <rect
            x="256"
            y="166"
            width="88"
            height="88"
            rx="12"
            fill="#0B1E33"
            stroke={coreColor}
            strokeWidth="4"
          />
          <text
            x="300"
            y="212"
            textAnchor="middle"
            fill={coreColor}
            fontSize="8.5"
            fontFamily="'Press Start 2P', monospace"
          >
            DIRECCIÓN
          </text>
          <text
            x="300"
            y="226"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="7"
            fontFamily="'Press Start 2P', monospace"
          >
            POPAYÁN
          </text>
        </g>

        {/* Nodos de los Subsistemas */}
        {[
          { x: 110, y: 75, label: `FIN ${liquidity}%`, alert: liquidity < 25 },
          { x: 490, y: 75, label: `TH ${morale}%`, alert: morale <= 25 },
          { x: 110, y: 345, label: `COM ${demand}%`, alert: demandTechHighlighted || demand < 25 },
          {
            x: 490,
            y: 345,
            label: `OPE ${tech}%`,
            alert: demandTechHighlighted || hrTechHighlighted || tech < 25,
          },
        ].map((n, idx) => (
          <g key={idx}>
            <rect
              x={n.x - 36}
              y={n.y - 18}
              width="72"
              height="36"
              rx="6"
              fill="#0B1E33"
              stroke={n.alert ? '#E53945' : '#FFFFFF'}
              strokeWidth="3"
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fill={n.alert ? '#FF6478' : '#FFD400'}
              fontSize="8"
              fontFamily="'Press Start 2P', monospace"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
