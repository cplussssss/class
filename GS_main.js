/* ============================================================
   GS_main.js  —  AI 命理預測實驗報告
   功能：i18n、Chart.js 圖表、週切換、TTS（中文mp3/英文Web Speech）、文字雲
   注意：PERSONS / SCORE_DATA / AVG_ABS_DIFF / TRUST_SCORES /
         STUDENT_VOICES / LABELS 全部在 GS_data.js 宣告，此檔不重複宣告
   ============================================================ */

'use strict';

/* ── 1. State ───────────────────────────────────────────────── */
let currentLang = 'zh';
let currentWeek = 'w1';
const CHART_INSTANCES = {};

/* ── 2. i18n 補丁（cloud 標籤）─────────────────────────────── */
const EXTRA_LABELS = {
  zh: { cloudHeading: '回饋關鍵詞分析', cloudSub: '字體越大代表出現頻率越高' },
  en: { cloudHeading: 'Keyword Analysis', cloudSub: 'Larger text = higher frequency in student feedback' },
};

function getLabel(lang, path) {
  const fromData = path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), LABELS[lang]);
  if (fromData !== null) return fromData;
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), EXTRA_LABELS[lang]);
}

/* ── 3. i18n 套用 ───────────────────────────────────────────── */
function applyI18n(lang) {
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
  document.title = LABELS[lang].title;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = getLabel(lang, el.getAttribute('data-i18n'));
    if (val && typeof val === 'string') el.textContent = val;
  });
  document.querySelectorAll('.week-toggle button').forEach((btn, i) => {
    btn.textContent = LABELS[lang].accuracy.weekLabel[i];
  });
  document.getElementById('langToggle').textContent = LABELS[lang].langToggle;
  renderStudentCards(lang);
  renderWordCloud(lang);
  renderStyleGrid(lang);
}

/* ── 4. Chart.js ────────────────────────────────────────────── */
const AI_COLOR = { gemini: '#4285f4', claude: '#d97706', gpt: '#10a37f' };
const GRID_COL = '#e8e0d4';
Chart.defaults.font.family = "'IBM Plex Mono', monospace";
Chart.defaults.font.size   = 10;
Chart.defaults.color       = '#888';

function buildLineData(ai, week) {
  return {
    labels: PERSONS,
    datasets: [
      {
        label: currentLang === 'zh' ? 'AI 預測' : 'AI Predicted',
        data: PERSONS.map(p => SCORE_DATA[p][ai][week].pred),
        borderColor: AI_COLOR[ai], borderDash: [5,4], borderWidth: 2,
        pointRadius: 4, pointBorderColor: AI_COLOR[ai], pointBackgroundColor: '#fff',
        tension: 0.3, fill: false,
      },
      {
        label: currentLang === 'zh' ? '實際體感' : 'Actual Score',
        data: PERSONS.map(p => SCORE_DATA[p][ai][week].actual),
        borderColor: AI_COLOR[ai], borderWidth: 2,
        pointRadius: 4, pointBackgroundColor: AI_COLOR[ai],
        tension: 0.3, fill: false,
      },
    ],
  };
}

const CHART_OPTS = {
  responsive: true, maintainAspectRatio: true,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    x: { grid: { color: GRID_COL }, ticks: { maxRotation: 0 } },
    y: { min: 40, max: 100, grid: { color: GRID_COL }, ticks: { stepSize: 20 } },
  },
};

