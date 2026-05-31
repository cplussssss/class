// ============================================================
// data.js  —  AI 命理預測實驗 研究資料
// 所有姓名已匿名化為 P1–P8
// ============================================================

const LABELS = {
  zh: {
    title: 'AI 命理預測實驗報告',
    subtitle: '以大數據通識課程為場域，比較 Gemini、Claude、ChatGPT 三種工具之預測準確度與使用者信任度',
    nav: {
      overview: '研究概述',
      accuracy: '預測準確度',
      trust: '信任程度',
      voices: '學生回饋',
      styles: 'AI 風格評比',
    },
    overview: {
      heading: '研究概述',
      desc: '本實驗邀請 8 位學生，連續兩週使用 Gemini、Claude、ChatGPT 三個 AI 工具進行命理運勢預測，並每日記錄「AI 預測總分」與「實際體感分數」，最後以問卷收集質性回饋。',
      stat1: '參與學生',
      stat2: '觀察週數',
      stat3: '比較 AI 工具',
      stat4: '資料筆數',
    },
    accuracy: {
      heading: '預測準確度分析',
      subheading: 'AI 預測分 vs 實際體感分',
      diffHeading: '平均絕對誤差（越低越準）',
      weekLabel: ['第一週', '第二週'],
      predicted: 'AI 預測',
      actual: '實際體感',
      readBtn: '🔊 朗讀說明',
      chartNote: '折線圖呈現各 AI 對 8 位受測者的預測分數（虛線）與受測者自評實際分數（實線）之對比。整體而言，三個 AI 均傾向低估受測者的實際體感分數。ChatGPT 的平均絕對誤差最小（6.06 分），表現最為接近實際；Claude 的誤差最大（13.94 分），有較明顯的系統性低估傾向。',
      diffNote: '長條圖比較三個 AI 的平均絕對誤差。ChatGPT 以 6.06 分的誤差表現最佳，Gemini 居中（7.44 分），Claude 誤差最大（13.94 分）。值得注意的是，三個 AI 皆系統性地低估受測者的實際感受，可能反映命理預測工具普遍傾向保守。',
    },
    trust: {
      heading: '使用者信任程度',
      scale: '1＝完全不信任　3＝保留態度　5＝相當信任',
      readBtn: '🔊 朗讀說明',
      note: '信任分數分佈圖顯示，8 位受測者中有 3 人給出 2 分（偏向不信任），4 人給出 3 分（保留態度），1 人給出 4 分（偏向信任），整體平均為 2.75 分。多數學生認為 AI 命理預測「偶爾有準、偶爾沒準」，適合作為參考但不宜過度依賴。',
      avgLabel: '平均信任分數',
    },
    voices: {
      heading: '學生質性回饋',
      hitLabel: '最貼近的預測',
      missLabel: '最不相關的預測',
      changeLabel: '因預測做的改變',
      readBtn: '🔊 朗讀摘要',
      summaryNote: '8 位學生的回饋中，最常被說中的主題是「睡眠與健康」（6/8 人），其次是「人際社交」（3/8 人）。最不相關的預測主題則集中在「戀愛感情」與「投資理財」，顯示命理預測對無相關生活情境者效力有限。',
    },
    styles: {
      heading: 'AI 風格評比',
      readBtn: '🔊 朗讀摘要',
      note: '學生對三個 AI 的主觀風格評價呈現明顯差異：Gemini 被認為最接近命理師口吻，格式清晰、標註具體日期；Claude 以精美排版與圖表分析為特色，文字帶有文學感；ChatGPT 則風格最為日常，像朋友般關心，但內容相對籠統。',
      geminiTags: ['最像命理師', '格式清晰', '標註日期', '專業術語', '最受信任'],
      claudeTags: ['排版精美', '自動圖表', '文學感', '客觀中立', '適合簡報'],
      gptTags: ['親切日常', '像朋友', '簡潔列點', '貼近生活', '內容籠統'],
    },
    footer: '大數據通識課程 · 2026 學年度 · 資料已匿名處理',
    langToggle: 'English',
  },

  en: {
    title: 'AI Fortune-Telling Experiment Report',
    subtitle: 'Comparing Gemini, Claude, and ChatGPT in predictive accuracy and user trust — a Big Data Literacy course study',
    nav: {
      overview: 'Overview',
      accuracy: 'Accuracy',
      trust: 'Trust',
      voices: 'Student Voices',
      styles: 'AI Style Review',
    },
    overview: {
      heading: 'Study Overview',
      desc: '8 students participated over two consecutive weeks, using Gemini, Claude, and ChatGPT to generate daily fortune-telling predictions. Each day, they recorded the AI-predicted score and their own perceived life score. Qualitative feedback was collected at the end via survey.',
      stat1: 'Participants',
      stat2: 'Weeks Observed',
      stat3: 'AI Tools Compared',
      stat4: 'Data Points',
    },
    accuracy: {
      heading: 'Prediction Accuracy Analysis',
      subheading: 'AI Predicted Score vs. Actual Perceived Score',
      diffHeading: 'Mean Absolute Error (lower = more accurate)',
      weekLabel: ['Week 1', 'Week 2'],
      predicted: 'AI Predicted',
      actual: 'Actual Score',
      readBtn: '🔊 Read Aloud',
      chartNote: 'The line charts compare each AI\'s predicted scores (dashed) against participants\' self-reported actual scores (solid). Overall, all three AIs tend to underestimate participants\' actual wellbeing. ChatGPT achieved the lowest mean absolute error (6.06), while Claude showed the largest systematic underestimation (13.94).',
      diffNote: 'The bar chart compares mean absolute error across the three AIs. ChatGPT performed best with a 6.06-point error, followed by Gemini (7.44). Claude had the largest error (13.94). Notably, all three AIs systematically underestimated participants\' actual scores, suggesting a conservative bias in fortune-telling AI outputs.',
    },
    trust: {
      heading: 'User Trust Levels',
      scale: '1 = No trust   3 = Neutral / reserved   5 = High trust',
      readBtn: '🔊 Read Aloud',
      note: 'The trust distribution shows 3 students rated 2 (leaning distrust), 4 rated 3 (neutral/reserved), and 1 rated 4 (leaning trust), for an overall average of 2.75. Most students viewed AI fortune-telling as occasionally accurate and worth a glance, but not to be relied upon seriously.',
      avgLabel: 'Average Trust Score',
    },
    voices: {
      heading: 'Student Qualitative Feedback',
      hitLabel: 'Most Accurate Prediction',
      missLabel: 'Least Relevant Prediction',
      changeLabel: 'Behavioral Change Based on AI',
      readBtn: '🔊 Read Summary',
      summaryNote: 'Across 8 responses, the most commonly validated topic was "sleep & health" (6/8 students). Least relevant topics were "romantic relationships" and "investments," suggesting AI predictions are least effective when the predicted life domain doesn\'t apply to the user.',
    },
    styles: {
      heading: 'AI Style Comparison',
      readBtn: '🔊 Read Summary',
      note: 'Students perceived distinct stylistic differences among the three AIs. Gemini was rated most similar to a traditional fortune teller — structured, date-specific, and professional. Claude stood out for its visual formatting and auto-generated charts, with a literary writing style. ChatGPT was the most conversational, resembling a friend checking in, though content was often seen as generic.',
      geminiTags: ['Most like a fortune teller', 'Structured format', 'Date-specific', 'Professional tone', 'Most trusted'],
      claudeTags: ['Beautiful layout', 'Auto charts', 'Literary style', 'Objective tone', 'Presentation-ready'],
      gptTags: ['Casual & friendly', 'Feels like a friend', 'Concise bullets', 'Relatable content', 'Can be vague'],
    },
    footer: 'Big Data Literacy Course · Academic Year 2026 · All data anonymised',
    langToggle: '中文',
  },
};

