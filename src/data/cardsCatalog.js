/**
 * Catálogo Base de Tarjetas — SWIPE & SURVIVE: AGROCAFÉ COLOMBIANO S.A.S. (Popayán, Cauca)
 * 26 tarjetas estructuradas en 4 categorías y conectando los 6 subsistemas:
 *  - Dirección Estratégica
 *  - Producción y Operaciones
 *  - Finanzas
 *  - Talento Humano
 *  - Comercial y Mercadeo
 *  - Logística y Abastecimiento
 */

export const STRATEGY_PATHS = {
  AUTOMATIZACION: {
    id: 'AUTOMATIZACION',
    name: 'Modernización de Planta y Logística',
    subsystem: 'tech',
    subsystemLabel: '⚙️ Producción y Logística',
    badge: 'Operaciones / Trilla',
    description:
      'Optimiza tostadoras, empaque al vacío y rutas en el Cauca. Mitiga un 20% las caídas en Producción y Logística.',
  },
  CAPACITACION: {
    id: 'CAPACITACION',
    name: 'Bienestar y Escuela Cafetera',
    subsystem: 'morale',
    subsystemLabel: '👥 Talento Humano',
    badge: 'Personal / Operarios',
    description:
      'Capacita a los 80 trabajadores en barismo, seguridad y trabajo en equipo. Mitiga un 20% las caídas en Talento Humano.',
  },
  INNOVACION: {
    id: 'INNOVACION',
    name: 'Café Especial y Canales Digitales',
    subsystem: 'demand',
    subsystemLabel: '📈 Comercial y Mercadeo',
    badge: 'Ventas / Cafeterías',
    description:
      'Impulsa denominación de origen Cauca, supermercados y e-commerce. Mitiga un 20% las caídas en Comercial y Mercadeo.',
  },
  MEJORA_CONTINUA: {
    id: 'MEJORA_CONTINUA',
    name: 'Disciplina de Costos y Rentabilidad',
    subsystem: 'liquidity',
    subsystemLabel: '💰 Finanzas y Liquidez',
    badge: 'Finanzas / Caja',
    description:
      'Controla costos de pergamino, fletes e inventarios sin perder calidad. Mitiga un 20% las caídas en Finanzas.',
  },
};

