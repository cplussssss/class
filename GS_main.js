/* ============================================================
   GS_main.js  —  AI 命理預測實驗報告
   功能：i18n 切換、Chart.js 圖表、週切換、TTS 朗讀
   ============================================================ */

'use strict';

/* ── 1. State ───────────────────────────────────────────────── */
let currentLang = 'zh';
let currentWeek = 'w1';
let ttsUtterance = null;
const CHART_INSTANCES = {};

/* ── 2. i18n ────────────────────────────────────────────────── */
function getNestedLabel(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

function applyI18n(lang) {
  const L = LABELS[lang];
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
  document.title = L.title;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getNestedLabel(L, key);
    if (val !== null && typeof val === 'string') el.textContent = val;
  });

  document.querySelectorAll('.week-toggle button').forEach((btn, i) => {
    btn.textContent = L.accuracy.weekLabel[i];
  });

  document.getElementById('langToggle').textContent = L.langToggle;
  renderStudentCards(lang);
  renderStyleGrid(lang);
}

/* ── 3. Chart.js 設定 ───────────────────────────────────────── */
const AI_COLOR = { gemini: '#4285f4', claude: '#d97706', gpt: '#10a37f' };
const GRID_COL = '#e8e0d4';

Chart.defaults.font.family = "'IBM Plex Mono', monospace";
Chart.defaults.font.size   = 10;
Chart.defaults.color       = '#888';

function buildLineData(ai, week) {
  const preds   = PERSONS.map(p => SCORE_DATA[p][ai][week].pred);
  const actuals = PERSONS.map(p => SCORE_DATA[p][ai][week].actual);
  return {
    labels: PERSONS,
    datasets: [
      {
        label: currentLang === 'zh' ? 'AI 預測' : 'AI Predicted',
        data: preds,
        borderColor: AI_COLOR[ai],
        borderDash: [5, 4],
        borderWidth: 2,
        pointRadius: 4,
        pointBorderColor: AI_COLOR[ai],
        pointBackgroundColor: '#fff',
        tension: 0.3,
        fill: false,
      },
      {
        label: currentLang === 'zh' ? '實際體感' : 'Actual Score',
        data: actuals,
        borderColor: AI_COLOR[ai],
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: AI_COLOR[ai],
        tension: 0.3,
        fill: false,
      },
    ],
  };
}

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    x: { grid: { color: GRID_COL }, ticks: { maxRotation: 0 } },
    y: { min: 40, max: 100, grid: { color: GRID_COL }, ticks: { stepSize: 20 } },
  },
};

/* ── 4. initCharts ──────────────────────────────────────────── */
function initCharts() {
  const idMap = { gemini: 'chartGemini', claude: 'chartClaude', gpt: 'chartGPT' };
  ['gemini', 'claude', 'gpt'].forEach(ai => {
    const canvas = document.getElementById(idMap[ai]);
    if (!canvas) return;
    if (CHART_INSTANCES[ai]) CHART_INSTANCES[ai].destroy();
    CHART_INSTANCES[ai] = new Chart(canvas, {
      type: 'line',
      data: buildLineData(ai, currentWeek),
      options: JSON.parse(JSON.stringify(CHART_OPTS)),
    });
  });
}

/* ── 5. updateCharts (週切換) ───────────────────────────────── */
function updateCharts(week) {
  currentWeek = week;
  ['gemini', 'claude', 'gpt'].forEach(ai => {
    if (!CHART_INSTANCES[ai]) return;
    CHART_INSTANCES[ai].data = buildLineData(ai, week);
    CHART_INSTANCES[ai].update('active');
  });
}