// --- Score data (anonymised P1–P8) ---
const PERSONS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'];

const SCORE_DATA = {
  P1: { gemini: { w1: { pred: 68, actual: 60 }, w2: { pred: 72, actual: 70 } }, claude: { w1: { pred: 72, actual: 70 }, w2: { pred: 69, actual: 65 } }, gpt: { w1: { pred: 78, actual: 75 }, w2: { pred: 74, actual: 70 } } },
  P2: { gemini: { w1: { pred: 62, actual: 85 }, w2: { pred: 68, actual: 80 } }, claude: { w1: { pred: 62, actual: 85 }, w2: { pred: 68, actual: 80 } }, gpt: { w1: { pred: 78, actual: 85 }, w2: { pred: 83, actual: 80 } } },
  P3: { gemini: { w1: { pred: 78, actual: 95 }, w2: { pred: 81, actual: 85 } }, claude: { w1: { pred: 52, actual: 95 }, w2: { pred: 61, actual: 85 } }, gpt: { w1: { pred: 78, actual: 95 }, w2: { pred: 83, actual: 85 } } },
  P4: { gemini: { w1: { pred: 68, actual: 80 }, w2: { pred: 74, actual: 78 } }, claude: { w1: { pred: 70, actual: 80 }, w2: { pred: 65, actual: 78 } }, gpt: { w1: { pred: 74, actual: 80 }, w2: { pred: 77, actual: 78 } } },
  P5: { gemini: { w1: { pred: 82, actual: 90 }, w2: { pred: 78, actual: 80 } }, claude: { w1: { pred: 75, actual: 90 }, w2: { pred: 70, actual: 80 } }, gpt: { w1: { pred: 85, actual: 90 }, w2: { pred: 80, actual: 80 } } },
  P6: { gemini: { w1: { pred: 65, actual: 52 }, w2: { pred: 68, actual: 55 } }, claude: { w1: { pred: 60, actual: 52 }, w2: { pred: 63, actual: 55 } }, gpt: { w1: { pred: 70, actual: 52 }, w2: { pred: 65, actual: 55 } } },
  P7: { gemini: { w1: { pred: 72, actual: 80 }, w2: { pred: 75, actual: 80 } }, claude: { w1: { pred: 68, actual: 80 }, w2: { pred: 70, actual: 80 } }, gpt: { w1: { pred: 76, actual: 80 }, w2: { pred: 78, actual: 80 } } },
  P8: { gemini: { w1: { pred: 68, actual: 75 }, w2: { pred: 72, actual: 78 } }, claude: { w1: { pred: 65, actual: 75 }, w2: { pred: 68, actual: 78 } }, gpt: { w1: { pred: 74, actual: 75 }, w2: { pred: 76, actual: 78 } } },
};

