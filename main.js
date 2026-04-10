/**
 * 恋爱动物人格测试 - 主交互逻辑
 */

import { QUESTIONS, DIMENSIONS, getPersonalityById } from './data.js';
import { evaluateTest } from './engine.js';

// ===== 全局状态 =====
const state = {
  currentPage: 'home',
  currentQuestion: 0,
  answers: new Array(QUESTIONS.length).fill(-1),
  result: null,
  isAnimating: false
};

// ===== DOM 引用 =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== 页面管理 =====
function showPage(pageId) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  const pages = ['page-home', 'page-quiz', 'page-calculating', 'page-result'];
  pages.forEach(id => {
    const el = $(`#${id}`);
    if (id === `page-${pageId}`) {
      el.classList.remove('hidden');
      if (pageId === 'calculating') {
        el.classList.add('flex');
      }
      el.classList.add('page-enter');
      setTimeout(() => el.classList.remove('page-enter'), 500);
    } else {
      el.classList.add('hidden');
      el.classList.remove('flex');
    }
  });

  state.currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => { state.isAnimating = false; }, 500);
}

// ===== 首页逻辑 =====
function initHomePage() {
  // 开始测试按钮
  $('#btn-start').addEventListener('click', () => {
    state.currentQuestion = 0;
    state.answers = new Array(QUESTIONS.length).fill(-1);
    state.result = null;
    showPage('quiz');
    renderQuestion();
  });

  // 关于弹窗
  $('#btn-about').addEventListener('click', () => {
    $('#modal-about').classList.remove('hidden');
    $('#modal-about').classList.add('flex');
  });

  $('#btn-close-about').addEventListener('click', () => {
    $('#modal-about').classList.add('hidden');
    $('#modal-about').classList.remove('flex');
  });

  // 点击遮罩关闭
  $('#modal-about').addEventListener('click', (e) => {
    if (e.target === $('#modal-about')) {
      $('#modal-about').classList.add('hidden');
      $('#modal-about').classList.remove('flex');
    }
  });

  // 模拟测试人数递增
  simulateTestCount();
}

function simulateTestCount() {
  const countEl = $('#test-count');
  let count = 12847;
  setInterval(() => {
    count += Math.floor(Math.random() * 3);
    countEl.textContent = count.toLocaleString();
  }, 5000);
}

// ===== 答题逻辑 =====
function renderQuestion() {
  const q = QUESTIONS[state.currentQuestion];
  const total = QUESTIONS.length;
  const progress = ((state.currentQuestion) / total * 100).toFixed(0);

  // 更新进度
  $('#q-current').textContent = state.currentQuestion + 1;
  $('#q-total').textContent = total;
  $('#q-percent').textContent = `${progress}%`;
  $('#progress-bar').style.width = `${progress}%`;

  // 更新维度标签
  const primaryDim = DIMENSIONS.find(d => d.id === q.dimensions[0]);
  if (primaryDim) {
    $('#q-dimension-name').textContent = primaryDim.name;
  }

  // 渲染题目
  const container = $('#question-container');
  const selectedIndex = state.answers[state.currentQuestion];

  let html = `<div class="animate-fadeInUp">`;

  // 题号和情景
  html += `<div class="text-center mb-6">
    <span class="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-medium mb-4">
      第 ${state.currentQuestion + 1} / ${total} 题
    </span>
  </div>`;

  // 情景描述
  if (q.scenario) {
    html += `<div class="scenario-box mb-6">
      <p class="text-sm text-amber-800 leading-relaxed pl-6">${q.scenario}</p>
    </div>`;
  }

  // 问题
  html += `<h2 class="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-8 leading-relaxed">${q.question}</h2>`;

  // 选项
  html += `<div class="space-y-3 max-w-2xl mx-auto">`;
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
  q.options.forEach((opt, idx) => {
    const isSelected = selectedIndex === idx;
    html += `
      <div class="option-card ${isSelected ? 'selected' : ''} flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border-2 ${isSelected ? 'border-rose-400' : 'border-gray-100'} cursor-pointer" data-option-index="${idx}">
        <div class="option-indicator">${isSelected ? '<i class="fa-solid fa-check text-xs"></i>' : optionLabels[idx]}</div>
        <span class="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">${opt.text}</span>
      </div>`;
  });
  html += `</div>`;

  // 导航按钮
  html += `<div class="flex items-center justify-between mt-10 max-w-2xl mx-auto">`;
  if (state.currentQuestion > 0) {
    html += `<button id="btn-prev-q" class="flex items-center gap-2 px-5 py-2.5 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
      <i class="fa-solid fa-chevron-left text-sm"></i>
      <span>上一题</span>
    </button>`;
  } else {
    html += `<div></div>`;
  }

  if (state.currentQuestion < total - 1) {
    html += `<button id="btn-next-q" class="flex items-center gap-2 px-6 py-2.5 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed" ${selectedIndex < 0 ? 'disabled' : ''}>
      <span>下一题</span>
      <i class="fa-solid fa-chevron-right text-sm"></i>
    </button>`;
  } else {
    html += `<button id="btn-submit" class="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed" ${selectedIndex < 0 ? 'disabled' : ''}>
      <span>查看结果</span>
      <i class="fa-solid fa-sparkles text-sm"></i>
    </button>`;
  }
  html += `</div>`;

  html += `</div>`;
  container.innerHTML = html;

  // 绑定选项点击事件
  bindQuestionEvents();
}

