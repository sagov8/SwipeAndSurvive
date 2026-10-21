import React from 'react';

/**
 * Ilustraciones Pixel Art temáticas para las tarjetas de AgroCafé Colombiano S.A.S.
 * Cero dependencias externas ni imágenes rotas: 100% SVG vectorial retro con animaciones CRT.
 */
export default function CardIllustration({ card }) {
  if (!card) return null;

  const id = card.id;
  const cat = card.category;

  // Renderiza escena según temática de la tarjeta
  const renderScene = () => {
    // 1. Tostadora industrial / Fuego / Falla / Robot o Máquina averiada con humo
    if (id === 'INT_01' || id === 'DEBT_01') {
      const isDamaged = id === 'DEBT_01';
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          {/* Fondo de planta */}
          <rect x="0" y="0" width="160" height="80" fill="#0A1828" />

          {/* Silueta de robot / máquina torrefactora industrial */}
          {/* Base y cuerpo de la máquina */}
          <rect x="52" y="38" width="56" height="34" rx="2" fill="#18314A" stroke="#36E2F8" strokeWidth="2" />
          
          {/* Cabeza / Unidad de control tipo robot */}
          <rect x="64" y="16" width="32" height="22" rx="3" fill="#24486E" stroke="#FFFFFF" strokeWidth="2" />
          {/* Antena / Sensor */}
          <line x1="80" y1="16" x2="80" y2="8" stroke="#36E2F8" strokeWidth="2" />
          <circle cx="80" cy="7" r="3" fill={isDamaged ? '#E53945' : '#FFD400'} className={isDamaged ? 'animate-ping' : ''} />

          {/* Ojos / Visor digital del robot/máquina */}
          {isDamaged ? (
            /* Ojos en X por avería */
            <>
              <line x1="70" y1="23" x2="76" y2="29" stroke="#E53945" strokeWidth="2" />
              <line x1="76" y1="23" x2="70" y2="29" stroke="#E53945" strokeWidth="2" />
              <line x1="84" y1="23" x2="90" y2="29" stroke="#E53945" strokeWidth="2" />
              <line x1="90" y1="23" x2="84" y2="29" stroke="#E53945" strokeWidth="2" />
            </>
          ) : (
            /* Visor con lectura de temperatura parpadeante */
            <>
              <rect x="69" y="24" width="8" height="4" fill="#FFD400" className="animate-pulse" />
              <rect x="83" y="24" width="8" height="4" fill="#FFD400" className="animate-pulse" />
            </>
          )}

          {/* Tubos de escape / Chimeneas laterales */}
          <rect x="42" y="24" width="10" height="24" fill="#1B334D" stroke="#36E2F8" strokeWidth="1.5" />
          <rect x="108" y="24" width="10" height="24" fill="#1B334D" stroke="#36E2F8" strokeWidth="1.5" />

          {/* NUBES DE HUMO Y CHISPAS EN ANIMACIÓN */}
          {/* Humo chimenea izquierda */}
          <circle cx="45" cy="16" r="6" fill="#8898AA" opacity="0.8" className="animate-bounce" />
          <circle cx="40" cy="8" r="8" fill="#5A6E82" opacity="0.6" className="animate-pulse" />
          {/* Humo chimenea derecha */}
          <circle cx="115" cy="14" r="7" fill="#8898AA" opacity="0.8" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
          <circle cx="120" cy="6" r="9" fill="#5A6E82" opacity="0.6" className="animate-pulse" />

          {/* Chispas de falla */}
          <circle cx="74" cy="46" r="2.5" fill="#FFD400" className="animate-ping" />
          <circle cx="86" cy="52" r="2" fill="#E53945" className="animate-ping" style={{ animationDelay: '0.3s' }} />

          {/* Parrilla frontal de ventilación */}
          <line x1="60" y1="52" x2="100" y2="52" stroke="#0B1020" strokeWidth="2" />
          <line x1="60" y1="58" x2="100" y2="58" stroke="#0B1020" strokeWidth="2" />
          <line x1="60" y1="64" x2="100" y2="64" stroke="#0B1020" strokeWidth="2" />

          {/* Etiqueta inferior */}
          <text x="80" y="77" textAnchor="middle" fill={isDamaged ? '#FF6478' : '#FFD400'} fontFamily="'Press Start 2P'" fontSize="6">
            {isDamaged ? 'AVARÍA INDUSTRIAL' : 'QUEMADORES CON HUMO'}
          </text>
        </svg>
      );
    }

    // 2. Personal, trabajadores, turno extra, cese
    if (id === 'INT_02' || id === 'DEBT_02' || id === 'INT_06' || id === 'INT_13' || card.department === 'TALENTO') {
      const isStrike = id === 'DEBT_02';
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#0A1C2A" />
          {/* Suelo */}
          <rect x="0" y="65" width="160" height="15" fill="#122A3E" />
          {/* Trabajadores 8-bit */}
          {[35, 65, 95, 125].map((x, idx) => (
            <g key={idx} transform={`translate(${x - 10}, 20)`}>
              {/* Cabeza / Gorro cafetero */}
              <rect x="6" y="2" width="8" height="7" fill={idx === 1 ? '#FFD400' : '#E0A96D'} />
              <rect x="4" y="0" width="12" height="3" fill="#3D2314" />
              {/* Cuerpo / Overol */}
              <rect x="4" y="9" width="12" height="16" fill={idx % 2 === 0 ? '#42F58B' : '#36E2F8'} />
              <rect x="2" y="11" width="3" height="10" fill="#E0A96D" />
              <rect x="15" y="11" width="3" height="10" fill="#E0A96D" />
              {/* Piernas */}
              <rect x="5" y="25" width="4" height="12" fill="#1A2744" />
              <rect x="11" y="25" width="4" height="12" fill="#1A2744" />
            </g>
          ))}
          {/* Cartel de huelga o badge de 80 trabajadores */}
          {isStrike ? (
            <g transform="translate(50, 8)">
              <rect x="0" y="0" width="60" height="16" fill="#E53945" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="30" y="12" textAnchor="middle" fill="#FFFFFF" fontFamily="'Press Start 2P'" fontSize="7">PARO PLANTA</text>
            </g>
          ) : (
            <g transform="translate(42, 6)">
              <rect x="0" y="0" width="76" height="14" fill="#0D2742" stroke="#42F58B" strokeWidth="1.5" />
              <text x="38" y="10" textAnchor="middle" fill="#42F58B" fontFamily="'Press Start 2P'" fontSize="6">80 OPERARIOS</text>
            </g>
          )}
        </svg>
      );
    }

    // 3. Café Pergamino, granos, humedad, laboratorio de catación
    if (id === 'INT_03' || id === 'DEBT_03' || id === 'INT_11') {
      const isRotten = id === 'DEBT_03';
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#1A130C" />
          {/* Mesa de catación o costal */}
          <rect x="30" y="42" width="100" height="30" rx="3" fill="#3D2817" stroke="#9A6B3D" strokeWidth="2" />
          {/* Taza de catación */}
          <rect x="70" y="28" width="20" height="16" rx="2" fill="#FFFFFF" stroke="#0B1020" strokeWidth="1.5" />
          <rect x="90" y="32" width="5" height="8" rx="2" fill="#FFFFFF" stroke="#0B1020" strokeWidth="1" />
          <ellipse cx="80" cy="31" rx="8" ry="3" fill={isRotten ? '#3B6E32' : '#5A3219'} />
          {/* Granos de café */}
          {[45, 56, 105, 116].map((x, i) => (
            <ellipse key={i} cx={x} cy="52" rx="5" ry="3" fill={isRotten ? '#4D6B3C' : '#8B5A2B'} stroke="#2E1C0C" strokeWidth="1" transform={`rotate(${i * 20} ${x} 52)`} />
          ))}
          {/* Vapor / Microorganismos */}
          <path d="M76 22 Q78 16 75 12" stroke={isRotten ? '#7CD1CF' : '#FFFFFF'} strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
          <path d="M84 22 Q82 16 85 12" stroke={isRotten ? '#7CD1CF' : '#FFFFFF'} strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
          <text x="80" y="68" textAnchor="middle" fill={isRotten ? '#FF8A93' : '#FFD400'} fontFamily="'Press Start 2P'" fontSize="6">
            {isRotten ? 'LOTE DEFECTUOSO' : 'CATACIÓN & CALIDAD'}
          </text>
        </svg>
      );
    }

    // 4. Transporte, camión, fletes, Vía Panamericana, derrumbes
    if (id === 'INT_04' || id === 'DEBT_04' || id === 'INT_08' || id === 'ENV_Q10' || card.department === 'LOGISTICA') {
      const isBlocked = id === 'ENV_Q10' || id === 'DEBT_04';
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#0C1D2A" />
          {/* Montañas del Cauca al fondo */}
          <polygon points="0,50 35,22 70,50" fill="#13364B" />
          <polygon points="50,50 95,16 140,50" fill="#1B4965" />
          <polygon points="110,50 145,26 160,50" fill="#13364B" />
          {/* Carretera Panamericana */}
          <rect x="0" y="52" width="160" height="28" fill="#222B35" />
          <line x1="0" y1="66" x2="160" y2="66" stroke="#FFD400" strokeWidth="2" strokeDasharray="8 6" />
          {/* Camión de reparto */}
          <g transform={`translate(${isBlocked ? '30' : '65'}, 34)`}>
            <rect x="0" y="4" width="38" height="20" fill="#7CD1CF" stroke="#0B1020" strokeWidth="1.5" />
            <text x="19" y="16" textAnchor="middle" fill="#0B1020" fontFamily="'Press Start 2P'" fontSize="4">AGROCAFÉ</text>
            <rect x="38" y="10" width="14" height="14" fill="#FFD400" stroke="#0B1020" strokeWidth="1.5" />
            <circle cx="10" cy="24" r="4" fill="#0B1020" />
            <circle cx="28" cy="24" r="4" fill="#0B1020" />
            <circle cx="46" cy="24" r="4" fill="#0B1020" />
          </g>
          {/* Derrumbe / Bloqueo en Panamericana */}
          {isBlocked && (
            <g transform="translate(95, 36)">
              <polygon points="10,26 22,10 34,26" fill="#8B5A2B" stroke="#0B1020" strokeWidth="1.5" />
              <polygon points="26,26 38,14 48,26" fill="#6B4423" />
              <text x="28" y="8" textAnchor="middle" fill="#E53945" fontFamily="'Press Start 2P'" fontSize="6">¡VÍA CERRADA!</text>
            </g>
          )}
        </svg>
      );
    }

    // 5. Comercial, ventas, supermercados, viral, premios
    if (id === 'INT_05' || id === 'DEBT_05' || id === 'INT_09' || id === 'INT_14' || id === 'ENV_Q05' || card.department === 'COMERCIAL') {
      const isViral = id === 'ENV_Q05';
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#1C182B" />
          {/* Mostrador o estante */}
          <rect x="25" y="48" width="110" height="24" fill="#2E244A" stroke="#7CD1CF" strokeWidth="1.5" />
          {/* Paquetes de café empacado */}
          {[38, 62, 86, 110].map((x, idx) => (
            <g key={idx} transform={`translate(${x}, 24)`}>
              <rect x="0" y="0" width="14" height="24" rx="2" fill={idx === 1 ? '#FFD400' : '#E53945'} stroke="#FFFFFF" strokeWidth="1.2" />
              <rect x="3" y="6" width="8" height="6" fill="#1A2844" />
              <circle cx="7" cy="17" r="2" fill="#7CD1CF" />
            </g>
          ))}
          {/* Trofeo / Estrellas si es premio */}
          {isViral ? (
            <g transform="translate(68, 5)">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#FFD400" className="animate-bounce" />
              <text x="12" y="27" textAnchor="middle" fill="#FFD400" fontFamily="'Press Start 2P'" fontSize="5">PREMIO ORO</text>
            </g>
          ) : (
            <text x="80" y="16" textAnchor="middle" fill="#7CD1CF" fontFamily="'Press Start 2P'" fontSize="6">CANALES &amp; SUPERMERCADOS</text>
          )}
        </svg>
      );
    }

    // 6. Finanzas, presupuesto, caja, inversión
    if (id === 'INT_07' || id === 'INT_12' || card.department === 'FINANZAS') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#0D251C" />
          {/* Gráfico de barras ascendente */}
          <rect x="30" y="48" width="14" height="22" fill="#2E7D32" stroke="#42F58B" strokeWidth="1" />
          <rect x="52" y="36" width="14" height="34" fill="#2E7D32" stroke="#42F58B" strokeWidth="1" />
          <rect x="74" y="26" width="14" height="44" fill="#FFD400" stroke="#FFFFFF" strokeWidth="1" />
          <rect x="96" y="18" width="14" height="52" fill="#42F58B" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Bolsa de dinero / Monedas */}
          <g transform="translate(120, 32)">
            <circle cx="12" cy="14" r="10" fill="#FFD400" stroke="#0B1020" strokeWidth="1.5" />
            <text x="12" y="18" textAnchor="middle" fill="#0B1020" fontFamily="'Press Start 2P'" fontSize="10">$</text>
          </g>
          <text x="80" y="12" textAnchor="middle" fill="#42F58B" fontFamily="'Press Start 2P'" fontSize="6">LIQUIDEZ &amp; FLUJO DE CAJA</text>
        </svg>
      );
    }

    // 7. Crisis climática / Roya / Lluvia (ENV_Q15)
    if (id === 'ENV_Q15') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#0F2433" />
          {/* Nubes de tormenta */}
          <ellipse cx="60" cy="20" rx="30" ry="12" fill="#486581" />
          <ellipse cx="100" cy="18" rx="35" ry="14" fill="#334E68" />
          {/* Rayos y gotas de lluvia */}
          {[35, 55, 75, 95, 115, 135].map((x, idx) => (
            <line key={idx} x1={x} y1="36" x2={x - 6} y2="52" stroke="#7CD1CF" strokeWidth="2" strokeDasharray="3 3" className="animate-pulse" />
          ))}
          {/* Cafetal afectado */}
          <g transform="translate(68, 52)">
            <line x1="12" y1="20" x2="12" y2="4" stroke="#5A3A1A" strokeWidth="3" />
            <circle cx="8" cy="8" r="6" fill="#8B4513" />
            <circle cx="16" cy="6" r="5" fill="#A0522D" />
          </g>
          <text x="80" y="74" textAnchor="middle" fill="#FF8A93" fontFamily="'Press Start 2P'" fontSize="6">OLA INVERNAL &amp; ROYA</text>
        </svg>
      );
    }

    // 8. Sostenibilidad, sello verde, empaque biodegradable (ENV_Q19)
    if (id === 'ENV_Q19') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#0E2B1E" />
          {/* Hoja ecológica / Sello verde */}
          <g transform="translate(65, 14)">
            <circle cx="15" cy="18" r="20" fill="#1B4D3E" stroke="#42F58B" strokeWidth="2" />
            <path d="M15 8 C25 8 25 24 15 28 C5 24 5 8 15 8 Z" fill="#42F58B" />
            <line x1="15" y1="12" x2="15" y2="26" stroke="#0E2B1E" strokeWidth="1.5" />
          </g>
          <text x="80" y="66" textAnchor="middle" fill="#42F58B" fontFamily="'Press Start 2P'" fontSize="6">SELLO VERDE &amp; BIOPACK</text>
        </svg>
      );
    }

    // 9. Minga Indígena y Cierre Entrada Norte Popayán (ENV_CAUCA_01)
    if (id === 'ENV_CAUCA_01') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#1C1412" />
          {/* Carretera Panamericana */}
          <rect x="0" y="52" width="160" height="28" fill="#29201C" />
          <line x1="0" y1="66" x2="160" y2="66" stroke="#FFD400" strokeWidth="2" strokeDasharray="6 6" />
          {/* Barricada / Troncos y bandera */}
          <rect x="45" y="44" width="70" height="10" fill="#8B4513" stroke="#0B1020" strokeWidth="1.5" />
          <rect x="52" y="36" width="56" height="8" fill="#A0522D" stroke="#0B1020" strokeWidth="1.5" />
          {/* Bastón de mando / Bandera de la Guardia */}
          <line x1="72" y1="14" x2="72" y2="44" stroke="#D2B48C" strokeWidth="2" />
          <polygon points="72,14 88,18 72,24" fill="#42F58B" stroke="#0B1020" strokeWidth="1" />
          <polygon points="72,24 88,28 72,34" fill="#E53945" stroke="#0B1020" strokeWidth="1" />
          <text x="80" y="10" textAnchor="middle" fill="#FFD400" fontFamily="'Press Start 2P'" fontSize="6">MINGA INDÍGENA</text>
          <text x="80" y="76" textAnchor="middle" fill="#FF8A93" fontFamily="'Press Start 2P'" fontSize="5">VARIANTE NORTE CERRADA</text>
        </svg>
      );
    }

    // 10. Alza TRM y Especulación en Bolsa NY (ENV_CAUCA_02)
    if (id === 'ENV_CAUCA_02') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#0E1B26" />
          {/* Ticker y velas alcistas */}
          <line x1="20" y1="60" x2="140" y2="60" stroke="#1F3C55" strokeWidth="1.5" />
          <line x1="30" y1="55" x2="30" y2="35" stroke="#42F58B" strokeWidth="1.5" />
          <rect x="26" y="40" width="8" height="12" fill="#42F58B" />
          <line x1="55" y1="52" x2="55" y2="28" stroke="#42F58B" strokeWidth="1.5" />
          <rect x="51" y="32" width="8" height="15" fill="#42F58B" />
          <line x1="80" y1="45" x2="80" y2="18" stroke="#FFD400" strokeWidth="1.5" />
          <rect x="76" y="22" width="8" height="18" fill="#FFD400" />
          <line x1="105" y1="38" x2="105" y2="12" stroke="#42F58B" strokeWidth="1.5" />
          <rect x="101" y="14" width="8" height="20" fill="#42F58B" />
          {/* Símbolo Dólar parpadeante */}
          <g transform="translate(126, 12)">
            <circle cx="12" cy="12" r="10" fill="#FFD400" stroke="#0B1020" strokeWidth="1.5" className="animate-pulse" />
            <text x="12" y="16" textAnchor="middle" fill="#0B1020" fontFamily="'Press Start 2P'" fontSize="9">$</text>
          </g>
          <text x="80" y="74" textAnchor="middle" fill="#FFD400" fontFamily="'Press Start 2P'" fontSize="6">ALZA TRM &amp; BOLSA NY</text>
        </svg>
      );
    }

    // 11. Falla Eléctrica y Racionamiento en Popayán (ENV_CAUCA_03)
    if (id === 'ENV_CAUCA_03') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#080C14" />
          {/* Poste eléctrico averiado */}
          <line x1="45" y1="70" x2="45" y2="20" stroke="#486581" strokeWidth="3" />
          <line x1="30" y1="26" x2="60" y2="26" stroke="#486581" strokeWidth="2.5" />
          <line x1="45" y1="26" x2="85" y2="52" stroke="#FF6478" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Rayo de cortocircuito */}
          <polygon points="88,14 78,34 86,34 76,54 98,30 88,30" fill="#FFD400" stroke="#E53945" strokeWidth="1.5" className="animate-ping" />
          <text x="80" y="72" textAnchor="middle" fill="#FF6478" fontFamily="'Press Start 2P'" fontSize="6">APAGÓN EN PLANTA (CEO)</text>
        </svg>
      );
    }

    // 12. Paro Camionero Puerto de Buenaventura (ENV_CAUCA_04)
    if (id === 'ENV_CAUCA_04') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#12202E" />
          {/* Contenedores apilados en puerto */}
          <rect x="18" y="22" width="36" height="22" fill="#E53945" stroke="#FFFFFF" strokeWidth="1.2" />
          <rect x="18" y="44" width="36" height="22" fill="#246A9A" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Camión detenido */}
          <rect x="65" y="38" width="45" height="26" fill="#FFD400" stroke="#0B1020" strokeWidth="1.5" />
          <rect x="110" y="46" width="18" height="18" fill="#7CD1CF" stroke="#0B1020" strokeWidth="1.5" />
          <circle cx="80" cy="65" r="5" fill="#0B1020" />
          <circle cx="100" cy="65" r="5" fill="#0B1020" />
          <circle cx="120" cy="65" r="5" fill="#0B1020" />
          {/* Señal de bloqueo */}
          <text x="80" y="14" textAnchor="middle" fill="#FF6478" fontFamily="'Press Start 2P'" fontSize="6">PARO A BUENAVENTURA</text>
          <text x="80" y="76" textAnchor="middle" fill="#FFD400" fontFamily="'Press Start 2P'" fontSize="5">RUTAS Y PUERTO BLOQUEADOS</text>
        </svg>
      );
    }

    // 13. Auditoría Tributaria DIAN (ENV_CAUCA_05)
    if (id === 'ENV_CAUCA_05') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#1B1424" />
          {/* Carpeta y formulario fiscal */}
          <rect x="52" y="16" width="56" height="50" rx="3" fill="#F4F4F9" stroke="#0B1020" strokeWidth="2" />
          {/* Líneas de texto del acta */}
          <line x1="60" y1="26" x2="98" y2="26" stroke="#243870" strokeWidth="2" />
          <line x1="60" y1="34" x2="94" y2="34" stroke="#8898AA" strokeWidth="1.5" />
          <line x1="60" y1="42" x2="90" y2="42" stroke="#8898AA" strokeWidth="1.5" />
          {/* Sello oficial DIAN */}
          <circle cx="88" cy="50" r="10" fill="#E53945" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="88" y="53" textAnchor="middle" fill="#FFFFFF" fontFamily="'Press Start 2P'" fontSize="5">DIAN</text>
          <text x="80" y="12" textAnchor="middle" fill="#FF8A93" fontFamily="'Press Start 2P'" fontSize="6">AUDITORÍA FISCAL RURAL</text>
          <text x="80" y="74" textAnchor="middle" fill="#FFD400" fontFamily="'Press Start 2P'" fontSize="5">COMPRAS EN VEREDAS</text>
        </svg>
      );
    }

    // 14. Escasez de Recolectores en el Macizo Caucano (ENV_CAUCA_06)
    if (id === 'ENV_CAUCA_06') {
      return (
        <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
          <rect x="0" y="0" width="160" height="80" fill="#142618" />
          {/* Pendientes montañosas del Macizo */}
          <polygon points="0,60 40,26 90,65" fill="#1E4024" />
          <polygon points="60,65 110,20 160,60" fill="#295430" />
          {/* Cafetos cargados de cerezas rojas */}
          <g transform="translate(68, 30)">
            <line x1="12" y1="30" x2="12" y2="10" stroke="#5A3A1A" strokeWidth="3" />
            <circle cx="6" cy="14" r="5" fill="#E53945" className="animate-pulse" />
            <circle cx="18" cy="12" r="5" fill="#E53945" className="animate-pulse" />
            <circle cx="12" cy="6" r="5" fill="#E53945" />
            <circle cx="6" cy="22" r="4" fill="#8B0000" />
            <circle cx="18" cy="20" r="4" fill="#8B0000" />
          </g>
          {/* Canasta vacía en el suelo */}
          <rect x="100" y="48" width="16" height="12" rx="2" fill="#8B5A2B" stroke="#0B1020" strokeWidth="1" />
          <text x="80" y="14" textAnchor="middle" fill="#FFD400" fontFamily="'Press Start 2P'" fontSize="6">ESCASEZ RECOLECTORES</text>
          <text x="80" y="74" textAnchor="middle" fill="#FF8A93" fontFamily="'Press Start 2P'" fontSize="5">MACIZO CAUCANO EN PICO</text>
        </svg>
      );
    }

    // 15. Dirección Estratégica / Plan Maestro / ERP / Neguentropía
    return (
      <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
        <rect x="0" y="0" width="160" height="80" fill="#0C1F38" />
        {/* Red de interconexión de áreas */}
        <circle cx="80" cy="40" r="18" fill="#193557" stroke="#FFD400" strokeWidth="2" />
        <circle cx="40" cy="25" r="9" fill="#132B47" stroke="#42F58B" strokeWidth="1.5" />
        <circle cx="120" cy="25" r="9" fill="#132B47" stroke="#7CD1CF" strokeWidth="1.5" />
        <circle cx="50" cy="62" r="9" fill="#132B47" stroke="#FF6478" strokeWidth="1.5" />
        <circle cx="110" cy="62" r="9" fill="#132B47" stroke="#FFD400" strokeWidth="1.5" />
        {/* Líneas de enlace */}
        <line x1="48" y1="28" x2="65" y2="35" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="112" y1="28" x2="95" y2="35" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="58" y1="58" x2="68" y2="48" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="102" y1="58" x2="92" y2="48" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 2" />
        <text x="80" y="44" textAnchor="middle" fill="#FFD400" fontFamily="'Press Start 2P'" fontSize="6">POPAYÁN</text>
        <text x="80" y="14" textAnchor="middle" fill="#7CD1CF" fontFamily="'Press Start 2P'" fontSize="6">DIRECCIÓN INTEGRAL</text>
      </svg>
    );
  };

  return (
    <div className="w-full h-10 sm:h-14 md:h-18 rounded-lg sm:rounded-xl border-2 border-white/50 bg-[#08182B] overflow-hidden my-0.5 sm:my-1 relative shadow-inner">
      {/* Marco de pantalla miniatura CRT */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-repeat bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
      {renderScene()}
    </div>
  );
}
