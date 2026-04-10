/**
 * 恋爱动物人格 - 沉浸式场景引擎
 * 
 * 核心特性：
 * 1. 场景自动播放（叙事文字打字机效果，自动推进）
 * 2. 对话选择（NPC说话后弹出选项）
 * 3. 场景点击交互（热区点击）
 * 4. 新海诚风格视觉（背景图+光效+粒子）
 */

import { SCENES, CHAPTERS, SCENE_IMAGES, getCollectionScenes } from './story.js';
import { DIMENSIONS, PERSONALITIES, getPersonalityById } from './data.js';
import { evaluateTest } from './engine.js';

// ===== 全局状态 =====
const state = {
  sceneIndex: 0,
  choices: {},       // { sceneId: choiceIndex | hotspotId }
  reactions: {},
  result: null,
  isTransitioning: false,
  currentChapter: 1,
  autoTimer: null,
  lineTimers: [],
};

const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// ===== 图片预加载 =====
function preloadImages(onProgress) {
  const urls = Object.values(SCENE_IMAGES);
  let loaded = 0;
  return new Promise(resolve => {
    if (urls.length === 0) { resolve(); return; }
    urls.forEach(url => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (onProgress) onProgress(loaded / urls.length);
        if (loaded >= urls.length) resolve();
      };
      img.src = url;
    });
  });
}

