const P = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const AVBG = ['#DBEAFE', '#D1FAE5', '#FCE7F3', '#FEF3C7', '#FEE2E2', '#EDE9FE', '#ECFDF5'];
const AVTX = ['#1D4ED8', '#065F46', '#9D174D', '#92400E', '#991B1B', '#5B21B6', '#065F46'];
const LC = ['#2563EB', '#16A34A', '#DB2777', '#D97706', '#DC2626', '#7C3AED', '#0891B2'];
const WL = ['第一週 4/14', '第二週 4/21', '第三週 4/28', '第四週 5/5'];

const D = {
    ai: [[72, 80, 82, 82, 78, 74, 78], [74, 82, 72, 78, 72, 79, 82], [76, 72, null, 82, 78, 84, 72], [78, 82, null, null, 72, 81, 88]],
    actual: [[75, 70, 85, 84, 83, 76, 80], [80, 82, 68, 87, 76, 78, 85], [80, 80, null, null, 78, 76, 80], [90, 93, null, null, 80, 83, 85]],
    exec: [[.6, .85, .5, .5, .5, .6, .9], [.8, .8, .7, .25, .5, .8, null], [1, .7, null, null, .7, .6, .7], [.8, .85, null, null, .6, .5, .8]],
    diff: [[-3, 10, -3, -2, -5, -2, -2], [-6, 0, 4, -9, -4, 1, -3], [-4, -8, 0, null, 0, 8, -8], [-12, -11, 0, 0, -8, -2, 3]],
    dims: [
        [{ 事業: 75, 財運: 70, 感情: 68, 人際: 73, 健康: 69 }, { 學習: 88, 考運: 84, 情緒: 72, 社交: 78 }, {}, { 事業: 90, 感情: 75, 財運: 85, 健康: 65 }, { 事業: 78, 財運: 65, 感情: 68, 健康: 60, 社交: 82 }, { 事業: 76, 財運: 68, 感情: 72, 情緒: 70, 人際: 75 }, {}],
        [{ 學業: 76, 財運: 70, 感情: 72, 情緒: 68, 健康: 75 }, { 事業: 85, 財運: 72, 感情: 88, 健康: 75 }, { 事業: 78, 財運: 60, 感情: 65, 健康: 68 }, { 事業: 85, 財運: 72, 感情: 82, 健康: 68 }, { 事業: 72, 財運: 58, 感情: 60, 健康: 55, 社交: 68 }, { 事業: 82, 財運: 75, 感情: 78, 情緒: 77, 人際: 80 }, {}],
        [{ 學業: 78, 財運: 72, 感情: 75, 情緒: 70, 人際: 77, 健康: 73 }, { 事業: 75, 財運: 68, 感情: 60, 健康: 82 }, {}, { 事業: 85, 財運: 80, 感情: 75, 健康: 78 }, { 事業: 85, 財運: 62, 感情: 55, 健康: 70, 社交: 78 }, { 事業: 85, 財運: 80, 感情: 83, 情緒: 82, 人際: 84 }, {}],
        [{ 事業: 82, 感情: 74, 財運: 71, 健康: 69, 人際: 80 }, { 事業: 85, 財運: 78, 感情: 72, 健康: 88 }, {}, {}, {}, { 事業: 84, 財運: 76, 感情: 79, 情緒: 75, 人際: 82 }, {}]
    ],
    yi: [
        ['整理、規劃、複習\n與穩定朋友互動\n規律作息、早睡', '圖形化記憶複習\n多喝熱水、規律作息', '撰寫報告、整理財務\n社交聚會', '展示才華提案\n靜心冥想、整理環境', '提早規劃\n親近自然、保養呼吸道', '主動溝通、回報進度\n整理計畫、調整方向', '向上管理\n穿紅咖啡色衣物'],
        ['整理環境、規劃未來\n完成積壓事項', '向陽社交\n文書整理', '補水潤局、冥想靜修\n謙遜處事', '承接重任、文書修繕\n低調社交', '深度清理打掃\n靜坐冥想', '主動爭取機會\n做決策', '主動求教\n規律飲食'],
        ['制定計畫、學習新技能\n早睡調整節律', '斷捨離、復盤總結', '（資料待補）', '斷捨離、理財規劃\n展現自我', '斷捨離、深度閱讀', '主動表現成果\n爭取機會', '深度睡眠與冥想\n穿著亮色系'],
        ['整理房間、學習新技能\n運動流汗', '主動求變、戶外運動\n學習證照', '（資料待補）', '（資料待補）', '曬太陽、向長輩請教', '安排重要進度\n建立人脈', '主動社交\n學習新技能']
    ],
    ji: [
        ['情緒化做決定\n衝動消費\n過度解讀他人', '土黃咖啡色\n死記硬背', '頂撞長輩\n暴飲暴食', '情緒激進、熬夜\n衝動破費', '劇烈運動\n熬夜追劇', '情緒化回應\n臨時決策', '熬夜過度思慮'],
        ['衝動決策\n情緒化回應\n熬夜', '深夜戲水\n衝動消費', '衝動投資\n高溫環境', '急躁決策\n辛辣飲食', '做出承諾\n宅在家中', '猶豫不決\n過度保守', '與人爭論\n綠色植物過多'],
        ['衝動重大決定\n情緒化發言\n熬夜', '衝動投資\n爭強好勝', '（資料待補）', '意氣之爭\n危險運動', '重大決策\n口舌爭辯', '過度鬆懈\n拖延', '開啟新項目\n暴飲暴食'],
        ['情緒化發言\n熬夜\n曖昧過度投入', '情緒性大額開銷\n正面口角衝突', '（資料待補）', '（資料待補）', '熬夜、水上運動\n爭強好勝', '熬夜\n情緒性消費', '過度貪涼\n情緒化消費']
    ]
};

