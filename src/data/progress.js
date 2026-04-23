/**
 * UIL Number Sense — Progress Persistence Layer
 * 
 * MEDAL SYSTEM:
 *   🥉 Bronze  →  10/10 correct on Untimed
 *   🥈 Silver  →  10/10 correct on Learning (20s)
 *   🥇 Gold    →  10/10 correct on Competition (10s)
 * 
 * Medals are cumulative — Gold implies Silver + Bronze.
 * Each topic stores its highest medal achieved.
 */

const STORAGE_KEY = 'uil-ns-progress';

const defaultProgress = () => ({
  level: 'middle',
  topicMedals: {},       // { topicId: 'gold' | 'silver' | 'bronze' | null }
  topicStats: {},        // { topicId: { practiceCount, correctCount } }
  totalPracticed: 0,
  totalCorrect: 0,
  sessionsCompleted: 0,
  lastActive: null,
});

function load() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultProgress(), ...JSON.parse(stored) } : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded */ }
}

// Medal hierarchy for comparisons
const MEDAL_RANK = { gold: 3, silver: 2, bronze: 1 };

class ProgressStore {
  constructor() {
    this.state = load();
    this._listeners = [];
  }

  get data() { return this.state; }

  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  }

  _emit() {
    this.state.lastActive = new Date().toISOString();
    save(this.state);
    this._listeners.forEach(fn => fn(this.state));
  }

  setLevel(level) {
    this.state.level = level;
    this._emit();
  }

  // Record a completed session and potentially award a medal
  recordSession(topicId, correct, total, mode) {
    // Update stats
    if (!this.state.topicStats[topicId]) {
      this.state.topicStats[topicId] = { practiceCount: 0, correctCount: 0 };
    }
    const ts = this.state.topicStats[topicId];
    ts.practiceCount += total;
    ts.correctCount += correct;

    this.state.totalPracticed += total;
    this.state.totalCorrect += correct;
    this.state.sessionsCompleted += 1;

    // Medal check — must be perfect (10/10) on a standard 10-question session
    if (correct === total && total >= 10) {
      let earned = null;
      if (mode === 'competition') earned = 'gold';
      else if (mode === 'learning') earned = 'silver';
      else if (mode === 'untimed') earned = 'bronze';

      if (earned) {
        const current = this.state.topicMedals[topicId];
        const currentRank = MEDAL_RANK[current] || 0;
        const earnedRank = MEDAL_RANK[earned] || 0;
        if (earnedRank > currentRank) {
          this.state.topicMedals[topicId] = earned;
        }
      }
    }

    this._emit();
  }

  getMedal(topicId) {
    return this.state.topicMedals[topicId] || null;
  }

  getStats(topicId) {
    return this.state.topicStats[topicId] || { practiceCount: 0, correctCount: 0 };
  }

  getOverallAccuracy() {
    if (this.state.totalPracticed === 0) return 0;
    return Math.round((this.state.totalCorrect / this.state.totalPracticed) * 100);
  }

  getMedalCounts() {
    const medals = Object.values(this.state.topicMedals);
    return {
      gold: medals.filter(m => m === 'gold').length,
      silver: medals.filter(m => m === 'silver').length,
      bronze: medals.filter(m => m === 'bronze').length,
    };
  }

  reset() {
    this.state = defaultProgress();
    this._emit();
  }
}

export const progressStore = new ProgressStore();