function bindQuestionEvents() {
  // 选项点击
  const optionCards = $$('.option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.optionIndex);
      state.answers[state.currentQuestion] = idx;

      // 更新选中状态
      optionCards.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.option-indicator').innerHTML = c === card
          ? '<i class="fa-solid fa-check text-xs"></i>'
          : ['A', 'B', 'C', 'D', 'E', 'F'][parseInt(c.dataset.optionIndex)];
      });
      card.classList.add('selected');

      // 启用下一题/提交按钮
      const nextBtn = $('#btn-next-q');
      const submitBtn = $('#btn-submit');
      if (nextBtn) nextBtn.disabled = false;
      if (submitBtn) submitBtn.disabled = false;

      // 自动跳转下一题（延迟500ms）
      if (state.currentQuestion < QUESTIONS.length - 1) {
        setTimeout(() => {
          state.currentQuestion++;
          renderQuestion();
        }, 400);
      }
    });
  });

  // 上一题
  const prevBtn = $('#btn-prev-q');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion();
      }
    });
  }

  // 下一题
  const nextBtn = $('#btn-next-q');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.answers[state.currentQuestion] >= 0 && state.currentQuestion < QUESTIONS.length - 1) {
        state.currentQuestion++;
        renderQuestion();
      }
    });
  }

  // 提交
  const submitBtn = $('#btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (state.answers[state.currentQuestion] >= 0) {
        showCalculating();
      }
    });
  }
}

// ===== 返回按钮 =====
function initQuizNav() {
  $('#btn-back').addEventListener('click', () => {
    if (state.currentQuestion > 0) {
      state.currentQuestion--;
      renderQuestion();
    } else {
      if (confirm('确定要退出测试吗？当前进度将不会保存。')) {
        showPage('home');
      }
    }
  });
}

// ===== 计算动画 =====
function showCalculating() {
  showPage('calculating');

  const steps = [
    { text: '📊 正在统计你的答题数据...', delay: 600 },
    { text: '🧮 计算六大维度得分...', delay: 1200 },
    { text: '🔍 在24种动物人格中匹配...', delay: 1800 },
    { text: '📝 生成你的专属人格报告...', delay: 2400 },
    { text: '✨ 即将揭晓结果！', delay: 3000 }
  ];

  const stepsContainer = $('#calc-steps');
  stepsContainer.innerHTML = '';

  steps.forEach(step => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = 'animate-fadeInUp';
      p.textContent = step.text;
      stepsContainer.appendChild(p);
    }, step.delay);
  });

  // 实际计算
  setTimeout(() => {
    state.result = evaluateTest(state.answers);
    showPage('result');
    renderResult();
  }, 3600);
}