function initCharts() {
  const idMap = { gemini: 'chartGemini', claude: 'chartClaude', gpt: 'chartGPT' };
  ['gemini','claude','gpt'].forEach(ai => {
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

function updateCharts(week) {
  currentWeek = week;
  ['gemini','claude','gpt'].forEach(ai => {
    if (!CHART_INSTANCES[ai]) return;
    CHART_INSTANCES[ai].data = buildLineData(ai, week);
    CHART_INSTANCES[ai].update('active');
  });
}

/* ── 5. 誤差長條圖 ──────────────────────────────────────────── */
function renderDiffBars() {
  const wrap = document.getElementById('diffBars');
  if (!wrap) return;
  const items = [
    { ai:'gpt',    val: AVG_ABS_DIFF.gpt    },
    { ai:'gemini', val: AVG_ABS_DIFF.gemini  },
    { ai:'claude', val: AVG_ABS_DIFF.claude  },
  ];
  const lbl = { gemini:'Gemini', claude:'Claude', gpt:'ChatGPT' };
  wrap.innerHTML = items.map(({ ai, val }) => `
    <div class="diff-bar-row">
      <span class="diff-bar-label">${lbl[ai]}</span>
      <div class="diff-bar-track">
        <div class="diff-bar-fill ${ai}" style="width:0%" data-target="${(val/20*100).toFixed(1)}%"></div>
        <span class="diff-bar-val">${val}</span>
      </div>
    </div>`).join('');
  requestAnimationFrame(() => {
    document.querySelectorAll('.diff-bar-fill').forEach(el => { el.style.width = el.dataset.target; });
  });
}

/* ── 6. 信任圓餅圖 ──────────────────────────────────────────── */
function initTrustChart() {
  const canvas = document.getElementById('chartTrust');
  if (!canvas) return;
  if (CHART_INSTANCES.trust) CHART_INSTANCES.trust.destroy();
  const counts = [0,0,0,0,0];
  TRUST_SCORES.forEach(s => counts[s-1]++);
  CHART_INSTANCES.trust = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['1','2','3','4','5'],
      datasets: [{
        data: counts,
        backgroundColor: ['#c0392b','#e67e22','#f1c40f','#27ae60','#2980b9'],
        borderWidth: 2, borderColor: '#f9f6f0',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 12, boxWidth: 12 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label} 分：${ctx.raw} 人` } },
      },
      cutout: '58%',
    },
  });
}

/* ── 7. 學生卡片 ────────────────────────────────────────────── */
function renderStudentCards(lang) {
  const L = LABELS[lang];
  const wrap = document.getElementById('studentCards');
  if (!wrap) return;
  wrap.innerHTML = STUDENT_VOICES.map(v => `
    <div class="student-card">
      <div class="card-header">
        <span>${v.id}</span><span class="trust-badge">★ ${v.trust}</span>
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
    </div>`).join('');
}

/* ── 8. 文字雲 ──────────────────────────────────────────────── */
const WORD_CLOUD_DATA = [
  { zh:'Gemini',  en:'Gemini',      freq:13, cat:'ai'     },
  { zh:'Claude',  en:'Claude',      freq:7,  cat:'ai'     },
  { zh:'睡眠',    en:'Sleep',       freq:5,  cat:'health' },
  { zh:'熬夜',    en:'Late nights', freq:5,  cat:'health' },
  { zh:'朋友',    en:'Friends',     freq:5,  cat:'social' },
  { zh:'ChatGPT', en:'ChatGPT',     freq:5,  cat:'ai'     },
  { zh:'符合',    en:'Accurate',    freq:5,  cat:'eval'   },
  { zh:'腸胃',    en:'Digestion',   freq:3,  cat:'health' },
  { zh:'人際',    en:'Social',      freq:3,  cat:'social' },
  { zh:'面試',    en:'Interview',   freq:3,  cat:'work'   },
  { zh:'投資',    en:'Investment',  freq:3,  cat:'work'   },
  { zh:'心情',    en:'Mood',        freq:3,  cat:'health' },
  { zh:'圖表',    en:'Charts',      freq:3,  cat:'ai'     },
  { zh:'貼近',    en:'Relatable',   freq:3,  cat:'eval'   },
  { zh:'頭痛',    en:'Headache',    freq:2,  cat:'health' },
  { zh:'過敏',    en:'Allergy',     freq:2,  cat:'health' },
  { zh:'社交',    en:'Socialising', freq:2,  cat:'social' },
  { zh:'戀愛',    en:'Romance',     freq:2,  cat:'social' },
  { zh:'早睡',    en:'Early sleep', freq:2,  cat:'health' },
  { zh:'皮膚',    en:'Skin',        freq:1,  cat:'health' },
  { zh:'考試',    en:'Exam',        freq:1,  cat:'work'   },
  { zh:'財運',    en:'Finances',    freq:1,  cat:'work'   },
  { zh:'焦慮',    en:'Anxiety',     freq:1,  cat:'health' },
  { zh:'情緒',    en:'Emotion',     freq:1,  cat:'health' },
  { zh:'飲食',    en:'Diet',        freq:1,  cat:'health' },
  { zh:'排版',    en:'Layout',      freq:1,  cat:'ai'     },
  { zh:'籠統',    en:'Vague',       freq:1,  cat:'eval'   },
];
const CAT_COLOR = { ai:'#4285f4', health:'#8b3a3a', social:'#2a5f8b', work:'#555', eval:'#2a7a4f' };

function renderWordCloud(lang) {
  const wrap = document.getElementById('wordCloud');
  if (!wrap) return;
  const words = [...WORD_CLOUD_DATA].sort((a,b) => b.freq - a.freq);
  const maxF = Math.max(...words.map(w => w.freq));
  const minF = Math.min(...words.map(w => w.freq));
  wrap.innerHTML = words.map(w => {
    const label = lang === 'zh' ? w.zh : w.en;
    const size  = (0.8 + ((w.freq-minF)/(maxF-minF)) * 2.2).toFixed(2);
    const op    = (0.55 + ((w.freq-minF)/(maxF-minF)) * 0.45).toFixed(2);
    const color = CAT_COLOR[w.cat] || '#444';
    const fw    = w.freq >= 5 ? 600 : 400;
    return `<span style="font-size:${size}rem;color:${color};opacity:${op};margin:0 0.4rem;
      font-family:'Lora','Noto Serif TC',serif;font-weight:${fw};
      display:inline-block;transition:transform 0.2s;cursor:default;"
      title="${w.zh}（出現 ${w.freq} 次）"
      onmouseover="this.style.transform='scale(1.18)'"
      onmouseout="this.style.transform='scale(1)'">${label}</span>`;
  }).join(' ');
}

/* ── 9. AI 風格評比 ─────────────────────────────────────────── */
function renderStyleGrid(lang) {
  const L = LABELS[lang].styles;
  const wrap = document.getElementById('styleGrid');
  if (!wrap) return;
  const ais = [
    { label:'Gemini',  headClass:'gemini-head', tags: L.geminiTags },
    { label:'Claude',  headClass:'claude-head', tags: L.claudeTags },
    { label:'ChatGPT', headClass:'gpt-head',    tags: L.gptTags    },
  ];
  wrap.innerHTML = ais.map(({ label, headClass, tags }) => `
    <div class="style-card">
      <div class="style-head ${headClass}"><span>${label}</span></div>
      <div class="style-tags">${tags.map(t => `<span class="style-tag">${t}</span>`).join('')}</div>
    </div>`).join('');
}

/* ── 10. TTS ────────────────────────────────────────────────── */
const AUDIO_FILES = {
  'accuracy.chartNote': 'audio/chart_zh.mp3',
  'accuracy.diffNote':  'audio/diff_zh.mp3',
  'trust.note':         'audio/trust_zh.mp3',
  'voices.summaryNote': 'audio/voices_zh.mp3',
  'styles.note':        'audio/styles_zh.mp3',
};
let currentAudio = null;

function stopAll() {
  if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
  if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  document.querySelectorAll('.read-btn.speaking').forEach(b => b.classList.remove('speaking'));
}

function speakEn(text, btn) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US'; utter.rate = 0.92;
  btn.classList.add('speaking');
  utter.onend = () => btn.classList.remove('speaking');
  window.speechSynthesis.speak(utter);
}

function bindReadBtn(btnId, textKey) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const wasPlaying = btn.classList.contains('speaking');
    stopAll();
    if (wasPlaying) return;
    if (currentLang === 'zh') {
      const file = AUDIO_FILES[textKey];
      if (file) {
        const audio = new Audio(file);
        currentAudio = audio;
        btn.classList.add('speaking');
        audio.play().catch(() => {
          currentAudio = null; btn.classList.remove('speaking');
          const t = getLabel('zh', textKey); if (t) speakEn(t, btn);
        });
        audio.onended = () => { currentAudio = null; btn.classList.remove('speaking'); };
      }
    } else {
      const t = getLabel('en', textKey); if (t) speakEn(t, btn);
    }
  });
}

/* ── 11. Scroll spy ─────────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-inner a');
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe !== undefined &&
  sections.forEach(s => new IntersectionObserver(entries => {
    if (entries[0].isIntersecting)
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + s.id));
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s));
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