// ===== 粒子系统（轻量版，模拟光斑/尘埃） =====
class SceneParticles {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.running = true;
    this.hue = 40;
    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }
  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.scale(dpr, dpr);
  }
  init() {
    const count = Math.min(30, Math.floor(this.w * this.h / 25000));
    this.particles = [];
    for (let i = 0; i < count; i++) this.particles.push(this.create());
  }
  create() {
    return {
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.3 - 0.05,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.3 + 0.05,
      hue: this.hue + Math.random() * 30 - 15,
      life: Math.random() * 200 + 100,
      age: 0,
    };
  }
  setHue(h) { this.hue = h; }
  animate() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.age++;
      const lifeRatio = 1 - p.age / p.life;
      if (lifeRatio <= 0 || p.y < -10) {
        this.particles[i] = this.create();
        this.particles[i].y = this.h + 10;
        return;
      }
      const a = p.alpha * lifeRatio;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue},60%,70%,${a})`;
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }
}

let particles;

// ===== 场景背景管理 =====
function setSceneBg(bgKey, effect = 'none') {
  const img = $('#scene-bg-img');
  const imgNext = $('#scene-bg-img-next');
  const url = SCENE_IMAGES[bgKey];
  if (!url) return;

  // 交叉淡入
  imgNext.src = url;
  imgNext.className = 'absolute inset-0 w-full h-full object-cover';
  imgNext.style.opacity = '0';

  // 移除旧效果
  img.className = 'absolute inset-0 w-full h-full object-cover';

  requestAnimationFrame(() => {
    imgNext.style.opacity = '1';
    if (effect !== 'none') {
      imgNext.classList.add(`bg-effect-${effect}`);
    }
    setTimeout(() => {
      img.src = url;
      img.className = imgNext.className;
      imgNext.style.opacity = '0';
    }, 1300);
  });
}

// ===== 隐藏所有交互层 =====
function hideAllLayers() {
  $('#narration-layer').classList.add('hidden');
  $('#dialogue-layer').classList.add('hidden');
  $('#action-layer').classList.add('hidden');
  $('#transition-layer').classList.add('hidden');
  $('#dialogue-choices').classList.add('hidden');
  $('#dialogue-reaction').classList.add('hidden');
  $('#action-reaction').classList.add('hidden');
  $('#dialogue-speaker').classList.add('hidden');
  clearAutoTimers();
}

function clearAutoTimers() {
  if (state.autoTimer) { clearTimeout(state.autoTimer); state.autoTimer = null; }
  state.lineTimers.forEach(t => clearTimeout(t));
  state.lineTimers = [];
}

// ===== 更新进度指示器 =====
function updateProgress() {
  const dotsEl = $('#scene-progress-dots');
  if (!dotsEl) return;
  let html = '';
  CHAPTERS.forEach(ch => {
    const isActive = state.currentChapter === ch.id;
    const isCompleted = state.currentChapter > ch.id;
    html += `<div class="progress-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"></div>`;
  });
  dotsEl.innerHTML = html;

  const label = $('#chapter-label');
  const ch = CHAPTERS.find(c => c.id === state.currentChapter);
  if (label && ch) {
    label.textContent = `${ch.emoji} ${ch.title}`;
  }
}

// ===== 场景调度器 =====
function playScene(index) {
  if (index >= SCENES.length) {
    showCalculating();
    return;
  }
  state.sceneIndex = index;
  const scene = SCENES[index];
  state.currentChapter = scene.chapter;
  updateProgress();

  hideAllLayers();

  switch (scene.type) {
    case 'transition': playTransition(scene); break;
    case 'narration': playNarration(scene); break;
    case 'dialogue': playDialogue(scene); break;
    case 'action': playAction(scene); break;
  }
}

function nextScene() {
  if (state.isTransitioning) return;
  const scene = SCENES[state.sceneIndex];
  if (scene && scene.isEnding) {
    showCalculating();
    return;
  }
  playScene(state.sceneIndex + 1);
}

// ===== 章节过渡 =====
function playTransition(scene) {
  const layer = $('#transition-layer');
  const textEl = $('#transition-text');
  const subEl = $('#transition-subtext');

  state.isTransitioning = true;
  layer.classList.remove('hidden');
  layer.classList.add('visible');
  textEl.textContent = scene.text;
  subEl.textContent = scene.subtext || '';

  // 重置动画
  textEl.style.animation = 'none';
  subEl.style.animation = 'none';
  void textEl.offsetHeight;
  textEl.style.animation = '';
  subEl.style.animation = '';

  // 更新粒子颜色
  const ch = CHAPTERS.find(c => c.id === scene.chapter);
  if (ch && particles) {
    const hueMap = { '#f59e0b': 40, '#ec4899': 330, '#6366f1': 230, '#f43f5e': 350, '#a855f7': 270 };
    particles.setHue(hueMap[ch.color] || 40);
  }

  state.autoTimer = setTimeout(() => {
    layer.classList.remove('visible');
    setTimeout(() => {
      layer.classList.add('hidden');
      state.isTransitioning = false;
      nextScene();
    }, 800);
  }, scene.duration || 2500);
}

// ===== 叙事自动播放 =====
function playNarration(scene) {
  setSceneBg(scene.bg, scene.bgEffect);

  const layer = $('#narration-layer');
  const textEl = $('#narration-text');
  layer.classList.remove('hidden');
  textEl.innerHTML = '';

  // 创建所有行
  const lineEls = [];
  scene.lines.forEach((line, i) => {
    const span = document.createElement('span');
    span.className = `narration-line${line.style ? ` style-${line.style}` : ''}`;
    span.textContent = line.text;
    textEl.appendChild(span);
    lineEls.push(span);
  });

  // 按时间显示每一行
  scene.lines.forEach((line, i) => {
    const timer = setTimeout(() => {
      lineEls[i].classList.add('visible');
      // 只保留最近4行可见
      lineEls.forEach((el, j) => {
        if (j < i - 3) el.style.opacity = '0';
      });
    }, line.delay);
    state.lineTimers.push(timer);
  });

  // 自动推进到下一场景
  state.autoTimer = setTimeout(() => {
    nextScene();
  }, scene.autoDuration);
}

// ===== 对话场景 =====
function playDialogue(scene) {
  setSceneBg(scene.bg, scene.bgEffect);

  const layer = $('#dialogue-layer');
  const speakerEl = $('#dialogue-speaker');
  const speakerEmoji = $('#speaker-emoji');
  const speakerName = $('#speaker-name');
  const boxEl = $('#dialogue-box');
  const textEl = $('#dialogue-text');
  const choicesEl = $('#dialogue-choices');
  const reactionEl = $('#dialogue-reaction');

  layer.classList.remove('hidden');
  textEl.innerHTML = '';
  choicesEl.innerHTML = '';
  choicesEl.classList.add('hidden');
  reactionEl.classList.add('hidden');

  // 显示说话者
  if (scene.speaker) {
    speakerEl.classList.remove('hidden');
    speakerEmoji.textContent = scene.speakerEmoji || '💬';
    speakerName.textContent = scene.speaker;
  }

  // 逐行显示对话
  const lineEls = [];
  scene.dialogueLines.forEach(line => {
    const span = document.createElement('span');
    let cls = 'dialogue-line';
    if (line.isNarration) cls += ' is-narration';
    else if (line.isProtagonist) cls += ' is-protagonist';
    else cls += ' is-speech';
    span.className = cls;
    span.textContent = line.text + ' ';
    textEl.appendChild(span);
    lineEls.push(span);
  });

  scene.dialogueLines.forEach((line, i) => {
    const timer = setTimeout(() => {
      lineEls[i].classList.add('visible');
    }, line.delay);
    state.lineTimers.push(timer);
  });

  // 对话结束后显示选项
  const alreadyChosen = state.choices[scene.id] !== undefined;
  state.autoTimer = setTimeout(() => {
    if (alreadyChosen) {
      // 已选过，直接显示反馈并推进
      showDialogueReaction(scene, state.choices[scene.id]);
      setTimeout(() => nextScene(), 2500);
    } else {
      showDialogueChoices(scene);
    }
  }, scene.dialogueDuration);
}

function showDialogueChoices(scene) {
  const choicesEl = $('#dialogue-choices');
  choicesEl.innerHTML = '';
  choicesEl.classList.remove('hidden');

  scene.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'dialogue-choice';
    btn.innerHTML = `<span class="choice-dot">${['A','B','C','D'][idx]}</span><span class="flex-1">${choice.text}</span>`;
    btn.addEventListener('click', () => {
      // 记录选择
      state.choices[scene.id] = idx;
      state.reactions[scene.id] = choice.reaction;

      // 标记选中
      choicesEl.querySelectorAll('.dialogue-choice').forEach((el, i) => {
        if (i === idx) {
          el.classList.add('selected');
          el.querySelector('.choice-dot').innerHTML = '<i class="fa-solid fa-check text-[9px]"></i>';
        } else {
          el.classList.add('disabled');
        }
      });

      // 显示反馈
      showDialogueReaction(scene, idx);

      // 自动推进
      setTimeout(() => nextScene(), 2800);
    });
    choicesEl.appendChild(btn);
  });
}

function showDialogueReaction(scene, choiceIdx) {
  const reactionEl = $('#dialogue-reaction');
  const reaction = scene.choices[choiceIdx]?.reaction || state.reactions[scene.id];
  if (!reaction) return;
  reactionEl.classList.remove('hidden');
  reactionEl.querySelector('.reaction-bubble').textContent = reaction;
}

// ===== 场景点击交互 =====
function playAction(scene) {
  setSceneBg(scene.bg, scene.bgEffect);

  const layer = $('#action-layer');
  const promptEl = $('#action-prompt');
  const hotspotsEl = $('#action-hotspots');
  const reactionEl = $('#action-reaction');

  layer.classList.remove('hidden');
  hotspotsEl.innerHTML = '';
  reactionEl.classList.add('hidden');

  // 显示提示文字
  promptEl.querySelector('div > div').textContent = scene.prompt;
  promptEl.classList.remove('hidden');

  const alreadyChosen = state.choices[scene.id] !== undefined;

  // 创建热区按钮
  scene.hotspots.forEach((hs, i) => {
    const btn = document.createElement('button');
    btn.className = 'hotspot-btn';
    if (alreadyChosen && state.choices[scene.id] !== hs.id) btn.classList.add('disabled');
    if (alreadyChosen && state.choices[scene.id] === hs.id) btn.classList.add('selected');
    btn.style.left = `${hs.x}%`;
    btn.style.top = `${hs.y}%`;
    btn.style.animationDelay = `${i * 0.15}s`;
    btn.textContent = hs.label;

    if (!alreadyChosen) {
      btn.addEventListener('click', () => {
        state.choices[scene.id] = hs.id;
        state.reactions[scene.id] = hs.reaction;

        // 标记
        hotspotsEl.querySelectorAll('.hotspot-btn').forEach(el => {
          if (el === btn) el.classList.add('selected');
          else el.classList.add('disabled');
        });

        // 隐藏提示，显示反馈
        promptEl.classList.add('hidden');
        reactionEl.classList.remove('hidden');
        reactionEl.querySelector('.reaction-bubble').textContent = hs.reaction;

        // 自动推进
        setTimeout(() => nextScene(), 3000);
      });
    }

    hotspotsEl.appendChild(btn);
  });

  // 如果已选过，直接显示反馈并推进
  if (alreadyChosen) {
    promptEl.classList.add('hidden');
    reactionEl.classList.remove('hidden');
    reactionEl.querySelector('.reaction-bubble').textContent = state.reactions[scene.id] || '';
    setTimeout(() => nextScene(), 2500);
  }
}

// ===== 计算动画 =====
function showCalculating() {
  hideAllLayers();
  $('#page-scene').classList.add('hidden');

  const calcPage = $('#page-calculating');
  calcPage.classList.remove('hidden');
  calcPage.classList.add('flex');

  const steps = [
    { text: '📖 回顾你的故事旅程...', delay: 400 },
    { text: '🔍 分析每个关键时刻的选择...', delay: 1000 },
    { text: '🧬 解读六大情感维度...', delay: 1600 },
    { text: '🐾 在24种动物灵魂中寻找你的影子...', delay: 2200 },
    { text: '✨ 你的恋爱动物即将现身！', delay: 2800 },
  ];

  const stepsEl = $('#calc-steps');
  stepsEl.innerHTML = '';
  steps.forEach(step => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = 'animate-fadeInUp';
      p.textContent = step.text;
      stepsEl.appendChild(p);
    }, step.delay);
  });

  setTimeout(() => {
    state.result = evaluateTest(state.choices);
    calcPage.classList.add('hidden');
    calcPage.classList.remove('flex');
    showResult();
  }, 3500);
}

// ===== 显示结果页 =====
function showResult() {
  const resultPage = $('#page-result');
  resultPage.classList.remove('hidden');
  const footer = $('#app-footer');
  if (footer) footer.classList.remove('hidden');
  window.scrollTo({ top: 0 });
  renderResult();
}

// ===== 结果页渲染 =====
function renderResult() {
  const { personality, matchScore, dimensionAnalysis, topMatches, bestMatchPersonality, worstMatchPersonality } = state.result;
  const container = $('#result-container');

  let html = '';

  // 1. 主人格卡片
  html += `
  <div class="result-hero mb-8 animate-scaleIn">
    <div class="result-hero-content">
      <div class="ring-progress mx-auto mb-4" style="width:120px;height:120px">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle class="ring-bg" cx="60" cy="60" r="52"/>
          <circle class="ring-fill" cx="60" cy="60" r="52"
            stroke="url(#matchGrad)"
            stroke-dasharray="${2*Math.PI*52}"
            stroke-dashoffset="${2*Math.PI*52}"
            data-target="${2*Math.PI*52*(1-matchScore/100)}"
            id="match-ring"/>
          <defs><linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f43f5e"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs>
        </svg>
        <div class="ring-label"><span class="text-3xl">${personality.emoji}</span></div>
      </div>
      <div class="text-xs text-rose-400/60 tracking-widest uppercase mb-2">匹配度 <span id="match-counter" class="text-rose-400 font-bold">0</span>%</div>
      <h1 class="font-display font-black text-3xl sm:text-4xl text-white mb-1">${personality.name}</h1>
      <p class="text-rose-300/70 text-base font-medium mb-4">${personality.title}</p>
      <p class="text-white/50 text-sm leading-relaxed max-w-md mx-auto">${personality.summary}</p>
    </div>
  </div>`;

  // 2. 维度图谱
  html += `
  <div class="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 mb-6 animate-fadeInUp" style="animation-delay:0.15s;opacity:0">
    <h2 class="text-base font-bold text-white/80 mb-5 flex items-center gap-2"><span class="text-lg">📊</span> 恋爱维度图谱</h2>
    <div class="flex justify-center mb-6">
      <canvas id="radar-chart" width="320" height="320" style="width:320px;height:320px;max-width:100%"></canvas>
    </div>
    <div class="space-y-4">
      ${dimensionAnalysis.map((d,i) => `
        <div class="animate-fadeInUp" style="animation-delay:${0.3+i*0.1}s;opacity:0">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-sm">${d.icon}</span>
              <span class="text-sm font-medium text-white/70">${d.name}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full" style="background:${d.color}15;color:${d.color}">${d.label}</span>
              <span class="text-sm font-bold" style="color:${d.color}">${d.score}</span>
            </div>
          </div>
          <div class="dim-bar-track">
            <div class="dim-bar-fill" style="width:0%;background:linear-gradient(90deg,${d.color}88,${d.color})" data-target-width="${d.score}%"></div>
          </div>
          <div class="flex justify-between text-[10px] text-white/20 mt-1">
            <span>${d.labelLow}</span><span>${d.labelHigh}</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;

  // 3. 优势与注意
  html += `
  <div class="grid grid-cols-2 gap-3 mb-6">
    <div class="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5 animate-fadeInUp" style="animation-delay:0.4s;opacity:0">
      <div class="flex items-center gap-2 mb-3">
        <span class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">✓</span>
        <span class="text-sm font-bold text-emerald-400/80">恋爱超能力</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${personality.strengths.map(s => `<span class="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300/70 text-xs" title="${s}">${s.length>12?s.substring(0,12)+'…':s}</span>`).join('')}
      </div>
    </div>
    <div class="rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] p-5 animate-fadeInUp" style="animation-delay:0.5s;opacity:0">
      <div class="flex items-center gap-2 mb-3">
        <span class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs">!</span>
        <span class="text-sm font-bold text-amber-400/80">需要留意</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${personality.weaknesses.map(w => `<span class="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300/70 text-xs" title="${w}">${w.length>12?w.substring(0,12)+'…':w}</span>`).join('')}
      </div>
    </div>
  </div>`;

  // 4. 巴纳姆效应建议
  const barnumTips = generateBarnumTips(personality, dimensionAnalysis);
  html += `
  <div class="barnum-card mb-6 animate-fadeInUp" style="animation-delay:0.55s;opacity:0">
    <div class="flex items-center gap-2 mb-4"><span class="text-lg">🔮</span><span class="text-sm font-bold text-white/70">你可能不知道的自己</span></div>
    <div class="space-y-3">
      ${barnumTips.map(tip => `<div class="barnum-tip"><span class="text-base mr-2">${tip.emoji}</span>${tip.text}</div>`).join('')}
    </div>
  </div>`;

  // 5. 恋爱建议
  html += `
  <div class="rounded-2xl border border-rose-500/10 bg-gradient-to-r from-rose-500/[0.05] to-purple-500/[0.03] p-5 mb-6 animate-fadeInUp" style="animation-delay:0.6s;opacity:0">
    <div class="flex items-start gap-3">
      <span class="text-2xl shrink-0">💌</span>
      <div><p class="text-sm font-bold text-white/70 mb-1">给你的一句话</p><p class="text-sm text-white/45 leading-relaxed">${personality.advice}</p></div>
    </div>
  </div>`;

  // 6. 匹配
  html += `<div class="grid grid-cols-2 gap-3 mb-6">`;
  if (bestMatchPersonality) {
    html += `<div class="match-card match-card-good animate-fadeInUp" style="animation-delay:0.65s;opacity:0"><div class="text-center"><span class="text-4xl block mb-2">${bestMatchPersonality.emoji}</span><p class="text-[10px] text-emerald-400/70 tracking-wider uppercase mb-1">💚 灵魂伴侣</p><p class="text-sm font-bold text-white/80">${bestMatchPersonality.name}</p><p class="text-[11px] text-white/35 mt-1">${bestMatchPersonality.title}</p></div></div>`;
  }
  if (worstMatchPersonality) {
    html += `<div class="match-card match-card-bad animate-fadeInUp" style="animation-delay:0.75s;opacity:0"><div class="text-center"><span class="text-4xl block mb-2">${worstMatchPersonality.emoji}</span><p class="text-[10px] text-amber-400/70 tracking-wider uppercase mb-1">⚡ 需要磨合</p><p class="text-sm font-bold text-white/80">${worstMatchPersonality.name}</p><p class="text-[11px] text-white/35 mt-1">${worstMatchPersonality.title}</p></div></div>`;
  }
  html += `</div>`;

  // 7. TOP5
  html += `
  <div class="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-8 animate-fadeInUp" style="animation-delay:0.8s;opacity:0">
    <h2 class="text-sm font-bold text-white/60 mb-4 flex items-center gap-2"><span>🏆</span> 最像的5种动物</h2>
    <div class="space-y-2">
      ${topMatches.slice(0,5).map((m,i) => `
        <div class="top-match-item ${i===0?'first':''}">
          <span class="text-sm w-6 text-center">${i===0?'👑':['🥈','🥉','4','5'][i-1]}</span>
          <span class="text-2xl">${m.personality.emoji}</span>
          <div class="flex-1 min-w-0"><p class="text-sm text-white/70 truncate">${m.personality.name}</p></div>
          <div class="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div class="h-full rounded-full transition-all duration-1000" style="width:0%;background:${i===0?'linear-gradient(90deg,#f43f5e,#a855f7)':'rgba(255,255,255,0.15)'}" data-bar-target="${m.matchScore}%"></div>
          </div>
          <span class="text-xs font-mono ${i===0?'text-rose-400':'text-white/30'} w-8 text-right">${m.matchScore}%</span>
        </div>
      `).join('')}
    </div>
  </div>`;

  // 8. 按钮
  html += `
  <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 animate-fadeInUp" style="animation-delay:0.85s;opacity:0">
    <button id="btn-retry" class="result-btn result-btn-secondary"><i class="fa-solid fa-rotate-right"></i> 重新体验</button>
    <button id="btn-share" class="result-btn result-btn-primary"><i class="fa-solid fa-share-nodes"></i> 分享结果</button>
  </div>
  <div class="text-center text-[11px] text-white/20 mb-6 animate-fadeIn" style="animation-delay:1s;opacity:0">
    <p>⚠️ 本测试仅供娱乐参考，不构成心理学诊断</p>
  </div>`;

  container.innerHTML = html;

  setTimeout(() => {
    animateMatchCounter(matchScore);
    animateMatchRing();
    drawRadarChart(state.result.normalizedScores);
    animateDimensionBars();
    animateTopMatchBars();
    bindResultEvents();
  }, 200);
}

// ===== 巴纳姆效应 =====
function generateBarnumTips(personality, dims) {
  const tips = [];
  const d1 = dims.find(d => d.id==='D1'), d2 = dims.find(d => d.id==='D2');
  const d4 = dims.find(d => d.id==='D4'), d5 = dims.find(d => d.id==='D5'), d6 = dims.find(d => d.id==='D6');

  if (d1 && d1.score >= 60) tips.push({emoji:'🛡️',text:'你在感情中给人一种"很稳"的感觉，但其实你也有脆弱的时候——只是你习惯了自己消化。偶尔让对方看到你的不安，反而会让关系更亲密。'});
  else if (d1) tips.push({emoji:'🌙',text:'你对感情的敏感度很高，这让你能捕捉到别人忽略的细节。但有时候，你的直觉会放大一些并不存在的危险信号。'});

  if (d2 && d2.score >= 60) tips.push({emoji:'💬',text:'你的表达能力是你的魅力之一，但你可能没意识到——有时候你说的话比你以为的更有分量。一句不经意的话，可能在对方心里回响很久。'});
  else if (d2) tips.push({emoji:'🤫',text:'你内心的感受比你表现出来的要丰富得多。那些没说出口的话，其实对方也在等着听。不需要完美的措辞，真诚本身就是最好的表达。'});

  if (d5 && d5.score >= 60) tips.push({emoji:'✨',text:'你心中有一个关于爱情的美好蓝图，这让你在感情中充满期待和热情。但记住，最动人的爱情故事，往往不是按剧本走的那些。'});
  else if (d5) tips.push({emoji:'🧭',text:'你用理性守护着自己的感情世界，这是一种智慧。但偶尔放下分析，跟着心走一次，你可能会发现一些意想不到的美好。'});

  if (d6 && d6.score >= 60) tips.push({emoji:'🦋',text:'你很清楚自己是谁，这在感情中是一种稀缺的品质。但有时候，"我不需要任何人"的姿态，可能会让真正想靠近你的人犹豫。'});
  else if (d6) tips.push({emoji:'🤝',text:'你在感情中愿意全身心投入，这种真诚很珍贵。同时也别忘了，保持一些属于自己的小世界，会让你在关系中更有魅力。'});

  return tips.slice(0, 4);
}

// ===== 动画工具 =====
function animateMatchCounter(target) {
  const el = $('#match-counter');
  if (!el) return;
  let current = 0;
  const start = performance.now();
  function update(now) {
    const progress = Math.min(1, (now - start) / 1500);
    current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function animateMatchRing() {
  const ring = $('#match-ring');
  if (!ring) return;
  setTimeout(() => {
    ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
    ring.style.strokeDashoffset = ring.dataset.target;
  }, 300);
}

function drawRadarChart(scores) {
  const canvas = $('#radar-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const cx = size/2, cy = size/2, radius = 115;
  const dims = DIMENSIONS;
  const n = dims.length;
  const step = (Math.PI*2)/n;
  const startAngle = -Math.PI/2;
  const animStart = performance.now();

  function draw(now) {
    const progress = Math.min(1, (now - animStart) / 1200);
    const eased = 1 - Math.pow(1 - progress, 3);
    ctx.clearRect(0, 0, size, size);

    for (let level = 1; level <= 4; level++) {
      const r = (radius/4)*level;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = startAngle + step*(i%n);
        const x = cx + r*Math.cos(angle), y = cy + r*Math.sin(angle);
        i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,255,255,${level===4?0.08:0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (let i = 0; i < n; i++) {
      const angle = startAngle + step*i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius*Math.cos(angle), cy + radius*Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i%n;
      const angle = startAngle + step*idx;
      const value = (scores[dims[idx].id]||0)/100;
      const r = radius*value*eased;
      const x = cx + r*Math.cos(angle), y = cy + r*Math.sin(angle);
      i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,radius);
    grad.addColorStop(0,'rgba(244,63,94,0.08)');
    grad.addColorStop(1,'rgba(168,85,247,0.15)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(244,63,94,0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    for (let i = 0; i < n; i++) {
      const angle = startAngle + step*i;
      const value = (scores[dims[i].id]||0)/100;
      const r = radius*value*eased;
      const x = cx + r*Math.cos(angle), y = cy + r*Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x,y,4,0,Math.PI*2);
      ctx.fillStyle = dims[i].color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(10,10,15,0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    for (let i = 0; i < n; i++) {
      const angle = startAngle + step*i;
      const lR = radius + 24;
      const x = cx + lR*Math.cos(angle), y = cy + lR*Math.sin(angle);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '12px "Noto Sans SC",sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${dims[i].icon} ${dims[i].name}`, x, y);
    }

    if (progress < 1) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

