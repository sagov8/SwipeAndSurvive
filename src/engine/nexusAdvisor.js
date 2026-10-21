/**
 * DIRECCIÓN ESTRATÉGICA / CONTROL SISTÉMICO — Motor de diagnóstico basado en reglas
 * Escenario: AgroCafé Colombiano S.A.S. (Popayán, Cauca)
 */
export function getNexusDiagnostic(state) {
  const { metrics, overloadCounter, delayedQueue, quarter, currentCard } = state;
  const { liquidity, morale, demand, tech } = metrics;

  // 1. Alerta de Crisis del Entorno Nacional activa
  if (currentCard?.category === 'ENVIRONMENT') {
    return {
      level: 'CRISIS',
      tag: `CRISIS ENTORNO T${quarter} // ${currentCard.title ? currentCard.title.toUpperCase() : 'CHOQUE EXTERNO'}`,
      message: `DIRECCIÓN: Choque exógeno en el Trimestre ${quarter} (${currentCard.title || 'Evento'}). Como sistema abierto en el Cauca, AgroCafé debe amortiguar la perturbación protegiendo la viabilidad de la empresa.`,
    };
  }

  // 2. Alerta de Carta de Consecuencia Diferida activa
  if (currentCard?.category === 'DELAYED') {
    return {
      level: 'CRISIS',
      tag: 'PROBLEMA DESPLAZADO (+3T)',
      message: `DIRECCIÓN: Consecuencia diferida activada (${currentCard.originReason || 'atajo previo'}). El problema ignorado hace 3 trimestres hoy impacta la operación de Popayán.`,
    };
  }

  // 3. Alerta de Bucle de Retroalimentación Positiva R1 activo o inminente
  if (demand >= 80 && (tech <= 35 || morale <= 35)) {
    return {
      level: 'CRISIS',
      tag: `SOBRECARGA OPERATIVA R1 (${overloadCounter}/3)`,
      message: `DIRECCIÓN: ¡Desincronización entre Ventas y Planta! Los pedidos (${demand}%) superan la capacidad de Trilla/Logística (${tech}%) o al personal (${morale}%). Incumplimientos y multas drenan la caja.`,
    };
  }

  if (demand >= 74 && tech <= 42) {
    return {
      level: 'WARN',
      tag: 'RIESGO DE CUELLO DE BOTELLA',
      message: `DIRECCIÓN: La Demanda Comercial (${demand}%) está superando la capacidad de Producción y Logística (${tech}%). Coordina despachos o refuerza planta antes de entrar en sobrecarga R1.`,
    };
  }

  // 4. Alerta de Rotación y Fatiga en los 80 trabajadores (Regla Dominó 2)
  if (morale <= 25) {
    return {
      level: 'CRISIS',
      tag: 'ALERTA EN TALENTO HUMANO',
      message: `DIRECCIÓN: Bienestar crítico en los 80 trabajadores (${morale}%). El agotamiento y renuncias en Popayán están reduciendo la Producción y Logística (-8% por trimestre).`,
    };
  }

  // 5. Peligro de Entropía Máxima en cualquier subsistema
  const lowestEntry = Object.entries({
    'Finanzas y Liquidez': liquidity,
    'Talento Humano': morale,
    'Comercial y Mercadeo': demand,
    'Producción y Logística': tech,
  }).sort((a, b) => a[1] - b[1])[0];

  if (lowestEntry[1] <= 22) {
    return {
      level: 'CRISIS',
      tag: 'RIESGO DE COLAPSO (0%)',
      message: `DIRECCIÓN: El área de ${lowestEntry[0]} cayó al ${lowestEntry[1]}%. Si llega a 0%, AgroCafé Colombiano S.A.S. detendrá sus operaciones.`,
    };
  }

  // 6. Estado de Sinergia Organizacional (45% - 75% en los 4 indicadores)
  const inSynergy = [liquidity, morale, demand, tech].every((v) => v >= 45 && v <= 75);
  if (inSynergy) {
    return {
      level: 'SYNERGY',
      tag: 'SINERGIA CAFICULTORA ACTIVA',
      message: `DIRECCIÓN: Producción, Ventas, Logística, Finanzas y Talento operan en armonía (45%-75%). Bono de Sinergia: +3% en Liquidez y +75 pts de rentabilidad.`,
    };
  }

  // 7. Estado de Homeostasis General (35% - 75% en las 4 barras)
  const inHomeostasis = [liquidity, morale, demand, tech].every((v) => v >= 35 && v <= 75);
  if (inHomeostasis) {
    return {
      level: 'HOMEOSTASIS',
      tag: 'EQUILIBRIO OPERATIVO (HOMEOSTASIS)',
      message:
        delayedQueue.length > 0
          ? `DIRECCIÓN: Planta en equilibrio (35%-75%), pero hay ${delayedQueue.length} problema(s) latente(s) que estallarán en próximos trimestres.`
          : `DIRECCIÓN: AgroCafé opera en equilibrio. Recuerda que el desgaste trimestral (Entropía) resta -2% en Planta y Personal.`,
    };
  }

  // 8. Diagnóstico estándar
  return {
    level: 'WARN',
    tag: 'DESAJUSTE ENTRE ÁREAS',
    message: `DIRECCIÓN: Hay desbalance entre áreas. Usa la Auditoría Predictiva (Radar) si necesitas anticipar el impacto exacto de esta decisión.`,
  };
}
