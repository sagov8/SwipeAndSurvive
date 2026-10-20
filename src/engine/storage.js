const STORAGE_KEY = 'AETHER_CORP_RECORDS_2085_V1';

const defaultRecords = {
  bestScore: 0,
  bestRank: 'Sin Registro',
  gamesPlayed: 0,
  victories: 0,
  bestHomeostasisIndex: 0,
  history: [],
};

export function loadTournamentRecords() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultRecords };
    const parsed = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof parsed.bestScore !== 'number' ||
      typeof parsed.gamesPlayed !== 'number' ||
      !Array.isArray(parsed.history)
    ) {
      return { ...defaultRecords };
    }
    return {
      bestScore: parsed.bestScore,
      bestRank: typeof parsed.bestRank === 'string' ? parsed.bestRank : 'Sin Registro',
      gamesPlayed: parsed.gamesPlayed,
      victories: typeof parsed.victories === 'number' ? parsed.victories : 0,
      bestHomeostasisIndex:
        typeof parsed.bestHomeostasisIndex === 'number' ? parsed.bestHomeostasisIndex : 0,
      history: parsed.history.slice(0, 10),
    };
  } catch {
    return { ...defaultRecords };
  }
}

export function saveTournamentRecord(entry) {
  try {
    const current = loadTournamentRecords();
    const updatedGames = current.gamesPlayed + 1;
    const updatedVictories = current.victories + (entry.victory ? 1 : 0);
    const isNewBest = entry.score >= current.bestScore;

    const updated = {
      bestScore: Math.max(current.bestScore, entry.score),
      bestRank: isNewBest ? entry.rank : current.bestRank,
      gamesPlayed: updatedGames,
      victories: updatedVictories,
      bestHomeostasisIndex: Math.max(current.bestHomeostasisIndex, entry.homeostasisIndex || 0),
      history: [
        {
          id: Date.now(),
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          score: entry.score,
          rank: entry.rank,
          quarterReached: entry.quarterReached,
          victory: entry.victory,
          strategyPath: entry.strategyPath,
          gameMode: entry.gameMode,
          homeostasisIndex: entry.homeostasisIndex,
        },
        ...current.history,
      ].slice(0, 8),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return loadTournamentRecords();
  }
}
