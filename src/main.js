/**
 * NumberSense Pro — Main Application
 * UIL Academic Prep • Medal-based mastery with keyboard flow
 */
import { TOPICS, CATEGORIES, LEVELS, getTopicsByLevel, getTopicsByCategory, getTopicById } from './data/topics.js';
import { progressStore } from './data/progress.js';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';

// ── State ─────────────────────────────────────────────────────────
let view = 'dashboard';
let topicId = null;
let session = null;
let customTime = 15;
let activeCat = 'all'; // category filter

// ── Medal Helpers ─────────────────────────────────────────────────
function medalIcon(medal) {
  if (medal === 'gold')   return '<span class="medal gold" title="Gold — 10/10 Competition (10s)">🥇</span>';
  if (medal === 'silver') return '<span class="medal silver" title="Silver — 10/10 Learning (20s)">🥈</span>';
  if (medal === 'bronze') return '<span class="medal bronze" title="Bronze — 10/10 Untimed">🥉</span>';
  return '<span class="medal none" title="No medal yet">○</span>';
}

function medalClass(medal) {
  return medal ? `medal-${medal}` : '';
}

// ── Render ────────────────────────────────────────────────────────
function render() {
  document.getElementById('app').innerHTML = `
    <div class="sidebar-overlay" id="overlay"></div>
    <div class="app-layout">
      ${sidebar()}
      <div class="main-content">
        ${header()}
        <div class="content-body">${page()}</div>
        <footer class="app-footer">© 2026 NumberSense Pro • Sanctioned UIL Preparatory Material</footer>
      </div>
    </div>`;
  bind();
  renderMathInElement(document.getElementById('app'), {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '\\[', right: '\\]', display: true},
      {left: '\\(', right: '\\)', display: false}
    ],
    throwOnError: false
  });
}

progressStore.subscribe(() => render());

// ── Sidebar ───────────────────────────────────────────────────────
function sidebar() {
  const lv = progressStore.data.level;
  const topics = getTopicsByLevel(lv);
  const mc = progressStore.getMedalCounts();
  return `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <h1>NumberSense Pro</h1>
      <p class="brand-sub">UIL Academic Prep</p>
    </div>

    <div class="level-selector">
      <label>Competition Level</label>
      <div class="level-pills">
        ${Object.values(LEVELS).map(l => `
          <button class="level-pill${lv===l.id?' active':''}" data-level="${l.id}">${l.label}</button>
        `).join('')}
      </div>
    </div>

    <nav class="sidebar-nav scrollbar-hide">
      <div class="nav-group">
        <div class="nav-group-label">Navigation</div>
        <div class="nav-item nav-dashboard${view==='dashboard'?' active':''}" data-go="dashboard">
          <span class="nav-dash-icon">⊞</span>
          <span class="nav-label">Modules Dashboard</span>
        </div>
      </div>
      ${Object.values(CATEGORIES).map(cat => {
        const ts = getTopicsByCategory(cat.id, lv);
        if (!ts.length) return '';
        return `
        <div class="nav-group">
          <div class="nav-group-label">${cat.title}</div>
          ${ts.map((t, i) => {
            const medal = progressStore.getMedal(t.id);
            return `
            <div class="nav-item${topicId===t.id&&view!=='dashboard'?' active':''}" data-topic="${t.id}">
              <span class="nav-idx">${i + 1}</span>
              <span class="nav-label">${t.title}</span>
              <span class="nav-medal">${medalIcon(medal)}</span>
            </div>`;
          }).join('')}
        </div>`;
      }).join('')}
    </nav>

    <div class="sidebar-footer">
      <div class="footer-card">
        <div class="sidebar-stat-row"><span class="label">Topics</span><span class="value">${topics.length}</span></div>
        <div class="sidebar-stat-row"><span class="label">🥇 Gold</span><span class="value">${mc.gold}</span></div>
        <div class="sidebar-stat-row"><span class="label">🥈 Silver</span><span class="value">${mc.silver}</span></div>
        <div class="sidebar-stat-row"><span class="label">🥉 Bronze</span><span class="value">${mc.bronze}</span></div>
        <div class="sidebar-stat-row"><span class="label">Accuracy</span><span class="value">${progressStore.getOverallAccuracy()}%</span></div>
      </div>
    </div>
  </aside>`;
}