const AVG_ABS_DIFF = { gemini: 7.44, claude: 13.94, gpt: 6.06 };

const TRUST_SCORES = [2, 3, 3, 3, 3, 2, 2, 4]; // P1–P8

// --- Qualitative feedback (anonymised) ---
const STUDENT_VOICES = [
  {
    id: 'P1',
    hit: { zh: 'Gemini：「人際交往上會顯得比較靈活，不再像上週那般沉悶」——第二週社交活動增多，確實自然開心', en: 'Gemini: "You\'ll seem more socially flexible this week." — Social activities did increase and felt natural.' },
    miss: { zh: 'ChatGPT：「娛樂花費增加」——第二週除伙食費外完全沒有娛樂支出', en: 'ChatGPT: "Entertainment spending will rise." — No entertainment spending occurred beyond food.' },
    change: { zh: '參考 Gemini 的建議，在運勢較差的那天特別留意，後來那週過得順暢', en: 'Referred to Gemini on a predicted low day; the week did go smoothly afterward.' },
    trust: 2,
  },
  {
    id: 'P2',
    hit: { zh: '忌宜提醒早睡不宜熬夜，最近因熬夜讀書而頭痛，預測符合狀況', en: 'Advice to sleep early matched reality — had been getting headaches from late-night studying.' },
    miss: { zh: '預測感情中「會對另一半挑剔不滿」，因為目前沒有交往對象，完全無法印證', en: 'Prediction about being critical of a partner — irrelevant because there is no partner.' },
    change: { zh: '沒有特別改變，照常生活', en: 'No notable behavioral changes made.' },
    trust: 3,
  },
  {
    id: 'P3',
    hit: { zh: 'Claude：「本週最需要的是真正休息——不是滑手機放空，而是讓精神停止過度運轉」', en: 'Claude: "What you need most this week is real rest — not scrolling, but letting your mind genuinely stop."' },
    miss: { zh: '感情與人際關係預測（桃花部分），因平時接觸異性不多，無法印證', en: 'Romance and relationship predictions — not applicable due to limited social contact with the other gender.' },
    change: { zh: 'ChatGPT 連續兩週提到睡眠問題，這週開始讓冷氣整晚運作，睡眠品質明顯提升', en: 'ChatGPT flagged sleep issues two weeks running; started keeping the AC on all night — sleep improved noticeably.' },
    trust: 3,
  },
  {
    id: 'P4',
    hit: { zh: '三個 AI 都提到要注意睡眠、不能熬夜、飲食影響腸胃——這兩週確實都有這些狀況', en: 'All three AIs mentioned sleep, no late nights, and digestive concerns — all of which were accurate.' },
    miss: { zh: '投資理財和工作事業部分（目前無投資，風險不存在）', en: 'Investment and career predictions — not applicable as the student doesn\'t invest.' },
    change: { zh: '因 Gemini 的建議拒絕了一次深夜聚會邀請，也根據建議調整了穿著', en: 'Declined a late-night gathering based on Gemini\'s advice; also adjusted outfit choices per recommendations.' },
    trust: 3,
  },
  {
    id: 'P5',
    hit: { zh: 'ChatGPT 提到有利於報告、面試，結果面試確實進入實體面試階段，也多了校內工讀機會', en: 'ChatGPT mentioned favorable conditions for reports and interviews — an interview did advance to an in-person stage.' },
    miss: { zh: 'Gemini 提到「處理自動化流程會非常順暢」，那週根本沒有處理相關任務', en: 'Gemini said "automation workflows will go smoothly" — no such work was done that week.' },
    change: { zh: '沒有特別改變，但有符合 AI 的「不要熬夜」建議，比較早睡', en: 'No major change, but followed the "no late nights" advice and went to bed earlier.' },
    trust: 3,
  },
  {
    id: 'P6',
    hit: { zh: 'ChatGPT：「命盤顯示這週很容易腦袋停不下來」——確實符合個人情況', en: 'ChatGPT: "Your chart shows your mind will keep racing this week." — Matched personal experience.' },
    miss: { zh: '「想用購物療癒情緒」——比較難找到不符合的預測，這句相對最不貼近', en: 'Prediction about stress-shopping — the student rarely makes impulsive purchases, so this was the least relatable.' },
    change: { zh: '有參考宜忌事項，Claude 因平時不熟悉、最客觀，反而最願意相信', en: 'Followed some do/avoid items; Claude, being the least familiar AI, felt the most objective and trustworthy.' },
    trust: 4,
  },
  {
    id: 'P7',
    hit: { zh: '本週要特別注意皮膚問題（過敏）——真的過敏了', en: 'Warning about skin sensitivity (allergy) this week — an allergic reaction did occur.' },
    miss: { zh: '「本週有財來財去的現象，可能有意外開銷」——沒有遇到', en: '"Money coming and going, possible unexpected expense this week" — nothing of the sort happened.' },
    change: { zh: 'Claude 的建議讓我多看了幾本書', en: 'Claude\'s suggestion prompted reading a few extra books.' },
    trust: 2,
  },
  {
    id: 'P8',
    hit: { zh: 'GPT 建議「早出門」，某天意外早出門後發生了一些小確幸，覺得蠻貼合', en: 'GPT suggested "leave home early." On a day the student did so unexpectedly, small positive things happened.' },
    miss: { zh: 'GPT 預測睡眠品質不好、難以入睡——但一直以來睡眠相對穩定，不會失眠', en: 'GPT predicted poor sleep and insomnia — but the student has consistently stable sleep and no insomnia.' },
    change: { zh: '目前未感覺到因預測而做出改變，依舊以慣常方式生活', en: 'No notable changes made based on predictions; continued with usual lifestyle.' },
    trust: 2,
  },
];