const DIALOGUES = {
    'A': [
        { week: '4/14-4/21', model: 'Gemini', domain: '學業', score: 45, prompt: '本週面臨專題應用程式要上架的壓力。請針對我這週的學習效率與考運進行預測。', advice: '這不是一個能靠求神問卜或排八字來拿高分的星期。這週請放棄「完美兼顧」的幻想，將大腦的算力 100% 集中在專題上，其他科目只要達到及格底線即可。', ratings: { 預測精準度: '2', 建議可行性: '3' } },
        { week: '4/14-4/21', model: 'ChatGPT', domain: '學業', score: 74, prompt: '本週面臨專題進度未完成的壓力。請針對我這週的學習效率與考運進行預測。', advice: '限縮戰線 + 強制收斂。一次只做一個模組（不要多線），設「完成優先」，不要追求完美。用時間切割：50分鐘專注 + 10分鐘休息（很適合你這週）。', ratings: { 預測精準度: '5', 建議可行性: '5' } },
        { week: '4/14-4/21', model: 'Claude', domain: '學業', score: 74, prompt: '本週面臨專題應用程式要上架的壓力。請針對我這週的學習效率與考運進行預測。', advice: '你這週的能量是「夠用的」，但會被分心與任務切換侵蝕。深度專注力達 78，代表你有潛力進入高效狀態，關鍵是替自己搶出不被打擾的時間塊。上架壓力其實是一種學習加速器——有截止日的學習，往往記得最深。', ratings: { 預測精準度: '4', 建議可行性: '4' } },
        { week: '4/14-4/21', model: 'Gemini', domain: '感情', score: 75, prompt: '本週在與朋友相處時，希望達成有效溝通，不要雞同鴨講。', advice: '「重述與核對（Echo & Verify）」：在朋友說完一段話，準備給出建議之前，強迫自己先暫停兩秒，並套用句型：「所以，你現在最在意的點是___，對嗎？」只有當對方點頭時，你才開始輸出你的觀點。', ratings: { 預測精準度: '4', 建議可行性: '4' } },
        { week: '4/14-4/21', model: 'ChatGPT', domain: '感情', score: 78, prompt: '本週在與朋友相處時，希望達成有效溝通，不要雞同鴨講。', advice: '「好的溝通，不是誰講得比較對，而是誰讓彼此更願意繼續說下去。」這週很適合練習「先確認，再回應」。當朋友說完一段話，先回一句：「所以你在意的是___，對嗎？」', ratings: { 預測精準度: '4', 建議可行性: '4' } },
        { week: '4/14-4/21', model: 'Claude', domain: '感情', score: 63, prompt: '本週在與朋友相處時，希望達成有效溝通，不要雞同鴨講。', advice: '雞同鴨講的根源，往往不是語言問題，而是「我以為對方應該懂我」的假設。這段關係是你「清晰表達內心需求」能力的鍛鍊場。', ratings: { 預測精準度: '5', 建議可行性: '4' } }
    ],
    'F': [
        { week: '4/14-4/21', model: 'Gemini', domain: '學業', score: 84, prompt: '[具體壓力點]', advice: '「程式碼的邏輯在於嚴謹，而生命的邏輯在於韌性；不求每一行都完美無瑕，但求在最後一刻能成功編譯。」', ratings: { 預測精準度: '3', 建議可行性: '4' } },
        { week: '4/14-4/21', model: 'ChatGPT', domain: '學業', score: 73, prompt: '[具體壓力點]', advice: '「穩定比爆發更重要，撐住節奏的人，才會贏到最後。」', ratings: { 預測精準度: '4', 建議可行性: '5' } },
        { week: '4/14-4/21', model: 'Claude', domain: '學業', score: 78, prompt: '[具體壓力點]', advice: '焦慮本身就是你在意這件事的證明，只要把它轉化成行動而不是原地轉圈，它就是你的燃料。', ratings: { 預測精準度: '4', 建議可行性: '4' } },
        { week: '4/14-4/21', model: 'Gemini', domain: '感情', score: 72, prompt: '本週在與朋友相處時，希望達成有效溝通，不要講了一堆把自己氣到。', advice: '「練習放下對『被完全理解』的執著。」很多時候，我們氣到不行是因為覺得「你怎麼可以不懂我？」這段關係想教會你，每個人都有自己的認知局限，如作業系統不同一般。不要在疲憊或飢餓時處理嚴肅話題。', ratings: { 預測精準度: '4', 建議可行性: '4' } },
        { week: '4/14-4/21', model: 'ChatGPT', domain: '感情', score: 74, prompt: '本週在與朋友相處時，希望達成有效溝通，不要講了一堆把自己氣到。', advice: '「不是每件事都需要立刻被理解，也不是每句話都需要立刻講完。」本週很適合練習一句話：「我先講到這裡，想聽聽你的想法。」試著一次只講「一個重點」，留停頓給對方，不急著把所有情緒一次講完。', ratings: { 預測精準度: '3', 建議可行性: '3' } },
        { week: '4/14-4/21', model: 'Claude', domain: '感情', score: 71, prompt: '本週在與朋友相處時，希望達成有效溝通，不要講了一堆把自己氣到。', advice: '「真正的溝通，從你願意不急著說話開始。」\n\n本週溝通小練習「說完之前，先問一句話」：當你覺得對方說的話讓你不舒服、或想開口反駁時，先暫停，問對方一個問題：「你說這些，是希望我怎麼回應你？」', ratings: { 預測精準度: '3', 建議可行性: '4' } }
    ],
    'E': [
        { week: '4/14-4/20', model: 'Gemini', domain: '學業', score: 82, prompt: '[事情很多+考試壓力]', advice: '「土不嫌其多，厚德載物；事不嫌其繁，唯心不動。」', ratings: { 預測精準度: '4', 建議可行性: '5' } },
        { week: '4/14-4/20', model: 'ChatGPT', domain: '學業', score: 80, prompt: '[具體壓力點]', advice: '這是一週可以前進，但不能亂想的時期。', ratings: { 預測精準度: '4', 建議可行性: '4' } },
        { week: '4/21-4/27', model: 'Gemini', domain: '學業', score: 68, prompt: '本週面臨想讀英文、做專題，但是要考期中考的壓力。', advice: '「火之微光，唯有聚焦方能燎原；與其在三岔路口徬徨，不如在唯一的窄道上奔跑。」', ratings: { 預測精準度: '4', 建議可行性: '4' } },
        { week: '4/28-5/4', model: 'Gemini', domain: '學業', score: 72, prompt: '考試告一段落，感覺考得很差，禮拜五六要去政大參加活動比賽，下禮拜還要Demo。', advice: '火之煉金，不在於火的猛烈，而在於金的質地；一時的考場失利是「淬火」，是為了讓你在政大的賽場與下周的 Demo 中，顯露更鋒利的成色。', ratings: { 預測精準度: '3', 建議可行性: '3' } },
        { week: '4/28-5/4', model: 'Gemini', domain: '感情', score: 65, prompt: '本週在與家人相處時，希望達成和平且支持。', advice: '「學習如何像『大地』一樣，不只承載他人的期待，也學會溫柔地安放自己的脆弱。」深度解析：你習慣表現得堅強、無所謂。這次的摩擦是為了提醒你：和平不代表要隱藏所有的負面情緒。', ratings: { 預測精準度: '5', 建議可行性: '4' } },
        { week: '4/28-5/4', model: 'Gemini', domain: '感情', score: 78, prompt: '本週在與男朋友相處時，希望達成溫馨陪伴支持。', advice: '你本周的同理心能量較為「內斂」。你可能沒有多餘的體力去製造驚喜，但你展現出的那種「安靜的依賴」，反而會讓對方感受到被需要，從而達成你想要的溫馨陪伴。', ratings: { 預測精準度: '5', 建議可行性: '4' } }
    ],
    'G': [
        { week: '4/14-4/21', model: 'Gemini', domain: '學業', score: 84, prompt: '[具體壓力點]', advice: '「在複雜的系統中，最優路徑往往不在於處理更多任務，而在於精確執行當下這行程式碼。」', ratings: { 預測精準度: '3', 建議可行性: '5' } },
        { week: '4/14-4/21', model: 'ChatGPT', domain: '學業', score: 78, prompt: '[具體壓力點]', advice: '「真正拖垮人的，通常不是事情太多，而是同時想完成所有事情。」', ratings: { 預測精準度: '2', 建議可行性: '5' } },
        { week: '4/14-4/21', model: 'Claude', domain: '學業', score: 63, prompt: '[具體壓力點]', advice: '「做不完」不是你的失敗，是你給自己的清單太誠實了。\n\n先做一件，再說下一件。', ratings: { 預測精準度: '3', 建議可行性: '5' } }
    ],
    'B': [
        { week: '4/14-4/21', model: 'Gemini', domain: '學業', score: 88, prompt: '期中考的壓力', advice: '「印星高照，思路清晰；唯需防範技術細節的疏漏。」大腦運轉極快，特別是處理 SQL 語法、Python 邏輯等需要「流動性思考」的科目時，效率驚人。', ratings: { 預測精準度: '2', 建議可行性: '3' } },
        { week: '4/14-4/21', model: 'ChatGPT', domain: '學業', score: 76, prompt: '期中考的壓力', advice: '「穩定不是來自沒有壓力，而是你能在混亂中維持節奏。」', ratings: { 預測精準度: '3', 建議可行性: '4' } },
        { week: '4/14-4/21', model: 'Claude', domain: '學業', score: 73, prompt: '期中考的壓力', advice: '準備不是讓你無所畏懼，而是讓你帶著信心面對未知。期中考的本質不是測你記了多少，而是測你理解得夠不夠紮實。', ratings: { 預測精準度: '4', 建議可行性: '4' } }
    ]
};