function animateDimensionBars() {
  $$('.dim-bar-fill').forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.targetWidth; }, 400 + i*120);
  });
}

function animateTopMatchBars() {
  $$('[data-bar-target]').forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.barTarget; }, 800 + i*100);
  });
}

// ===== 结果页事件 =====
function bindResultEvents() {
  const retryBtn = $('#btn-retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      state.sceneIndex = 0;
      state.choices = {};
      state.reactions = {};
      state.result = null;
      state.currentChapter = 1;
      $('#page-result').classList.add('hidden');
      $('#page-home').classList.remove('hidden');
      const footer = $('#app-footer');
      if (footer) footer.classList.remove('hidden');
      window.scrollTo({ top: 0 });
    });
  }
  const shareBtn = $('#btn-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const p = state.result.personality;
      const text = `📖 我在「恋爱故事」中测出了【${p.emoji} ${p.name}】—— ${p.title}！匹配度${state.result.matchScore}%\n\n快来体验你的恋爱故事吧！`;
      if (navigator.share) {
        navigator.share({title:'恋爱动物人格',text,url:window.location.href}).catch(()=>copyText(text));
      } else { copyText(text); }
    });
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(()=>showToast('结果已复制，快去分享吧！💕')).catch(()=>{
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy');
    document.body.removeChild(ta); showToast('结果已复制，快去分享吧！💕');
  });
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast-msg'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity 0.3s';setTimeout(()=>t.remove(),300);},2500);
}