export const CARDS_CATALOG = [
  // =========================================================================
  // 1. DILEMAS INTERNOS DE LOS 6 SUBSISTEMAS (14 TARJETAS)
  // =========================================================================
  {
    id: 'INT_01',
    category: 'INTERNAL',
    categoryLabel: 'Producción y Operaciones',
    tgsConcept: 'Desplazamiento del Problema vs. Mantenimiento Preventivo',
    sender: 'Ing. Camilo Mosquera',
    role: 'Jefe de Planta Torrefactora (Popayán)',
    department: 'PRODUCCION',
    avatarType: 'tech',
    title: 'Tostadora Industrial con Falla en Quemadores',
    description:
      'La tostadora principal en la planta de Popayán presenta lecturas irregulares de temperatura. Detenerla 2 días para mantenimiento retrasa despachos y cuesta dinero, pero seguir operando arriesga una avería mayor.',
    left: {
      label: 'Seguir tostando sin parar',
      effects: { liquidity: 8, morale: -4, demand: 4, tech: -5 },
      delayedEffect: {
        delay: 3,
        cardId: 'DEBT_01',
        reason: 'Mantenimiento de la tostadora omitido hace 3 trimestres',
      },
      causalSummary: 'Atajo reduccionista (+8% Liquidez hoy, pero siembra daño grave de planta en +3T)',
    },
    right: {
      label: 'Hacer mantenimiento preventivo',
      effects: { liquidity: -10, morale: 4, demand: -4, tech: 12 },
      causalSummary: 'Neguentropía técnica (-10% Finanzas → +12% Producción y Operaciones)',
    },
  },
  {
    id: 'INT_02',
    category: 'INTERNAL',
    categoryLabel: 'Talento Humano',
    tgsConcept: 'Subsistema Social vs. Presión Operativa',
    sender: 'Natalia Velasco',
    role: 'Coordinadora de Talento Humano (80 Empleados)',
    department: 'TALENTO',
    avatarType: 'hr',
    title: 'Turnos Dobles en Empaque por Pico de Pedidos',
    description:
      'Los operarios de trilla y empaque llevan dos semanas doblando turno. Finanzas sugiere aplazar el pago de recargos nocturnos para el próximo semestre y exigir otro fin de semana continuo.',
    left: {
      label: 'Exigir turno extra y aplazar pago',
      effects: { liquidity: 10, morale: -10, demand: 5, tech: 4 },
      delayedEffect: {
        delay: 3,
        cardId: 'DEBT_02',
        reason: 'Aplazamiento de horas extras y agotamiento de los operarios de planta',
      },
      causalSummary: 'Ahorro inmediato (+10% Caja, pero incuba Paro de Planta en +3 trimestres)',
    },
    right: {
      label: 'Pagar recargos y contratar apoyo temporal',
      effects: { liquidity: -8, morale: 14, demand: -3, tech: 5 },
      causalSummary: 'Equilibrio humano (-8% Finanzas → +14% Talento Humano y bienestar)',
    },
  },
  {
    id: 'INT_03',
    category: 'INTERNAL',
    categoryLabel: 'Comercial y Producción',
    tgsConcept: 'Rentabilidad Corto Plazo vs. Calidad del Café',
    sender: 'Andrés Collazos',
    role: 'Director Comercial y Mercadeo',
    department: 'COMERCIAL',
    avatarType: 'market',
    title: 'Lote de Café con Humedad Superior al 13%',
    description:
      'Un lote de pergamino llegó de las veredas con exceso de humedad por lluvias. Mezclarlo con grano seco para despachar ya a los supermercados ahorra costos hoy, pero baja la calidad en taza.',
    left: {
      label: 'Mezclar y despachar a supermercados',
      effects: { liquidity: 12, morale: -6, demand: 6, tech: -4 },
      delayedEffect: {
        delay: 3,
        cardId: 'DEBT_03',
        reason: 'Despacho de lote húmedo con defectos de fermentación',
      },
      causalSummary: 'Rentabilidad aparente (+12% Liquidez hoy; activa Devolución Masiva en +3T)',
    },
    right: {
      label: 'Reprocesar secado y asumir merma',
      effects: { liquidity: -11, morale: 5, demand: 4, tech: 8 },
      causalSummary: 'Protección del sello de calidad (-11% Finanzas → +8% Operaciones)',
    },
  },
  {
    id: 'INT_04',
    category: 'INTERNAL',
    categoryLabel: 'Logística y Abastecimiento',
    tgsConcept: 'Relación con Proveedores (Pequeños Caficultores)',
    sender: 'Don Hernando Muñoz',
    role: 'Jefe de Compras y Acopio Rural (Cauca)',
    department: 'LOGISTICA',
    avatarType: 'security',
    title: 'Alza en Fertilizantes y Precio a Caficultores',
    description:
      'Pequeños productores de Cajibío y Timbío piden una prima justa por carga ante el alza de insumos. Si pagamos por debajo del mercado ahorramos hoy, pero podrían venderle la cosecha a intermediarios.',
    left: {
      label: 'Congelar precio de compra y ahorrar',
      effects: { liquidity: 6, morale: 2, demand: 4, tech: -6 },
      delayedEffect: {
        delay: 3,
        cardId: 'DEBT_04',
        reason: 'Fuga de caficultores proveedores por bajos precios de compra',
      },
      causalSummary: 'Ahorro miope (provoca Desabastecimiento de Café Pergamino en +3T)',
    },
    right: {
      label: 'Garantizar prima de calidad y asistencia',
      effects: { liquidity: -9, morale: -3, demand: -4, tech: 14 },
      causalSummary: 'Alianza sostenible en el Cauca (-9% Finanzas → +14% Abastecimiento seguro)',
    },
  },
  {
    id: 'INT_05',
    category: 'INTERNAL',
    categoryLabel: 'Comercial vs. Logística',
    tgsConcept: 'Desincronización Ventas-Operación (Riesgo Bucle R1)',
    sender: 'Andrés Collazos',
    role: 'Director Comercial y Mercadeo',
    department: 'COMERCIAL',
    avatarType: 'market',
    title: 'Promoción Nacional en Cadenas de Supermercados',
    description:
      'Mercadeo quiere lanzar un "2x1 en Café Gourmet Popayán" en Bogotá, Cali y Medellín. Las ventas se dispararán, pero Logística advierte que no hay suficiente stock empacado ni camiones contratados.',
    left: {
      label: 'Lanzar promoción masiva sin esperar',
      effects: { liquidity: -6, morale: -5, demand: 18, tech: -8 },
      delayedEffect: {
        delay: 3,
        cardId: 'DEBT_05',
        reason: 'Sobreventa comercial sin capacidad logística ni inventario en bodega',
      },
      causalSummary: 'Disparo de Demanda (+18%) con desgaste operativo (-8%): ¡Riesgo de Bucle R1!',
    },
    right: {
      label: 'Coordinar con Planta y lanzar por regiones',
      effects: { liquidity: 4, morale: 4, demand: 6, tech: 5 },
      causalSummary: 'Acoplamiento Comercial-Logística (+6% Demanda y +5% Operaciones)',
    },
  },
  {
    id: 'INT_06',
    category: 'INTERNAL',
    categoryLabel: 'Finanzas y Talento Humano',
    tgsConcept: 'Tecnificación vs. Estabilidad Laboral',
    sender: 'Dra. Patricia Chaux',
    role: 'Directora Financiera y Contable',
    department: 'FINANZAS',
    avatarType: 'finance',
    title: 'Empacadora Automática vs. Cuadrilla Manual',
    description:
      'Arrendar una línea robotizada de empaque permite reducir 15 puestos operativos en Popayán y bajar costos mensuales, pero genera zozobra y desmotivación entre los 80 trabajadores.',
    left: {
      label: 'Recortar personal para bajar costos',
      effects: { liquidity: 14, morale: -15, demand: -5, tech: 6 },
      causalSummary: 'Recorte laboral (+14% Liquidez → -15% Clima en Talento Humano)',
    },
    right: {
      label: 'Tecnificar y reubicar en Café Especial',
      effects: { liquidity: -9, morale: 10, demand: 6, tech: 8 },
      causalSummary: 'Reconversión laboral (-9% Liquidez → +10% Talento y +8% Producción)',
    },
  },
  {
    id: 'INT_07',
    category: 'INTERNAL',
    categoryLabel: 'Finanzas',
    tgsConcept: 'Liquidez Inmediata vs. Reinversión Productiva',
    sender: 'Dra. Patricia Chaux',
    role: 'Directora Financiera y Contable',
    department: 'FINANZAS',
    avatarType: 'finance',
    title: 'Presión de Socios por Reparto de Utilidades',
    description:
      'Los socios piden distribuir dividendos este trimestre recortando el presupuesto de capacitación de catadores y el mantenimiento de vehículos de reparto.',
    left: {
      label: 'Recortar gastos y liberar caja',
      effects: { liquidity: 15, morale: -11, demand: -4, tech: -7 },
      causalSummary: 'Descapitalización operativa (+15% Finanzas → -11% Talento y -7% Operaciones)',
    },
    right: {
      label: 'Reinvertir en bodega y laboratorio',
      effects: { liquidity: -8, morale: 9, demand: 5, tech: 9 },
      causalSummary: 'Fortalecimiento interno (-8% Finanzas → +9% Talento y +9% Producción)',
    },
  },
  {
    id: 'INT_08',
    category: 'INTERNAL',
    categoryLabel: 'Logística y Abastecimiento',
    tgsConcept: 'Redundancia Logística vs. Costo de Transporte',
    sender: 'Don Hernando Muñoz',
    role: 'Jefe de Logística y Despachos',
    department: 'LOGISTICA',
    avatarType: 'security',
    title: 'Bodega Satélite en Cali vs. Todo en Popayán',
    description:
      'Concentrar todo el inventario solo en Popayán ahorra arriendo, pero cualquier cierre en la vía Panamericana deja sin café a los clientes del resto del país.',
    left: {
      label: 'Centralizar todo en Popayán',
      effects: { liquidity: 10, morale: -3, demand: 0, tech: -10 },
      causalSummary: 'Fragilidad logística (+10% Liquidez → -10% capacidad de respuesta)',
    },
    right: {
      label: 'Abrir centro de acopio alterno en Cali',
      effects: { liquidity: -11, morale: 5, demand: 4, tech: 13 },
      causalSummary: 'Resiliencia en distribución (-11% Liquidez → +13% Operaciones y Logística)',
    },
  },
  {
    id: 'INT_09',
    category: 'INTERNAL',
    categoryLabel: 'Comercial y Mercadeo',
    tgsConcept: 'Diversificación de Canales vs. Dependencia de un Cliente',
    sender: 'Andrés Collazos',
    role: 'Director Comercial y Mercadeo',
    department: 'COMERCIAL',
    avatarType: 'market',
    title: 'Marca Blanca para Gran Superficie Nacional',
    description:
      'Una cadena de tiendas de descuento ofrece comprarnos el 50% de la producción como marca económica a bajo margen, desplazando nuestra marca propia en cafeterías y tienda online.',
    left: {
      label: 'Dedicar planta a marca económica',
      effects: { liquidity: 16, morale: -9, demand: -10, tech: -6 },
      causalSummary: 'Flujo rápido (+16% Caja) pero pérdida de posicionamiento (-10% Demanda propia)',
    },
    right: {
      label: 'Impulsar marca propia y tienda digital',
      effects: { liquidity: -4, morale: 7, demand: 9, tech: 4 },
      causalSummary: 'Posicionamiento de marca (+7% Talento y +9% Demanda en múltiples canales)',
    },
  },
  {
    id: 'INT_10',
    category: 'INTERNAL',
    categoryLabel: 'Dirección Estratégica',
    tgsConcept: 'Comunicación entre Producción, Ventas y Logística',
    sender: 'natalia Velasco',
    role: 'Comité de Coordinación Interna',
    department: 'DIRECCION',
    avatarType: 'hr',
    title: 'Descoordinación en Pedidos de Tueste Medio y Oscuro',
    description:
      'Ventas promete entregas en 24 horas sin consultar el inventario de Logística ni el plan de tueste de Producción. Los reprocesos y discusiones entre áreas están al límite.',
    left: {
      label: 'Obligar a Planta a cumplirle a Ventas',
      effects: { liquidity: 6, morale: -12, demand: 10, tech: -8 },
      causalSummary: 'Choque entre áreas (+10% Ventas → -12% Clima Laboral y -8% Operaciones)',
    },
    right: {
      label: 'Implementar comité semanal integrado',
      effects: { liquidity: -6, morale: 11, demand: 3, tech: 9 },
      causalSummary: 'Sinergia entre Producción, Ventas y Logística (+11% Clima y +9% Operaciones)',
    },
  },
  {
    id: 'INT_11',
    category: 'INTERNAL',
    categoryLabel: 'Producción y Calidad',
    tgsConcept: 'Control de Calidad Preventivo (Laboratorio de Catación)',
    sender: 'Ing. Camilo Mosquera',
    role: 'Jefe de Planta Torrefactora',
    department: 'PRODUCCION',
    avatarType: 'tech',
    title: 'Certificación Q-Grader y Trazabilidad por Lote',
    description:
      'Calibrar el laboratorio de catación y auditar cada bulto demora un poco el despacho semanal, pero garantiza consistencia de exportación.',
    left: {
      label: 'Omitir catación por lote para agilizar',
      effects: { liquidity: 4, morale: -4, demand: 5, tech: -9 },
      causalSummary: 'Despacho rápido sin control (+5% Ventas hoy → -9% estándar operativo)',
    },
    right: {
      label: 'Establecer protocolo estricto de taza',
      effects: { liquidity: -5, morale: 6, demand: -5, tech: 13 },
      causalSummary: 'Excelencia técnica (-5% costo → +13% Capacidad Operativa y Calidad)',
    },
  },
  {
    id: 'INT_12',
    category: 'INTERNAL',
    categoryLabel: 'Finanzas y Comercial',
    tgsConcept: 'Regulación de Demanda ante Alza de Costos (Bucle B1)',
    sender: 'Dra. Patricia Chaux',
    role: 'Directora Financiera y Contable',
    department: 'FINANZAS',
    avatarType: 'finance',
    title: 'Ajuste de Precios por Alza en Empaques y Fletes',
    description:
      'El costo de las bolsas con válvula desgasificadora y el ACPM subieron un 18%. Ajustar precios al distribuidor moderará los pedidos excesivos y protegerá el margen.',
    left: {
      label: 'Ajustar precios y regular pedidos',
      effects: { liquidity: 11, morale: 2, demand: -11, tech: 7 },
      causalSummary: 'Regulador Cibernético B1 (-11% Demanda → +11% Liquidez y +7% alivio en Planta)',
    },
    right: {
      label: 'Congelar precios y asumir sobrecosto',
      effects: { liquidity: -10, morale: -3, demand: 13, tech: -7 },
      causalSummary: 'Sacrificio de margen (+13% Demanda → -10% Liquidez y -7% presión en Planta)',
    },
  },
  {
    id: 'INT_13',
    category: 'INTERNAL',
    categoryLabel: 'Talento Humano',
    tgsConcept: 'Retención de Conocimiento Crítico (Maestros Tostadores)',
    sender: 'Natalia Velasco',
    role: 'Coordinadora de Talento Humano',
    department: 'TALENTO',
    avatarType: 'hr',
    title: 'Exportadora Rival Busca a Nuestros Maestros Tostadores',
    description:
      'Una trilladora multinacional en el Eje Cafetero ofrece mejores sueldos a nuestros dos maestros tostadores y al jefe de catación.',
    left: {
      label: 'Dejarlos ir y contratar aprendices',
      effects: { liquidity: 7, morale: -11, demand: -4, tech: -12 },
      causalSummary: 'Fuga de talento clave (+7% ahorro hoy → -12% Producción y -11% Clima)',
    },
    right: {
      label: 'Mejorar salario e incentivos por calidad',
      effects: { liquidity: -12, morale: 13, demand: 4, tech: 9 },
      causalSummary: 'Retención de expertos (-12% Finanzas → +13% Talento y +9% Producción)',
    },
  },
  {
    id: 'INT_14',
    category: 'INTERNAL',
    categoryLabel: 'Comercial y Logística',
    tgsConcept: 'Retroalimentación con Clientes ante Retrasos de Entrega',
    sender: 'Andrés Collazos',
    role: 'Director Comercial y Mercadeo',
    department: 'COMERCIAL',
    avatarType: 'market',
    title: 'Demora en Entregas a Cafeterías Especializadas',
    description:
      'Un derrumbe menor retrasó 36 horas los pedidos de 40 cafeterías aliadas. Podemos avisar con transparencia enviando muestras de cortesía o negar el retraso.',
    left: {
      label: 'No dar explicaciones ni descuentos',
      effects: { liquidity: 6, morale: -7, demand: -9, tech: -3 },
      causalSummary: 'Mala comunicación (+6% ahorro → -9% confianza Comercial y -7% Clima)',
    },
    right: {
      label: 'Comunicar a tiempo y compensar',
      effects: { liquidity: -9, morale: 7, demand: 11, tech: 4 },
      causalSummary: 'Fidelización de clientes (-9% Finanzas → +11% Demanda y reputación)',
    },
  },

  // =========================================================================
  // 2. CARTAS DE CONSECUENCIA DIFERIDA / DESPLAZAMIENTO DEL PROBLEMA (5)
  // =========================================================================
  {
    id: 'DEBT_01',
    category: 'DELAYED',
    categoryLabel: 'Consecuencia Diferida (+3T)',
    tgsConcept: 'Consecuencia Diferida: El mantenimiento omitido estalla',
    sender: 'PLANTA POPAYÁN // EMERGENCIA',
    role: 'Efecto Diferido (3 Trimestres Después)',
    department: 'PRODUCCION',
    avatarType: 'crisis',
    title: 'Parada Total por Daño en Tostadora Principal',
    description:
      'El mantenimiento que pospusiste hace 3 trimestres provocó la rotura del tambor térmico de la tostadora. La planta en Popayán está detenida.',
    left: {
      label: 'Importar repuesto urgente por avión',
      effects: { liquidity: -18, morale: -6, demand: -6, tech: 6 },
      causalSummary: 'Costo multiplicado por deuda técnica (-18% Finanzas para reparar planta)',
    },
    right: {
      label: 'Maquilar en planta externa a sobrecosto',
      effects: { liquidity: -8, morale: -10, demand: -14, tech: -14 },
      causalSummary: 'Pérdida de capacidad y clientes (-14% Demanda y -14% Operaciones)',
    },
  },
  {
    id: 'DEBT_02',
    category: 'DELAYED',
    categoryLabel: 'Consecuencia Diferida (+3T)',
    tgsConcept: 'Desplazamiento del Problema hacia el Subsistema Humano',
    sender: 'SINTRACAFÉ // PLANTA CAUCA',
    role: 'Efecto Diferido (3 Trimestres Después)',
    department: 'TALENTO',
    avatarType: 'crisis',
    title: 'Cese de Actividades en Empaque y Trilla',
    description:
      'El agotamiento y las horas extras aplazadas hace 3 trimestres detonaron un paro de brazos caídos entre los 80 trabajadores de AgroCafé.',
    left: {
      label: 'Pagar deuda laboral y bonificación',
      effects: { liquidity: -16, morale: 8, demand: -4, tech: 2 },
      causalSummary: 'Acuerdo laboral de emergencia (-16% Liquidez para levantar el cese)',
    },
    right: {
      label: 'Contratar personal externo sin experiencia',
      effects: { liquidity: -4, morale: -18, demand: -8, tech: -12 },
      causalSummary: 'Crisis social y errores de proceso (-18% Talento y -12% Producción)',
    },
  },
  {
    id: 'DEBT_03',
    category: 'DELAYED',
    categoryLabel: 'Consecuencia Diferida (+3T)',
    tgsConcept: 'Retroalimentación del Mercado ante Falla de Calidad',
    sender: 'SUPERMERCADOS Y DISTRIBUIDORES',
    role: 'Efecto Diferido (3 Trimestres Después)',
    department: 'COMERCIAL',
    avatarType: 'crisis',
    title: 'Devolución Masiva por Café con Moho y Mal Sabor',
    description:
      'El lote con exceso de humedad despachado hace 3 trimestres desarrolló hongos en las góndolas. Los supermercados devuelven toneladas de producto y exigen multa.',
    left: {
      label: 'Asumir retiro total y pagar penalidad',
      effects: { liquidity: -19, morale: -4, demand: -5, tech: 4 },
      causalSummary: 'Golpe financiero severo (-19% Liquidez) por descuidar la calidad',
    },
    right: {
      label: 'Disputar reclamo con los clientes',
      effects: { liquidity: -10, morale: -9, demand: -18, tech: -4 },
      causalSummary: 'Cancelación de contratos comerciales (-18% Demanda y -10% Liquidez)',
    },
  },
  {
    id: 'DEBT_04',
    category: 'DELAYED',
    categoryLabel: 'Consecuencia Diferida (+3T)',
    tgsConcept: 'Ruptura de Abastecimiento por Desatención a Proveedores',
    sender: 'COOPERATIVA DE CAFICULTORES DEL CAUCA',
    role: 'Efecto Diferido (3 Trimestres Después)',
    department: 'LOGISTICA',
    avatarType: 'crisis',
    title: 'Escasez Crítica de Café Pergamino en Bodega',
    description:
      'Por congelar el precio de compra hace 3 trimestres, las fincas de Popayán y Timbío vendieron su cosecha a otros compradores. Las trilladoras no tienen grano.',
    left: {
      label: 'Comprar grano caro a intermediarios',
      effects: { liquidity: -16, morale: -6, demand: -8, tech: 5 },
      causalSummary: 'Sobrecosto de emergencia (-16% Liquidez) para no frenar la planta',
    },
    right: {
      label: 'Incumplir entregas del trimestre',
      effects: { liquidity: -7, morale: -10, demand: -12, tech: -15 },
      causalSummary: 'Parálisis de abastecimiento (-15% Operaciones y -12% Ventas)',
    },
  },
  {
    id: 'DEBT_05',
    category: 'DELAYED',
    categoryLabel: 'Consecuencia Diferida (+3T)',
    tgsConcept: 'Castigo Comercial por Desincronización Ventas-Logística',
    sender: 'CLIENTES MAYORISTAS Y DIGITALES',
    role: 'Efecto Diferido (3 Trimestres Después)',
    department: 'COMERCIAL',
    avatarType: 'crisis',
    title: 'Cancelación de Contratos por Incumplimiento de Entregas',
    description:
      'La promoción masiva lanzada hace 3 trimestres sin respaldo de inventario dejó estanterías vacías y cientos de quejas en redes sociales.',
    left: {
      label: 'Enviar pedidos por transporte aéreo expreso',
      effects: { liquidity: -17, morale: -5, demand: 4, tech: 2 },
      causalSummary: 'Gasto logístico extraordinario (-17% Liquidez) para retener clientes',
    },
    right: {
      label: 'Perder clientes frente a la competencia',
      effects: { liquidity: -9, morale: -8, demand: -19, tech: 5 },
      causalSummary: 'Pérdida de mercado (-19% Demanda y -9% Liquidez)',
    },
  },

  // =========================================================================
  // 3. CRISIS DEL ENTORNO NACIONAL COLOMBIANO (TRIMESTRES 5, 10, 15, 19)
  // =========================================================================
  {
    id: 'ENV_Q05',
    triggerQuarter: 5,
    category: 'ENVIRONMENT',
    categoryLabel: 'Entorno Nacional (Trimestre 5)',
    tgsConcept: 'Oportunidad Exógena del Entorno y Peligro de Bucle R1',
    sender: 'FERIA NACIONAL DE CAFÉS ESPECIALES',
    role: 'Choque del Entorno — Trimestre 5',
    department: 'ENVIRONMENT',
    avatarType: 'crisis',
    title: 'Premio Nacional a la Taza del Cauca (+30% Pedidos)',
    description:
      'AgroCafé gana medalla de oro en la Feria de Cafés Especiales en Bogotá y se vuelve viral. Los pedidos de cafeterías y canal digital se disparan de golpe.',
    left: {
      label: 'Aceptar todos los pedidos sin filtro',
      effects: { liquidity: 14, morale: -10, demand: 20, tech: -12 },
      causalSummary: 'Pico de Demanda (+20%) y estrés de planta (-12%): ¡Riesgo de Sobrecarga R1!',
    },
    right: {
      label: 'Escalonar entregas y reforzar turnos',
      effects: { liquidity: -8, morale: 4, demand: 6, tech: 10 },
      causalSummary: 'Crecimiento regulado (+6% Demanda sostenible y +10% Capacidad Operativa)',
    },
  },
  {
    id: 'ENV_Q10',
    triggerQuarter: 10,
    category: 'ENVIRONMENT',
    categoryLabel: 'Entorno Nacional (Trimestre 10)',
    tgsConcept: 'Sistema Abierto: Bloqueo Logístico y Costos de Transporte',
    sender: 'CORREDOR VIAL // VÍA PANAMERICANA',
    role: 'Choque del Entorno — Trimestre 10',
    department: 'ENVIRONMENT',
    avatarType: 'crisis',
    title: 'Cierre en la Vía Panamericana entre Popayán y Cali',
    description:
      'Un deslizamiento de tierra y bloqueos viales interrumpen el paso hacia el Valle del Cauca, encareciendo fletes y represando tanto insumos como café empacado.',
    left: {
      label: 'Contratar rutas alternas y flete prioritario',
      effects: { liquidity: -16, morale: 3, demand: 4, tech: 10 },
      causalSummary: 'Adaptabilidad logística (-16% Finanzas → mantiene +10% flujo operativo)',
    },
    right: {
      label: 'Esperar reapertura con carga represada',
      effects: { liquidity: -4, morale: -8, demand: -9, tech: -10 },
      causalSummary: 'Parálisis de distribución (-10% Logística y -9% cumplimiento Comercial)',
    },
  },
  {
    id: 'ENV_Q15',
    triggerQuarter: 15,
    category: 'ENVIRONMENT',
    categoryLabel: 'Entorno Nacional (Trimestre 15)',
    tgsConcept: 'Variabilidad Climática y Abastecimiento Agrícola',
    sender: 'ALERTA CLIMÁTICA // IDEAM CAUCA',
    role: 'Choque del Entorno — Trimestre 15',
    department: 'ENVIRONMENT',
    avatarType: 'crisis',
    title: 'Ola Invernal y Brote de Roya en la Cosecha Caucana',
    description:
      'Las fuertes lluvias en la meseta de Popayán reducen la oferta de café pergamino sano y encarecen un 35% la materia prima de primera calidad.',
    left: {
      label: 'Financiar secado mecánico y selección óptica',
      effects: { liquidity: -12, morale: 5, demand: -14, tech: 8 },
      causalSummary: 'Defensa de la calidad (+8% Operaciones) ajustando volumen comercial (-14%)',
    },
    right: {
      label: 'Forzar acopio en veredas bajo tormenta',
      effects: { liquidity: -8, morale: -13, demand: 6, tech: -11 },
      causalSummary: 'Desgaste severo del equipo (-13% Talento y -11% Logística) por sostener ventas',
    },
  },
  {
    id: 'ENV_Q19',
    triggerQuarter: 19,
    category: 'ENVIRONMENT',
    categoryLabel: 'Entorno Nacional (Trimestre 19)',
    tgsConcept: 'Adaptabilidad a Nuevas Condiciones del Mercado y Regulación',
    sender: 'NORMATIVA AMBIENTAL Y MERCADO VERDE',
    role: 'Choque del Entorno — Trimestre 19',
    department: 'ENVIRONMENT',
    avatarType: 'crisis',
    title: 'Exigencia de Empaques Biodegradables y Sello Sostenible',
    description:
      'Las grandes cadenas y compradores exigen empaque 100% compostable y manejo certificado de aguas mieles para renovar los contratos del próximo año.',
    left: {
      label: 'Pagar multa comercial y usar stock plástico',
      effects: { liquidity: -15, morale: -6, demand: -6, tech: 2 },
      causalSummary: 'Rezago competitivo (-15% Liquidez en penalidades y -6% Demanda)',
    },
    right: {
      label: 'Adoptar empaque biodegradable y sello verde',
      effects: { liquidity: -12, morale: 10, demand: 10, tech: 6 },
      causalSummary: 'Adaptación al mercado (-12% Inversión → +10% Demanda, +10% Clima y +6% Planta)',
    },
  },

  // =========================================================================
  // 4. INYECCIÓN DE NEGUENTROPÍA Y DIRECCIÓN ESTRATÉGICA (3 TARJETAS)
  // =========================================================================
  {
    id: 'NEG_01',
    category: 'NEGENTROPY',
    categoryLabel: 'Dirección Estratégica (Neguentropía)',
    tgsConcept: 'Neguentropía para Revertir el Desgaste Operativo y Humano',
    sender: 'GERENCIA GENERAL // POPAYÁN',
    role: 'Inversión de Estabilización Organizacional',
    department: 'DIRECCION',
    avatarType: 'nexus',
    title: 'Jornada de Integración y Puesta a Punto de Planta',
    description:
      'Podemos invertir parte del flujo de caja en calibrar trilladoras, organizar inventarios de bodega y capacitar a los 80 colaboradores.',
    left: {
      label: 'Invertir en planta y capacitación',
      effects: { liquidity: -12, morale: 13, demand: 4, tech: 13 },
      causalSummary: 'Inyección de Neguentropía (-12% Liquidez → +13% Talento y +13% Operaciones)',
    },
    right: {
      label: 'Ahorrar caja sin intervenir',
      effects: { liquidity: 8, morale: -2, demand: 0, tech: -2 },
      causalSummary: 'Reserva en bancos (+8% Liquidez, continúa el desgaste entrópico)',
    },
  },
  {
    id: 'NEG_02',
    category: 'NEGENTROPY',
    categoryLabel: 'Control y Diagnóstico (ERP)',
    tgsConcept: 'Fortalecimiento del Control Anticipativo (Feedforward)',
    sender: 'DIRECCIÓN ESTRATÉGICA // CONTROL',
    role: 'Sistema de Información Gerencial',
    department: 'DIRECCION',
    avatarType: 'nexus',
    title: 'Actualización del Tablero de Control y Trazabilidad',
    description:
      'Integrar en tiempo real los datos de compras en el Cauca, stock en bodega y pedidos comerciales nos otorga +1 uso de Diagnóstico Predictivo (Radar).',
    left: {
      label: 'Implementar software integrado (+1 Radar)',
      effects: { liquidity: -9, morale: 5, demand: 3, tech: 8 },
      grantRadarCharge: 1,
      causalSummary: 'Control Cibernético mejorado (-9% Finanzas → +1 Radar y +8% Logística/Planta)',
    },
    right: {
      label: 'Seguir llevando registros en planillas sueltas',
      effects: { liquidity: 12, morale: -3, demand: 2, tech: -4 },
      causalSummary: 'Ahorro inmediato (+12% Liquidez → -4% coordinación operativa)',
    },
  },
  {
    id: 'NEG_03',
    category: 'NEGENTROPY',
    categoryLabel: 'Sincronización de Subsistemas',
    tgsConcept: 'Homeostasis y Alineación de los 6 Subsistemas (B1)',
    sender: 'COMITÉ DIRECTIVO // AGROCAFÉ',
    role: 'Alineación Producción - Ventas - Logística',
    department: 'DIRECCION',
    avatarType: 'nexus',
    title: 'Plan Maestro de Abastecimiento, Tueste y Distribución',
    description:
      'Unificar el cronograma entre compras de pergamino, capacidad de trilla y promesas de venta eliminará cuellos de botella en toda la empresa.',
    left: {
      label: 'Ejecutar plan maestro integrado',
      effects: { liquidity: -8, morale: 9, demand: 6, tech: 10 },
      causalSummary: 'Armonización de los 6 subsistemas (-8% Finanzas → +9% Talento y +10% Planta)',
    },
    right: {
      label: 'Priorizar cobro rápido de cartera',
      effects: { liquidity: 11, morale: -4, demand: -5, tech: 0 },
      causalSummary: 'Liquidez inmediata (+11% Caja → -5% Comercial y -4% Clima)',
    },
  },
];