let curW = 0, curP = 0, curDlgP = 'A', curDomain = 'all';

function dbadge(d) {
    if (d === null || d === undefined) return '';
    if (d > 0) return `<span class="badge b-pos">高估 +${d}</span>`;
    if (d < 0) return `<span class="badge b-neg">低估 ${d}</span>`;
    return '<span class="badge b-zero">完全吻合</span>';
}
function execStr(v) { if (v === null || v === undefined) return '—'; return Math.round(v > 1 ? v : v * 100) + '%'; }

function buildWeekTabs() {
    const c = document.getElementById('weekTabs');
    WL.forEach((w, i) => {
        const b = document.createElement('button');
        b.className = 'wtab' + (i === 0 ? ' on' : '');
        b.textContent = w;
        b.onclick = () => { curW = i; document.querySelectorAll('.wtab').forEach((x, j) => x.classList.toggle('on', j === i)); renderPersonGrid(); renderDetail(); };
        c.appendChild(b);
    });
}
function renderPersonGrid() {
    const c = document.getElementById('personGrid'); c.innerHTML = '';
    P.forEach((n, i) => {
        const ai = D.ai[curW][i], act = D.actual[curW][i];
        const b = document.createElement('div');
        b.className = 'pbtn' + (i === curP ? ' on' : '');
        b.innerHTML = `<div class="av" style="background:${AVBG[i]};color:${AVTX[i]}">${n.slice(0, 2)}</div><div class="pname">${n}</div><div class="pscore">AI:${ai ?? '—'} / 體感:${act ?? '—'}</div>`;
        b.onclick = () => { curP = i; document.querySelectorAll('.pbtn').forEach((x, j) => x.classList.toggle('on', j === i)); renderDetail(); };
        c.appendChild(b);
    });
}
function renderDetail() {
    const i = curP, wi = curW;
    const ai = D.ai[wi][i], act = D.actual[wi][i], diff = D.diff[wi][i], ex = D.exec[wi][i];
    const dims = D.dims[wi][i] || {};
    const yi = D.yi[wi][i] || '—', ji = D.ji[wi][i] || '—';
    const dimH = Object.entries(dims).filter(([k, v]) => v !== null).map(([k, v]) => `<div class="dc"><div class="dt">${k}</div><div class="dv" style="color:${v >= 80 ? '#16A34A' : v >= 70 ? '#2563EB' : '#DC2626'}">${v}</div><div class="dbar"><div class="dfill" style="width:${v}%;background:${v >= 80 ? '#16A34A' : v >= 70 ? '#2563EB' : '#DC2626'}"></div></div></div>`).join('');
    document.getElementById('detailPanel').innerHTML = `
    <div class="dp-head">
      <div class="av" style="background:${AVBG[i]};color:${AVTX[i]};width:42px;height:42px;font-size:14px;flex-shrink:0">${P[i].slice(0, 2)}</div>
      <div class="dp-info"><h3>${P[i]}</h3><div class="dpsub">${WL[wi]}</div></div>
      <div class="score-pair">
        <div class="si"><span class="sv" style="color:#2563EB">${ai ?? '—'}</span><span class="sl">AI 預測</span></div>
        <div class="si"><span class="sv" style="color:#16A34A">${act ?? '—'}</span><span class="sl">實際體感</span></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-start">
        ${dbadge(diff)}
        ${ex !== null ? `<span class="badge b-exec">執行率 ${execStr(ex)}</span>` : ''}
      </div>
    </div>
    <div class="dimgrid">${dimH || '<div style="font-size:12px;color:var(--sub)">維度資料整理中</div>'}</div>
    <div class="yijicols">
      <div class="ybox yi"><h5>本週宜</h5><p>${yi}</p></div>
      <div class="ybox ji"><h5>本週忌</h5><p>${ji}</p></div>
    </div>
  `;
}

