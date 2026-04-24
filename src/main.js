/**
 * UIL Number Sense Trainer — Main Application v3
 * Medal-based mastery with keyboard flow
 */
import { TOPICS, CATEGORIES, LEVELS, getTopicsByLevel, getTopicsByCategory, getTopicById } from './data/topics.js';
import { progressStore } from './data/progress.js';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';

// ── State ─────────────────────────────────────────────────────────
let view = 'dashboard';
let topicId = null;
let session = null;
let customTime = 15; // for custom mode

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
      <div class="sidebar-brand-icon">NS</div>
      <div class="sidebar-brand-text">
        <h1>NS Trainer</h1>
        <span>UIL Number Sense</span>
      </div>
    </div>

    <div class="level-selector">
      <label>Competition Level</label>
      <div class="level-pills">
        ${Object.values(LEVELS).map(l => `
          <button class="level-pill${lv===l.id?' active':''}" data-level="${l.id}">${l.label}</button>
        `).join('')}
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-group">
        <div class="nav-group-label">Navigation</div>
        <div class="nav-item${view==='dashboard'?' active':''}" data-go="dashboard">
          <span class="nav-label">Dashboard</span>
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
            <div class="nav-item${topicId===t.id&&view!=='dashboard'?' active':''} ${medalClass(medal)}" data-topic="${t.id}">
              <span class="nav-idx">${i + 1}</span>
              <span class="nav-label">${t.title}</span>
              <span class="nav-medal">${medalIcon(medal)}</span>
            </div>`;
          }).join('')}
        </div>`;
      }).join('')}
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-stat-row"><span class="label">Topics</span><span class="value">${topics.length}</span></div>
      <div class="sidebar-stat-row"><span class="label">🥇 Gold</span><span class="value">${mc.gold}</span></div>
      <div class="sidebar-stat-row"><span class="label">🥈 Silver</span><span class="value">${mc.silver}</span></div>
      <div class="sidebar-stat-row"><span class="label">🥉 Bronze</span><span class="value">${mc.bronze}</span></div>
      <div class="sidebar-stat-row"><span class="label">Accuracy</span><span class="value">${progressStore.getOverallAccuracy()}%</span></div>
    </div>
  </aside>`;
}

// ── Header ────────────────────────────────────────────────────────
function header() {
  const lv = LEVELS[progressStore.data.level];
  let title = 'Dashboard';
  if (view === 'learn' || view === 'memorize' || view === 'practice') {
    const t = getTopicById(topicId);
    title = t ? t.title : 'Topic';
  }
  if (view === 'session') title = 'Practice Session';
  if (view === 'results') title = 'Results';

  return `
  <header class="content-header">
    <div style="display:flex;align-items:center;gap:10px">
      <button class="mobile-toggle" id="menuBtn">☰</button>
      <h2>${title}</h2>
    </div>
    <div class="header-level-tag">${lv.full}</div>
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
    case 'results':   return resultsPage();
    default:          return dashboardPage();
  }
}

// ── Dashboard ─────────────────────────────────────────────────────
function dashboardPage() {
  const lv = progressStore.data.level;
  const topics = getTopicsByLevel(lv);
  const mc = progressStore.getMedalCounts();

  return `
  <div class="overview-bar">
    <div class="overview-left">
      <h2>Number Sense Trainer</h2>
      <p>Master mental math for UIL competition.</p>
    </div>
    <div class="overview-stats">
      <div class="ov-stat"><span class="ov-num">${topics.length}</span><span class="ov-lbl">Topics</span></div>
      <div class="ov-stat"><span class="ov-num">${mc.gold}</span><span class="ov-lbl">Gold</span></div>
      <div class="ov-stat"><span class="ov-num">${progressStore.data.totalPracticed}</span><span class="ov-lbl">Solved</span></div>
      <div class="ov-stat"><span class="ov-num">${progressStore.getOverallAccuracy()}%</span><span class="ov-lbl">Accuracy</span></div>
    </div>
  </div>

  ${Object.values(CATEGORIES).map(cat => {
    const ts = getTopicsByCategory(cat.id, lv);
    if (!ts.length) return '';
    return `
    <div class="cat-header">
      <h3>${cat.title}</h3>
      <span class="cat-count">${ts.length}</span>
    </div>
    <div class="topic-list">
      ${ts.map((t, i) => {
        const medal = progressStore.getMedal(t.id);
        const stats = progressStore.getStats(t.id);
        const statusText = medal
          ? (medal === 'gold' ? 'Gold' : medal === 'silver' ? 'Silver' : 'Bronze')
          : (stats.practiceCount > 0 ? `${stats.correctCount}/${stats.practiceCount}` : 'Not started');
        const statusCls = medal
          ? `status-${medal}`
          : (stats.practiceCount > 0 ? 'status-started' : 'status-new');
        return `
        <div class="topic-row ${medalClass(medal)}" data-topic="${t.id}">
          <span class="topic-num">${i + 1}</span>
          <div class="topic-info">
            <span class="topic-name">${t.title}</span>
            <span class="topic-desc">${t.description}</span>
          </div>
          <div class="topic-meta">
            <span class="topic-medal-icon">${medalIcon(medal)}</span>
            <span class="topic-status ${statusCls}">${statusText}</span>
          </div>
          <span class="topic-arrow">›</span>
        </div>`;
      }).join('')}
    </div>`;
  }).join('')}`;
}

