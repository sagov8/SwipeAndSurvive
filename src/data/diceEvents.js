/**
 * Eventos Fortuitos del Dado de la Suerte (AgroCafé Colombiano S.A.S. - Popayán, Cauca)
 * Se desbloquea al alcanzar 1.200 puntos.
 * 6 resultados posibles con impactos en los 4 subsistemas organizacionales.
 */

export const DICE_EVENTS = [
  {
    face: 1,
    title: 'Clima Favorable en la Meseta de Popayán',
    icon: '🌦️',
    narrative:
      'Lluvias nocturnas y radiación solar calibrada en veredas de Cajibío y Piendamó generan una floración excepcional y granos de alta densidad.',
    effects: {
      liquidity: 6,
      morale: 4,
      demand: 8,
      tech: 14,
    },
    benefitType: 'POSITIVE',
    summary: 'Bonanza climática: +14% Operaciones, +8% Comercial, +6% Finanzas',
  },
  {
    face: 2,
    title: 'Alianza con Cabildos de Caldono y Morales',
    icon: '🤝',
    narrative:
      'Se firma un pacto de café especial de comercio justo con asociaciones indígenas y campesinas del norte del Cauca, elevando la moral de la empresa.',
    effects: {
      liquidity: -6,
      morale: 16,
      demand: 10,
      tech: 4,
    },
    benefitType: 'MIXED',
    summary: 'Comercio justo: +16% Talento, +10% Comercial, -6% Inversión en primas',
  },
  {
    face: 3,
    title: 'Endurecimiento Crediticio y Cartera Morosa',
    icon: '📉',
    narrative:
      'Entidades financieras de Popayán aumentan tasas de interés y varios clientes institucionales difieren pagos 60 días, apretando la tesorería.',
    effects: {
      liquidity: -16,
      morale: -4,
      demand: 0,
      tech: -6,
    },
    benefitType: 'NEGATIVE',
    summary: 'Apretón de liquidez: -16% Finanzas, -6% Operaciones, -4% Talento',
  },
  {
    face: 4,
    title: 'Alerta Fitosanitaria: Foco de Broca en Lotes Vecinos',
    icon: '🐛',
    narrative:
      'Fincas cafeteras de Timbío detectan foco de broca. AgroCafé debe fumigar y reforzar filtros biológicos de acopio de emergencia.',
    effects: {
      liquidity: -8,
      morale: -6,
      demand: -4,
      tech: -12,
    },
    benefitType: 'NEGATIVE',
    summary: 'Emergencia biológica: -12% Operaciones, -8% Finanzas, -6% Talento',
  },
  {
    face: 5,
    title: 'Tendencia Viral: El Mejor Café de Origen Caucano',
    icon: '☕',
    narrative:
      'Importantes baristas de Bogotá y Medellín publican reseñas entusiastas del café de Popayán. Los pedidos e-commerce y tiendas gourmet colapsan la web.',
    effects: {
      liquidity: 12,
      morale: 6,
      demand: 18,
      tech: -8,
    },
    benefitType: 'MIXED',
    summary: 'Furor comercial: +18% Comercial, +12% Finanzas, -8% Presión en planta',
  },
  {
    face: 6,
    title: 'Cooperación Internacional y Maquinaria Suiza',
    icon: '⚙️',
    narrative:
      'Un fondo internacional de desarrollo sostenible para el posconflicto en el Cauca dona despulpadora ecológica y clasificadora óptica para la planta.',
    effects: {
      liquidity: 8,
      morale: 10,
      demand: 4,
      tech: 18,
    },
    benefitType: 'POSITIVE',
    summary: 'Donación tecnológica: +18% Operaciones, +10% Talento, +8% Finanzas',
  },
];