// ===== 初始化 =====
async function init() {
  // 预加载图片
  const progressBar = $('#load-progress');
  await preloadImages(p => {
    if (progressBar) progressBar.style.width = `${Math.round(p * 100)}%`;
  });

  // 初始化粒子
  const pCanvas = $('#scene-particles');
  if (pCanvas) particles = new SceneParticles(pCanvas);

  // 设置首页背景
  const homeBg = $('#home-bg');
  if (homeBg) {
    const bgUrl = SCENE_IMAGES.sunset_street;
    homeBg.style.backgroundImage = `url(${bgUrl})`;
    homeBg.style.backgroundSize = 'cover';
    homeBg.style.backgroundPosition = 'center';
  }

  // 隐藏加载
  setTimeout(() => {
    const loader = $('#loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.8s';
      setTimeout(() => loader.remove(), 800);
    }
    const footer = $('#app-footer');
    if (footer) footer.classList.remove('hidden');
  }, 500);

  // 开始按钮
  $('#btn-start').addEventListener('click', () => {
    state.sceneIndex = 0;
    state.choices = {};
    state.reactions = {};
    state.result = null;
    state.currentChapter = 1;

    $('#page-home').classList.add('hidden');
    const footer = $('#app-footer');
    if (footer) footer.classList.add('hidden');

    const scenePage = $('#page-scene');
    scenePage.classList.remove('hidden');

    playScene(0);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