function buildTrendChart() {
    const leg = document.getElementById('trendLeg');
    P.forEach((n, i) => { leg.innerHTML += `<div class="lchip"><div class="lsq" style="background:${LC[i]}"></div>${n}</div>`; });
    new Chart(document.getElementById('trendC'), {
        type: 'line',
        data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: P.map((n, i) => ({ label: n, data: D.ai.map(w => w[i]), borderColor: LC[i], backgroundColor: LC[i] + '30', pointRadius: 5, borderWidth: 2, tension: .3, spanGaps: true })) },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 55, max: 100, ticks: { font: { size: 11 } } }, x: { ticks: { font: { size: 11 } } } }, plugins: { legend: { display: false } } }
    });
}

function buildDiffChart() {
    const flat = { labels: [], data: [], colors: [] };
    D.diff.forEach((row, wi) => {
        P.forEach((n, pi) => {
            const d = row[pi];
            if (d !== null && d !== undefined) {
                flat.labels.push(`W${wi + 1} ${n.slice(0, 2)}`);
                flat.data.push(d);
                flat.colors.push(d > 0 ? '#EF4444' : d < 0 ? '#2563EB' : '#94A3B8');
            }
        });
    });
    new Chart(document.getElementById('diffC'), {
        type: 'bar',
        data: { labels: flat.labels, datasets: [{ data: flat.data, backgroundColor: flat.colors, borderRadius: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { font: { size: 10 } } }, x: { ticks: { font: { size: 9 }, maxRotation: 90, autoSkip: false } } }, plugins: { legend: { display: false } } }
    });
}

