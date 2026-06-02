// ═══════════════════════════════════════════════════════
//  設定
// ═══════════════════════════════════════════════════════
const WORKER_URL = 'https://focus.sijialai1473.workers.dev/quiz';

const SYSTEM_CONTEXT = `你是輔仁大學資訊管理學系的專題評審教授。
學生的專題名稱是「天好運 FaithFlow」，這是一個針對天主教徒的宗教數位化系統，
功能包含：集典冊（日記）、有答大師（AI問答）、活水泉源（AI每日抽卡啟發）、
心靈營火（社群）、朝聖之地（地圖與360環景）。
技術架構：React Native、Firebase + PostgreSQL、Cloudflare R2、
Gemini/Qwen AI、Magisterium API、Deepgram 語音辨識。

你的評審風格是嚴謹但友善，會針對資管領域核心能力提問：
系統分析、資料庫設計、AI應用、資安、商業可行性。`;

// ═══════════════════════════════════════════════════════
//  寫死題庫
// ═══════════════════════════════════════════════════════
const PRESET_QUESTIONS = [
  {
    id: 1,
    category: '系統定位',
    difficulty: 'mid',
    text: '你們的目標使用者是「天主教徒」，但系統名稱「天好運」與天主教文化關聯性並不直接——請問命名的邏輯為何？是否有做過品牌測試或使用者訪談確認名稱能引起共鳴？',
  },
  {
    id: 2,
    category: '系統定位',
    difficulty: 'mid',
    text: '文件中提到「組內沒有人是教徒」，訪談的深度與代表性如何確保？訪談了幾位受訪者？涵蓋哪些年齡層與使用情境？',
  },
  {
    id: 3,
    category: '競品分析',
    difficulty: 'hard',
    text: '你們分析了 Magisterium、Apologist.ai、Bible.com 等競品，請問「天好運」的核心差異化價值是什麼？這些功能組合為什麼是競品無法輕易複製的？',
  },
  {
    id: 4,
    category: '系統定位',
    difficulty: 'hard',
    text: '系統範圍涵蓋六大功能模組（集典冊、有答大師、活水泉源、心靈營火、朝聖之地、帳號管理），這對大三生三學期的時程而言是否過度擴張？你們如何設定 MVP（最小可行產品）？',
  },
  {
    id: 5,
    category: 'AI 技術',
    difficulty: 'hard',
    text: '「有答大師」使用 Groq LPU 做即時推論、Magisterium AI 作為天主教知識庫，請說明兩者如何整合？RAG 的 retrieval 流程是什麼？有沒有防範 hallucination 的機制？',
  },
  {
    id: 6,
    category: 'AI 技術',
    difficulty: 'hard',
    text: '你們採用 pgvector + Jina AI（jina-embeddings-v3）實作語意向量搜尋，請說明 RAG 的完整流程——從使用者輸入到向量檢索再到 LLM 生成回覆，每一步怎麼走？為什麼選 Jina 而不是 OpenAI Embedding？',
  },
  {
    id: 7,
    category: 'AI 技術',
    difficulty: 'mid',
    text: '「活水泉源」功能的 AI 每日主動產生問題卡，請問問題如何避免重複或偏離宗教主題？有沒有 prompt injection 或使用者誤用的防護設計？',
  },
  {
    id: 8,
    category: 'AI 技術',
    difficulty: 'mid',
    text: '「集典冊」的每週 AI 總結由 Mistral AI 負責，並透過 node-cron 在週日 02:00 自動執行——如果排程執行時 Mistral API 無回應或逾時，錯誤處理機制為何？使用者會收到通知嗎？',
  },
  {
    id: 9,
    category: '資料庫設計',
    difficulty: 'hard',
    text: '你們使用 Supabase 託管 PostgreSQL 並啟用 RLS（Row Level Security），請說明 RLS Policy 如何設計？使用者 A 是否有可能存取到使用者 B 的日記或對話紀錄？',
  },
  {
    id: 10,
    category: '資料庫設計',
    difficulty: 'hard',
    text: '你們同時使用 pgvector 做向量儲存、PostgreSQL 做關聯資料——向量索引（HNSW 或 IVFFlat）如何設定？隨著資料量增長，向量搜尋的效能如何維護？',
  },
  {
    id: 11,
    category: '資訊安全',
    difficulty: 'hard',
    text: '使用者的日記、祈禱內容屬於高度敏感個人資料，Cloudflare R2 儲存音訊與圖片——這些檔案有沒有存取控制？是公開 URL 還是需要簽名的 presigned URL？符合個資法規範嗎？',
  },
  {
    id: 12,
    category: '系統限制',
    difficulty: 'mid',
    text: '「朝聖之地」整合了 Street View Publish API、Maps Embed API、Maps JavaScript API 三種 Google Maps 服務，計費方式各不相同——你們如何估算月費上限？有沒有用量警示或 quota 限制？',
  },
  {
    id: 13,
    category: '社群治理',
    difficulty: 'mid',
    text: '「心靈營火」是開放式社群貼文，目前設計的是人工審核還是 AI 自動過濾？對於宗教爭議性言論（例如天主教與基督教神學分歧），審核標準如何訂定？',
  },
  {
    id: 14,
    category: '社群治理',
    difficulty: 'easy',
    text: '用戶可以「檢舉」貼文，但系統沒有管理員後台的設計——被檢舉的內容由誰處理？如果系統用戶量成長，這個流程能 scale 嗎？',
  },
  {
    id: 15,
    category: '需求規格',
    difficulty: 'easy',
    text: '使用者故事的優先順序分為 1、2、3，但幾乎所有「朝聖之地」功能都標為優先順序 3（最低），這代表什麼？若時程壓縮，這些功能是否會被砍除？',
  },
  {
    id: 16,
    category: '需求規格',
    difficulty: 'mid',
    text: '使用者故事缺少非功能性需求（NFR）——例如 Groq LPU 標榜低延遲，你們對「有答大師」的回應時間有沒有明確的 SLA？WebSocket 即時語音轉錄的延遲上限是多少？如何量測？',
  },
  {
    id: 17,
    category: '倫理風險',
    difficulty: 'hard',
    text: 'SWOT 分析的威脅項提到「AI 生成內容若偏差可能影響信任」——如果 Groq + Magisterium 的 RAG 系統給出神學上錯誤的解答導致信徒誤導，系統的法律與道德責任如何界定？你們有沒有免責聲明機制？',
  },
  {
    id: 18,
    category: '商業可行性',
    difficulty: 'easy',
    text: '運營三年的人力成本估計約 243,264 元/月，加上 Supabase、Cloudflare R2、Groq、Jina AI、Google Maps 等多項付費服務——系統的收費模式是什麼？如果免費使用，這些雲端服務費用如何支撐？',
  },
];

