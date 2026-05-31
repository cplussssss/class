/* ============================================================
   main.js  —  AI 命理預測實驗報告
   功能：i18n 切換、Python 預產圖表（base64）、週切換、TTS 朗讀
   ============================================================ */

'use strict';

/* ── 1. State ───────────────────────────────────────────────── */
let currentLang = 'zh';
let currentWeek = 'w1';
let ttsUtterance = null;

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

  // week toggle buttons
  const btns = document.querySelectorAll('.week-toggle button');
  btns.forEach((btn, i) => { btn.textContent = L.accuracy.weekLabel[i]; });

  // lang toggle button text
  document.getElementById('langToggle').textContent = L.langToggle;

  // student cards
  renderStudentCards(lang);
  // style section
  renderStyleGrid(lang);
}

/* ── 3. Charts ──────────────────────────────────────────────── */
const PERSONS = ['P1','P2','P3','P4','P5','P6','P7','P8'];
const AI_COLOR = { gemini: '#4285f4', claude: '#d97706', gpt: '#10a37f' };

const CSS = getComputedStyle(document.documentElement);
const INK_MID   = '#888';
const INK       = '#1a1a1a';
const GRID_COL  = '#e8e0d4';


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

function initCharts() {
  updateCharts(currentWeek);
}

function updateCharts(week) {
  currentWeek = week;
  const idMap = { gemini: 'chartGemini', claude: 'chartClaude', gpt: 'chartGPT' };
  ['gemini', 'claude', 'gpt'].forEach(ai => {
    const key = ai + '_' + week;
    let img = document.getElementById('img_' + ai);
    if (!img) {
      const canvas = document.getElementById(idMap[ai]);
      if (!canvas) return;
      img = document.createElement('img');
      img.id = 'img_' + ai;
      img.style.cssText = 'width:100%;display:block;border-radius:2px;';
      canvas.parentNode.replaceChild(img, canvas);
    }
    img.src = CHART_IMGS[key];
    img.alt = ai + ' ' + week + ' chart';
  });
}

/* ── 4. Diff bars ───────────────────────────────────────────── */
function renderDiffBars() {
  const wrap = document.getElementById('diffBars');
  if (!wrap) return;
  wrap.innerHTML = `<img src="${CHART_IMGS['diff']}" alt="Mean absolute error bar chart"
    style="width:100%;max-width:460px;display:block;border-radius:2px;">`;
}

/* ── 5. Trust donut ─────────────────────────────────────────── */
function initTrustChart() {
  const canvas = document.getElementById('chartTrust');
  if (!canvas) return;
  let img = document.getElementById('img_trust');
  if (!img) {
    img = document.createElement('img');
    img.id = 'img_trust';
    img.style.cssText = 'width:100%;max-width:280px;display:block;margin:0 auto;border-radius:2px;';
    canvas.parentNode.replaceChild(img, canvas);
  }
  img.src = CHART_IMGS['trust'];
  img.alt = 'Trust distribution chart';
}