// ── Learn Page ────────────────────────────────────────────────────
function learnPage() {
  const t = getTopicById(topicId);
  if (!t) return '<div class="empty-state"><h3>Topic not found</h3></div>';
  const medal = progressStore.getMedal(t.id);

  return `
  <div class="learn-container">
    <div class="breadcrumbs">
      <span class="crumb" data-go="dashboard">Dashboard</span>
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

    <div class="content-card">
      <h3>Section ${t.section}: ${t.title}</h3>
      <div class="lesson-text">${t.lesson}</div>
    </div>

    ${t.examples.length ? `
    <div class="content-card">
      <h3>Worked Examples</h3>
      ${t.examples.map((ex, i) => `
        <div class="example-block">
          <div class="example-label">Example ${i + 1}</div>
          <div class="example-problem">${ex.problem}</div>
          ${ex.steps.map(s => `<div class="example-step">${s}</div>`).join('')}
          <div class="example-answer">Answer: ${ex.answer}</div>
        </div>
      `).join('')}
    </div>` : ''}

    <div class="tip-block">
      <span class="tip-ico">→</span>
      <span>Practice to earn medals! Get 10/10 on <strong>Untimed</strong> for Bronze, <strong>Learning (20s)</strong> for Silver, and <strong>Competition (10s)</strong> for Gold.</span>
    </div>

    <div class="action-row">
      <button class="btn btn-secondary" data-go="dashboard">← Dashboard</button>
      ${t.practiceGenerator ? `<button class="btn btn-primary" data-practice="${t.id}">Practice →</button>` : ''}
    </div>
  </div>`;
}

// ── Memorize ──────────────────────────────────────────────────────
function memorizePage() {
  const t = getTopicById(topicId);
  if (!t?.memoData) return '<div class="empty-state"><h3>No flashcard data</h3></div>';

  return `
  <div class="learn-container">
    <div class="breadcrumbs">
      <span class="crumb" data-go="dashboard">Dashboard</span>
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
  <div class="learn-container">
    <div class="breadcrumbs">
      <span class="crumb" data-go="dashboard">Dashboard</span>
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
          <span class="config-label">Mode</span>
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
        
        <div class="config-group" style="margin-top:20px;">
          <span class="config-label"># Questions</span>
          <div class="mode-grid">
            <button class="count-btn active" data-count="10">10 <span>(Medals)</span></button>
            <button class="count-btn" data-count="25">25</button>
            <button class="count-btn" data-count="50">50</button>
            <button class="count-btn" data-count="999">Endless</button>
          </div>
        </div>

        <div class="custom-time-row" id="customTimeRow" style="display:none">
          <span class="config-label">Seconds per question</span>
          <input type="number" class="custom-time-input" id="customTimeInput" value="${customTime}" min="3" max="120" />
        </div>

        <button class="btn btn-primary btn-lg btn-block" id="startBtn">Start Practice →</button>
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
          id="answerInput" placeholder="Answer…"
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
      <span class="crumb" data-go="dashboard">Dashboard</span>
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
        <h3>Session Complete! — ${acc >= 80 ? 'Great Job!' : acc >= 60 ? 'Good Effort!' : acc >= 40 ? 'Keep Practicing!' : 'Don\'t Give Up!'}</h3>
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
    el.addEventListener('click', () => { view = el.dataset.go; topicId = null; session = null; render(); }));

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

  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(el =>
    el.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const row = document.getElementById('customTimeRow');
      if (row) row.style.display = el.dataset.mode === 'custom' ? 'block' : 'none';
    }));

  // Count buttons
  document.querySelectorAll('.count-btn').forEach(el =>
    el.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
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

  const countBtn = document.querySelector('.count-btn.active');
  const count = parseInt(countBtn?.dataset.count) || 10;

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

  session = { topicId, questions, idx: 0, answers: new Array(count).fill(null), mode, tpq, timer: tpq, interval: null, streak: 0, newMedal: null };
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
  if (session.idx >= session.questions.length) {
    finishSession();
  } else {
    session.timer = session.tpq;
    render();
    if (session.tpq) startTimer();
  }
}

function finishSession() {
  clearTimer();
  view = 'results';
  const correct = session.answers.filter(a => a?.correct).length;
  const oldMedal = progressStore.getMedal(session.topicId);

  progressStore.recordSession(session.topicId, correct, session.questions.length, session.mode);

  const newMedal = progressStore.getMedal(session.topicId);
  session.newMedal = (newMedal !== oldMedal) ? newMedal : null;

  render();
}

function endSession() {
  clearTimer();
  if (session) {
    const answered = session.answers.filter(a => a);
    if (answered.length) {
      const correct = answered.filter(a => a.correct).length;
      session.questions = session.questions.slice(0, session.idx + 1);
      session.answers = session.answers.slice(0, session.idx + 1);
      progressStore.recordSession(session.topicId, correct, answered.length, session.mode);
    }
    session.newMedal = null;
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