function buildModelChart() {
    const leg = document.getElementById('modelLeg');
    [{ c: '#10B981', n: 'Gemini' }, { c: '#2563EB', n: 'ChatGPT' }, { c: '#7C3AED', n: 'Claude' }].forEach(m => {
        leg.innerHTML += `<div class="lchip"><div class="lsq" style="background:${m.c}"></div>${m.n}</div>`;
    });
    new Chart(document.getElementById('modelC'), {
        type: 'bar',
        data: {
            labels: ['Gemini', 'ChatGPT', 'Claude'],
            datasets: [
                { label: '預測精準度', data: [3.6, 3.8, 3.7], backgroundColor: '#10B98199', borderRadius: 3 },
                { label: '建議可行性', data: [3.9, 4.5, 4.3], backgroundColor: '#2563EB99', borderRadius: 3 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 5, ticks: { font: { size: 11 } } }, x: { ticks: { font: { size: 12 } } } }, plugins: { legend: { display: false } } }
    });
}

function buildDialogue() {
    const c = document.getElementById('dialoguePBtns');
    Object.keys(DIALOGUES).forEach(n => {
        const b = document.createElement('button');
        b.className = 'ptab' + (n === curDlgP ? ' on' : '');
        b.textContent = n;
        b.onclick = () => { curDlgP = n; document.querySelectorAll('.ptab').forEach(x => x.classList.remove('on')); b.classList.add('on'); renderChats(); };
        c.appendChild(b);
    });
    renderChats();
}