/* ── 6. Student cards ───────────────────────────────────────── */
function renderStudentCards(lang) {
  const L = LABELS[lang];
  const wrap = document.getElementById('studentCards');
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

/* ── 7. Style grid ──────────────────────────────────────────── */
function renderStyleGrid(lang) {
  const L = LABELS[lang].styles;
  const wrap = document.getElementById('styleGrid');
  const ais = [
    { key: 'gemini', label: 'Gemini', headClass: 'gemini-head', tags: L.geminiTags },
    { key: 'claude', label: 'Claude', headClass: 'claude-head', tags: L.claudeTags },
    { key: 'gpt',    label: 'ChatGPT', headClass: 'gpt-head',  tags: L.gptTags },
  ];
  wrap.innerHTML = ais.map(({ label, headClass, tags }) => `
    <div class="style-card">
      <div class="style-head ${headClass}">
        <span>${label}</span>
      </div>
      <div class="style-tags">
        ${tags.map(t => `<span class="style-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ── 8. TTS ──────────────────────────────────────────────────
   中文：播放預錄 mp3（audio/ 資料夾）
   英文：Web Speech API
   ──────────────────────────────────────────────────────────── */

// mp3 檔名對應表（中文）
const AUDIO_FILES = {
  'accuracy.chartNote': 'audio/chart_zh.mp3',
  'accuracy.diffNote':  'audio/diff_zh.mp3',
  'trust.note':         'audio/trust_zh.mp3',
  'voices.summaryNote': 'audio/voices_zh.mp3',
  'styles.note':        'audio/styles_zh.mp3',
};

let currentAudio = null; // 追蹤目前播放中的 Audio 物件

function stopAll() {
  // 停止 mp3
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  // 停止 Web Speech
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  document.querySelectorAll('.read-btn.speaking').forEach(b => b.classList.remove('speaking'));
}

function speakZh(audioFile, btn) {
  // 如果已經在播，就停止
  if (currentAudio) { stopAll(); return; }

  const audio = new Audio(audioFile);
  currentAudio = audio;
  btn.classList.add('speaking');

  audio.play().catch(() => {
    // 檔案不存在或無法播放時，fallback 到 Web Speech
    currentAudio = null;
    btn.classList.remove('speaking');
    speakEn(getNestedLabel(LABELS['zh'], btn.dataset.textKey), btn);
  });

  audio.onended = () => {
    currentAudio = null;
    btn.classList.remove('speaking');
  };
}

function speakEn(text, btn) {
  if (!window.speechSynthesis) return;
  if (window.speechSynthesis.speaking) { stopAll(); return; }

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.92;
  btn.classList.add('speaking');
  utter.onend = () => btn.classList.remove('speaking');
  window.speechSynthesis.speak(utter);
}

function bindReadBtn(btnId, textKey) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.dataset.textKey = textKey; // 存起來供 fallback 用

  btn.addEventListener('click', () => {
    // 如果有其他按鈕在播，先全停
    const alreadyPlaying = btn.classList.contains('speaking');
    stopAll();
    if (alreadyPlaying) return; // 再按一次 = 停止

    if (currentLang === 'zh') {
      const file = AUDIO_FILES[textKey];
      if (file) {
        speakZh(file, btn);
      } else {
        // 沒有對應 mp3，fallback Web Speech
        const text = getNestedLabel(LABELS['zh'], textKey);
        if (text) speakEn(text, btn);
      }
    } else {
      const text = getNestedLabel(LABELS['en'], textKey);
      if (text) speakEn(text, btn);
    }
  });
}

/* ── 9. Nav active highlight on scroll ──────────────────────── */
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

/* ── 10. Init ───────────────────────────────────────────────── */
function init() {
  // i18n
  applyI18n(currentLang);

  // Charts
  initCharts();
  renderDiffBars();
  initTrustChart();

  // TTS bindings
  bindReadBtn('readChartNote',  'accuracy.chartNote');
  bindReadBtn('readDiffNote',   'accuracy.diffNote');
  bindReadBtn('readTrustNote',  'trust.note');
  bindReadBtn('readVoiceNote',  'voices.summaryNote');
  bindReadBtn('readStyleNote',  'styles.note');

  // Week toggle
  document.querySelectorAll('.week-toggle button').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.week-toggle button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      updateCharts(this.dataset.week);
    });
  });

  // Language toggle
  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyI18n(currentLang);
    updateCharts(currentWeek); // re-render chart labels
    initTrustChart();
  });

  // Scroll spy
  initScrollSpy();
}

document.addEventListener('DOMContentLoaded', init);

/* ── NOTE: No API key needed ─────────────────────────────────
   語音朗讀使用瀏覽器內建的 Web Speech API（speechSynthesis），
   完全免費，不需要任何 API 金鑰，也不會送出任何資料到外部伺服器。
   支援 Chrome、Edge、Safari（桌機與手機皆可）。
   Firefox 支援度較有限，建議使用 Chrome。
   ──────────────────────────────────────────────────────────── */