// ═══════════════════════════════════════════════════════
//  狀態
// ═══════════════════════════════════════════════════════
const state = {
  questions: [...PRESET_QUESTIONS],
  currentIdx: 0,
  answers: {},
  feedbacks: {},
  aiQuestion: null,
  loading: false,
  aiLoading: false,
  done: false,
};

// ═══════════════════════════════════════════════════════
//  Worker 呼叫（不需要 auth token）
// ═══════════════════════════════════════════════════════
async function callWorker(prompt) {
  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '（AI 未回應）';
}

// ═══════════════════════════════════════════════════════
//  AI 功能
// ═══════════════════════════════════════════════════════
async function getAIFeedback(question, answer) {
  const prompt = `${SYSTEM_CONTEXT}

以下是一位大三生對這道評審問題的練習回答，請給予具體、建設性的回饋（繁體中文，200字以內）：

【評審問題】
${question.text}

【學生回答】
${answer}

請從以下角度評估：
1. 回答是否抓到核心技術重點
2. 有哪些遺漏或可補強的面向
3. 給一個具體的改善建議

語氣像評審教授，簡潔直接。`;

  return await callWorker(prompt);
}

async function generateAIQuestion(category) {
  const prompt = `${SYSTEM_CONTEXT}

請針對「${category}」這個面向，產生一道全新的、具有挑戰性的口試問題（繁體中文）。
要求：
- 問題具體，不能太廣泛
- 針對這個專題的技術架構或設計決策
- 難度適中偏難
- 只輸出問題本身，不要其他說明`;

  return await callWorker(prompt);
}

// ═══════════════════════════════════════════════════════
//  渲染
// ═══════════════════════════════════════════════════════
function diffLabel(d) {
  return { hard: '難', mid: '中', easy: '易' }[d] || d;
}
function diffClass(d) {
  return { hard: 'diff-hard', mid: 'diff-mid', easy: 'diff-easy' }[d] || '';
}

