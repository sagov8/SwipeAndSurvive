import { CARDS_CATALOG } from '../data/cardsCatalog.js';

export const ALL_CRISIS_CARD_IDS = [
  'ENV_Q05',
  'ENV_Q10',
  'ENV_Q15',
  'ENV_Q19',
  'ENV_CAUCA_01',
  'ENV_CAUCA_02',
  'ENV_CAUCA_03',
  'ENV_CAUCA_04',
  'ENV_CAUCA_05',
  'ENV_CAUCA_06',
];

/**
 * Genera el cronograma aleatorio de crisis del entorno para la partida.
 * Selecciona 4 cartas únicas al azar del conjunto de 10 crisis.
 * Los primeros 3 choques ocurren en los trimestres 5, 10 y 15.
 * El 4° y último choque se adelanta aleatoriamente al trimestre 17 o 18
 * (en vez del 19) para aumentar la dificultad y obligar a estabilizar
 * el sistema durante 2 o 3 trimestres posteriores antes de la victoria.
 */
export function generateCrisisSchedule() {
  const shuffled = shuffleCards(ALL_CRISIS_CARD_IDS);
  const finalQuarter = Math.random() < 0.5 ? 17 : 18;
  return {
    5: shuffled[0],
    10: shuffled[1],
    15: shuffled[2],
    [finalQuarter]: shuffled[3],
  };
}

/**
 * Obtiene una carta por su ID desde el catálogo base
 */
export function getCardById(cardId) {
  return CARDS_CATALOG.find((c) => c.id === cardId) || null;
}

/**
 * Construye el mazo normal inicial (categorías INTERNAL y NEGENTROPY mezcladas)
 */
export function buildInitialDeck() {
  const normalCards = CARDS_CATALOG.filter(
    (c) => c.category === 'INTERNAL' || c.category === 'NEGENTROPY'
  );
  return shuffleCards(normalCards.map((c) => c.id));
}

export function shuffleCards(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Selecciona la carta correspondiente al trimestre actual respetando la jerarquía de prioridades:
 * 1. Crisis del Entorno Externo (según cronograma aleatorio en Q5, Q10, Q15 y Q17/18)
 * 2. Cartas de Consecuencia Diferida (delayedQueue cuyo triggerQuarter <= targetQuarter)
 * 3. Carta normal del mazo filtrando las últimas 5 cartas jugadas (recentCardIds)
 */
export function drawNextCard({
  targetQuarter,
  deck,
  delayedQueue,
  recentCardIds = [],
  resolvedUniqueIds = [],
  crisisSchedule = null,
}) {
  let updatedDeck = [...deck];
  let updatedDelayedQueue = [...delayedQueue];
  let updatedResolvedUnique = [...resolvedUniqueIds];

  // 1. Prioridad Absoluta: Crisis del Entorno Externo
  const schedule = crisisSchedule || { 5: 'ENV_Q05', 10: 'ENV_Q10', 15: 'ENV_Q15', 17: 'ENV_Q19' };
  const crisisId = schedule[targetQuarter];
  if (crisisId && !updatedResolvedUnique.includes(crisisId)) {
    const crisisCard = getCardById(crisisId);
    if (crisisCard) {
      updatedResolvedUnique.push(crisisId);
      return {
        card: {
          ...crisisCard,
          categoryLabel: `Entorno Nacional (Trimestre ${targetQuarter})`,
          role: `Choque del Entorno — Trimestre ${targetQuarter}`,
          isCrisisEvent: true,
        },
        deck: updatedDeck,
        delayedQueue: updatedDelayedQueue,
        resolvedUniqueIds: updatedResolvedUnique,
      };
    }
  }

  // 2. Segunda Prioridad: Carta de Consecuencia Diferida (Desplazamiento del Problema)
  const dueIndex = updatedDelayedQueue.findIndex((item) => item.triggerQuarter <= targetQuarter);
  if (dueIndex !== -1) {
    const [dueItem] = updatedDelayedQueue.splice(dueIndex, 1);
    const debtCard = getCardById(dueItem.cardId);
    if (debtCard) {
      updatedResolvedUnique.push(debtCard.id);
      return {
        card: {
          ...debtCard,
          isDelayedConsequence: true,
          originReason: dueItem.reason,
          originQuarter: dueItem.originQuarter,
        },
        deck: updatedDeck,
        delayedQueue: updatedDelayedQueue,
        resolvedUniqueIds: updatedResolvedUnique,
      };
    }
  }

  // 3. Robo normal evitando repetición de las últimas 5 cartas
  const recentSet = new Set(recentCardIds.slice(-5));
  let candidateIdx = updatedDeck.findIndex((id) => !recentSet.has(id));

  if (candidateIdx === -1) {
    // Rebarajar mazo normal descartando las no elegibles si el mazo se agotó
    const normalIds = CARDS_CATALOG.filter(
      (c) => c.category === 'INTERNAL' || c.category === 'NEGENTROPY'
    ).map((c) => c.id);
    updatedDeck = shuffleCards(normalIds);
    candidateIdx = updatedDeck.findIndex((id) => !recentSet.has(id));
    if (candidateIdx === -1) candidateIdx = 0;
  }

  const [selectedId] = updatedDeck.splice(candidateIdx, 1);
  const selectedCard = getCardById(selectedId) || CARDS_CATALOG[0];

  return {
    card: selectedCard,
    deck: updatedDeck,
    delayedQueue: updatedDelayedQueue,
    resolvedUniqueIds: updatedResolvedUnique,
  };
}