// ── Header ────────────────────────────────────────────────────────
function header() {
  const lv = LEVELS[progressStore.data.level];
  let title = 'Modules Dashboard';
  if (view === 'learn' || view === 'memorize' || view === 'practice') {
    const t = getTopicById(topicId);
    title = t ? t.title : 'Technique Guide';
  }
  if (view === 'session') title = 'Drill Arena';
  if (view === 'interstitial') title = 'Session Checkpoint';
  if (view === 'results') title = 'Session Results';

  return `
  <header class="content-header">
    <div style="display:flex;align-items:center;gap:10px">
      <button class="mobile-toggle" id="menuBtn">☰</button>
      <h2>${title}</h2>
    </div>
    <div class="header-right">
      <div class="header-level-tag">${lv.full}</div>
      <button class="header-icon-btn" id="settingsBtn" title="Settings">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
      <button class="header-icon-btn" id="accountBtn" title="Account">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </button>
    </div>
  </header>`;
}

// ── Router ────────────────────────────────────────────────────────
function page() {
  switch (view) {
    case 'dashboard': return dashboardPage();
    case 'learn':     return learnPage();
    case 'memorize':  return memorizePage();
    case 'practice':  return practicePage();
    case 'session':   return sessionPage();
    case 'interstitial': return interstitialPage();
    case 'results':   return resultsPage();
    default:          return dashboardPage();
  }
}