function render() {
  const app = document.getElementById('app');
  if (state.done) { renderComplete(app); return; }

  const q = state.questions[state.currentIdx];
  const total = state.questions.length;
  const pct = Math.round((state.currentIdx / total) * 100);
  const currentAnswer = state.answers[q.id] || '';
  const feedback = state.feedbacks[q.id];

  app.innerHTML = `
    <div class="progress-bar">
      <div class="progress-track">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
      <span class="progress-label">${state.currentIdx + 1} / ${total}</span>
    </div>

    <div class="question-card">
      <div class="q-meta">
        <span class="q-num">Q${q.id}</span>
        <span class="q-category">${q.category}</span>
        <span class="q-difficulty ${diffClass(q.difficulty)}">${diffLabel(q.difficulty)}</span>
      </div>
      <p class="q-text">${q.text}</p>
    </div>

    ${state.aiQuestion ? `
    <div class="ai-question-card">
      <div class="ai-badge">AI 追問</div>
      <p class="ai-q-text">${state.aiQuestion}</p>
    </div>` : ''}

    <div class="answer-area">
      <label>YOUR ANSWER</label>
      <textarea id="ans" placeholder="在此輸入你的回答…">${currentAnswer}</textarea>
    </div>

    <div class="btn-row">
      <button class="btn-primary" onclick="submitAnswer()">送出評分</button>
      <button class="btn-secondary" onclick="skipQuestion()">跳過此題</button>
      <button class="btn-secondary" onclick="generateAIQ()">✦ AI 追問</button>
      <button class="btn-ai" onclick="generateNewQuestion()">產生新題目</button>
    </div>

    ${state.loading ? `<div class="loading"><div class="spinner"></div>AI 評分中…</div>` : ''}
    ${state.aiLoading ? `<div class="loading"><div class="spinner"></div>AI 思考中…</div>` : ''}

    ${feedback ? `
    <div class="feedback-card">
      <div class="feedback-header">
        <div class="feedback-icon">★</div>
        <span class="feedback-label">PROFESSOR FEEDBACK</span>
      </div>
      <p class="feedback-text">${feedback}</p>
    </div>` : ''}

    <div class="nav-row">
      <button class="btn-secondary" onclick="prevQuestion()" ${state.currentIdx === 0 ? 'disabled style="opacity:0.4"' : ''}>← 上一題</button>
      <div class="nav-dots">
        ${state.questions.map((qq, i) => {
          let cls = '';
          if (i === state.currentIdx) cls = 'active';
          else if (state.answers[qq.id]) cls = 'done';
          return `<div class="dot ${cls}" onclick="goTo(${i})" title="Q${qq.id}"></div>`;
        }).join('')}
      </div>
      <button class="btn-secondary" onclick="nextQuestion()">${state.currentIdx === total - 1 ? '完成 ✓' : '下一題 →'}</button>
    </div>
  `;

  document.getElementById('ans')?.addEventListener('input', e => {
    state.answers[q.id] = e.target.value;
  });
}

function renderComplete(app) {
  const answered = Object.keys(state.answers).filter(k => state.answers[k]).length;
  app.innerHTML = `
    <div class="complete-screen">
      <div class="complete-icon">🕊</div>
      <h2>練習完成</h2>
      <p>共完成 ${answered} / ${state.questions.length} 題回答</p>
      <button class="btn-primary" onclick="restart()">重新練習</button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
//  事件
// ═══════════════════════════════════════════════════════
async function submitAnswer() {
  const q = state.questions[state.currentIdx];
  const answer = document.getElementById('ans')?.value?.trim();
  if (!answer) { alert('請先輸入你的回答'); return; }
  state.answers[q.id] = answer;
  state.loading = true;
  render();
  try {
    state.feedbacks[q.id] = await getAIFeedback(q, answer);
  } catch (e) {
    state.feedbacks[q.id] = '（AI 暫時無法回應，請稍後再試）';
  }
  state.loading = false;
  render();
}

async function generateAIQ() {
  const q = state.questions[state.currentIdx];
  state.aiLoading = true;
  state.aiQuestion = null;
  render();
  try {
    state.aiQuestion = await generateAIQuestion(q.category);
  } catch (e) {
    state.aiQuestion = '（AI 暫時無法產生追問）';
  }
  state.aiLoading = false;
  render();
}

async function generateNewQuestion() {
  const categories = ['系統定位', 'AI 技術', '資料庫設計', '資訊安全', '需求規格', '商業可行性', '倫理風險'];
  const cat = categories[Math.floor(Math.random() * categories.length)];
  state.aiLoading = true;
  render();
  try {
    const text = await generateAIQuestion(cat);
    const newQ = {
      id: Date.now(),
      category: cat,
      difficulty: 'mid',
      text,
    };
    state.questions.push(newQ);
    state.currentIdx = state.questions.length - 1;
    state.aiQuestion = null;
  } catch (e) {
    alert('AI 暫時無法產生新題目');
  }
  state.aiLoading = false;
  render();
}

function skipQuestion() {
  state.aiQuestion = null;
  nextQuestion();
}

function nextQuestion() {
  state.aiQuestion = null;
  if (state.currentIdx < state.questions.length - 1) {
    state.currentIdx++;
    render();
  } else {
    state.done = true;
    render();
  }
}

function prevQuestion() {
  state.aiQuestion = null;
  if (state.currentIdx > 0) {
    state.currentIdx--;
    render();
  }
}

function goTo(i) {
  state.aiQuestion = null;
  state.currentIdx = i;
  render();
}

function restart() {
  Object.assign(state, {
    questions: [...PRESET_QUESTIONS],
    currentIdx: 0,
    answers: {},
    feedbacks: {},
    aiQuestion: null,
    loading: false,
    aiLoading: false,
    done: false,
  });
  render();
}

// ── 啟動 ──
render();
