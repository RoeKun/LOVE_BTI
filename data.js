/**
 * 恋爱动物人格测试 - 数据模块
 * 
 * 维度体系（每个维度 0-100 分，50为中间值）：
 * D1: 依恋倾向 —— 安全型(高分) ↔ 焦虑型(低分)
 * D2: 情感表达 —— 外放型(高分) ↔ 内敛型(低分)
 * D3: 关系节奏 —— 主动型(高分) ↔ 被动型(低分)
 * D4: 冲突应对 —— 直面型(高分) ↔ 回避型(低分)
 * D5: 爱情观念 —— 理想型(高分) ↔ 现实型(低分)
 * D6: 独立程度 —— 独立型(高分) ↔ 共生型(低分)
 */

// 维度定义
export const DIMENSIONS = [
  { id: 'D1', name: '依恋倾向', labelHigh: '安全型', labelLow: '焦虑型', icon: '🛡️', color: '#f43f5e', description: '你在亲密关系中的安全感水平' },
  { id: 'D2', name: '情感表达', labelHigh: '外放型', labelLow: '内敛型', icon: '💬', color: '#ec4899', description: '你表达爱意和情感的方式' },
  { id: 'D3', name: '关系节奏', labelHigh: '主动型', labelLow: '被动型', icon: '🚀', color: '#8b5cf6', description: '你在关系中推进节奏的倾向' },
  { id: 'D4', name: '冲突应对', labelHigh: '直面型', labelLow: '回避型', icon: '⚡', color: '#f59e0b', description: '你面对关系矛盾时的处理方式' },
  { id: 'D5', name: '爱情观念', labelHigh: '理想型', labelLow: '现实型', icon: '✨', color: '#6366f1', description: '你对爱情的期待和信念' },
  { id: 'D6', name: '独立程度', labelHigh: '独立型', labelLow: '共生型', icon: '🦋', color: '#14b8a6', description: '你在关系中对个人空间的需求' }
];

/**
 * 题目数据
 * 每道题包含：
 * - id: 题目编号
 * - scenario: 情景描述（可选）
 * - question: 题目问题
 * - dimension: 主要测量维度（数组，可测多个维度）
 * - options: 选项数组，每个选项包含 text 和 scores（对各维度的加分）
 */