function filterDomain(d, el) { curDomain = d; document.querySelectorAll('.dtab').forEach(x => x.classList.remove('on')); el.classList.add('on'); renderChats(); }

function renderChats() {
    const list = document.getElementById('chatList'); list.innerHTML = '';
    const entries = (DIALOGUES[curDlgP] || []).filter(e => {
        if (curDomain === 'all') return true;
        if (curDomain === '學業') return e.domain && (e.domain.includes('學') || e.domain.includes('工'));
        if (curDomain === '感情') return e.domain && (e.domain.includes('感') || e.domain.includes('人'));
        return true;
    });
    if (!entries.length) { list.innerHTML = '<div style="color:var(--sub);font-size:13px;padding:16px 0">此條件無資料</div>'; return; }
    entries.forEach(e => {
        const mc = { 'Gemini': 'mg', 'ChatGPT': 'mch', 'Claude': 'mcl' }[e.model] || '';
        const ratH = e.ratings ? Object.entries(e.ratings).map(([k, v]) => `<span class="rp">${k}:${v}</span>`).join('') : '';
        const id = 'c' + Math.random().toString(36).slice(2);
        const hasPrompt = e.prompt && e.prompt !== '[具體壓力點]';
        const div = document.createElement('div'); div.className = 'ci';
        div.innerHTML = `
      <div class="cimeta">
        <span class="mpill ${mc}">${e.model}</span>
        <span class="dpill">${e.domain}</span>
        <span class="wpill">${e.week}</span>
        <span class="spill">給分: ${e.score}</span>
      </div>
      ${hasPrompt ? `<div id="prm-${id}" style="font-size:11px;color:var(--sub);background:var(--bg);border-radius:7px;padding:0;margin-bottom:0;line-height:1.6;font-style:italic;height:0;overflow:hidden;transition:height .3s ease,padding .3s ease,margin-bottom .3s ease" data-open="0">${e.prompt}</div><span class="expbtn" onclick="tog('prm-${id}',this,'Prompt')">▼ 展開 Prompt</span>` : ''}
      <div id="adv-${id}" style="font-size:12px;color:var(--text);line-height:1.7;margin-top:4px;height:0;overflow:hidden;transition:height .3s ease" data-open="0">${e.advice}</div>
      <span class="expbtn" onclick="tog('adv-${id}',this,'哲學建議')">▼ 展開哲學建議</span>
      ${ratH ? `<div class="rpills">${ratH}</div>` : ''}
    `;
        list.appendChild(div);
    });
}

function tog(id, el, label) {
    const box = document.getElementById(id);
    const isOpen = box.dataset.open === '1';
    const isPrompt = id.startsWith('prm-');
    if (isOpen) {
        box.style.height = box.scrollHeight + 'px';
        box.dataset.open = '0';
        el.textContent = '▼ 展開' + label;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                box.style.height = '0';
                if (isPrompt) { box.style.padding = '0'; box.style.marginBottom = '0'; }
            });
        });
        setTimeout(() => { box.style.overflow = 'hidden'; }, 310);
    } else {
        box.style.overflow = 'hidden';
        box.style.height = '0';
        if (isPrompt) { box.style.padding = '7px 10px'; box.style.marginBottom = '6px'; }
        box.dataset.open = '1';
        el.textContent = '▲ 收起' + label;
        requestAnimationFrame(() => {
            const full = box.scrollHeight;
            box.style.height = full + 'px';
            setTimeout(() => { box.style.height = 'auto'; box.style.overflow = 'visible'; }, 310);
        });
    }
}

buildWeekTabs();
renderPersonGrid();
renderDetail();
buildTrendChart();
buildDiffChart();
buildModelChart();
buildDialogue();

const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { const id = e.target.id; document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id)); } }); }, { threshold: .3 });
['design', 'weekly', 'models', 'reflection', 'dialogue', 'insights', 'conclusion'].forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });