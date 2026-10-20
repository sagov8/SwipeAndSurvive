import { CARDS_CATALOG } from '../data/cardsCatalog';

const CRISIS_QUARTERS = {
  5: 'ENV_Q05',
  10: 'ENV_Q10',
  15: 'ENV_Q15',
  19: 'ENV_Q19',
};

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
 * 1. Crisis del Entorno Externo en trimestres 5, 10, 15, 19 (si no se ha jugado aún en ese trimestre)
 * 2. Cartas de Consecuencia Diferida (delayedQueue cuyo triggerQuarter <= targetQuarter)
 * 3. Carta normal del mazo filtrando las últimas 5 cartas jugadas (recentCardIds)
 */
export function drawNextCard({
  targetQuarter,
  deck,
  delayedQueue,
  recentCardIds = [],
  resolvedUniqueIds = [],
}) {
  let updatedDeck = [...deck];
  let updatedDelayedQueue = [...delayedQueue];
  let updatedResolvedUnique = [...resolvedUniqueIds];

  // 1. Prioridad Absoluta: Crisis del Entorno Externo (Q5, Q10, Q15, Q19)
  const crisisId = CRISIS_QUARTERS[targetQuarter];
  if (crisisId && !updatedResolvedUnique.includes(crisisId)) {
    const crisisCard = getCardById(crisisId);
    if (crisisCard) {
      updatedResolvedUnique.push(crisisId);
      return {
        card: {
          ...crisisCard,
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