export const QUESTIONS = [
  // ===== D1 依恋倾向 相关题目 =====
  {
    id: 1,
    scenario: '你和恋人约好了周末见面，但对方临时说有事要改期。',
    question: '你的第一反应是？',
    dimensions: ['D1'],
    options: [
      { text: '没关系，下次再约就好，各自安排', scores: { D1: 22 } },
      { text: '有点失落，但理解对方，主动问什么时候有空', scores: { D1: 16 } },
      { text: '心里不舒服，忍不住想是不是自己不够重要', scores: { D1: 8 } },
      { text: '很焦虑，反复确认对方是不是在敷衍自己', scores: { D1: 2 } }
    ]
  },
  {
    id: 2,
    scenario: '恋人今天一整天都没有主动联系你。',
    question: '到了晚上，你会怎么做？',
    dimensions: ['D1', 'D3'],
    options: [
      { text: '主动发消息问候，觉得对方可能忙', scores: { D1: 18, D3: 16 } },
      { text: '等对方先联系，但心里有点在意', scores: { D1: 10, D3: 6 } },
      { text: '忍不住翻看对方朋友圈，猜测在做什么', scores: { D1: 4, D3: 4 } },
      { text: '不太在意，自己的生活也很充实', scores: { D1: 20, D3: 10 } }
    ]
  },
  {
    id: 3,
    question: '在恋爱关系中，你觉得"安全感"主要来自哪里？',
    dimensions: ['D1', 'D6'],
    options: [
      { text: '来自自己内心的笃定和自信', scores: { D1: 22, D6: 18 } },
      { text: '来自对方持续稳定的行动和陪伴', scores: { D1: 14, D6: 8 } },
      { text: '来自双方坦诚的沟通和承诺', scores: { D1: 18, D6: 14 } },
      { text: '来自对方时刻的关注和回应', scores: { D1: 6, D6: 4 } }
    ]
  },
  {
    id: 4,
    scenario: '你发现恋人和异性朋友聊天很频繁。',
    question: '你的处理方式是？',
    dimensions: ['D1', 'D4'],
    options: [
      { text: '信任对方，不会特别在意', scores: { D1: 22, D4: 12 } },
      { text: '找个合适的时机，坦诚地和对方聊聊自己的感受', scores: { D1: 16, D4: 20 } },
      { text: '嘴上不说，但会暗中观察，心里很不安', scores: { D1: 6, D4: 4 } },
      { text: '直接质问对方，要求解释清楚', scores: { D1: 8, D4: 18 } }
    ]
  },

  // ===== D2 情感表达 相关题目 =====
  {
    id: 5,
    question: '恋人过生日，你更倾向于怎么表达心意？',
    dimensions: ['D2'],
    options: [
      { text: '精心策划惊喜派对，当众表白', scores: { D2: 22 } },
      { text: '手写一封长信，附上用心挑选的礼物', scores: { D2: 16 } },
      { text: '默默准备好一切，不需要太多言语', scores: { D2: 8 } },
      { text: '发个红包或转账，实在不擅长搞这些', scores: { D2: 3 } }
    ]
  },
  {
    id: 6,
    scenario: '你们在一起看了一部很感人的电影。',
    question: '散场后你会？',
    dimensions: ['D2', 'D5'],
    options: [
      { text: '激动地和对方分享感受，讨论剧情和人生', scores: { D2: 20, D5: 16 } },
      { text: '握住对方的手，用眼神传递感动', scores: { D2: 14, D5: 14 } },
      { text: '心里很触动，但不太会表达出来', scores: { D2: 6, D5: 10 } },
      { text: '理性分析剧情逻辑，觉得有些地方不合理', scores: { D2: 4, D5: 4 } }
    ]
  },
  {
    id: 7,
    question: '你觉得"我爱你"这三个字应该？',
    dimensions: ['D2'],
    options: [
      { text: '经常说，爱就要大声说出来', scores: { D2: 22 } },
      { text: '在特别的时刻说，让它保持分量', scores: { D2: 14 } },
      { text: '用行动代替，说多了就不值钱了', scores: { D2: 6 } },
      { text: '很难说出口，但心里是这么想的', scores: { D2: 3 } }
    ]
  },
  {
    id: 8,
    scenario: '恋人今天工作遇到了很大的挫折，情绪很低落。',
    question: '你会怎么安慰？',
    dimensions: ['D2', 'D4'],
    options: [
      { text: '紧紧抱住对方，说"有我在，一切都会好的"', scores: { D2: 20, D4: 14 } },
      { text: '认真倾听，帮对方分析问题，一起想解决办法', scores: { D2: 14, D4: 18 } },
      { text: '默默陪在身边，给对方做顿好吃的', scores: { D2: 8, D4: 10 } },
      { text: '给对方空间，等情绪好了再聊', scores: { D2: 4, D4: 6 } }
    ]
  },

  // ===== D3 关系节奏 相关题目 =====
  {
    id: 9,
    question: '在一段新的恋爱关系中，你通常是？',
    dimensions: ['D3'],
    options: [
      { text: '主动推进每一步，约会、确认关系、见家长都由我来', scores: { D3: 22 } },
      { text: '会主动一些，但也会观察对方的反应来调整节奏', scores: { D3: 16 } },
      { text: '更喜欢被追求的感觉，让对方来推进', scores: { D3: 6 } },
      { text: '顺其自然，不刻意推进也不刻意回避', scores: { D3: 12 } }
    ]
  },
  {
    id: 10,
    scenario: '你对一个人有好感，但不确定对方的态度。',
    question: '你会怎么做？',
    dimensions: ['D3', 'D1'],
    options: [
      { text: '直接表白，不想浪费时间猜来猜去', scores: { D3: 22, D1: 16 } },
      { text: '制造更多接触机会，慢慢试探', scores: { D3: 16, D1: 12 } },
      { text: '暗示一下，看对方能不能接收到信号', scores: { D3: 8, D1: 10 } },
      { text: '默默喜欢，除非对方先表态', scores: { D3: 2, D1: 8 } }
    ]
  },
  {
    id: 11,
    question: '关于恋爱中"谁更主动"这件事，你的看法是？',
    dimensions: ['D3', 'D6'],
    options: [
      { text: '我喜欢掌握主动权，这让我更有安全感', scores: { D3: 20, D6: 16 } },
      { text: '双方应该势均力敌，轮流主动', scores: { D3: 14, D6: 14 } },
      { text: '希望对方更主动一些，我负责回应', scores: { D3: 6, D6: 8 } },
      { text: '不在意谁主动，重要的是彼此舒服', scores: { D3: 12, D6: 12 } }
    ]
  },

  // ===== D4 冲突应对 相关题目 =====
  {
    id: 12,
    scenario: '你和恋人因为一件小事吵架了，气氛很僵。',
    question: '你通常会？',
    dimensions: ['D4'],
    options: [
      { text: '冷静下来后主动找对方谈，把问题说清楚', scores: { D4: 22 } },
      { text: '当场就要把道理讲明白，不能憋着', scores: { D4: 18 } },
      { text: '先各自冷静一下，等情绪过了再说', scores: { D4: 12 } },
      { text: '选择沉默或者转移话题，不想把矛盾扩大', scores: { D4: 4 } }
    ]
  },
  {
    id: 13,
    question: '当恋人做了让你不开心的事，你会？',
    dimensions: ['D4', 'D2'],
    options: [
      { text: '直接告诉对方哪里让我不舒服，希望改正', scores: { D4: 20, D2: 16 } },
      { text: '用委婉的方式暗示，希望对方能领会', scores: { D4: 12, D2: 10 } },
      { text: '自己消化情绪，觉得说了也没用', scores: { D4: 4, D2: 4 } },
      { text: '虽然不开心但选择包容，毕竟人无完人', scores: { D4: 8, D2: 8 } }
    ]
  },
  {
    id: 14,
    scenario: '你们对未来规划产生了严重分歧（比如工作城市的选择）。',
    question: '你的态度是？',
    dimensions: ['D4', 'D5'],
    options: [
      { text: '坐下来认真讨论，列出各自的考量，寻找最优解', scores: { D4: 22, D5: 8 } },
      { text: '相信爱情能克服一切，只要在一起就好', scores: { D4: 10, D5: 22 } },
      { text: '先搁置争议，走一步看一步', scores: { D4: 6, D5: 12 } },
      { text: '各退一步，找一个折中方案', scores: { D4: 16, D5: 10 } }
    ]
  },

  // ===== D5 爱情观念 相关题目 =====
  {
    id: 15,
    question: '你心目中理想的爱情是什么样的？',
    dimensions: ['D5'],
    options: [
      { text: '灵魂伴侣，心有灵犀，如同命中注定', scores: { D5: 22 } },
      { text: '相互欣赏、共同成长的伙伴关系', scores: { D5: 14 } },
      { text: '稳定可靠、细水长流的日常陪伴', scores: { D5: 6 } },
      { text: '三观契合、条件匹配的理性选择', scores: { D5: 2 } }
    ]
  },
  {
    id: 16,
    scenario: '朋友问你："你觉得爱情和面包哪个更重要？"',
    question: '你的回答是？',
    dimensions: ['D5', 'D6'],
    options: [
      { text: '当然是爱情，没有爱的生活有什么意义', scores: { D5: 22, D6: 6 } },
      { text: '两个都要，但如果非要选，爱情优先', scores: { D5: 16, D6: 10 } },
      { text: '两个都要，但如果非要选，面包优先', scores: { D5: 6, D6: 16 } },
      { text: '先有面包才能谈爱情，这是现实', scores: { D5: 2, D6: 20 } }
    ]
  },
  {
    id: 17,
    question: '你相信"一见钟情"吗？',
    dimensions: ['D5'],
    options: [
      { text: '深信不疑，我就经历过那种电光火石的瞬间', scores: { D5: 22 } },
      { text: '相信，但觉得日久生情更可靠', scores: { D5: 14 } },
      { text: '半信半疑，可能只是荷尔蒙作祟', scores: { D5: 8 } },
      { text: '不信，真正的感情需要时间验证', scores: { D5: 2 } }
    ]
  },
  {
    id: 18,
    question: '选择恋爱对象时，你最看重什么？',
    dimensions: ['D5', 'D1'],
    options: [
      { text: '那种说不清道不明的心动感觉和化学反应', scores: { D5: 22, D1: 10 } },
      { text: '性格合拍，在一起时的舒适感', scores: { D5: 14, D1: 18 } },
      { text: '人品可靠，有责任心和上进心', scores: { D5: 6, D1: 16 } },
      { text: '综合条件匹配，包括家庭背景、经济能力等', scores: { D5: 2, D1: 14 } }
    ]
  },

  // ===== D6 独立程度 相关题目 =====
  {
    id: 19,
    question: '恋爱后，你对"个人空间"的态度是？',
    dimensions: ['D6'],
    options: [
      { text: '非常需要，各自有独立的社交圈和爱好', scores: { D6: 22 } },
      { text: '需要一些，但大部分时间想和对方在一起', scores: { D6: 12 } },
      { text: '恋爱了就应该时刻在一起，这才叫爱', scores: { D6: 2 } },
      { text: '保持适度距离，既亲密又独立', scores: { D6: 18 } }
    ]
  },
  {
    id: 20,
    scenario: '恋人说这个周末想一个人待着，不想约会。',
    question: '你的反应是？',
    dimensions: ['D6', 'D1'],
    options: [
      { text: '完全理解，正好自己也可以安排点事情', scores: { D6: 22, D1: 20 } },
      { text: '尊重对方，但心里会有一点点失落', scores: { D6: 14, D1: 14 } },
      { text: '有点受伤，觉得对方不够爱自己', scores: { D6: 4, D1: 6 } },
      { text: '试着说服对方一起做点什么', scores: { D6: 6, D1: 10 } }
    ]
  },
  {
    id: 21,
    question: '你觉得恋人之间应该共享手机密码吗？',
    dimensions: ['D6', 'D1'],
    options: [
      { text: '不需要，信任不靠查手机来维持', scores: { D6: 22, D1: 20 } },
      { text: '可以共享，但不会主动去翻看', scores: { D6: 16, D1: 16 } },
      { text: '应该共享，这是信任的表现', scores: { D6: 8, D1: 10 } },
      { text: '必须共享，没什么不能让对方看的', scores: { D6: 2, D1: 6 } }
    ]
  },

  // ===== 综合题目 =====
  {
    id: 22,
    scenario: '你们恋爱一周年纪念日到了。',
    question: '你理想中的庆祝方式是？',
    dimensions: ['D2', 'D5'],
    options: [
      { text: '去两人初次约会的地方，重温美好回忆', scores: { D2: 16, D5: 20 } },
      { text: '策划一场浪漫的烛光晚餐或旅行', scores: { D2: 20, D5: 16 } },
      { text: '在家做顿饭，看看电影，温馨就好', scores: { D2: 8, D5: 8 } },
      { text: '送一份实用的礼物，日子不用太仪式感', scores: { D2: 4, D5: 4 } }
    ]
  },
  {
    id: 23,
    scenario: '恋人的好朋友对你有些不友善。',
    question: '你会怎么处理？',
    dimensions: ['D4', 'D3'],
    options: [
      { text: '和恋人坦诚沟通，请对方帮忙协调', scores: { D4: 20, D3: 14 } },
      { text: '主动找那个朋友聊聊，化解误会', scores: { D4: 16, D3: 22 } },
      { text: '保持礼貌距离，不影响和恋人的关系就好', scores: { D4: 10, D3: 8 } },
      { text: '忍着不说，不想给恋人添麻烦', scores: { D4: 4, D3: 4 } }
    ]
  },
  {
    id: 24,
    question: '如果用一个词形容你在恋爱中的角色，你觉得是？',
    dimensions: ['D3', 'D6', 'D2'],
    options: [
      { text: '守护者——默默付出，保护对方', scores: { D3: 14, D6: 14, D2: 8 } },
      { text: '引领者——带着对方一起探索世界', scores: { D3: 20, D6: 18, D2: 16 } },
      { text: '陪伴者——最好的爱就是一直在身边', scores: { D3: 10, D6: 6, D2: 12 } },
      { text: '欣赏者——爱是看见和理解对方', scores: { D3: 8, D6: 16, D2: 14 } }
    ]
  },
  {
    id: 25,
    question: '回顾你的恋爱经历（或想象），你最害怕的是？',
    dimensions: ['D1', 'D4', 'D6'],
    options: [
      { text: '被抛弃，害怕对方突然不爱了', scores: { D1: 4, D4: 8, D6: 6 } },
      { text: '失去自我，在关系中迷失了自己', scores: { D1: 14, D4: 12, D6: 22 } },
      { text: '无法沟通，两个人越来越远', scores: { D1: 12, D4: 4, D6: 14 } },
      { text: '平淡无味，失去了最初的心动', scores: { D1: 16, D4: 14, D6: 12 } }
    ]
  }
];

/**
 * 24种恋爱动物人格
 * 
 * 每种人格定义了6个维度的理想分值（0-100）
 * 匹配算法通过计算用户得分与各人格理想分值的欧氏距离来确定最佳匹配
 * 
 * 维度分值含义：
 * D1 高=安全 低=焦虑 | D2 高=外放 低=内敛 | D3 高=主动 低=被动
 * D4 高=直面 低=回避 | D5 高=理想 低=现实 | D6 高=独立 低=共生
 */
export const PERSONALITIES = [
  {
    id: 'golden_retriever',
    name: '金毛犬',
    emoji: '🐕',
    title: '温暖如阳的忠诚恋人',
    color: '#f59e0b',
    bgGradient: 'from-amber-50 to-orange-50',
    profile: { D1: 85, D2: 90, D3: 75, D4: 70, D5: 65, D6: 35 },
    summary: '你是恋爱中的"阳光担当"，热情、忠诚、毫无保留地付出爱意。你的爱像金色的阳光，温暖而持久，让身边的人感到无比安心。',
    strengths: ['无条件的忠诚与信任', '善于表达爱意，让对方时刻感受到被爱', '情绪稳定，是关系中的定海神针', '愿意为爱付出，不计较得失'],
    weaknesses: ['有时过于依赖对方的陪伴', '可能忽视自己的需求', '面对背叛时受伤极深', '容易在关系中失去个人边界'],
    loveLanguage: '肢体接触 + 服务行动',
    advice: '学会在付出的同时关注自己的感受，适当保留一些个人空间。记住，爱自己才能更好地爱别人。',
    bestMatch: 'cat',
    worstMatch: 'eagle'
  },
  {
    id: 'dolphin',
    name: '海豚',
    emoji: '🐬',
    title: '灵动活泼的浪漫使者',
    color: '#06b6d4',
    bgGradient: 'from-cyan-50 to-blue-50',
    profile: { D1: 80, D2: 85, D3: 80, D4: 65, D5: 80, D6: 55 },
    summary: '你是恋爱中的"快乐源泉"，聪明、活泼、充满创意。你总能为平淡的日常注入惊喜和浪漫，让恋爱变成一场永不落幕的冒险。',
    strengths: ['极强的共情能力和情商', '善于制造浪漫和惊喜', '沟通能力出色，善于化解矛盾', '乐观积极，感染力强'],
    weaknesses: ['注意力容易分散，有时不够专注', '对新鲜感有较高需求', '可能回避深层次的情感问题', '情绪波动时需要较多安抚'],
    loveLanguage: '精心时刻 + 言语肯定',
    advice: '在追求浪漫的同时，也要学会面对关系中不那么美好的部分。深度的亲密需要勇气去面对脆弱。',
    bestMatch: 'penguin',
    worstMatch: 'wolf'
  },
  {
    id: 'lion',
    name: '狮子',
    emoji: '🦁',
    title: '霸气护航的王者恋人',
    color: '#d97706',
    bgGradient: 'from-amber-50 to-yellow-50',
    profile: { D1: 82, D2: 78, D3: 92, D4: 85, D5: 60, D6: 70 },
    summary: '你是恋爱中的"王者担当"，自信、果断、有强烈的保护欲。你用行动证明爱，为对方撑起一片天，是最可靠的港湾。',
    strengths: ['强大的安全感提供者', '果断有担当，说到做到', '面对问题从不逃避', '有领导力，能带领关系向前发展'],
    weaknesses: ['控制欲可能过强', '不善于示弱和表达脆弱', '有时过于强势，忽略对方感受', '难以接受被拒绝或质疑'],
    loveLanguage: '服务行动 + 礼物赠送',
    advice: '真正的强大不是控制一切，而是敢于展示脆弱。试着放下"必须保护一切"的执念，让对方也有机会照顾你。',
    bestMatch: 'rabbit',
    worstMatch: 'lion'
  },
  {
    id: 'cat',
    name: '猫咪',
    emoji: '🐱',
    title: '高冷外表下的温柔灵魂',
    color: '#8b5cf6',
    bgGradient: 'from-violet-50 to-purple-50',
    profile: { D1: 72, D2: 30, D3: 35, D4: 45, D5: 55, D6: 85 },
    summary: '你是恋爱中的"神秘高冷派"，看似独立疏离，实则内心柔软。你的爱含蓄而深沉，只在信任的人面前展露真实的自己。',
    strengths: ['高度独立，不会给对方压力', '观察力敏锐，能察觉对方的细微变化', '忠诚度极高，一旦认定就不轻易改变', '有自己的精神世界，内涵丰富'],
    weaknesses: ['情感表达困难，容易被误解为冷漠', '需要很长时间才能打开心扉', '受伤时倾向于独自舔舐伤口', '可能过度保护自己的个人空间'],
    loveLanguage: '精心时刻 + 肢体接触（仅限亲密的人）',
    advice: '试着更主动地表达你的感受，哪怕只是一个拥抱或一句"我想你了"。你的伴侣需要这些信号来确认你的爱。',
    bestMatch: 'golden_retriever',
    worstMatch: 'swan'
  },
  {
    id: 'owl',
    name: '猫头鹰',
    emoji: '🦉',
    title: '深思熟虑的智慧恋人',
    color: '#6366f1',
    bgGradient: 'from-indigo-50 to-blue-50',
    profile: { D1: 75, D2: 35, D3: 40, D4: 72, D5: 25, D6: 80 },
    summary: '你是恋爱中的"理性分析师"，冷静、睿智、深思熟虑。你用理性的方式经营感情，虽然不够浪漫，但每一步都走得稳健可靠。',
    strengths: ['理性客观，能做出明智的关系决策', '善于分析和解决问题', '情绪稳定，不会冲动行事', '对伴侣有深刻的理解和洞察'],
    weaknesses: ['过于理性可能显得缺乏激情', '不擅长制造浪漫氛围', '可能过度分析感情，失去直觉', '情感表达方式过于含蓄'],
    loveLanguage: '服务行动 + 精心时刻',
    advice: '爱情不是一道数学题，有时候需要放下分析，跟着感觉走。偶尔的冲动和浪漫，会让你们的关系更有温度。',
    bestMatch: 'butterfly',
    worstMatch: 'dolphin'
  },
  {
    id: 'wolf',
    name: '灰狼',
    emoji: '🐺',
    title: '深情专一的灵魂守护者',
    color: '#64748b',
    bgGradient: 'from-slate-50 to-gray-50',
    profile: { D1: 78, D2: 40, D3: 65, D4: 68, D5: 45, D6: 72 },
    summary: '你是恋爱中的"深情守护者"，外表冷峻内心炽热。你对爱情极度专一，一旦认定就是一辈子，用沉默而坚定的方式守护所爱之人。',
    strengths: ['极度专一和忠诚', '保护欲强，让对方感到安全', '有原则有底线，值得信赖', '在关键时刻绝不退缩'],
    weaknesses: ['占有欲可能过强', '不善言辞，容易造成误解', '对外人警惕心重，社交圈较窄', '受伤后可能变得更加封闭'],
    loveLanguage: '服务行动 + 肢体接触',
    advice: '信任是爱情的基石，但过度的保护和占有会让对方窒息。学会给彼此呼吸的空间，爱才能长久。',
    bestMatch: 'deer',
    worstMatch: 'butterfly'
  },
  {
    id: 'parrot',
    name: '鹦鹉',
    emoji: '🦜',
    title: '热情洋溢的甜蜜话痨',
    color: '#10b981',
    bgGradient: 'from-emerald-50 to-green-50',
    profile: { D1: 35, D2: 92, D3: 78, D4: 55, D5: 75, D6: 25 },
    summary: '你是恋爱中的"甜蜜话痨"，热情似火、表达欲爆棚。你的爱轰轰烈烈，恨不得全世界都知道你有多爱对方。',
    strengths: ['表达能力极强，对方永远不会猜你的心思', '热情有感染力，让关系充满活力', '善于社交，和对方的朋友都能打成一片', '浪漫细胞丰富，生活充满仪式感'],
    weaknesses: ['可能过于黏人，给对方压力', '情绪起伏较大，需要频繁的回应', '安全感不足时容易焦虑', '有时说得多做得少'],
    loveLanguage: '言语肯定 + 精心时刻',
    advice: '热情是你的魅力，但也要学会倾听。有时候沉默也是一种爱的表达，给对方一些安静的空间。',
    bestMatch: 'turtle',
    worstMatch: 'cat'
  },
  {
    id: 'swan',
    name: '天鹅',
    emoji: '🦢',
    title: '优雅浪漫的完美主义者',
    color: '#ec4899',
    bgGradient: 'from-pink-50 to-rose-50',
    profile: { D1: 40, D2: 75, D3: 60, D4: 50, D5: 92, D6: 45 },
    summary: '你是恋爱中的"浪漫完美主义者"，优雅、感性、对爱情有极高的期待。你相信真爱的存在，追求那种电影般的完美爱情。',
    strengths: ['对爱情充满信念和热忱', '审美品味出众，善于营造浪漫氛围', '感受力强，能捕捉到爱情中的每个美好瞬间', '对伴侣有很高的精神追求'],
    weaknesses: ['期望过高容易失望', '可能过于理想化对方', '面对现实问题时容易逃避', '完美主义可能让对方感到压力'],
    loveLanguage: '精心时刻 + 礼物赠送',
    advice: '完美的爱情不存在，但真实的爱情更动人。学会接受对方和关系中的不完美，你会发现真实比完美更值得珍惜。',
    bestMatch: 'wolf',
    worstMatch: 'owl'
  },
  {
    id: 'butterfly',
    name: '蝴蝶',
    emoji: '🦋',
    title: '自由烂漫的爱情冒险家',
    color: '#a855f7',
    bgGradient: 'from-purple-50 to-fuchsia-50',
    profile: { D1: 45, D2: 80, D3: 70, D4: 40, D5: 85, D6: 78 },
    summary: '你是恋爱中的"自由精灵"，浪漫、自由、充满魅力。你享受恋爱的美好，但也珍视自己的独立和自由，像蝴蝶一样美丽而不可捉摸。',
    strengths: ['魅力十足，自带吸引力光环', '善于享受当下的美好', '独立自主，不会成为对方的负担', '给关系带来新鲜感和活力'],
    weaknesses: ['承诺恐惧，害怕被束缚', '可能给人不够认真的印象', '遇到困难时倾向于逃避', '情感深度可能不够'],
    loveLanguage: '精心时刻 + 言语肯定',
    advice: '自由很珍贵，但深度的亲密关系同样美好。试着在一段关系中停留更久，你会发现深入了解一个人比蜻蜓点水更令人心动。',
    bestMatch: 'owl',
    worstMatch: 'wolf'
  },
  {
    id: 'rabbit',
    name: '兔子',
    emoji: '🐰',
    title: '敏感温柔的小心翼翼',
    color: '#f472b6',
    bgGradient: 'from-pink-50 to-rose-50',
    profile: { D1: 28, D2: 42, D3: 25, D4: 30, D5: 70, D6: 30 },
    summary: '你是恋爱中的"温柔敏感派"，细腻、体贴、小心翼翼。你对爱情充满渴望，但又害怕受伤，总是在靠近和退缩之间犹豫。',
    strengths: ['极度细腻体贴，能感知对方的情绪变化', '温柔善良，让人想要保护', '对感情认真负责', '善于照顾对方的感受'],
    weaknesses: ['安全感严重不足，容易胡思乱想', '过于在意对方的态度变化', '不敢表达真实需求', '容易在关系中委屈自己'],
    loveLanguage: '言语肯定 + 肢体接触',
    advice: '你值得被爱，也值得大声说出自己的需求。不要总是委屈自己来维持关系，真正爱你的人会珍惜你的坦诚。',
    bestMatch: 'lion',
    worstMatch: 'cat'
  },
  {
    id: 'deer',
    name: '小鹿',
    emoji: '🦌',
    title: '纯真羞涩的森林精灵',
    color: '#92400e',
    bgGradient: 'from-amber-50 to-orange-50',
    profile: { D1: 35, D2: 38, D3: 20, D4: 35, D5: 78, D6: 55 },
    summary: '你是恋爱中的"纯真少年/少女"，害羞、纯真、充满幻想。你对爱情有着美好的憧憬，像小鹿一样灵动可爱，又容易受惊。',
    strengths: ['纯真善良，没有心机', '对爱情保持着美好的信念', '细心体贴，默默关注对方', '有自己的精神世界和追求'],
    weaknesses: ['过于害羞，错过表达的机会', '容易受伤后封闭自己', '面对冲突时倾向于逃跑', '可能过于理想化爱情'],
    loveLanguage: '精心时刻 + 言语肯定',
    advice: '勇敢一点，爱情不会自己找上门。主动迈出第一步，你会发现世界比你想象的更温柔。',
    bestMatch: 'wolf',
    worstMatch: 'eagle'
  },
  {
    id: 'hedgehog',
    name: '刺猬',
    emoji: '🦔',
    title: '外刺内柔的矛盾恋人',
    color: '#78716c',
    bgGradient: 'from-stone-50 to-gray-50',
    profile: { D1: 25, D2: 25, D3: 30, D4: 28, D5: 40, D6: 75 },
    summary: '你是恋爱中的"矛盾体"，渴望亲密却又害怕靠近。你用刺保护自己柔软的内心，只有真正信任的人才能触碰到你的温柔。',
    strengths: ['一旦信任就极度忠诚', '有很强的自我保护意识', '独立自主，不轻易依赖他人', '内心世界丰富而深邃'],
    weaknesses: ['防御心过重，难以建立亲密关系', '容易误伤真心对你好的人', '不善于求助和表达脆弱', '可能因为害怕受伤而推开爱情'],
    loveLanguage: '服务行动 + 精心时刻',
    advice: '放下你的刺吧，不是所有人都会伤害你。学会区分过去的伤痛和现在的关系，给自己一个被爱的机会。',
    bestMatch: 'golden_retriever',
    worstMatch: 'parrot'
  },
  {
    id: 'eagle',
    name: '雄鹰',
    emoji: '🦅',
    title: '高瞻远瞩的独立恋人',
    color: '#1e40af',
    bgGradient: 'from-blue-50 to-indigo-50',
    profile: { D1: 80, D2: 50, D3: 85, D4: 82, D5: 35, D6: 92 },
    summary: '你是恋爱中的"独立王者"，自信、果断、目光长远。你在关系中保持高度独立，追求的是势均力敌的灵魂伴侣，而非依附关系。',
    strengths: ['极度独立自主，有自己的人生目标', '决断力强，不拖泥带水', '视野开阔，能看到关系的长远发展', '不会因为恋爱而迷失自己'],
    weaknesses: ['可能给人距离感和压迫感', '对伴侣的要求过高', '不善于处理细腻的情感需求', '可能过于理性而缺乏温情'],
    loveLanguage: '精心时刻 + 服务行动',
    advice: '高处不胜寒，偶尔降落到地面，和爱人一起感受平凡的温暖。不是所有事情都需要效率和目标，享受过程也很重要。',
    bestMatch: 'fox',
    worstMatch: 'rabbit'
  },
  {
    id: 'fox',
    name: '狐狸',
    emoji: '🦊',
    title: '聪慧迷人的恋爱高手',
    color: '#ea580c',
    bgGradient: 'from-orange-50 to-red-50',
    profile: { D1: 65, D2: 70, D3: 82, D4: 60, D5: 55, D6: 68 },
    summary: '你是恋爱中的"魅力高手"，聪明、机智、善于经营关系。你懂得恋爱的艺术，知道什么时候该进什么时候该退，总能让对方欲罢不能。',
    strengths: ['高情商，善于读懂对方的心思', '懂得经营关系的节奏和分寸', '魅力十足，善于展现自己的优势', '适应能力强，能和不同类型的人相处'],
    weaknesses: ['可能过于算计，缺乏纯粹', '不容易完全敞开心扉', '可能给人不够真诚的感觉', '害怕在关系中处于弱势'],
    loveLanguage: '言语肯定 + 精心时刻',
    advice: '聪明是你的优势，但在爱情中，有时候"傻一点"反而更幸福。放下技巧和算计，用真心去感受，你会收获更深的连接。',
    bestMatch: 'eagle',
    worstMatch: 'hedgehog'
  },
  {
    id: 'turtle',
    name: '海龟',
    emoji: '🐢',
    title: '慢热长情的岁月恋人',
    color: '#059669',
    bgGradient: 'from-emerald-50 to-teal-50',
    profile: { D1: 70, D2: 28, D3: 22, D4: 45, D5: 30, D6: 60 },
    summary: '你是恋爱中的"慢热长情派"，稳重、踏实、细水长流。你不追求轰轰烈烈，而是用时间和行动证明你的爱，越久越醇厚。',
    strengths: ['极度稳定可靠，是最好的长期伴侣', '耐心十足，愿意等待和磨合', '务实踏实，用行动说话', '感情深厚持久，不会轻易放弃'],
    weaknesses: ['过于慢热，可能错过机会', '不善于表达，容易让对方感到被忽视', '面对变化时适应较慢', '可能过于保守和固执'],
    loveLanguage: '服务行动 + 肢体接触',
    advice: '慢热不是缺点，但也别让对方等太久。适当加快一点节奏，主动表达你的心意，别让沉默成为误解的温床。',
    bestMatch: 'parrot',
    worstMatch: 'butterfly'
  },
  {
    id: 'panda',
    name: '熊猫',
    emoji: '🐼',
    title: '佛系可爱的治愈恋人',
    color: '#374151',
    bgGradient: 'from-gray-50 to-slate-50',
    profile: { D1: 68, D2: 55, D3: 30, D4: 38, D5: 50, D6: 50 },
    summary: '你是恋爱中的"佛系治愈派"，随和、可爱、没有攻击性。你的存在本身就是一种治愈，让人在你身边感到放松和快乐。',
    strengths: ['性格温和，极少与人发生冲突', '包容度高，能接受对方的缺点', '有治愈力，让人感到放松', '不给对方压力，相处舒适'],
    weaknesses: ['过于佛系可能显得不够上心', '面对问题时容易逃避', '缺乏推进关系的动力', '可能过于随遇而安'],
    loveLanguage: '肢体接触 + 精心时刻',
    advice: '佛系是一种态度，但爱情需要经营。偶尔主动一点，为关系注入一些新鲜感和仪式感，你的伴侣会很惊喜。',
    bestMatch: 'fox',
    worstMatch: 'lion'
  },
  {
    id: 'unicorn',
    name: '独角兽',
    emoji: '🦄',
    title: '追梦不止的理想恋人',
    color: '#c026d3',
    bgGradient: 'from-fuchsia-50 to-purple-50',
    profile: { D1: 50, D2: 72, D3: 65, D4: 48, D5: 95, D6: 62 },
    summary: '你是恋爱中的"梦想家"，浪漫到骨子里，相信世界上存在完美的爱情。你追求的不只是一段关系，而是一个童话般的爱情故事。',
    strengths: ['对爱情充满无限的想象力和创造力', '能让平凡的日子变得充满魔法', '真诚纯粹，对感情毫无保留', '有强大的精神力量和信念'],
    weaknesses: ['期望值过高，现实容易让你失望', '可能活在自己的幻想中', '面对感情中的瑕疵难以接受', '容易因为不够完美而放弃'],
    loveLanguage: '精心时刻 + 礼物赠送',
    advice: '童话很美，但真实的爱情更动人。学会在不完美中发现美好，你会发现现实中的爱情虽然有瑕疵，却更加温暖和真实。',
    bestMatch: 'penguin',
    worstMatch: 'owl'
  },
  {
    id: 'bear',
    name: '棕熊',
    emoji: '🐻',
    title: '可靠踏实的安全港湾',
    color: '#92400e',
    bgGradient: 'from-amber-50 to-yellow-50',
    profile: { D1: 82, D2: 45, D3: 55, D4: 65, D5: 20, D6: 45 },
    summary: '你是恋爱中的"安全港湾"，可靠、踏实、有担当。你不会说甜言蜜语，但会用实际行动给对方最坚实的依靠。',
    strengths: ['极度可靠，说到做到', '有责任心和担当', '物质和精神上都能给予安全感', '包容力强，能容纳对方的小脾气'],
    weaknesses: ['不够浪漫，缺乏情趣', '表达方式过于直接和粗糙', '可能过于务实而忽略情感需求', '固执己见，不容易改变'],
    loveLanguage: '服务行动 + 礼物赠送',
    advice: '实际行动很重要，但偶尔的浪漫和甜言蜜语也是感情的调味剂。试着学习一些表达爱意的新方式，你的伴侣会更加幸福。',
    bestMatch: 'swan',
    worstMatch: 'hedgehog'
  },
  {
    id: 'penguin',
    name: '企鹅',
    emoji: '🐧',
    title: '忠贞不渝的一生挚爱',
    color: '#1e3a5f',
    bgGradient: 'from-blue-50 to-slate-50',
    profile: { D1: 72, D2: 60, D3: 50, D4: 55, D5: 68, D6: 22 },
    summary: '你是恋爱中的"一生一世派"，忠贞、专一、全身心投入。你相信爱情就是找到那个人，然后用一辈子去守护。',
    strengths: ['极度忠诚专一', '愿意为爱情做出牺牲', '重视家庭和长期承诺', '在困难时期不离不弃'],
    weaknesses: ['过度依赖伴侣', '可能失去自我', '分手后恢复期极长', '容易在关系中过度付出'],
    loveLanguage: '肢体接触 + 精心时刻',
    advice: '忠诚是美德，但不要把全部的自己都交给一段关系。保持一些属于自己的爱好和社交，这样的你在关系中会更有魅力。',
    bestMatch: 'dolphin',
    worstMatch: 'eagle'
  },
  {
    id: 'koala',
    name: '考拉',
    emoji: '🐨',
    title: '黏人可爱的依赖恋人',
    color: '#6b7280',
    bgGradient: 'from-gray-50 to-blue-50',
    profile: { D1: 30, D2: 58, D3: 35, D4: 32, D5: 62, D6: 15 },
    summary: '你是恋爱中的"黏人小可爱"，温柔、依赖、需要大量的陪伴和安全感。你的爱像考拉抱树一样，紧紧地、暖暖地。',
    strengths: ['让对方感到被需要和重要', '温柔体贴，善于撒娇', '对感情全身心投入', '能给对方很强的存在感'],
    weaknesses: ['过度依赖可能让对方窒息', '安全感严重不足', '独处能力较弱', '可能因为害怕失去而过度讨好'],
    loveLanguage: '肢体接触 + 言语肯定',
    advice: '依赖不是爱的全部，学会独立才能让爱情更健康。试着培养自己的兴趣爱好，一个有自己世界的你会更加迷人。',
    bestMatch: 'bear',
    worstMatch: 'eagle'
  },
  {
    id: 'otter',
    name: '水獭',
    emoji: '🦦',
    title: '甜蜜有趣的快乐恋人',
    color: '#0891b2',
    bgGradient: 'from-cyan-50 to-teal-50',
    profile: { D1: 65, D2: 82, D3: 68, D4: 52, D5: 72, D6: 40 },
    summary: '你是恋爱中的"快乐小太阳"，有趣、甜蜜、充满正能量。你总能把恋爱变成一件快乐的事，和你在一起永远不会无聊。',
    strengths: ['幽默有趣，是关系中的开心果', '善于制造甜蜜的小惊喜', '乐观积极，能化解低气压', '亲和力强，让人忍不住靠近'],
    weaknesses: ['可能用幽默掩盖真实情绪', '面对严肃话题时容易逃避', '注意力分散，有时不够专注', '可能过于在意对方的评价'],
    loveLanguage: '言语肯定 + 精心时刻',
    advice: '快乐很重要，但也要允许自己和对方有不快乐的时候。真正的亲密是能一起笑，也能一起哭。',
    bestMatch: 'turtle',
    worstMatch: 'hedgehog'
  },
  {
    id: 'peacock',
    name: '孔雀',
    emoji: '🦚',
    title: '魅力四射的闪耀恋人',
    color: '#0d9488',
    bgGradient: 'from-teal-50 to-emerald-50',
    profile: { D1: 55, D2: 88, D3: 75, D4: 48, D5: 70, D6: 58 },
    summary: '你是恋爱中的"闪耀之星"，自信、迷人、善于展现自己。你享受被欣赏和被爱的感觉，也愿意用最好的自己去爱对方。',
    strengths: ['自信有魅力，是人群中的焦点', '善于表达爱意和欣赏', '注重形象和品质', '能给关系带来激情和活力'],
    weaknesses: ['可能过于在意外在评价', '虚荣心可能影响关系', '需要大量的关注和赞美', '面对批评时比较敏感'],
    loveLanguage: '言语肯定 + 礼物赠送',
    advice: '真正的魅力来自内在。不要只追求表面的光鲜，深入了解和接纳真实的自己，你会发现不完美的你同样值得被爱。',
    bestMatch: 'bear',
    worstMatch: 'hedgehog'
  },
  {
    id: 'horse',
    name: '骏马',
    emoji: '🐴',
    title: '自由奔放的热血恋人',
    color: '#b45309',
    bgGradient: 'from-amber-50 to-orange-50',
    profile: { D1: 70, D2: 65, D3: 88, D4: 72, D5: 58, D6: 82 },
    summary: '你是恋爱中的"自由骑士"，热情、奔放、追求自由。你的爱像奔腾的骏马，充满力量和激情，但也需要广阔的天地。',
    strengths: ['充满激情和行动力', '勇敢果断，敢爱敢恨', '独立自主，有自己的追求', '能带给对方冒险和刺激'],
    weaknesses: ['可能过于追求自由而忽略对方', '耐心不足，容易急躁', '承诺感可能不够强', '情绪来得快去得也快'],
    loveLanguage: '精心时刻 + 服务行动',
    advice: '自由和爱情并不矛盾，关键是找到平衡。学会在奔跑的同时回头看看身边的人，真正的自由是有人等你回来。',
    bestMatch: 'deer',
    worstMatch: 'koala'
  }
];

/**
 * 获取人格通过ID
 */
export function getPersonalityById(id) {
  return PERSONALITIES.find(p => p.id === id);
}

/**
 * 获取维度通过ID
 */
export function getDimensionById(id) {
  return DIMENSIONS.find(d => d.id === id);
}