// ===== 结果页渲染 =====
function renderResult() {
  const { personality, matchScore, dimensionAnalysis, topMatches, bestMatchPersonality, worstMatchPersonality } = state.result;

  const container = $('#result-container');
  let html = '';

  // ===== 主结果卡片 =====
  html += `
  <div class="result-card p-6 sm:p-8 mb-8 animate-fadeInUp">
    <div class="text-center mb-6">
      <div class="text-7xl sm:text-8xl mb-4 animate-heartbeat">${personality.emoji}</div>
      <div class="match-badge mb-3">
        <i class="fa-solid fa-bullseye"></i>
        匹配度 ${matchScore}%
      </div>
      <h1 class="font-display font-black text-3xl sm:text-4xl text-gray-800 mb-2">${personality.name}</h1>
      <p class="text-lg text-rose-500 font-medium">${personality.title}</p>
    </div>
    <div class="bg-white/60 rounded-2xl p-5 mb-6">
      <p class="text-gray-600 leading-relaxed text-center">${personality.summary}</p>
    </div>
    <div class="flex flex-wrap justify-center gap-2 mb-4">
      <span class="trait-tag">💝 ${personality.loveLanguage}</span>
    </div>
  </div>`;

  // ===== 六维度雷达图 + 详细分析 =====
  html += `
  <div class="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 mb-8 animate-fadeInUp" style="animation-delay: 0.1s">
    <h2 class="font-display font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
      <span class="text-2xl">📊</span> 六维度分析
    </h2>
    <div class="radar-container mb-8">
      <canvas id="radar-chart" width="360" height="360" class="radar-canvas"></canvas>
    </div>
    <div class="space-y-5">
      ${dimensionAnalysis.map(d => `
        <div class="group">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-lg">${d.icon}</span>
              <span class="font-medium text-gray-700">${d.name}</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">${d.label}</span>
            </div>
            <span class="font-bold" style="color: ${d.color}">${d.score}分</span>
          </div>
          <div class="dimension-bar">
            <div class="dimension-bar-fill" style="width: 0%; background: linear-gradient(90deg, ${d.color}88, ${d.color})" data-target-width="${d.score}%"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-400 mt-1">
            <span>${d.labelLow}</span>
            <span>${d.labelHigh}</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;

  // ===== 优势与劣势 =====
  html += `
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
    <div class="bg-white rounded-3xl border border-emerald-100 p-6 animate-fadeInUp" style="animation-delay: 0.2s">
      <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</span>
        恋爱优势
      </h3>
      <ul class="space-y-3">
        ${personality.strengths.map(s => `
          <li class="flex items-start gap-2 text-sm text-gray-600">
            <span class="text-emerald-500 mt-0.5 shrink-0">●</span>
            <span>${s}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    <div class="bg-white rounded-3xl border border-amber-100 p-6 animate-fadeInUp" style="animation-delay: 0.3s">
      <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">!</span>
        需要注意
      </h3>
      <ul class="space-y-3">
        ${personality.weaknesses.map(w => `
          <li class="flex items-start gap-2 text-sm text-gray-600">
            <span class="text-amber-500 mt-0.5 shrink-0">●</span>
            <span>${w}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  </div>`;

  // ===== 恋爱建议 =====
  html += `
  <div class="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border border-rose-100 p-6 sm:p-8 mb-8 animate-fadeInUp" style="animation-delay: 0.4s">
    <h2 class="font-display font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
      <span class="text-2xl">💌</span> 给你的恋爱建议
    </h2>
    <p class="text-gray-600 leading-relaxed text-base">${personality.advice}</p>
  </div>`;

  // ===== 最佳/最差匹配 =====
  html += `
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
    ${bestMatchPersonality ? `
    <div class="compat-card compat-good animate-fadeInUp" style="animation-delay: 0.5s">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-4xl">${bestMatchPersonality.emoji}</span>
        <div>
          <p class="text-xs text-emerald-600 font-medium">💚 最佳匹配</p>
          <p class="font-bold text-gray-800">${bestMatchPersonality.name}</p>
          <p class="text-xs text-gray-500">${bestMatchPersonality.title}</p>
        </div>
      </div>
      <p class="text-sm text-gray-500">你们的性格互补，能给彼此带来最需要的东西。${personality.name}的${personality.strengths[0].substring(0, 6)}与${bestMatchPersonality.name}的特质完美契合。</p>
    </div>` : ''}
    ${worstMatchPersonality ? `
    <div class="compat-card compat-bad animate-fadeInUp" style="animation-delay: 0.6s">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-4xl">${worstMatchPersonality.emoji}</span>
        <div>
          <p class="text-xs text-amber-600 font-medium">⚠️ 需要磨合</p>
          <p class="font-bold text-gray-800">${worstMatchPersonality.name}</p>
          <p class="text-xs text-gray-500">${worstMatchPersonality.title}</p>
        </div>
      </div>
      <p class="text-sm text-gray-500">你们可能在某些方面存在较大差异，需要更多的理解和包容。但差异也可以成为互相学习的机会。</p>
    </div>` : ''}
  </div>`;

  // ===== TOP5 匹配 =====
  html += `
  <div class="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 mb-8 animate-fadeInUp" style="animation-delay: 0.7s">
    <h2 class="font-display font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
      <span class="text-2xl">🏆</span> 你最像的5种动物
    </h2>
    <div class="space-y-3">
      ${topMatches.slice(0, 5).map((m, i) => `
        <div class="flex items-center gap-4 p-3 rounded-xl ${i === 0 ? 'bg-rose-50 border border-rose-200' : 'bg-gray-50'}">
          <span class="text-2xl w-10 text-center">${i === 0 ? '👑' : ['🥈', '🥉', '4️⃣', '5️⃣'][i-1]}</span>
          <span class="text-3xl">${m.personality.emoji}</span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-800 truncate">${m.personality.name} · ${m.personality.title}</p>
          </div>
          <div class="text-right shrink-0">
            <span class="font-bold ${i === 0 ? 'text-rose-500' : 'text-gray-500'}">${m.matchScore}%</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;

  // ===== 操作按钮 =====
  html += `
  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fadeInUp" style="animation-delay: 0.8s">
    <button id="btn-retry" class="flex items-center gap-2 px-8 py-3 bg-white border-2 border-rose-200 text-rose-500 font-bold rounded-full hover:bg-rose-50 transition-colors">
      <i class="fa-solid fa-rotate-right"></i>
      重新测试
    </button>
    <button id="btn-share" class="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all">
      <i class="fa-solid fa-share-nodes"></i>
      分享结果
    </button>
  </div>`;

  // ===== 免责声明 =====
  html += `
  <div class="text-center text-xs text-gray-400 mb-8 animate-fadeIn" style="animation-delay: 1s">
    <p>⚠️ 本测试仅供娱乐参考，不构成任何心理学诊断。</p>
    <p class="mt-1">基于依恋理论、爱情三角理论等心理学框架设计。</p>
  </div>`;

  container.innerHTML = html;

  // 绑定结果页事件
  setTimeout(() => {
    bindResultEvents();
    drawRadarChart(state.result.normalizedScores);
    animateDimensionBars();
  }, 100);
}

function bindResultEvents() {
  // 重新测试
  const retryBtn = $('#btn-retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      state.currentQuestion = 0;
      state.answers = new Array(QUESTIONS.length).fill(-1);
      state.result = null;
      showPage('home');
    });
  }

  // 分享
  const shareBtn = $('#btn-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      shareResult();
    });
  }
}