/* ── 6. renderDiffBars ──────────────────────────────────────── */
function renderDiffBars() {
  const wrap = document.getElementById('diffBars');
  if (!wrap) return;
  const maxVal = 20;
  const items = [
    { ai: 'gpt',    val: AVG_ABS_DIFF.gpt    },
    { ai: 'gemini', val: AVG_ABS_DIFF.gemini  },
    { ai: 'claude', val: AVG_ABS_DIFF.claude  },
  ];
  const labels = { gemini: 'Gemini', claude: 'Claude', gpt: 'ChatGPT' };

  wrap.innerHTML = items.map(({ ai, val }) => `
    <div class="diff-bar-row">
      <span class="diff-bar-label">${labels[ai]}</span>
      <div class="diff-bar-track" role="img" aria-label="${labels[ai]}: ${val}">
        <div class="diff-bar-fill ${ai}" style="width:0%" data-target="${(val/maxVal*100).toFixed(1)}%"></div>
        <span class="diff-bar-val">${val}</span>
      </div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    document.querySelectorAll('.diff-bar-fill').forEach(el => {
      el.style.width = el.dataset.target;
    });
  });
}

/* ── 7. initTrustChart ──────────────────────────────────────── */
function initTrustChart() {
  const canvas = document.getElementById('chartTrust');
  if (!canvas) return;
  if (CHART_INSTANCES.trust) CHART_INSTANCES.trust.destroy();

  const counts = [0, 0, 0, 0, 0];
  TRUST_SCORES.forEach(s => counts[s - 1]++);

  CHART_INSTANCES.trust = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{
        data: counts,
        backgroundColor: ['#c0392b', '#e67e22', '#f1c40f', '#27ae60', '#2980b9'],
        borderWidth: 2,
        borderColor: '#f9f6f0',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 12, boxWidth: 12 } },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.label} 分：${ctx.raw} 人` },
        },
      },
      cutout: '58%',
    },
  });
}

/* ── 8. Student cards ───────────────────────────────────────── */
function renderStudentCards(lang) {
  const L = LABELS[lang];
  const wrap = document.getElementById('studentCards');
  if (!wrap) return;
  wrap.innerHTML = STUDENT_VOICES.map(v => `
    <div class="student-card">
      <div class="card-header">
        <span>${v.id}</span>
        <span class="trust-badge">★ ${v.trust}</span>
      </div>
      <div class="card-body">
        <div class="card-row">
          <span class="card-tag">${L.voices.hitLabel}</span>
          <p class="card-text hit-text">${v.hit[lang]}</p>
        </div>
        <div class="card-row">
          <span class="card-tag">${L.voices.missLabel}</span>
          <p class="card-text miss-text">${v.miss[lang]}</p>
        </div>
        <div class="card-row">
          <span class="card-tag">${L.voices.changeLabel}</span>
          <p class="card-text change-text">${v.change[lang]}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── 9. Style grid ──────────────────────────────────────────── */
function renderStyleGrid(lang) {
  const L = LABELS[lang].styles;
  const wrap = document.getElementById('styleGrid');
  if (!wrap) return;
  const ais = [
    { label: 'Gemini',  headClass: 'gemini-head', tags: L.geminiTags },
    { label: 'Claude',  headClass: 'claude-head', tags: L.claudeTags },
    { label: 'ChatGPT', headClass: 'gpt-head',    tags: L.gptTags },
  ];
  wrap.innerHTML = ais.map(({ label, headClass, tags }) => `
    <div class="style-card">
      <div class="style-head ${headClass}"><span>${label}</span></div>
      <div class="style-tags">
        ${tags.map(t => `<span class="style-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ── 10. TTS ────────────────────────────────────────────────── */
function speak(text) {
  if (!window.speechSynthesis) { alert('您的瀏覽器不支援語音功能'); return; }
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.querySelectorAll('.read-btn.speaking').forEach(b => b.classList.remove('speaking'));
    return;
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = currentLang === 'zh' ? 'zh-TW' : 'en-US';
  utter.rate = 0.92;
  ttsUtterance = utter;
  utter.onend = () => document.querySelectorAll('.read-btn.speaking').forEach(b => b.classList.remove('speaking'));
  window.speechSynthesis.speak(utter);
}

function bindReadBtn(btnId, textKey) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const text = getNestedLabel(LABELS[currentLang], textKey);
    if (text) { btn.classList.toggle('speaking'); speak(text); }
  });
}

/* ── 11. Scroll spy ─────────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-inner a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
}

/* ── 12. Init ───────────────────────────────────────────────── */
function init() {
  applyI18n(currentLang);
  initCharts();
  renderDiffBars();
  initTrustChart();

  bindReadBtn('readChartNote', 'accuracy.chartNote');
  bindReadBtn('readDiffNote',  'accuracy.diffNote');
  bindReadBtn('readTrustNote', 'trust.note');
  bindReadBtn('readVoiceNote', 'voices.summaryNote');
  bindReadBtn('readStyleNote', 'styles.note');

  document.querySelectorAll('.week-toggle button').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.week-toggle button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateCharts(this.dataset.week);
    });
  });

  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyI18n(currentLang);
    updateCharts(currentWeek);
    initTrustChart();
  });

  initScrollSpy();
}

document.addEventListener('DOMContentLoaded', init);