// ── Dashboard ─────────────────────────────────────────────────────
function dashboardPage() {
  const lv = progressStore.data.level;
  const topics = getTopicsByLevel(lv);
  const mc = progressStore.getMedalCounts();
  const mastered = mc.gold + mc.silver + mc.bronze;
  const masteryPct = topics.length ? Math.round((mastered / topics.length) * 100) : 0;

  // Build unique category list for filter
  const catIds = ['all', ...new Set(topics.map(t => t.category))];

  // Filter topics
  const displayTopics = activeCat === 'all' ? topics : topics.filter(t => t.category === activeCat);

  return `
  <!-- Stats Overview -->
  <div class="stats-grid">
    <div class="stat-card">
      <span class="stat-label">Modules Mastered</span>
      <div style="display:flex;align-items:flex-end;justify-content:space-between">
        <span class="stat-value">${mastered}</span>
        <span class="stat-sub">/ ${topics.length}</span>
      </div>
      <div class="stat-progress"><div class="stat-progress-fill" style="width:${masteryPct}%"></div></div>
    </div>

    <div class="stat-card">
      <span class="stat-label">Gold Medals</span>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <span style="font-size:1.4rem">🥇</span>
        <span class="stat-value" style="font-size:2rem">${mc.gold}</span>
      </div>
      <span class="stat-sub">${mc.silver} Silver • ${mc.bronze} Bronze</span>
    </div>

    <div class="stat-card">
      <span class="stat-label">Problems Solved</span>
      <span class="stat-value" style="font-size:2rem">${progressStore.data.totalPracticed}</span>
      <span class="stat-sub">Overall accuracy: ${progressStore.getOverallAccuracy()}%</span>
    </div>

    <div class="stat-card accent-card">
      <span class="stat-label">Accuracy Rate</span>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <span style="font-size:1.4rem">⚡</span>
        <span class="stat-value" style="font-size:2rem">${progressStore.getOverallAccuracy()}%</span>
      </div>
      <span class="stat-sub">Keep it above 90% for Gold!</span>
    </div>
  </div>

  <!-- Category Filter + Module Grid -->
  <div class="cat-filter-bar">
    <h2>Module Library</h2>
    <div class="cat-pills scrollbar-hide">
      ${catIds.map(id => {
        const label = id === 'all' ? 'All' : (CATEGORIES[id]?.title || id);
        return `<button class="cat-pill${activeCat===id?' active':''}" data-cat="${id}">${label}</button>`;
      }).join('')}
    </div>
  </div>

  <div class="topic-grid">
    ${displayTopics.map((t) => {
      const medal = progressStore.getMedal(t.id);
      const stats = progressStore.getStats(t.id);
      const catTitle = CATEGORIES[t.category]?.title || t.category;
      const statusIcon = medal === 'gold' ? '🥇' : medal === 'silver' ? '🥈' : medal === 'bronze' ? '🥉'
        : (stats.practiceCount > 0 ? '📝' : '');
      return `
      <div class="topic-card ${medalClass(medal)}" data-topic="${t.id}">
        <div class="card-top">
          <div class="card-icon">${t.icon}</div>
          <div class="card-status">${statusIcon}</div>
        </div>
        <div class="card-title">${t.title}</div>
        <div class="card-desc">${t.description}</div>
        <div class="card-bottom">
          <span class="card-cat">${catTitle}</span>
          <span class="card-medal">${medalIcon(medal)}</span>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ── Learn Page ────────────────────────────────────────────────────
function learnPage() {
  const t = getTopicById(topicId);
  if (!t) return '<div class="empty-state"><h3>Topic not found</h3></div>';
  const medal = progressStore.getMedal(t.id);

  return `
  <div>
    <div class="breadcrumbs">
      <span class="crumb" data-go="dashboard">Modules</span>
      <span class="crumb-sep">›</span>
      <span class="crumb current">${t.title}</span>
    </div>

    <div class="tab-bar">
      <button class="tab-btn active" data-tab="learn">Learn</button>
      ${t.memoData ? '<button class="tab-btn" data-tab="memorize">Memorize</button>' : ''}
      <button class="tab-btn" data-tab="practice">Practice</button>
    </div>

    ${medal ? `<div class="medal-banner ${medal}">
      ${medalIcon(medal)} ${medal.charAt(0).toUpperCase() + medal.slice(1)} Medal Achieved
    </div>` : ''}

    <div class="two-col">
      <div>
        <div class="content-card">
          <h3>Section ${t.section}: ${t.title}</h3>
          <div class="lesson-text">${t.lesson}</div>
        </div>

        ${t.practiceGenerator ? `
        <div class="cta-card" data-practice="${t.id}">
          <h3>Ready to Drill?</h3>
          <p>Practice randomized problems to lock in the muscle memory.</p>
          <span class="btn">Start Practice →</span>
        </div>` : ''}
      </div>

      <div>
        ${t.examples.length ? `
        <div class="content-card">
          <h3>Worked Examples</h3>
          ${t.examples.map((ex, i) => `
            <div class="example-block">
              <span class="example-label">Example ${String(i + 1).padStart(2, '0')}</span>
              <div class="example-problem">${ex.problem}</div>
              ${ex.steps.map(s => `<div class="example-step">${s}</div>`).join('')}
              <div class="example-answer">Answer: ${ex.answer}</div>
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    </div>

    <div class="tip-block">
      <span class="tip-ico">→</span>
      <span>Practice to earn medals! Get 10/10 on <strong>Untimed</strong> for Bronze, <strong>Learning (20s)</strong> for Silver, and <strong>Competition (10s)</strong> for Gold.</span>
    </div>

    <div class="action-row">
      <button class="btn btn-secondary" data-go="dashboard">← Back to Library</button>
      ${t.practiceGenerator ? `<button class="btn btn-primary" data-practice="${t.id}">Practice →</button>` : ''}
    </div>
  </div>`;
}

// ── Memorize ──────────────────────────────────────────────────────
function memorizePage() {
  const t = getTopicById(topicId);
  if (!t?.memoData) return '<div class="empty-state"><h3>No flashcard data</h3></div>';

  return `
  <div>
    <div class="breadcrumbs">
      <span class="crumb" data-go="dashboard">Modules</span>
      <span class="crumb-sep">›</span>
      <span class="crumb" data-topic="${t.id}">${t.title}</span>
      <span class="crumb-sep">›</span>
      <span class="crumb current">Memorize</span>
    </div>
    <div class="tab-bar">
      <button class="tab-btn" data-tab="learn">Learn</button>
      <button class="tab-btn active" data-tab="memorize">Memorize</button>
      <button class="tab-btn" data-tab="practice">Practice</button>
    </div>
    <div class="content-card">
      <h3>Flashcard Mode</h3>
      <p class="lesson-text" style="margin-bottom:12px">Click a card to reveal / hide the answer.</p>
      <div style="display:flex;gap:6px;margin-bottom:14px">
        <button class="btn btn-sm btn-secondary" id="showAll">Show All</button>
        <button class="btn btn-sm btn-secondary" id="hideAll">Hide All</button>
      </div>
      <div class="memo-grid">
        ${t.memoData.map((m, i) => `
          <div class="memo-card hide" data-mi="${i}">
            <div class="mk">${m.key}</div>
            <div class="mv">${m.value}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="action-row">
      <button class="btn btn-secondary" data-topic="${t.id}">← Back</button>
      ${t.practiceGenerator ? `<button class="btn btn-primary" data-practice="${t.id}">Practice →</button>` : ''}
    </div>
  </div>`;
}

// ── Practice Setup ────────────────────────────────────────────────
function practicePage() {
  const t = getTopicById(topicId);
  if (!t?.practiceGenerator) return '<div class="empty-state"><h3>Practice Coming Soon</h3></div>';
  const medal = progressStore.getMedal(t.id);

  return `
  <div>
    <div class="breadcrumbs">
      <span class="crumb" data-go="dashboard">Modules</span>
      <span class="crumb-sep">›</span>
      <span class="crumb" data-topic="${t.id}">${t.title}</span>
      <span class="crumb-sep">›</span>
      <span class="crumb current">Practice</span>
    </div>
    <div class="tab-bar">
      <button class="tab-btn" data-tab="learn">Learn</button>
      ${t.memoData ? '<button class="tab-btn" data-tab="memorize">Memorize</button>' : ''}
      <button class="tab-btn active" data-tab="practice">Practice</button>
    </div>

    <div class="practice-center">
      <div class="setup-card">
        <h3>${t.title}</h3>
        <p class="sub">10 questions per session. Earn medals by going 10/10!</p>

        <div class="medal-targets">
          <div class="medal-target ${medal === 'gold' ? 'achieved' : ''}">
            <span class="mt-icon">🥇</span>
            <div class="mt-info">
              <span class="mt-title">Gold</span>
              <span class="mt-desc">10/10 on Competition (10s)</span>
            </div>
            ${medal === 'gold' ? '<span class="mt-check">✓</span>' : ''}
          </div>
          <div class="medal-target ${medal === 'silver' || medal === 'gold' ? 'achieved' : ''}">
            <span class="mt-icon">🥈</span>
            <div class="mt-info">
              <span class="mt-title">Silver</span>
              <span class="mt-desc">10/10 on Learning (20s)</span>
            </div>
            ${medal === 'silver' || medal === 'gold' ? '<span class="mt-check">✓</span>' : ''}
          </div>
          <div class="medal-target ${medal ? 'achieved' : ''}">
            <span class="mt-icon">🥉</span>
            <div class="mt-info">
              <span class="mt-title">Bronze</span>
              <span class="mt-desc">10/10 on Untimed</span>
            </div>
            ${medal ? '<span class="mt-check">✓</span>' : ''}
          </div>
        </div>

        <div class="config-group">
          <span class="config-label">Choose Your Practice Mode</span>
          <div class="mode-grid">
            <button class="mode-btn" data-mode="untimed">
              <span class="mode-medal">🥉</span>
              <span class="mode-name">Untimed</span>
              <span class="mode-detail">No timer, focus on accuracy</span>
            </button>
            <button class="mode-btn" data-mode="learning">
              <span class="mode-medal">🥈</span>
              <span class="mode-name">Learning</span>
              <span class="mode-detail">20 seconds per question</span>
            </button>
            <button class="mode-btn active" data-mode="competition">
              <span class="mode-medal">🥇</span>
              <span class="mode-name">Competition</span>
              <span class="mode-detail">10 seconds per question</span>
            </button>
            <button class="mode-btn" data-mode="custom">
              <span class="mode-medal">⚙</span>
              <span class="mode-name">Custom</span>
              <span class="mode-detail">Set your own timer</span>
            </button>
          </div>
        </div>

        <div class="custom-time-row" id="customTimeRow" style="display:none">
          <span class="config-label">Seconds per question</span>
          <input type="number" class="custom-time-input" id="customTimeInput" value="${customTime}" min="3" max="120" />
        </div>

        <button class="btn btn-primary btn-lg btn-block" id="startBtn">Begin Practice →</button>
      </div>
    </div>
  </div>`;
}

// ── Session ───────────────────────────────────────────────────────
function sessionPage() {
  if (!session) return '';
  const { questions, idx, answers, mode, timer, streak } = session;
  const q = questions[idx];
  const pct = (idx / questions.length) * 100;
  const ans = answers[idx];
  const hasTimer = mode !== 'untimed';

  return `
  <div class="session-container">
    <div class="session-top">
      <div class="session-progress">
        <div class="session-progress-info">
          <span>Question ${idx + 1} / ${questions.length}</span>
          <span class="streak-indicator">${streak > 0 ? `${streak} streak` : ''}</span>
          <span>${answers.filter(a => a?.correct).length} correct</span>
        </div>
        <div class="session-progress-bar">
          <div class="session-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
      ${hasTimer ? `
        <div class="session-timer${timer<=3?' timer-crit':timer<=5?' timer-warn':''}" id="timer">${timer}s</div>
      ` : ''}
    </div>

    <div class="q-card${ans?(ans.correct?' q-correct':' q-wrong'):''}">
      <div class="q-num">Question ${idx + 1}</div>
      <div class="q-text">${q.question}</div>
      <div class="answer-row">
        <input type="text" class="answer-field${ans?(ans.correct?' correct':' wrong'):''}"
          id="answerInput" placeholder="Your answer…"
          ${ans ? 'disabled' : ''} value="${ans ? ans.given : ''}" autocomplete="off" />
        ${!ans ? '<button class="btn btn-primary" id="submitBtn">Submit</button>' : ''}
      </div>
      ${ans ? `
        <div class="fb ${ans.correct?'ok':'no'}">
          ${ans.correct ? '✓ Correct!' : `✗ Incorrect — Answer: ${ans.expected}`}
        </div>
        <div class="next-hint">Press Enter or Space for next</div>
      ` : ''}
    </div>

    <div class="session-btns">
      ${!ans ? `<button class="btn btn-ghost btn-sm" id="skipBtn">Skip</button>` : ''}
      <button class="btn btn-ghost btn-sm" id="endBtn">End Session</button>
    </div>
  </div>`;
}

// ── Interstitial ──────────────────────────────────────────────────
function interstitialPage() {
  if (!session) return '';
  const { newMedal, topicId, answers } = session;
  const t = getTopicById(topicId);
  const correct = answers.slice(0, 10).filter(a => a?.correct).length;
  
  return `
  <div class="session-container">
    <div class="results-card${newMedal ? ` new-medal-${newMedal}` : ''}">
      ${newMedal ? `
        <div class="medal-earned-banner ${newMedal}">
          <div class="medal-earned-icon">${newMedal === 'gold' ? '🥇' : newMedal === 'silver' ? '🥈' : '🥉'}</div>
          <div class="medal-earned-text">
            <strong>${newMedal.charAt(0).toUpperCase() + newMedal.slice(1)} Medal Earned!</strong>
            <span>${t ? t.title : ''}</span>
          </div>
        </div>
      ` : `
        <h3>${correct === 10 ? 'Perfect 10/10!' : `10 Questions Complete — ${correct}/10`}</h3>
      `}
      <p class="sub">Would you like to keep practicing this topic endlessly, or view your full results?</p>
      
      <div class="results-actions">
        <button class="btn btn-primary" id="continueEndlessBtn">Keep Practicing (Endless)</button>
        <button class="btn btn-secondary" id="endSessionBtnFromInter">Finish & View Results</button>
      </div>
    </div>
  </div>`;
}

// ── Results ───────────────────────────────────────────────────────
function resultsPage() {
  if (!session) return '';
  const { questions, answers, topicId: tid, mode, newMedal } = session;
  const t = getTopicById(tid);
  const correct = answers.filter(a => a?.correct).length;
  const wrong = answers.filter(a => a && !a.correct).length;
  const skipped = answers.filter(a => !a).length;
  const score = correct * 5 - (wrong + skipped) * 4;
  const acc = questions.length ? Math.round(correct / questions.length * 100) : 0;
  const perfect = correct === questions.length && questions.length >= 10;

  const modeLabel = mode === 'competition' ? 'Competition (10s)' : mode === 'learning' ? 'Learning (20s)' : mode === 'untimed' ? 'Untimed' : 'Custom';

  return `
  <div class="session-container">
    <div class="breadcrumbs">
      <span class="crumb" data-go="dashboard">Modules</span>
      <span class="crumb-sep">›</span>
      <span class="crumb current">Results</span>
    </div>

    <div class="results-card${newMedal ? ` new-medal-${newMedal}` : ''}">
      ${newMedal ? `
        <div class="medal-earned-banner ${newMedal}">
          <div class="medal-earned-icon">${newMedal === 'gold' ? '🥇' : newMedal === 'silver' ? '🥈' : '🥉'}</div>
          <div class="medal-earned-text">
            <strong>${newMedal.charAt(0).toUpperCase() + newMedal.slice(1)} Medal Earned!</strong>
            <span>${t ? t.title : ''}</span>
          </div>
        </div>
      ` : `
        <h3>Session Complete! — ${acc >= 80 ? 'Great Job!' : acc >= 60 ? 'Good Effort!' : acc >= 40 ? 'Keep Practicing!' : "Don't Give Up!"}</h3>
      `}
      <p class="sub">${t ? t.title : 'Practice'} — ${modeLabel} — ${questions.length > 100 ? (session.idx+1) : questions.length} Questions</p>

      <div class="results-grid">
        <div class="result-box"><div class="rval green">${correct}</div><div class="rlbl">Correct (+${correct*5})</div></div>
        <div class="result-box"><div class="rval red">${wrong + skipped}</div><div class="rlbl">Wrong/Skip (${(wrong+skipped)*-4})</div></div>
        <div class="result-box"><div class="rval blue">${score}</div><div class="rlbl">NS Score</div></div>
      </div>

      ${perfect && !newMedal ? `
        <div class="tip-block" style="margin:16px 0;text-align:left">
          <span class="tip-ico">→</span>
          <span>Perfect score! Try a harder mode to earn a higher medal.</span>
        </div>
      ` : ''}

      <div class="breakdown">
        <h4>Problem Breakdown</h4>
        ${questions.map((q, i) => {
          const a = answers[i];
          const ok = a?.correct;
          return `
          <div class="bd-row ${ok?'ok-row':'no-row'}">
            <span class="bd-ico">${ok?'✓':'✗'}</span>
            <span class="bd-q">${q.question}</span>
            <span class="bd-a" style="color:${ok?'var(--accent-success)':'var(--accent-danger)'}">
              ${a ? (ok ? a.given : `${a.given} → ${a.expected}`) : `skip → ${q.answer}`}
            </span>
          </div>`;
        }).join('')}
      </div>

      <div class="results-actions">
        <button class="btn btn-primary" data-practice="${tid}">Practice Again</button>
        <button class="btn btn-secondary" data-topic="${tid}">Back to Topic</button>
        <button class="btn btn-ghost" data-go="dashboard">Dashboard</button>
      </div>
    </div>
  </div>`;
}

// ── Event Binding ─────────────────────────────────────────────────
function bind() {
  // Level
  document.querySelectorAll('[data-level]').forEach(el =>
    el.addEventListener('click', () => progressStore.setLevel(el.dataset.level)));

  // Navigation
  document.querySelectorAll('[data-go]').forEach(el =>
    el.addEventListener('click', () => { view = el.dataset.go; topicId = null; session = null; activeCat = 'all'; render(); }));

  // Topic
  document.querySelectorAll('[data-topic]').forEach(el =>
    el.addEventListener('click', () => { topicId = el.dataset.topic; view = 'learn'; render(); scrollTo(0,0); }));

  // Tabs
  document.querySelectorAll('[data-tab]').forEach(el =>
    el.addEventListener('click', () => {
      view = el.dataset.tab === 'learn' ? 'learn' : el.dataset.tab === 'memorize' ? 'memorize' : 'practice';
      render();
    }));

  // Start practice link
  document.querySelectorAll('[data-practice]').forEach(el =>
    el.addEventListener('click', () => { topicId = el.dataset.practice; view = 'practice'; render(); }));

  // Category filter pills
  document.querySelectorAll('[data-cat]').forEach(el =>
    el.addEventListener('click', () => { activeCat = el.dataset.cat; render(); }));

  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(el =>
    el.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const row = document.getElementById('customTimeRow');
      if (row) row.style.display = el.dataset.mode === 'custom' ? 'block' : 'none';
    }));

  // Start
  document.getElementById('startBtn')?.addEventListener('click', startSession);

  // Submit
  const submitBtn = document.getElementById('submitBtn');
  const input = document.getElementById('answerInput');
  if (submitBtn && input) {
    const submit = () => { if (input.value.trim()) submitAnswer(input.value.trim()); };
    submitBtn.addEventListener('click', submit);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  }

  // KEYBOARD: Enter/Space to advance after answering
  if (session && session.answers[session.idx]) {
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        document.removeEventListener('keydown', handler);
        nextQuestion();
      }
    };
    document.addEventListener('keydown', handler);
  }

  // Skip
  document.getElementById('skipBtn')?.addEventListener('click', () => {
    const q = session.questions[session.idx];
    session.answers[session.idx] = { given: '(skipped)', expected: String(q.answer), correct: false };
    session.streak = 0;
    clearTimer(); render();
  });

  // End
  document.getElementById('endBtn')?.addEventListener('click', endSession);

  // Interstitial
  document.getElementById('continueEndlessBtn')?.addEventListener('click', () => {
    view = 'session';
    const t = getTopicById(session.topicId);
    const lv = progressStore.data.level;
    let q = t.practiceGenerator(lv);
    let attempts = 0;
    while (session.seen.has(q.question) && attempts < 25) {
      q = t.practiceGenerator(lv);
      attempts++;
    }
    session.seen.add(q.question);
    session.questions.push(q);
    session.answers.push(null);
    session.timer = session.tpq;
    render();
    if (session.tpq) startTimer();
  });

  document.getElementById('endSessionBtnFromInter')?.addEventListener('click', () => {
    view = 'results';
    render();
  });

  // Memo cards
  document.querySelectorAll('.memo-card').forEach(el =>
    el.addEventListener('click', () => { el.classList.toggle('hide'); el.classList.toggle('show'); }));
  document.getElementById('showAll')?.addEventListener('click', () =>
    document.querySelectorAll('.memo-card').forEach(c => { c.classList.remove('hide'); c.classList.add('show'); }));
  document.getElementById('hideAll')?.addEventListener('click', () =>
    document.querySelectorAll('.memo-card').forEach(c => { c.classList.add('hide'); c.classList.remove('show'); }));

  // Mobile
  document.getElementById('menuBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('on');
  });
  document.getElementById('overlay')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('on');
  });

  // Auto-focus
  if (input && !input.disabled) input.focus();
}

// ── Session Logic ─────────────────────────────────────────────────
function startSession() {
  const t = getTopicById(topicId);
  if (!t?.practiceGenerator) return;

  const modeEl = document.querySelector('.mode-btn.active');
  const mode = modeEl?.dataset.mode || 'competition';
  const lv = progressStore.data.level;

  let tpq = null;
  if (mode === 'competition') tpq = 10;
  else if (mode === 'learning') tpq = 20;
  else if (mode === 'custom') {
    const inp = document.getElementById('customTimeInput');
    tpq = Math.max(3, Math.min(120, parseInt(inp?.value) || 15));
    customTime = tpq;
  }

  const count = 10;

  const questions = [];
  const seen = new Set();
  for (let i = 0; i < count; i++) {
    let q = t.practiceGenerator(lv);
    let attempts = 0;
    while (seen.has(q.question) && attempts < 25) {
      q = t.practiceGenerator(lv);
      attempts++;
    }
    seen.add(q.question);
    questions.push(q);
  }

  session = { topicId, questions, seen, idx: 0, answers: new Array(count).fill(null), mode, tpq, timer: tpq, interval: null, streak: 0, newMedal: null, recordedCount: 0, interstitialShown: false };
  view = 'session';
  render();
  if (tpq) startTimer();
}

function submitAnswer(given) {
  if (!session || session.answers[session.idx]) return;
  const q = session.questions[session.idx];
  const expected = String(q.answer);
  const correct = normalize(given) === normalize(expected);
  session.answers[session.idx] = { given, expected, correct };
  if (correct) session.streak++;
  else session.streak = 0;
  clearTimer();
  render();
}

function nextQuestion() {
  if (!session) return;
  session.idx++;
  
  if (session.idx === 10 && !session.interstitialShown) {
    clearTimer();
    session.interstitialShown = true;
    view = 'interstitial';
    
    const correct = session.answers.slice(0, 10).filter(a => a?.correct).length;
    const oldMedal = progressStore.getMedal(session.topicId);
    progressStore.recordSession(session.topicId, correct, 10, session.mode);
    
    const newMedal = progressStore.getMedal(session.topicId);
    session.newMedal = (newMedal !== oldMedal) ? newMedal : null;
    session.recordedCount = 10;
    
    render();
    return;
  }

  if (session.idx >= session.questions.length) {
    const t = getTopicById(session.topicId);
    const lv = progressStore.data.level;
    let q = t.practiceGenerator(lv);
    let attempts = 0;
    while (session.seen.has(q.question) && attempts < 25) {
      q = t.practiceGenerator(lv);
      attempts++;
    }
    session.seen.add(q.question);
    session.questions.push(q);
    session.answers.push(null);
  }

  session.timer = session.tpq;
  render();
  if (session.tpq) startTimer();
}

function endSession() {
  clearTimer();
  if (session) {
    const answered = session.answers.filter(a => a);
    if (answered.length > session.recordedCount) {
      const unrecordedAnswers = answered.slice(session.recordedCount);
      const correct = unrecordedAnswers.filter(a => a.correct).length;
      session.questions = session.questions.slice(0, session.idx + 1);
      session.answers = session.answers.slice(0, session.idx + 1);
      progressStore.recordSession(session.topicId, correct, unrecordedAnswers.length, session.mode);
    }
    view = 'results';
    render();
  }
}

function startTimer() {
  if (!session?.tpq) return;
  session.interval = setInterval(() => {
    session.timer--;
    const el = document.getElementById('timer');
    if (el) {
      el.textContent = `${session.timer}s`;
      el.className = `session-timer${session.timer<=3?' timer-crit':session.timer<=5?' timer-warn':''}`;
    }
    if (session.timer <= 0) {
      clearTimer();
      if (!session.answers[session.idx]) {
        const q = session.questions[session.idx];
        session.answers[session.idx] = { given: '(time up)', expected: String(q.answer), correct: false };
        session.streak = 0;
        render();
      }
    }
  }, 1000);
}

function clearTimer() { if (session?.interval) { clearInterval(session.interval); session.interval = null; } }

function normalize(s) {
  return s.replace(/\s+/g, '').replace(/,/g, '').replace(/°/g, '').replace(/\$/g, '').toLowerCase().trim();
}

// ── Boot ──────────────────────────────────────────────────────────
render();