// ===== 雷达图绘制 =====
function drawRadarChart(scores) {
  const canvas = $('#radar-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 360;

  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 130;
  const dims = DIMENSIONS;
  const n = dims.length;
  const angleStep = (Math.PI * 2) / n;
  const startAngle = -Math.PI / 2;

  // 清空
  ctx.clearRect(0, 0, size, size);

  // 绘制背景网格
  for (let level = 1; level <= 4; level++) {
    const r = (radius / 4) * level;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = startAngle + angleStep * i;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = level === 4 ? '#fecdd3' : '#fce7f3';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 绘制轴线
  for (let i = 0; i < n; i++) {
    const angle = startAngle + angleStep * i;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    ctx.strokeStyle = '#fecdd3';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 动画绘制数据区域
  let animProgress = 0;
  const animDuration = 1000;
  const animStart = performance.now();

  function animateRadar(now) {
    animProgress = Math.min(1, (now - animStart) / animDuration);
    const eased = 1 - Math.pow(1 - animProgress, 3); // easeOutCubic

    // 清除数据区域（重绘网格之上）
    ctx.clearRect(0, 0, size, size);

    // 重绘网格
    for (let level = 1; level <= 4; level++) {
      const r = (radius / 4) * level;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = startAngle + angleStep * i;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = level === 4 ? '#fecdd3' : '#fce7f3';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 分数标签
      if (level < 5) {
        ctx.fillStyle = '#d4d4d8';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${level * 25}`, centerX + 12, centerY - r + 4);
      }
    }

    for (let i = 0; i < n; i++) {
      const angle = startAngle + angleStep * i;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
      ctx.strokeStyle = '#fecdd3';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 绘制数据
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = startAngle + angleStep * idx;
      const value = (scores[dims[idx].id] || 0) / 100;
      const r = radius * value * eased;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // 填充
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(244, 63, 94, 0.15)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.25)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // 描边
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 数据点
    for (let i = 0; i < n; i++) {
      const angle = startAngle + angleStep * i;
      const value = (scores[dims[i].id] || 0) / 100;
      const r = radius * value * eased;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 维度标签
    for (let i = 0; i < n; i++) {
      const angle = startAngle + angleStep * i;
      const labelR = radius + 28;
      const x = centerX + labelR * Math.cos(angle);
      const y = centerY + labelR * Math.sin(angle);

      ctx.fillStyle = '#374151';
      ctx.font = 'bold 13px "Noto Sans SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${dims[i].icon} ${dims[i].name}`, x, y);
    }

    if (animProgress < 1) {
      requestAnimationFrame(animateRadar);
    }
  }

  requestAnimationFrame(animateRadar);
}

// ===== 维度条动画 =====
function animateDimensionBars() {
  const bars = $$('.dimension-bar-fill');
  bars.forEach((bar, i) => {
    const targetWidth = bar.dataset.targetWidth;
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 200 + i * 150);
  });
}

// ===== 分享功能 =====
function shareResult() {
  const p = state.result.personality;
  const text = `🐾 我在「恋爱动物人格测试」中测出了【${p.emoji} ${p.name}】—— ${p.title}！匹配度${state.result.matchScore}%\n\n${p.summary.substring(0, 50)}...\n\n快来测测你是什么恋爱动物吧！`;

  if (navigator.share) {
    navigator.share({
      title: '恋爱动物人格测试',
      text: text,
      url: window.location.href
    }).catch(() => {
      copyToClipboard(text);
    });
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('结果已复制到剪贴板，快去分享吧！ 💕');
  }).catch(() => {
    // 降级方案
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('结果已复制到剪贴板，快去分享吧！ 💕');
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-800 text-white rounded-full shadow-xl text-sm z-50 animate-fadeInUp';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ===== 初始化 =====
function init() {
  // 隐藏加载动画
  setTimeout(() => {
    const loader = $('#loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s';
      setTimeout(() => loader.remove(), 500);
    }

    const app = $('#app');
    if (app) {
      app.style.opacity = '1';
    }
  }, 800);

  initHomePage();
  initQuizNav();
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
