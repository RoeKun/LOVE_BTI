/**
 * 恋爱动物人格 - 合并版（非模块化，支持本地直接打开）
 * 包含：data + story + engine + main
 */
;(function() {
'use strict';

// ============================================================
// ===== DATA 模块 =====
// ============================================================

const DIMENSIONS = [
  { id: 'D1', name: '依恋倾向', labelHigh: '安全型', labelLow: '焦虑型', icon: '🛡️', color: '#f43f5e', description: '你在亲密关系中的安全感水平' },
  { id: 'D2', name: '情感表达', labelHigh: '外放型', labelLow: '内敛型', icon: '💬', color: '#ec4899', description: '你表达爱意和情感的方式' },
  { id: 'D3', name: '关系节奏', labelHigh: '主动型', labelLow: '被动型', icon: '🚀', color: '#8b5cf6', description: '你在关系中推进节奏的倾向' },
  { id: 'D4', name: '冲突应对', labelHigh: '直面型', labelLow: '回避型', icon: '⚡', color: '#f59e0b', description: '你面对关系矛盾时的处理方式' },
  { id: 'D5', name: '爱情观念', labelHigh: '理想型', labelLow: '现实型', icon: '✨', color: '#6366f1', description: '你对爱情的期待和信念' },
  { id: 'D6', name: '独立程度', labelHigh: '独立型', labelLow: '共生型', icon: '🦋', color: '#14b8a6', description: '你在关系中对个人空间的需求' }
];

const PERSONALITIES = [
  {
    id: 'golden_retriever', name: '金毛犬', emoji: '🐕', title: '温暖如阳的忠诚恋人', color: '#f59e0b',
    profile: { D1: 85, D2: 90, D3: 75, D4: 70, D5: 65, D6: 35 },
    summary: '你是恋爱中的"阳光担当"，热情、忠诚、毫无保留地付出爱意。你的爱像金色的阳光，温暖而持久，让身边的人感到无比安心。',
    strengths: ['无条件的忠诚与信任', '善于表达爱意，让对方时刻感受到被爱', '情绪稳定，是关系中的定海神针', '愿意为爱付出，不计较得失'],
    weaknesses: ['有时过于依赖对方的陪伴', '可能忽视自己的需求', '面对背叛时受伤极深', '容易在关系中失去个人边界'],
    advice: '学会在付出的同时关注自己的感受，适当保留一些个人空间。记住，爱自己才能更好地爱别人。',
    bestMatch: 'cat', worstMatch: 'eagle'
  },
  {
    id: 'dolphin', name: '海豚', emoji: '🐬', title: '灵动活泼的浪漫使者', color: '#06b6d4',
    profile: { D1: 80, D2: 85, D3: 80, D4: 65, D5: 80, D6: 55 },
    summary: '你是恋爱中的"快乐源泉"，聪明、活泼、充满创意。你总能为平淡的日常注入惊喜和浪漫，让恋爱变成一场永不落幕的冒险。',
    strengths: ['极强的共情能力和情商', '善于制造浪漫和惊喜', '沟通能力出色，善于化解矛盾', '乐观积极，感染力强'],
    weaknesses: ['注意力容易分散，有时不够专注', '对新鲜感有较高需求', '可能回避深层次的情感问题', '情绪波动时需要较多安抚'],
    advice: '在追求浪漫的同时，也要学会面对关系中不那么美好的部分。深度的亲密需要勇气去面对脆弱。',
    bestMatch: 'penguin', worstMatch: 'wolf'
  },
  {
    id: 'lion', name: '狮子', emoji: '🦁', title: '霸气护航的王者恋人', color: '#d97706',
    profile: { D1: 82, D2: 78, D3: 92, D4: 85, D5: 60, D6: 70 },
    summary: '你是恋爱中的"王者担当"，自信、果断、有强烈的保护欲。你用行动证明爱，为对方撑起一片天，是最可靠的港湾。',
    strengths: ['强大的安全感提供者', '果断有担当，说到做到', '面对问题从不逃避', '有领导力，能带领关系向前发展'],
    weaknesses: ['控制欲可能过强', '不善于示弱和表达脆弱', '有时过于强势，忽略对方感受', '难以接受被拒绝或质疑'],
    advice: '真正的强大不是控制一切，而是敢于展示脆弱。试着放下"必须保护一切"的执念，让对方也有机会照顾你。',
    bestMatch: 'rabbit', worstMatch: 'lion'
  },
  {
    id: 'cat', name: '猫咪', emoji: '🐱', title: '高冷外表下的温柔灵魂', color: '#8b5cf6',
    profile: { D1: 72, D2: 30, D3: 35, D4: 45, D5: 55, D6: 85 },
    summary: '你是恋爱中的"神秘高冷派"，看似独立疏离，实则内心柔软。你的爱含蓄而深沉，只在信任的人面前展露真实的自己。',
    strengths: ['高度独立，不会给对方压力', '观察力敏锐，能察觉对方的细微变化', '忠诚度极高，一旦认定就不轻易改变', '有自己的精神世界，内涵丰富'],
    weaknesses: ['情感表达困难，容易被误解为冷漠', '需要很长时间才能打开心扉', '受伤时倾向于独自舔舐伤口', '可能过度保护自己的个人空间'],
    advice: '试着更主动地表达你的感受，哪怕只是一个拥抱或一句"我想你了"。你的伴侣需要这些信号来确认你的爱。',
    bestMatch: 'golden_retriever', worstMatch: 'swan'
  },
  {
    id: 'owl', name: '猫头鹰', emoji: '🦉', title: '深思熟虑的智慧恋人', color: '#6366f1',
    profile: { D1: 75, D2: 35, D3: 40, D4: 72, D5: 25, D6: 80 },
    summary: '你是恋爱中的"理性分析师"，冷静、睿智、深思熟虑。你用理性的方式经营感情，虽然不够浪漫，但每一步都走得稳健可靠。',
    strengths: ['理性客观，能做出明智的关系决策', '善于分析和解决问题', '情绪稳定，不会冲动行事', '对伴侣有深刻的理解和洞察'],
    weaknesses: ['过于理性可能显得缺乏激情', '不擅长制造浪漫氛围', '可能过度分析感情，失去直觉', '情感表达方式过于含蓄'],
    advice: '爱情不是一道数学题，有时候需要放下分析，跟着感觉走。偶尔的冲动和浪漫，会让你们的关系更有温度。',
    bestMatch: 'butterfly', worstMatch: 'dolphin'
  },
  {
    id: 'wolf', name: '灰狼', emoji: '🐺', title: '深情专一的灵魂守护者', color: '#64748b',
    profile: { D1: 78, D2: 40, D3: 65, D4: 68, D5: 45, D6: 72 },
    summary: '你是恋爱中的"深情守护者"，外表冷峻内心炽热。你对爱情极度专一，一旦认定就是一辈子，用沉默而坚定的方式守护所爱之人。',
    strengths: ['极度专一和忠诚', '保护欲强，让对方感到安全', '有原则有底线，值得信赖', '在关键时刻绝不退缩'],
    weaknesses: ['占有欲可能过强', '不善言辞，容易造成误解', '对外人警惕心重，社交圈较窄', '受伤后可能变得更加封闭'],
    advice: '信任是爱情的基石，但过度的保护和占有会让对方窒息。学会给彼此呼吸的空间，爱才能长久。',
    bestMatch: 'deer', worstMatch: 'butterfly'
  },
  {
    id: 'parrot', name: '鹦鹉', emoji: '🦜', title: '热情洋溢的甜蜜话痨', color: '#10b981',
    profile: { D1: 35, D2: 92, D3: 78, D4: 55, D5: 75, D6: 25 },
    summary: '你是恋爱中的"甜蜜话痨"，热情似火、表达欲爆棚。你的爱轰轰烈烈，恨不得全世界都知道你有多爱对方。',
    strengths: ['表达能力极强，对方永远不会猜你的心思', '热情有感染力，让关系充满活力', '善于社交，和对方的朋友都能打成一片', '浪漫细胞丰富，生活充满仪式感'],
    weaknesses: ['可能过于黏人，给对方压力', '情绪起伏较大，需要频繁的回应', '安全感不足时容易焦虑', '有时说得多做得少'],
    advice: '热情是你的魅力，但也要学会倾听。有时候沉默也是一种爱的表达，给对方一些安静的空间。',
    bestMatch: 'turtle', worstMatch: 'cat'
  },
  {
    id: 'swan', name: '天鹅', emoji: '🦢', title: '优雅浪漫的完美主义者', color: '#ec4899',
    profile: { D1: 40, D2: 75, D3: 60, D4: 50, D5: 92, D6: 45 },
    summary: '你是恋爱中的"浪漫完美主义者"，优雅、感性、对爱情有极高的期待。你相信真爱的存在，追求那种电影般的完美爱情。',
    strengths: ['对爱情充满信念和热忱', '审美品味出众，善于营造浪漫氛围', '感受力强，能捕捉到爱情中的每个美好瞬间', '对伴侣有很高的精神追求'],
    weaknesses: ['期望过高容易失望', '可能过于理想化对方', '面对现实问题时容易逃避', '完美主义可能让对方感到压力'],
    advice: '完美的爱情不存在，但真实的爱情更动人。学会接受对方和关系中的不完美，你会发现真实比完美更值得珍惜。',
    bestMatch: 'wolf', worstMatch: 'owl'
  },
  {
    id: 'butterfly', name: '蝴蝶', emoji: '🦋', title: '自由烂漫的爱情冒险家', color: '#a855f7',
    profile: { D1: 45, D2: 80, D3: 70, D4: 40, D5: 85, D6: 78 },
    summary: '你是恋爱中的"自由精灵"，浪漫、自由、充满魅力。你享受恋爱的美好，但也珍视自己的独立和自由，像蝴蝶一样美丽而不可捉摸。',
    strengths: ['魅力十足，自带吸引力光环', '善于享受当下的美好', '独立自主，不会成为对方的负担', '给关系带来新鲜感和活力'],
    weaknesses: ['承诺恐惧，害怕被束缚', '可能给人不够认真的印象', '遇到困难时倾向于逃避', '情感深度可能不够'],
    advice: '自由很珍贵，但深度的亲密关系同样美好。试着在一段关系中停留更久，你会发现深入了解一个人比蜻蜓点水更令人心动。',
    bestMatch: 'owl', worstMatch: 'wolf'
  },
  {
    id: 'rabbit', name: '兔子', emoji: '🐰', title: '敏感温柔的小心翼翼', color: '#f472b6',
    profile: { D1: 28, D2: 42, D3: 25, D4: 30, D5: 70, D6: 30 },
    summary: '你是恋爱中的"温柔敏感派"，细腻、体贴、小心翼翼。你对爱情充满渴望，但又害怕受伤，总是在靠近和退缩之间犹豫。',
    strengths: ['极度细腻体贴，能感知对方的情绪变化', '温柔善良，让人想要保护', '对感情认真负责', '善于照顾对方的感受'],
    weaknesses: ['安全感严重不足，容易胡思乱想', '过于在意对方的态度变化', '不敢表达真实需求', '容易在关系中委屈自己'],
    advice: '你值得被爱，也值得大声说出自己的需求。不要总是委屈自己来维持关系，真正爱你的人会珍惜你的坦诚。',
    bestMatch: 'lion', worstMatch: 'cat'
  },
  {
    id: 'deer', name: '小鹿', emoji: '🦌', title: '纯真羞涩的森林精灵', color: '#92400e',
    profile: { D1: 35, D2: 38, D3: 20, D4: 35, D5: 78, D6: 55 },
    summary: '你是恋爱中的"纯真少年/少女"，害羞、纯真、充满幻想。你对爱情有着美好的憧憬，像小鹿一样灵动可爱，又容易受惊。',
    strengths: ['纯真善良，没有心机', '对爱情保持着美好的信念', '细心体贴，默默关注对方', '有自己的精神世界和追求'],
    weaknesses: ['过于害羞，错过表达的机会', '容易受伤后封闭自己', '面对冲突时倾向于逃跑', '可能过于理想化爱情'],
    advice: '勇敢一点，爱情不会自己找上门。主动迈出第一步，你会发现世界比你想象的更温柔。',
    bestMatch: 'wolf', worstMatch: 'eagle'
  },
  {
    id: 'hedgehog', name: '刺猬', emoji: '🦔', title: '外刺内柔的矛盾恋人', color: '#78716c',
    profile: { D1: 25, D2: 25, D3: 30, D4: 28, D5: 40, D6: 75 },
    summary: '你是恋爱中的"矛盾体"，渴望亲密却又害怕靠近。你用刺保护自己柔软的内心，只有真正信任的人才能触碰到你的温柔。',
    strengths: ['一旦信任就极度忠诚', '有很强的自我保护意识', '独立自主，不轻易依赖他人', '内心世界丰富而深邃'],
    weaknesses: ['防御心过重，难以建立亲密关系', '容易误伤真心对你好的人', '不善于求助和表达脆弱', '可能因为害怕受伤而推开爱情'],
    advice: '放下你的刺吧，不是所有人都会伤害你。学会区分过去的伤痛和现在的关系，给自己一个被爱的机会。',
    bestMatch: 'golden_retriever', worstMatch: 'parrot'
  },
  {
    id: 'eagle', name: '雄鹰', emoji: '🦅', title: '高瞻远瞩的独立恋人', color: '#1e40af',
    profile: { D1: 80, D2: 50, D3: 85, D4: 82, D5: 35, D6: 92 },
    summary: '你是恋爱中的"独立王者"，自信、果断、目光长远。你在关系中保持高度独立，追求的是势均力敌的灵魂伴侣，而非依附关系。',
    strengths: ['极度独立自主，有自己的人生目标', '决断力强，不拖泥带水', '视野开阔，能看到关系的长远发展', '不会因为恋爱而迷失自己'],
    weaknesses: ['可能给人距离感和压迫感', '对伴侣的要求过高', '不善于处理细腻的情感需求', '可能过于理性而缺乏温情'],
    advice: '高处不胜寒，偶尔降落到地面，和爱人一起感受平凡的温暖。不是所有事情都需要效率和目标，享受过程也很重要。',
    bestMatch: 'fox', worstMatch: 'rabbit'
  },
  {
    id: 'fox', name: '狐狸', emoji: '🦊', title: '聪慧迷人的恋爱高手', color: '#ea580c',
    profile: { D1: 65, D2: 70, D3: 82, D4: 60, D5: 55, D6: 68 },
    summary: '你是恋爱中的"魅力高手"，聪明、机智、善于经营关系。你懂得恋爱的艺术，知道什么时候该进什么时候该退，总能让对方欲罢不能。',
    strengths: ['高情商，善于读懂对方的心思', '懂得经营关系的节奏和分寸', '魅力十足，善于展现自己的优势', '适应能力强，能和不同类型的人相处'],
    weaknesses: ['可能过于算计，缺乏纯粹', '不容易完全敞开心扉', '可能给人不够真诚的感觉', '害怕在关系中处于弱势'],
    advice: '聪明是你的优势，但在爱情中，有时候"傻一点"反而更幸福。放下技巧和算计，用真心去感受，你会收获更深的连接。',
    bestMatch: 'eagle', worstMatch: 'hedgehog'
  },
  {
    id: 'turtle', name: '海龟', emoji: '🐢', title: '慢热长情的岁月恋人', color: '#059669',
    profile: { D1: 70, D2: 28, D3: 22, D4: 45, D5: 30, D6: 60 },
    summary: '你是恋爱中的"慢热长情派"，稳重、踏实、细水长流。你不追求轰轰烈烈，而是用时间和行动证明你的爱，越久越醇厚。',
    strengths: ['极度稳定可靠，是最好的长期伴侣', '耐心十足，愿意等待和磨合', '务实踏实，用行动说话', '感情深厚持久，不会轻易放弃'],
    weaknesses: ['过于慢热，可能错过机会', '不善于表达，容易让对方感到被忽视', '面对变化时适应较慢', '可能过于保守和固执'],
    advice: '慢热不是缺点，但也别让对方等太久。适当加快一点节奏，主动表达你的心意，别让沉默成为误解的温床。',
    bestMatch: 'parrot', worstMatch: 'butterfly'
  },
  {
    id: 'panda', name: '熊猫', emoji: '🐼', title: '佛系可爱的治愈恋人', color: '#374151',
    profile: { D1: 68, D2: 55, D3: 30, D4: 38, D5: 50, D6: 50 },
    summary: '你是恋爱中的"佛系治愈派"，随和、可爱、没有攻击性。你的存在本身就是一种治愈，让人在你身边感到放松和快乐。',
    strengths: ['性格温和，极少与人发生冲突', '包容度高，能接受对方的缺点', '有治愈力，让人感到放松', '不给对方压力，相处舒适'],
    weaknesses: ['过于佛系可能显得不够上心', '面对问题时容易逃避', '缺乏推进关系的动力', '可能过于随遇而安'],
    advice: '佛系是一种态度，但爱情需要经营。偶尔主动一点，为关系注入一些新鲜感和仪式感，你的伴侣会很惊喜。',
    bestMatch: 'fox', worstMatch: 'lion'
  },
  {
    id: 'unicorn', name: '独角兽', emoji: '🦄', title: '追梦不止的理想恋人', color: '#c026d3',
    profile: { D1: 50, D2: 72, D3: 65, D4: 48, D5: 95, D6: 62 },
    summary: '你是恋爱中的"梦想家"，浪漫到骨子里，相信世界上存在完美的爱情。你追求的不只是一段关系，而是一个童话般的爱情故事。',
    strengths: ['对爱情充满无限的想象力和创造力', '能让平凡的日子变得充满魔法', '真诚纯粹，对感情毫无保留', '有强大的精神力量和信念'],
    weaknesses: ['期望值过高，现实容易让你失望', '可能活在自己的幻想中', '面对感情中的瑕疵难以接受', '容易因为不够完美而放弃'],
    advice: '童话很美，但真实的爱情更动人。学会在不完美中发现美好，你会发现现实中的爱情虽然有瑕疵，却更加温暖和真实。',
    bestMatch: 'penguin', worstMatch: 'owl'
  },
  {
    id: 'bear', name: '棕熊', emoji: '🐻', title: '可靠踏实的安全港湾', color: '#92400e',
    profile: { D1: 82, D2: 45, D3: 55, D4: 65, D5: 20, D6: 45 },
    summary: '你是恋爱中的"安全港湾"，可靠、踏实、有担当。你不会说甜言蜜语，但会用实际行动给对方最坚实的依靠。',
    strengths: ['极度可靠，说到做到', '有责任心和担当', '物质和精神上都能给予安全感', '包容力强，能容纳对方的小脾气'],
    weaknesses: ['不够浪漫，缺乏情趣', '表达方式过于直接和粗糙', '可能过于务实而忽略情感需求', '固执己见，不容易改变'],
    advice: '实际行动很重要，但偶尔的浪漫和甜言蜜语也是感情的调味剂。试着学习一些表达爱意的新方式，你的伴侣会更加幸福。',
    bestMatch: 'swan', worstMatch: 'hedgehog'
  },
  {
    id: 'penguin', name: '企鹅', emoji: '🐧', title: '忠贞不渝的一生挚爱', color: '#1e3a5f',
    profile: { D1: 72, D2: 60, D3: 50, D4: 55, D5: 68, D6: 22 },
    summary: '你是恋爱中的"一生一世派"，忠贞、专一、全身心投入。你相信爱情就是找到那个人，然后用一辈子去守护。',
    strengths: ['极度忠诚专一', '愿意为爱情做出牺牲', '重视家庭和长期承诺', '在困难时期不离不弃'],
    weaknesses: ['过度依赖伴侣', '可能失去自我', '分手后恢复期极长', '容易在关系中过度付出'],
    advice: '忠诚是美德，但不要把全部的自己都交给一段关系。保持一些属于自己的爱好和社交，这样的你在关系中会更有魅力。',
    bestMatch: 'dolphin', worstMatch: 'eagle'
  },
  {
    id: 'koala', name: '考拉', emoji: '🐨', title: '黏人可爱的依赖恋人', color: '#6b7280',
    profile: { D1: 30, D2: 58, D3: 35, D4: 32, D5: 62, D6: 15 },
    summary: '你是恋爱中的"黏人小可爱"，温柔、依赖、需要大量的陪伴和安全感。你的爱像考拉抱树一样，紧紧地、暖暖地。',
    strengths: ['让对方感到被需要和重要', '温柔体贴，善于撒娇', '对感情全身心投入', '能给对方很强的存在感'],
    weaknesses: ['过度依赖可能让对方窒息', '安全感严重不足', '独处能力较弱', '可能因为害怕失去而过度讨好'],
    advice: '依赖不是爱的全部，学会独立才能让爱情更健康。试着培养自己的兴趣爱好，一个有自己世界的你会更加迷人。',
    bestMatch: 'bear', worstMatch: 'eagle'
  },
  {
    id: 'otter', name: '水獭', emoji: '🦦', title: '甜蜜有趣的快乐恋人', color: '#0891b2',
    profile: { D1: 65, D2: 82, D3: 68, D4: 52, D5: 72, D6: 40 },
    summary: '你是恋爱中的"快乐小太阳"，有趣、甜蜜、充满正能量。你总能把恋爱变成一件快乐的事，和你在一起永远不会无聊。',
    strengths: ['幽默有趣，是关系中的开心果', '善于制造甜蜜的小惊喜', '乐观积极，能化解低气压', '亲和力强，让人忍不住靠近'],
    weaknesses: ['可能用幽默掩盖真实情绪', '面对严肃话题时容易逃避', '注意力分散，有时不够专注', '可能过于在意对方的评价'],
    advice: '快乐很重要，但也要允许自己和对方有不快乐的时候。真正的亲密是能一起笑，也能一起哭。',
    bestMatch: 'turtle', worstMatch: 'hedgehog'
  },
  {
    id: 'peacock', name: '孔雀', emoji: '🦚', title: '魅力四射的闪耀恋人', color: '#0d9488',
    profile: { D1: 55, D2: 88, D3: 75, D4: 48, D5: 70, D6: 58 },
    summary: '你是恋爱中的"闪耀之星"，自信、迷人、善于展现自己。你享受被欣赏和被爱的感觉，也愿意用最好的自己去爱对方。',
    strengths: ['自信有魅力，是人群中的焦点', '善于表达爱意和欣赏', '注重形象和品质', '能给关系带来激情和活力'],
    weaknesses: ['可能过于在意外在评价', '虚荣心可能影响关系', '需要大量的关注和赞美', '面对批评时比较敏感'],
    advice: '真正的魅力来自内在。不要只追求表面的光鲜，深入了解和接纳真实的自己，你会发现不完美的你同样值得被爱。',
    bestMatch: 'bear', worstMatch: 'hedgehog'
  },
  {
    id: 'horse', name: '骏马', emoji: '🐴', title: '自由奔放的热血恋人', color: '#b45309',
    profile: { D1: 70, D2: 65, D3: 88, D4: 72, D5: 58, D6: 82 },
    summary: '你是恋爱中的"自由骑士"，热情、奔放、追求自由。你的爱像奔腾的骏马，充满力量和激情，但也需要广阔的天地。',
    strengths: ['充满激情和行动力', '勇敢果断，敢爱敢恨', '独立自主，有自己的追求', '能带给对方冒险和刺激'],
    weaknesses: ['可能过于追求自由而忽略对方', '耐心不足，容易急躁', '承诺感可能不够强', '情绪来得快去得也快'],
    advice: '自由和爱情并不矛盾，关键是找到平衡。学会在奔跑的同时回头看看身边的人，真正的自由是有人等你回来。',
    bestMatch: 'deer', worstMatch: 'koala'
  }
];

function getPersonalityById(id) {
  return PERSONALITIES.find(function(p) { return p.id === id; });
}

// ============================================================
// ===== STORY 模块 =====
// ============================================================

var SCENE_IMAGES = {
  sunset_street: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/4b299b4c-0c13-4065-a06f-62925ba6a1f7/image_1775816046_2_1.jpg',
  convenience_store: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/192ac2ea-a2be-4a27-8b91-dfdd56c257bd/image_1775816054_1_3.jpg',
  coffee_shop: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/6c05d414-6189-4f26-a44c-c3207c77243a/image_1775816072_1_1.jpg',
  rainy_street: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/df552b5a-99c6-410a-b9a6-3bf7cb8c9faf/image_1775816081_3_1.jpg',
  rooftop_sunset: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/554199d0-b622-4d68-9a26-8b07a0ece535/image_1775816094_2_1.jpg',
  park_autumn: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/158a1e6c-5166-4d9d-842c-675efba9f437/image_1775816104_1_1.jpg',
  starry_night: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/8e8822a8-c9e5-406b-895b-d7412203ab29/image_1775816112_1_1.jpg',
  night_store: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/6122c4fe-16a4-42ca-a372-81381ed6379e/image_1775816126_2_1.jpg',
  cafe_interior: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/5af5b21e-7cac-4092-b668-9b1c3bdc0f5d/image_1775816136_2_1.jpg',
  rainy_couple: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/9b7a471c-ff78-423f-a717-f7843deb7cbc/image_1775816147_2_3.jpg',
};

var CHAPTERS = [
  { id: 1, title: '下班路上', subtitle: '街角的便利店', emoji: '🌆', color: '#f59e0b' },
  { id: 2, title: '偶然重逢', subtitle: '咖啡馆的午后', emoji: '☕', color: '#ec4899' },
  { id: 3, title: '暧昧时光', subtitle: '雨中的秘密', emoji: '🌧️', color: '#6366f1' },
  { id: 4, title: '心意相通', subtitle: '天台的晚风', emoji: '🌅', color: '#f43f5e' },
  { id: 5, title: '关于我们', subtitle: '星空下的答案', emoji: '✨', color: '#a855f7' },
];

var SCENES = [
  // ========== 第一章：下班路上 ==========
  { id: 'ch1_transition', chapter: 1, type: 'transition', text: '第一章', subtext: '下班路上 · 街角的便利店', duration: 2800 },
  { id: 'ch1_s1', chapter: 1, type: 'narration', bg: 'sunset_street', bgEffect: 'slowZoomIn',
    lines: [
      { text: '傍晚六点半，城市被染成了橘红色。', delay: 0 },
      { text: '你拖着疲惫的身体走出写字楼，', delay: 2200 },
      { text: '街道上的人群匆匆而过。', delay: 4000 },
      { text: '手机震了一下——', delay: 6000 },
      { text: '"今天也辛苦了。"', delay: 7500, style: 'italic' },
      { text: '是一条来自老朋友的消息。', delay: 9200 },
    ], autoDuration: 11500 },
  { id: 'ch1_s2', chapter: 1, type: 'narration', bg: 'convenience_store', bgEffect: 'panRight',
    lines: [
      { text: '你路过街角那家便利店，', delay: 0 },
      { text: '暖黄色的灯光从玻璃门里透出来。', delay: 2000 },
      { text: '门铃叮咚一声——', delay: 4000 },
    ], autoDuration: 5800 },
  { id: 'ch1_s3', chapter: 1, type: 'action', bg: 'night_store', bgEffect: 'none',
    prompt: '便利店里灯光温暖，你走了进去。\n货架上摆满了各种东西……你的目光被什么吸引了？',
    hotspots: [
      { id: 'pick_flower', label: '🌸 门口的一束花', x: 15, y: 65, scores: { D2: 18, D5: 16 }, reaction: '你拿起那束淡粉色的花，花瓣上还沾着水珠。\n也许……可以送给谁？' },
      { id: 'pick_coffee', label: '☕ 热咖啡', x: 42, y: 45, scores: { D6: 16, D1: 14 }, reaction: '你拿了一杯热美式。\n一个人的夜晚，一杯咖啡刚刚好。' },
      { id: 'pick_snack', label: '🍙 两份饭团', x: 68, y: 50, scores: { D3: 14, D2: 12 }, reaction: '你习惯性地拿了两份。\n……等等，为什么是两份？' },
    ] },
  { id: 'ch1_s4', chapter: 1, type: 'dialogue', bg: 'night_store', bgEffect: 'none',
    speaker: '？？？', speakerEmoji: '😊',
    dialogueLines: [
      { text: '"好巧啊，是你！"', delay: 0 },
      { text: '一个熟悉的声音从身后传来。', delay: 1800, isNarration: true },
      { text: '你转过身——', delay: 3200, isNarration: true },
      { text: '是那个人。你们大学时候的朋友。', delay: 4500, isNarration: true },
      { text: '"好久不见了，你怎么在这？"', delay: 6200 },
    ], dialogueDuration: 7800,
    choices: [
      { text: '"天哪！真的是你！我就住附近，你呢？"', scores: { D2: 18, D3: 16 }, reaction: '你的声音不自觉地提高了，惊喜溢于言表。' },
      { text: '微微一笑："嗯，好久不见。"', scores: { D2: 6, D6: 14 }, reaction: '你保持着一贯的从容，但心跳确实快了半拍。' },
      { text: '"我刚下班……你还是老样子啊。"', scores: { D1: 14, D3: 10 }, reaction: '你打量着对方，有些东西变了，有些没有。' },
      { text: '愣了一下，有点不知所措地挥挥手', scores: { D1: 6, D3: 4 }, reaction: '你的手在空中僵了一秒。对方笑了，和记忆中一样好看。' },
    ] },
  { id: 'ch1_s5', chapter: 1, type: 'dialogue', bg: 'sunset_street', bgEffect: 'slowZoomOut',
    speaker: '老朋友', speakerEmoji: '😄',
    dialogueLines: [
      { text: '你们走出便利店，并肩走在街上。', delay: 0, isNarration: true },
      { text: '夕阳把两个人的影子拉得很长。', delay: 2000, isNarration: true },
      { text: '"最近怎么样？还是一个人吗？"', delay: 4000 },
      { text: '对方的语气很随意，但你感觉到了一丝试探。', delay: 6000, isNarration: true },
    ], dialogueDuration: 7800,
    choices: [
      { text: '"对啊，一个人挺好的，自由自在。"', scores: { D6: 20, D1: 16 }, reaction: '对方看了你一眼，似乎想说什么，但只是笑了笑。' },
      { text: '"嗯……说实话，有时候还是会觉得孤单。"', scores: { D2: 16, D5: 14 }, reaction: '你难得这么坦诚。对方的眼神柔和了下来。' },
      { text: '"你呢？"反问回去，不想暴露自己', scores: { D4: 8, D6: 12 }, reaction: '对方被你反将一军，笑着说"我先问的你"。' },
      { text: '"还在等那个对的人出现吧。"', scores: { D5: 20, D3: 8 }, reaction: '对方沉默了一瞬，然后轻声说："也许……已经出现了呢？"' },
    ] },

  // ========== 第二章：偶然重逢 ==========
  { id: 'ch2_transition', chapter: 2, type: 'transition', text: '第二章', subtext: '偶然重逢 · 咖啡馆的午后', duration: 2800 },
  { id: 'ch2_s1', chapter: 2, type: 'narration', bg: 'coffee_shop', bgEffect: 'slowZoomIn',
    lines: [
      { text: '周末的午后，你来到一家安静的咖啡馆。', delay: 0 },
      { text: '阳光透过落地窗洒进来，', delay: 2200 },
      { text: '空气中弥漫着咖啡豆的香气。', delay: 4000 },
      { text: '你刚坐下，手机就亮了——', delay: 6000 },
      { text: '"我也在这附近，要不要一起坐坐？"', delay: 7800, style: 'italic' },
      { text: '是那天便利店遇到的老朋友。', delay: 9800 },
    ], autoDuration: 11800 },
  { id: 'ch2_s2', chapter: 2, type: 'action', bg: 'cafe_interior', bgEffect: 'none',
    prompt: '对方来了，坐在你对面。\n桌上摆着菜单、你的手机、还有窗外的风景。\n你们之间的气氛有点微妙……',
    hotspots: [
      { id: 'look_window', label: '🪟 望向窗外', x: 60, y: 20, scores: { D6: 16, D5: 12 }, reaction: '你望向窗外，阳光正好。\n"在看什么？"对方顺着你的目光看去。\n"没什么，就是觉得今天的光线很好看。"' },
      { id: 'look_person', label: '👀 看着对方', x: 35, y: 40, scores: { D2: 16, D3: 14 }, reaction: '你认真地看着对方的脸。\n"干嘛这样看我？"对方有点不好意思。\n"就是觉得你好像变了一点，又好像没变。"' },
      { id: 'check_phone', label: '📱 看手机', x: 10, y: 60, scores: { D1: 8, D4: 6 }, reaction: '你下意识地拿起手机。\n"嘿，我在这儿呢。"对方笑着说。\n你有点不好意思地放下了手机。' },
    ] },
  { id: 'ch2_s3', chapter: 2, type: 'dialogue', bg: 'cafe_interior', bgEffect: 'none',
    speaker: '老朋友', speakerEmoji: '🤔',
    dialogueLines: [
      { text: '咖啡端上来了，你们聊了很多。', delay: 0, isNarration: true },
      { text: '从工作聊到生活，从过去聊到现在。', delay: 2000, isNarration: true },
      { text: '突然，对方放下咖啡杯，认真地看着你：', delay: 4000, isNarration: true },
      { text: '"你有没有想过，为什么我们大学那么好，后来却断了联系？"', delay: 6000 },
    ], dialogueDuration: 8200,
    choices: [
      { text: '"大概是……我不太擅长维持关系吧。"', scores: { D4: 16, D2: 14 }, reaction: '你第一次这么直接地面对这个问题。对方的眼神变得温柔。' },
      { text: '"生活太忙了，不知不觉就疏远了。"', scores: { D1: 14, D6: 12 }, reaction: '对方点点头，但你知道这不是全部的原因。' },
      { text: '"也许是因为……有些感觉说不清楚。"', scores: { D5: 18, D2: 10 }, reaction: '空气突然安静了。对方的手指在杯沿上轻轻划过。' },
      { text: '沉默了一会儿，轻轻摇了摇头', scores: { D4: 4, D1: 8 }, reaction: '你不知道怎么回答。有些话，卡在喉咙里很久了。' },
    ] },
  { id: 'ch2_s4', chapter: 2, type: 'dialogue', bg: 'coffee_shop', bgEffect: 'slowZoomOut',
    speaker: '老朋友', speakerEmoji: '😊',
    dialogueLines: [
      { text: '咖啡馆要打烊了。', delay: 0, isNarration: true },
      { text: '你们走到门口，夕阳已经落下，街灯亮了起来。', delay: 2000, isNarration: true },
      { text: '"今天聊得很开心。"对方说。', delay: 4200, isNarration: true },
      { text: '"下次……我们去看电影吧？"', delay: 6000 },
      { text: '对方的语气像是在邀请，又像是在试探。', delay: 8000, isNarration: true },
    ], dialogueDuration: 9500,
    choices: [
      { text: '"好啊！你想看什么？我来订票。"', scores: { D3: 20, D2: 16 }, reaction: '你几乎是脱口而出。对方笑了，眼睛弯成了月牙。' },
      { text: '"看电影啊……好，你选时间。"', scores: { D3: 10, D1: 12 }, reaction: '你故作淡定，但回家的路上嘴角一直翘着。' },
      { text: '"再说吧，看我那天有没有空。"', scores: { D6: 16, D3: 4 }, reaction: '对方的笑容淡了一瞬，但很快恢复了。你有点后悔。' },
      { text: '心跳加速，小声说了句"嗯，好"', scores: { D1: 8, D5: 14 }, reaction: '你的声音小得像蚊子叫。对方凑近了一点："你说什么？"' },
    ] },

  // ========== 第三章：暧昧时光 ==========
  { id: 'ch3_transition', chapter: 3, type: 'transition', text: '第三章', subtext: '暧昧时光 · 雨中的秘密', duration: 2800 },
  { id: 'ch3_s1', chapter: 3, type: 'narration', bg: 'rainy_street', bgEffect: 'slowZoomIn',
    lines: [
      { text: '电影散场的时候，外面下起了雨。', delay: 0 },
      { text: '你们站在影院门口的屋檐下，', delay: 2200 },
      { text: '看着雨帘从天空倾泻而下。', delay: 4200 },
      { text: '你只带了一把伞。', delay: 6200 },
    ], autoDuration: 8200 },
  { id: 'ch3_s2', chapter: 3, type: 'action', bg: 'rainy_couple', bgEffect: 'none',
    prompt: '雨越下越大，你们需要离开这里。\n你手里握着那把伞……',
    hotspots: [
      { id: 'share_umbrella', label: '🌂 撑开伞，递向对方', x: 30, y: 35, scores: { D2: 18, D3: 16 }, reaction: '"一起走吧。"\n你撑开伞，自然地倾向对方那一侧。\n雨水打湿了你的半边肩膀，但你没在意。' },
      { id: 'give_umbrella', label: '☂️ 把伞给对方，自己淋雨', x: 10, y: 55, scores: { D2: 10, D6: 8 }, reaction: '"你打伞，我没事。"\n对方接过伞，皱着眉看你。\n"你傻啊，过来。"对方拉住了你的手臂。' },
      { id: 'run_in_rain', label: '🏃 拉着对方冲进雨里', x: 60, y: 55, scores: { D3: 20, D5: 18 }, reaction: '"跑！"\n你抓住对方的手就冲了出去。\n雨水浇在身上，你们笑得像两个疯子。' },
    ] },
  { id: 'ch3_s3', chapter: 3, type: 'narration', bg: 'rainy_street', bgEffect: 'panRight',
    lines: [
      { text: '你们跑进了一家小店的屋檐下。', delay: 0 },
      { text: '两个人都有点狼狈，头发滴着水。', delay: 2200 },
      { text: '对方看着你，突然笑了出来。', delay: 4200 },
      { text: '那个笑容，像是雨天里突然出现的彩虹。', delay: 6200 },
    ], autoDuration: 8500 },
  { id: 'ch3_s4', chapter: 3, type: 'dialogue', bg: 'rainy_street', bgEffect: 'none',
    speaker: '老朋友', speakerEmoji: '😳',
    dialogueLines: [
      { text: '对方擦了擦脸上的雨水，突然安静了下来。', delay: 0, isNarration: true },
      { text: '"我跟你说个事。"', delay: 2200 },
      { text: '"其实大学的时候……我就想跟你说了。"', delay: 4200 },
      { text: '对方的声音被雨声盖住了一半。', delay: 6500, isNarration: true },
      { text: '"我一直……"', delay: 8200 },
      { text: '话说到一半，对方突然停住了，看着你的眼睛。', delay: 9800, isNarration: true },
    ], dialogueDuration: 11500,
    choices: [
      { text: '心跳到了嗓子眼，但你直视着对方的眼睛，等着下文', scores: { D4: 18, D1: 14 }, reaction: '你没有躲开。雨声很大，但你能听到自己的心跳。' },
      { text: '"我知道。"你轻声说，"我也是。"', scores: { D2: 20, D3: 18 }, reaction: '对方愣住了。然后，嘴角慢慢弯了起来。' },
      { text: '紧张地移开目光，假装看雨', scores: { D1: 6, D4: 4 }, reaction: '你不敢看对方的眼睛。雨水模糊了视线，也模糊了那些说不出口的话。' },
      { text: '"别说了……我们先找个地方避雨吧。"', scores: { D4: 8, D6: 14 }, reaction: '你岔开了话题。对方沉默了一会儿，轻轻"嗯"了一声。' },
    ] },

  // ========== 第四章：心意相通 ==========
  { id: 'ch4_transition', chapter: 4, type: 'transition', text: '第四章', subtext: '心意相通 · 天台的晚风', duration: 2800 },
  { id: 'ch4_s1', chapter: 4, type: 'narration', bg: 'rooftop_sunset', bgEffect: 'slowZoomIn',
    lines: [
      { text: '那天之后，你们的关系变得不一样了。', delay: 0 },
      { text: '不再只是"老朋友"，但也还没有一个明确的名字。', delay: 2500 },
      { text: '今天，对方约你去天台看日落。', delay: 5000 },
      { text: '城市的轮廓在夕阳下镀上了一层金边。', delay: 7200 },
    ], autoDuration: 9500 },
  { id: 'ch4_s2', chapter: 4, type: 'action', bg: 'rooftop_sunset', bgEffect: 'none',
    prompt: '天台上只有你们两个人。\n晚风吹过，带来远处的城市声响。\n对方站在栏杆旁，背对着你……',
    hotspots: [
      { id: 'stand_beside', label: '🚶 走到对方身边', x: 35, y: 30, scores: { D3: 16, D2: 14 }, reaction: '你走过去，和对方并肩站着。\n肩膀几乎贴在一起，你能感觉到对方的体温。' },
      { id: 'stay_back', label: '🧍 站在原地看着', x: 10, y: 50, scores: { D6: 16, D1: 10 }, reaction: '你站在几步之外，看着对方的背影。\n夕阳把对方的轮廓勾勒得很好看。' },
      { id: 'take_photo', label: '📸 偷偷拍一张照片', x: 65, y: 50, scores: { D5: 16, D2: 8 }, reaction: '你悄悄举起手机，按下快门。\n逆光中的对方，像一幅画。\n你把这张照片设成了壁纸。' },
    ] },
  { id: 'ch4_s3', chapter: 4, type: 'dialogue', bg: 'rooftop_sunset', bgEffect: 'slowZoomOut',
    speaker: '老朋友', speakerEmoji: '🥺',
    dialogueLines: [
      { text: '太阳快要落下去了。', delay: 0, isNarration: true },
      { text: '天边的云被染成了玫瑰色。', delay: 2000, isNarration: true },
      { text: '"你说……"对方的声音很轻。', delay: 4000, isNarration: true },
      { text: '"如果两个人之间有了那种感觉，应该说出来吗？"', delay: 6000 },
      { text: '"还是……就这样保持现在的关系比较好？"', delay: 8500 },
    ], dialogueDuration: 10500,
    choices: [
      { text: '"当然要说出来。错过了就没有了。"', scores: { D4: 20, D3: 18 }, reaction: '你的声音很坚定。对方转过头来，眼睛里映着最后一缕阳光。' },
      { text: '"要看时机吧……有些话说早了，反而会吓到对方。"', scores: { D4: 12, D1: 14 }, reaction: '对方若有所思地点了点头。你在想，现在算不算一个好时机。' },
      { text: '"不说出来的话，对方怎么知道呢？"看着对方的眼睛', scores: { D2: 18, D4: 16 }, reaction: '你们对视了三秒。那三秒里，好像什么都说了，又好像什么都没说。' },
      { text: '"我觉得……有些感觉不需要说，对方能感受到的。"', scores: { D2: 6, D5: 12 }, reaction: '对方笑了，但笑容里有一丝无奈。"可是我感受不到啊。"' },
    ] },
  { id: 'ch4_s4', chapter: 4, type: 'dialogue', bg: 'rooftop_sunset', bgEffect: 'none',
    speaker: '老朋友', speakerEmoji: '💕',
    dialogueLines: [
      { text: '最后一缕阳光消失在地平线。', delay: 0, isNarration: true },
      { text: '城市的灯光一盏一盏亮起来。', delay: 2200, isNarration: true },
      { text: '对方深吸一口气，转向你：', delay: 4200, isNarration: true },
      { text: '"其实我今天约你来，是想告诉你——"', delay: 6000 },
      { text: '"我喜欢你。不是朋友那种喜欢。"', delay: 8200 },
      { text: '风停了。世界好像只剩下你们两个人。', delay: 10500, isNarration: true },
    ], dialogueDuration: 12500,
    choices: [
      { text: '心脏快要跳出来了，但你笑着说："我也是。等你这句话很久了。"', scores: { D2: 20, D1: 18 }, reaction: '对方的眼眶红了。你伸出手，对方紧紧握住。' },
      { text: '沉默了很久，然后轻轻把头靠在对方肩上', scores: { D2: 12, D4: 8 }, reaction: '你没有说话，但你的动作已经说明了一切。对方的手轻轻搭上了你的肩。' },
      { text: '"我……需要一点时间想想。但我不想失去你。"', scores: { D1: 10, D6: 16 }, reaction: '对方点了点头，没有追问。你们就这样安静地站着，看着城市的灯火。' },
      { text: '眼泪突然就掉了下来："你知道我等这句话等了多久吗？"', scores: { D5: 20, D2: 18 }, reaction: '对方慌了，手忙脚乱地帮你擦眼泪。你破涕为笑，觉得这一刻比任何电影都浪漫。' },
    ] },

  // ========== 第五章：关于我们 ==========
  { id: 'ch5_transition', chapter: 5, type: 'transition', text: '第五章', subtext: '关于我们 · 星空下的答案', duration: 2800 },
  { id: 'ch5_s1', chapter: 5, type: 'narration', bg: 'park_autumn', bgEffect: 'panRight',
    lines: [
      { text: '在一起之后的日子，像秋天的阳光一样温暖。', delay: 0 },
      { text: '你们一起逛公园、一起做饭、一起加班到深夜。', delay: 2500 },
      { text: '但生活不只有甜蜜——', delay: 5000 },
      { text: '第一次争吵，来得猝不及防。', delay: 7000 },
    ], autoDuration: 9200 },
  { id: 'ch5_s2', chapter: 5, type: 'dialogue', bg: 'cafe_interior', bgEffect: 'none',
    speaker: '恋人', speakerEmoji: '😤',
    dialogueLines: [
      { text: '"你总是这样，什么都不说！"', delay: 0 },
      { text: '对方的声音带着委屈和愤怒。', delay: 2000, isNarration: true },
      { text: '"我不是不说，我只是需要时间想清楚……"', delay: 4000, isNarration: true, isProtagonist: true },
      { text: '"每次都是这个理由！你到底在不在乎这段关系？"', delay: 6500 },
      { text: '咖啡杯里的拿铁已经凉了。', delay: 8500, isNarration: true },
    ], dialogueDuration: 10000,
    choices: [
      { text: '深呼吸，认真地说："对不起，我在乎。我们好好谈谈。"', scores: { D4: 22, D2: 14 }, reaction: '你放下了防备。对方的眼神从愤怒变成了心疼。' },
      { text: '"你能不能别这么激动？冷静下来再说。"', scores: { D4: 14, D6: 16 }, reaction: '对方沉默了。你知道这不是最好的回应，但你真的需要空间。' },
      { text: '握住对方的手："我知道你在生气，但我真的不是故意的。"', scores: { D2: 16, D1: 14 }, reaction: '对方的手在你掌心里微微颤抖。愤怒在慢慢消退。' },
      { text: '低下头，不知道该说什么', scores: { D4: 4, D1: 6 }, reaction: '沉默蔓延开来。你想说很多，但一个字都说不出口。' },
    ] },
  { id: 'ch5_s3', chapter: 5, type: 'narration', bg: 'starry_night', bgEffect: 'slowZoomIn',
    lines: [
      { text: '那天晚上，你们和好了。', delay: 0 },
      { text: '你躺在床上，看着天花板，想了很多。', delay: 2500 },
      { text: '关于爱情，关于自己，关于未来。', delay: 5000 },
      { text: '窗外的星星很亮。', delay: 7200 },
    ], autoDuration: 9200 },
  { id: 'ch5_s4', chapter: 5, type: 'action', bg: 'starry_night', bgEffect: 'none',
    prompt: '夜深了，你一个人站在窗前。\n星空很美，你的心里有很多话想说……\n如果可以对星星许一个关于爱情的愿望——',
    hotspots: [
      { id: 'wish_together', label: '💑 希望我们能一直在一起', x: 15, y: 20, scores: { D5: 16, D6: 4 }, reaction: '你闭上眼睛，在心里默默许愿。\n"请让我们一直走下去。"' },
      { id: 'wish_brave', label: '💪 希望我能更勇敢地去爱', x: 55, y: 20, scores: { D4: 18, D1: 12 }, reaction: '你知道自己还有很多不足。\n但你愿意为了这个人，变得更好。' },
      { id: 'wish_balance', label: '⚖️ 希望我们都能做自己', x: 35, y: 55, scores: { D6: 20, D1: 16 }, reaction: '爱情不是失去自己，而是找到另一个自己。\n你希望你们都能在爱里自由呼吸。' },
    ] },
  { id: 'ch5_s5', chapter: 5, type: 'dialogue', bg: 'starry_night', bgEffect: 'slowZoomOut',
    speaker: '内心独白', speakerEmoji: '💭',
    dialogueLines: [
      { text: '故事还在继续。', delay: 0, isNarration: true },
      { text: '你不知道未来会怎样，', delay: 2000, isNarration: true },
      { text: '但此刻，你想问自己最后一个问题——', delay: 4000, isNarration: true },
      { text: '"对你来说，爱情最重要的是什么？"', delay: 6500 },
    ], dialogueDuration: 8500,
    choices: [
      { text: '"是那个人让我觉得，做自己就很好。"', scores: { D1: 20, D6: 18 }, reaction: '你笑了。原来答案一直都在心里。' },
      { text: '"是即使吵架了，也愿意回头的勇气。"', scores: { D4: 20, D2: 14 }, reaction: '爱不是永远不吵架，而是吵完了还想在一起。' },
      { text: '"是两个人一起，把平凡的日子过成诗。"', scores: { D5: 18, D2: 16 }, reaction: '不需要轰轰烈烈，只要有你在身边。' },
      { text: '"是我可以脆弱，你不会离开。"', scores: { D1: 8, D4: 12 }, reaction: '你终于承认了自己的脆弱。而这，恰恰是最勇敢的事。' },
    ] },
  { id: 'ch5_ending', chapter: 5, type: 'narration', bg: 'starry_night', bgEffect: 'slowZoomOut',
    lines: [
      { text: '星光洒在你的脸上。', delay: 0 },
      { text: '这个故事，是你写的。', delay: 2500 },
      { text: '每一个选择，每一次心动，每一个犹豫——', delay: 4500 },
      { text: '都是真实的你。', delay: 7000 },
      { text: '现在，让我们看看……', delay: 9000 },
      { text: '在爱情的世界里，你是什么样的存在？', delay: 11000, style: 'highlight' },
    ], autoDuration: 13500, isEnding: true },
];

function getCollectionScenes() {
  return SCENES.filter(function(s) { return s.type === 'dialogue' || s.type === 'action'; });
}

// ============================================================
// ===== ENGINE 模块 =====
// ============================================================

function calculateDimensionRanges() {
  var ranges = {};
  DIMENSIONS.forEach(function(d) { ranges[d.id] = { min: 0, max: 0 }; });
  var collectionScenes = getCollectionScenes();
  collectionScenes.forEach(function(scene) {
    var items = scene.type === 'dialogue' ? scene.choices : scene.hotspots;
    if (!items) return;
    DIMENSIONS.forEach(function(d) {
      var minScore = 0, maxScore = 0, hasDim = false;
      items.forEach(function(item) {
        var score = item.scores[d.id];
        if (score !== undefined) {
          hasDim = true;
          if (score < minScore) minScore = score;
          if (score > maxScore) maxScore = score;
        }
      });
      if (hasDim) {
        ranges[d.id].min += minScore;
        ranges[d.id].max += maxScore;
      }
    });
  });
  return ranges;
}

var DIMENSION_RANGES = calculateDimensionRanges();

function calculateRawScores(choices) {
  var rawScores = {};
  DIMENSIONS.forEach(function(d) { rawScores[d.id] = 0; });
  Object.entries(choices).forEach(function(entry) {
    var sceneId = entry[0], value = entry[1];
    var scene = SCENES.find(function(s) { return s.id === sceneId; });
    if (!scene) return;
    var scores = null;
    if (scene.type === 'dialogue' && typeof value === 'number') {
      var choice = scene.choices[value];
      if (choice) scores = choice.scores;
    } else if (scene.type === 'action' && typeof value === 'string') {
      var hotspot = scene.hotspots.find(function(h) { return h.id === value; });
      if (hotspot) scores = hotspot.scores;
    }
    if (scores) {
      Object.entries(scores).forEach(function(se) {
        rawScores[se[0]] = (rawScores[se[0]] || 0) + se[1];
      });
    }
  });
  return rawScores;
}

function normalizeScores(rawScores) {
  var normalized = {};
  DIMENSIONS.forEach(function(d) {
    var range = DIMENSION_RANGES[d.id];
    var raw = rawScores[d.id] || 0;
    var span = range.max - range.min;
    if (span === 0) { normalized[d.id] = 50; }
    else {
      var score = ((raw - range.min) / span) * 100;
      score = Math.max(0, Math.min(100, score));
      normalized[d.id] = Math.round(score);
    }
  });
  return normalized;
}

function euclideanDistance(a, b) {
  var sum = 0;
  DIMENSIONS.forEach(function(d) {
    sum += Math.pow((a[d.id] || 0) - (b[d.id] || 0), 2);
  });
  return Math.sqrt(sum);
}

function matchPersonality(normalizedScores) {
  var matches = PERSONALITIES.map(function(p) {
    var distance = euclideanDistance(normalizedScores, p.profile);
    var maxDistance = Math.sqrt(DIMENSIONS.length * 10000);
    var matchScore = Math.max(0, Math.round((1 - distance / maxDistance) * 100));
    return { personality: p, distance: distance, matchScore: matchScore };
  });
  matches.sort(function(a, b) { return a.distance - b.distance; });
  return { personality: matches[0].personality, matchScore: matches[0].matchScore, allMatches: matches };
}

function evaluateTest(choices) {
  var rawScores = calculateRawScores(choices);
  var normalizedScores = normalizeScores(rawScores);
  var matchResult = matchPersonality(normalizedScores);
  var dimensionAnalysis = DIMENSIONS.map(function(d) {
    var score = normalizedScores[d.id];
    var level, label;
    if (score >= 75) { level = 'high'; label = d.labelHigh; }
    else if (score >= 50) { level = 'mid-high'; label = '偏' + d.labelHigh; }
    else if (score >= 25) { level = 'mid-low'; label = '偏' + d.labelLow; }
    else { level = 'low'; label = d.labelLow; }
    return Object.assign({}, d, { score: score, level: level, label: label });
  });
  var bestMatchPersonality = getPersonalityById(matchResult.personality.bestMatch);
  var worstMatchPersonality = getPersonalityById(matchResult.personality.worstMatch);
  return {
    rawScores: rawScores, normalizedScores: normalizedScores,
    personality: matchResult.personality, matchScore: matchResult.matchScore,
    topMatches: matchResult.allMatches.slice(0, 5), dimensionAnalysis: dimensionAnalysis,
    bestMatchPersonality: bestMatchPersonality, worstMatchPersonality: worstMatchPersonality
  };
}

// ============================================================
// ===== MAIN 模块 =====
// ============================================================

var state = {
  sceneIndex: 0,
  choices: {},
  reactions: {},
  result: null,
  isTransitioning: false,
  currentChapter: 1,
  autoTimer: null,
  lineTimers: [],
};

var $ = function(sel) { return document.querySelector(sel); };
var $$ = function(sel) { return document.querySelectorAll(sel); };

// 图片预加载（带超时机制，确保本地打开不会卡住）
function preloadImages(onProgress) {
  var urls = Object.values(SCENE_IMAGES);
  var loaded = 0;
  var total = urls.length;
  var TIMEOUT = 8000; // 单张图片最多等8秒
  var GLOBAL_TIMEOUT = 15000; // 全局最多等15秒

  return new Promise(function(resolve) {
    if (total === 0) { resolve(); return; }

    var resolved = false;
    function done() {
      if (resolved) return;
      resolved = true;
      if (onProgress) onProgress(1);
      resolve();
    }

    // 全局超时保底：即使图片全部加载失败也能进入应用
    var globalTimer = setTimeout(function() {
      console.warn('[预加载] 全局超时，跳过剩余图片加载');
      done();
    }, GLOBAL_TIMEOUT);

    function onOneLoaded() {
      loaded++;
      if (onProgress) onProgress(loaded / total);
      if (loaded >= total) {
        clearTimeout(globalTimer);
        done();
      }
    }

    urls.forEach(function(url) {
      var img = new Image();
      var timer = setTimeout(function() {
        // 单张超时，视为已加载（跳过）
        onOneLoaded();
      }, TIMEOUT);

      img.onload = function() {
        clearTimeout(timer);
        onOneLoaded();
      };
      img.onerror = function() {
        clearTimeout(timer);
        onOneLoaded();
      };
      img.src = url;
    });
  });
}

// 粒子系统
var SceneParticles = function(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.particles = [];
  this.running = true;
  this.hue = 40;
  this.resize();
  this.init();
  var self = this;
  window.addEventListener('resize', function() { self.resize(); });
  this.animate();
};
SceneParticles.prototype.resize = function() {
  var dpr = window.devicePixelRatio || 1;
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.canvas.width = this.w * dpr;
  this.canvas.height = this.h * dpr;
  this.canvas.style.width = this.w + 'px';
  this.canvas.style.height = this.h + 'px';
  this.ctx.scale(dpr, dpr);
};
SceneParticles.prototype.init = function() {
  var count = Math.min(30, Math.floor(this.w * this.h / 25000));
  this.particles = [];
  for (var i = 0; i < count; i++) this.particles.push(this.create());
};
SceneParticles.prototype.create = function() {
  return {
    x: Math.random() * this.w, y: Math.random() * this.h,
    vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.3 - 0.05,
    size: Math.random() * 3 + 1, alpha: Math.random() * 0.3 + 0.05,
    hue: this.hue + Math.random() * 30 - 15,
    life: Math.random() * 200 + 100, age: 0,
  };
};
SceneParticles.prototype.setHue = function(h) { this.hue = h; };
SceneParticles.prototype.animate = function() {
  if (!this.running) return;
  var self = this;
  this.ctx.clearRect(0, 0, this.w, this.h);
  this.particles.forEach(function(p, i) {
    p.x += p.vx; p.y += p.vy; p.age++;
    var lifeRatio = 1 - p.age / p.life;
    if (lifeRatio <= 0 || p.y < -10) {
      self.particles[i] = self.create();
      self.particles[i].y = self.h + 10;
      return;
    }
    var a = p.alpha * lifeRatio;
    self.ctx.beginPath();
    self.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    self.ctx.fillStyle = 'hsla(' + p.hue + ',60%,70%,' + a + ')';
    self.ctx.fill();
  });
  requestAnimationFrame(function() { self.animate(); });
};

var particles;

// 场景背景管理
function setSceneBg(bgKey, effect) {
  effect = effect || 'none';
  var img = $('#scene-bg-img');
  var imgNext = $('#scene-bg-img-next');
  var url = SCENE_IMAGES[bgKey];
  if (!url) return;
  imgNext.src = url;
  imgNext.className = 'absolute inset-0 w-full h-full object-cover';
  imgNext.style.opacity = '0';
  img.className = 'absolute inset-0 w-full h-full object-cover';
  requestAnimationFrame(function() {
    imgNext.style.opacity = '1';
    if (effect !== 'none') imgNext.classList.add('bg-effect-' + effect);
    setTimeout(function() {
      img.src = url;
      img.className = imgNext.className;
      imgNext.style.opacity = '0';
    }, 1300);
  });
}

// 隐藏所有交互层
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
  state.lineTimers.forEach(function(t) { clearTimeout(t); });
  state.lineTimers = [];
}

// 更新进度指示器
function updateProgress() {
  var dotsEl = $('#scene-progress-dots');
  if (!dotsEl) return;
  var html = '';
  CHAPTERS.forEach(function(ch) {
    var isActive = state.currentChapter === ch.id;
    var isCompleted = state.currentChapter > ch.id;
    html += '<div class="progress-dot ' + (isActive ? 'active' : '') + ' ' + (isCompleted ? 'completed' : '') + '"></div>';
  });
  dotsEl.innerHTML = html;
  var label = $('#chapter-label');
  var ch = CHAPTERS.find(function(c) { return c.id === state.currentChapter; });
  if (label && ch) label.textContent = ch.emoji + ' ' + ch.title;
}

// 场景调度器
function playScene(index) {
  if (index >= SCENES.length) { showCalculating(); return; }
  state.sceneIndex = index;
  var scene = SCENES[index];
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
  var scene = SCENES[state.sceneIndex];
  if (scene && scene.isEnding) { showCalculating(); return; }
  playScene(state.sceneIndex + 1);
}

// 章节过渡
function playTransition(scene) {
  var layer = $('#transition-layer');
  var textEl = $('#transition-text');
  var subEl = $('#transition-subtext');
  state.isTransitioning = true;
  layer.classList.remove('hidden');
  layer.classList.add('visible');
  textEl.textContent = scene.text;
  subEl.textContent = scene.subtext || '';
  textEl.style.animation = 'none';
  subEl.style.animation = 'none';
  void textEl.offsetHeight;
  textEl.style.animation = '';
  subEl.style.animation = '';
  var ch = CHAPTERS.find(function(c) { return c.id === scene.chapter; });
  if (ch && particles) {
    var hueMap = { '#f59e0b': 40, '#ec4899': 330, '#6366f1': 230, '#f43f5e': 350, '#a855f7': 270 };
    particles.setHue(hueMap[ch.color] || 40);
  }
  state.autoTimer = setTimeout(function() {
    layer.classList.remove('visible');
    setTimeout(function() {
      layer.classList.add('hidden');
      state.isTransitioning = false;
      nextScene();
    }, 800);
  }, scene.duration || 2500);
}

// 叙事自动播放
function playNarration(scene) {
  setSceneBg(scene.bg, scene.bgEffect);
  var layer = $('#narration-layer');
  var textEl = $('#narration-text');
  layer.classList.remove('hidden');
  textEl.innerHTML = '';
  var lineEls = [];
  scene.lines.forEach(function(line) {
    var span = document.createElement('span');
    span.className = 'narration-line' + (line.style ? ' style-' + line.style : '');
    span.textContent = line.text;
    textEl.appendChild(span);
    lineEls.push(span);
  });
  scene.lines.forEach(function(line, i) {
    var timer = setTimeout(function() {
      lineEls[i].classList.add('visible');
      lineEls.forEach(function(el, j) {
        if (j < i - 3) el.style.opacity = '0';
      });
    }, line.delay);
    state.lineTimers.push(timer);
  });
  state.autoTimer = setTimeout(function() { nextScene(); }, scene.autoDuration);
}

// 对话场景
function playDialogue(scene) {
  setSceneBg(scene.bg, scene.bgEffect);
  var layer = $('#dialogue-layer');
  var speakerEl = $('#dialogue-speaker');
  var speakerEmoji = $('#speaker-emoji');
  var speakerName = $('#speaker-name');
  var textEl = $('#dialogue-text');
  var choicesEl = $('#dialogue-choices');
  var reactionEl = $('#dialogue-reaction');
  layer.classList.remove('hidden');
  textEl.innerHTML = '';
  choicesEl.innerHTML = '';
  choicesEl.classList.add('hidden');
  reactionEl.classList.add('hidden');
  if (scene.speaker) {
    speakerEl.classList.remove('hidden');
    speakerEmoji.textContent = scene.speakerEmoji || '💬';
    speakerName.textContent = scene.speaker;
  }
  var lineEls = [];
  scene.dialogueLines.forEach(function(line) {
    var span = document.createElement('span');
    var cls = 'dialogue-line';
    if (line.isNarration) cls += ' is-narration';
    else if (line.isProtagonist) cls += ' is-protagonist';
    else cls += ' is-speech';
    span.className = cls;
    span.textContent = line.text + ' ';
    textEl.appendChild(span);
    lineEls.push(span);
  });
  scene.dialogueLines.forEach(function(line, i) {
    var timer = setTimeout(function() { lineEls[i].classList.add('visible'); }, line.delay);
    state.lineTimers.push(timer);
  });
  var alreadyChosen = state.choices[scene.id] !== undefined;
  state.autoTimer = setTimeout(function() {
    if (alreadyChosen) {
      showDialogueReaction(scene, state.choices[scene.id]);
      setTimeout(function() { nextScene(); }, 2500);
    } else {
      showDialogueChoices(scene);
    }
  }, scene.dialogueDuration);
}

function showDialogueChoices(scene) {
  var choicesEl = $('#dialogue-choices');
  choicesEl.innerHTML = '';
  choicesEl.classList.remove('hidden');
  var labels = ['A','B','C','D'];
  scene.choices.forEach(function(choice, idx) {
    var btn = document.createElement('button');
    btn.className = 'dialogue-choice';
    btn.innerHTML = '<span class="choice-dot">' + labels[idx] + '</span><span class="flex-1">' + choice.text + '</span>';
    btn.addEventListener('click', function() {
      state.choices[scene.id] = idx;
      state.reactions[scene.id] = choice.reaction;
      choicesEl.querySelectorAll('.dialogue-choice').forEach(function(el, i) {
        if (i === idx) {
          el.classList.add('selected');
          el.querySelector('.choice-dot').innerHTML = '<i class="fa-solid fa-check" style="font-size:9px"></i>';
        } else { el.classList.add('disabled'); }
      });
      showDialogueReaction(scene, idx);
      setTimeout(function() { nextScene(); }, 2800);
    });
    choicesEl.appendChild(btn);
  });
}

function showDialogueReaction(scene, choiceIdx) {
  var reactionEl = $('#dialogue-reaction');
  var reaction = scene.choices[choiceIdx] ? scene.choices[choiceIdx].reaction : state.reactions[scene.id];
  if (!reaction) return;
  reactionEl.classList.remove('hidden');
  reactionEl.querySelector('.reaction-bubble').textContent = reaction;
}

// 场景点击交互
function playAction(scene) {
  setSceneBg(scene.bg, scene.bgEffect);
  var layer = $('#action-layer');
  var promptEl = $('#action-prompt');
  var hotspotsEl = $('#action-hotspots');
  var reactionEl = $('#action-reaction');
  layer.classList.remove('hidden');
  hotspotsEl.innerHTML = '';
  reactionEl.classList.add('hidden');
  promptEl.querySelector('div > div').textContent = scene.prompt;
  promptEl.classList.remove('hidden');
  var alreadyChosen = state.choices[scene.id] !== undefined;
  scene.hotspots.forEach(function(hs, i) {
    var btn = document.createElement('button');
    btn.className = 'hotspot-btn';
    if (alreadyChosen && state.choices[scene.id] !== hs.id) btn.classList.add('disabled');
    if (alreadyChosen && state.choices[scene.id] === hs.id) btn.classList.add('selected');
    btn.style.left = hs.x + '%';
    btn.style.top = hs.y + '%';
    btn.style.animationDelay = (i * 0.15) + 's';
    btn.textContent = hs.label;
    if (!alreadyChosen) {
      btn.addEventListener('click', function() {
        state.choices[scene.id] = hs.id;
        state.reactions[scene.id] = hs.reaction;
        hotspotsEl.querySelectorAll('.hotspot-btn').forEach(function(el) {
          if (el === btn) el.classList.add('selected');
          else el.classList.add('disabled');
        });
        promptEl.classList.add('hidden');
        reactionEl.classList.remove('hidden');
        reactionEl.querySelector('.reaction-bubble').textContent = hs.reaction;
        setTimeout(function() { nextScene(); }, 3000);
      });
    }
    hotspotsEl.appendChild(btn);
  });
  if (alreadyChosen) {
    promptEl.classList.add('hidden');
    reactionEl.classList.remove('hidden');
    reactionEl.querySelector('.reaction-bubble').textContent = state.reactions[scene.id] || '';
    setTimeout(function() { nextScene(); }, 2500);
  }
}

// 计算动画
function showCalculating() {
  hideAllLayers();
  $('#page-scene').classList.add('hidden');
  var calcPage = $('#page-calculating');
  calcPage.classList.remove('hidden');
  calcPage.classList.add('flex');
  var steps = [
    { text: '📖 回顾你的故事旅程...', delay: 400 },
    { text: '🔍 分析每个关键时刻的选择...', delay: 1000 },
    { text: '🧬 解读六大情感维度...', delay: 1600 },
    { text: '🐾 在24种动物灵魂中寻找你的影子...', delay: 2200 },
    { text: '✨ 你的恋爱动物即将现身！', delay: 2800 },
  ];
  var stepsEl = $('#calc-steps');
  stepsEl.innerHTML = '';
  steps.forEach(function(step) {
    setTimeout(function() {
      var p = document.createElement('p');
      p.className = 'animate-fadeInUp';
      p.textContent = step.text;
      stepsEl.appendChild(p);
    }, step.delay);
  });
  setTimeout(function() {
    state.result = evaluateTest(state.choices);
    calcPage.classList.add('hidden');
    calcPage.classList.remove('flex');
    showResult();
  }, 3500);
}

// 显示结果页
function showResult() {
  var resultPage = $('#page-result');
  resultPage.classList.remove('hidden');
  var footer = $('#app-footer');
  if (footer) footer.classList.remove('hidden');
  window.scrollTo({ top: 0 });
  renderResult();
}

// 结果页渲染
function renderResult() {
  var r = state.result;
  var personality = r.personality, matchScore = r.matchScore;
  var dimensionAnalysis = r.dimensionAnalysis, topMatches = r.topMatches;
  var bestMatchPersonality = r.bestMatchPersonality, worstMatchPersonality = r.worstMatchPersonality;
  var container = $('#result-container');
  var circumference = 2 * Math.PI * 52;
  var html = '';

  // 1. 主人格卡片
  html += '<div class="result-hero mb-8 animate-scaleIn"><div class="result-hero-content">';
  html += '<div class="ring-progress mx-auto mb-4" style="width:120px;height:120px">';
  html += '<svg width="120" height="120" viewBox="0 0 120 120">';
  html += '<circle class="ring-bg" cx="60" cy="60" r="52"/>';
  html += '<circle class="ring-fill" cx="60" cy="60" r="52" stroke="url(#matchGrad)" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + circumference + '" data-target="' + (circumference * (1 - matchScore / 100)) + '" id="match-ring"/>';
  html += '<defs><linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f43f5e"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs>';
  html += '</svg><div class="ring-label"><span class="text-3xl">' + personality.emoji + '</span></div></div>';
  html += '<div class="text-xs text-rose-400/60 tracking-widest uppercase mb-2">匹配度 <span id="match-counter" class="text-rose-400 font-bold">0</span>%</div>';
  html += '<h1 class="font-display font-black text-3xl sm:text-4xl text-white mb-1">' + personality.name + '</h1>';
  html += '<p class="text-rose-300/70 text-base font-medium mb-4">' + personality.title + '</p>';
  html += '<p class="text-white/50 text-sm leading-relaxed max-w-md mx-auto">' + personality.summary + '</p>';
  html += '</div></div>';

  // 2. 维度图谱
  html += '<div class="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 mb-6 animate-fadeInUp" style="animation-delay:0.15s;opacity:0">';
  html += '<h2 class="text-base font-bold text-white/80 mb-5 flex items-center gap-2"><span class="text-lg">📊</span> 恋爱维度图谱</h2>';
  html += '<div class="flex justify-center mb-6"><canvas id="radar-chart" width="320" height="320" style="width:320px;height:320px;max-width:100%"></canvas></div>';
  html += '<div class="space-y-4">';
  dimensionAnalysis.forEach(function(d, i) {
    html += '<div class="animate-fadeInUp" style="animation-delay:' + (0.3 + i * 0.1) + 's;opacity:0">';
    html += '<div class="flex items-center justify-between mb-1.5"><div class="flex items-center gap-2"><span class="text-sm">' + d.icon + '</span><span class="text-sm font-medium text-white/70">' + d.name + '</span></div>';
    html += '<div class="flex items-center gap-2"><span class="text-xs px-2 py-0.5 rounded-full" style="background:' + d.color + '15;color:' + d.color + '">' + d.label + '</span><span class="text-sm font-bold" style="color:' + d.color + '">' + d.score + '</span></div></div>';
    html += '<div class="dim-bar-track"><div class="dim-bar-fill" style="width:0%;background:linear-gradient(90deg,' + d.color + '88,' + d.color + ')" data-target-width="' + d.score + '%"></div></div>';
    html += '<div class="flex justify-between text-[10px] text-white/20 mt-1"><span>' + d.labelLow + '</span><span>' + d.labelHigh + '</span></div></div>';
  });
  html += '</div></div>';

  // 3. 优势与注意
  html += '<div class="grid grid-cols-2 gap-3 mb-6">';
  html += '<div class="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5 animate-fadeInUp" style="animation-delay:0.4s;opacity:0">';
  html += '<div class="flex items-center gap-2 mb-3"><span class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">✓</span><span class="text-sm font-bold text-emerald-400/80">恋爱超能力</span></div>';
  html += '<div class="flex flex-wrap gap-1.5">';
  personality.strengths.forEach(function(s) {
    var display = s.length > 12 ? s.substring(0, 12) + '…' : s;
    html += '<span class="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300/70 text-xs" title="' + s + '">' + display + '</span>';
  });
  html += '</div></div>';
  html += '<div class="rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] p-5 animate-fadeInUp" style="animation-delay:0.5s;opacity:0">';
  html += '<div class="flex items-center gap-2 mb-3"><span class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs">!</span><span class="text-sm font-bold text-amber-400/80">需要留意</span></div>';
  html += '<div class="flex flex-wrap gap-1.5">';
  personality.weaknesses.forEach(function(w) {
    var display = w.length > 12 ? w.substring(0, 12) + '…' : w;
    html += '<span class="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300/70 text-xs" title="' + w + '">' + display + '</span>';
  });
  html += '</div></div></div>';

  // 4. 巴纳姆效应建议
  var barnumTips = generateBarnumTips(personality, dimensionAnalysis);
  html += '<div class="barnum-card mb-6 animate-fadeInUp" style="animation-delay:0.55s;opacity:0">';
  html += '<div class="flex items-center gap-2 mb-4"><span class="text-lg">🔮</span><span class="text-sm font-bold text-white/70">你可能不知道的自己</span></div>';
  html += '<div class="space-y-3">';
  barnumTips.forEach(function(tip) {
    html += '<div class="barnum-tip"><span class="text-base mr-2">' + tip.emoji + '</span>' + tip.text + '</div>';
  });
  html += '</div></div>';

  // 5. 恋爱建议
  html += '<div class="rounded-2xl border border-rose-500/10 bg-gradient-to-r from-rose-500/[0.05] to-purple-500/[0.03] p-5 mb-6 animate-fadeInUp" style="animation-delay:0.6s;opacity:0">';
  html += '<div class="flex items-start gap-3"><span class="text-2xl shrink-0">💌</span><div><p class="text-sm font-bold text-white/70 mb-1">给你的一句话</p><p class="text-sm text-white/45 leading-relaxed">' + personality.advice + '</p></div></div></div>';

  // 6. 匹配
  html += '<div class="grid grid-cols-2 gap-3 mb-6">';
  if (bestMatchPersonality) {
    html += '<div class="match-card match-card-good animate-fadeInUp" style="animation-delay:0.65s;opacity:0"><div class="text-center"><span class="text-4xl block mb-2">' + bestMatchPersonality.emoji + '</span><p class="text-[10px] text-emerald-400/70 tracking-wider uppercase mb-1">💚 灵魂伴侣</p><p class="text-sm font-bold text-white/80">' + bestMatchPersonality.name + '</p><p class="text-[11px] text-white/35 mt-1">' + bestMatchPersonality.title + '</p></div></div>';
  }
  if (worstMatchPersonality) {
    html += '<div class="match-card match-card-bad animate-fadeInUp" style="animation-delay:0.75s;opacity:0"><div class="text-center"><span class="text-4xl block mb-2">' + worstMatchPersonality.emoji + '</span><p class="text-[10px] text-amber-400/70 tracking-wider uppercase mb-1">⚡ 需要磨合</p><p class="text-sm font-bold text-white/80">' + worstMatchPersonality.name + '</p><p class="text-[11px] text-white/35 mt-1">' + worstMatchPersonality.title + '</p></div></div>';
  }
  html += '</div>';

  // 7. TOP5
  html += '<div class="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-8 animate-fadeInUp" style="animation-delay:0.8s;opacity:0">';
  html += '<h2 class="text-sm font-bold text-white/60 mb-4 flex items-center gap-2"><span>🏆</span> 最像的5种动物</h2>';
  html += '<div class="space-y-2">';
  var rankLabels = ['👑','🥈','🥉','4','5'];
  topMatches.slice(0, 5).forEach(function(m, i) {
    html += '<div class="top-match-item ' + (i === 0 ? 'first' : '') + '">';
    html += '<span class="text-sm w-6 text-center">' + rankLabels[i] + '</span>';
    html += '<span class="text-2xl">' + m.personality.emoji + '</span>';
    html += '<div class="flex-1 min-w-0"><p class="text-sm text-white/70 truncate">' + m.personality.name + '</p></div>';
    html += '<div class="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden"><div class="h-full rounded-full transition-all duration-1000" style="width:0%;background:' + (i === 0 ? 'linear-gradient(90deg,#f43f5e,#a855f7)' : 'rgba(255,255,255,0.15)') + '" data-bar-target="' + m.matchScore + '%"></div></div>';
    html += '<span class="text-xs font-mono ' + (i === 0 ? 'text-rose-400' : 'text-white/30') + ' w-8 text-right">' + m.matchScore + '%</span>';
    html += '</div>';
  });
  html += '</div></div>';

  // 8. 按钮
  html += '<div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 animate-fadeInUp" style="animation-delay:0.85s;opacity:0">';
  html += '<button id="btn-retry" class="result-btn result-btn-secondary"><i class="fa-solid fa-rotate-right"></i> 重新体验</button>';
  html += '<button id="btn-share" class="result-btn result-btn-primary"><i class="fa-solid fa-share-nodes"></i> 分享结果</button>';
  html += '</div>';
  html += '<div class="text-center text-[11px] text-white/20 mb-6 animate-fadeIn" style="animation-delay:1s;opacity:0"><p>⚠️ 本测试仅供娱乐参考，不构成心理学诊断</p></div>';

  container.innerHTML = html;

  setTimeout(function() {
    animateMatchCounter(matchScore);
    animateMatchRing();
    drawRadarChart(r.normalizedScores);
    animateDimensionBars();
    animateTopMatchBars();
    bindResultEvents();
  }, 200);
}

// 巴纳姆效应
function generateBarnumTips(personality, dims) {
  var tips = [];
  var d1 = dims.find(function(d){return d.id==='D1';}), d2 = dims.find(function(d){return d.id==='D2';});
  var d5 = dims.find(function(d){return d.id==='D5';}), d6 = dims.find(function(d){return d.id==='D6';});

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

// 动画工具
function animateMatchCounter(target) {
  var el = $('#match-counter');
  if (!el) return;
  var start = performance.now();
  function update(now) {
    var progress = Math.min(1, (now - start) / 1500);
    var current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function animateMatchRing() {
  var ring = $('#match-ring');
  if (!ring) return;
  setTimeout(function() {
    ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
    ring.style.strokeDashoffset = ring.dataset.target;
  }, 300);
}

function drawRadarChart(scores) {
  var canvas = $('#radar-chart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  var cx = size / 2, cy = size / 2, radius = 115;
  var dims = DIMENSIONS;
  var n = dims.length;
  var step = (Math.PI * 2) / n;
  var startAngle = -Math.PI / 2;
  var animStart = performance.now();

  function draw(now) {
    var progress = Math.min(1, (now - animStart) / 1200);
    var eased = 1 - Math.pow(1 - progress, 3);
    ctx.clearRect(0, 0, size, size);

    // 网格
    for (var level = 1; level <= 4; level++) {
      var r = (radius / 4) * level;
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var angle = startAngle + step * (i % n);
        var x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,' + (level === 4 ? 0.08 : 0.04) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 轴线
    for (var i = 0; i < n; i++) {
      var angle = startAngle + step * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.stroke();
    }

    // 数据区域
    ctx.beginPath();
    for (var i = 0; i <= n; i++) {
      var idx = i % n;
      var angle = startAngle + step * idx;
      var value = (scores[dims[idx].id] || 0) / 100;
      var r = radius * value * eased;
      var x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, 'rgba(244,63,94,0.08)');
    grad.addColorStop(1, 'rgba(168,85,247,0.15)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(244,63,94,0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 数据点
    for (var i = 0; i < n; i++) {
      var angle = startAngle + step * i;
      var value = (scores[dims[i].id] || 0) / 100;
      var r = radius * value * eased;
      var x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = dims[i].color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(10,10,15,0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 标签
    for (var i = 0; i < n; i++) {
      var angle = startAngle + step * i;
      var lR = radius + 24;
      var x = cx + lR * Math.cos(angle), y = cy + lR * Math.sin(angle);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '12px "Noto Sans SC",sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(dims[i].icon + ' ' + dims[i].name, x, y);
    }

    if (progress < 1) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

function animateDimensionBars() {
  $$('.dim-bar-fill').forEach(function(bar, i) {
    setTimeout(function() { bar.style.width = bar.dataset.targetWidth; }, 400 + i * 120);
  });
}

function animateTopMatchBars() {
  $$('[data-bar-target]').forEach(function(bar, i) {
    setTimeout(function() { bar.style.width = bar.dataset.barTarget; }, 800 + i * 100);
  });
}

// 结果页事件
function bindResultEvents() {
  var retryBtn = $('#btn-retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', function() {
      state.sceneIndex = 0;
      state.choices = {};
      state.reactions = {};
      state.result = null;
      state.currentChapter = 1;
      $('#page-result').classList.add('hidden');
      $('#page-home').classList.remove('hidden');
      var footer = $('#app-footer');
      if (footer) footer.classList.remove('hidden');
      window.scrollTo({ top: 0 });
    });
  }
  var shareBtn = $('#btn-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      var p = state.result.personality;
      var text = '📖 我在「恋爱故事」中测出了【' + p.emoji + ' ' + p.name + '】—— ' + p.title + '！匹配度' + state.result.matchScore + '%\n\n快来体验你的恋爱故事吧！';
      if (navigator.share) {
        navigator.share({ title: '恋爱动物人格', text: text, url: window.location.href }).catch(function() { copyText(text); });
      } else { copyText(text); }
    });
  }
}

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() { showToast('结果已复制，快去分享吧！💕'); }).catch(function() { fallbackCopy(text); });
  } else { fallbackCopy(text); }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('结果已复制，快去分享吧！💕');
}

function showToast(msg) {
  var t = document.createElement('div');
  t.className = 'toast-msg';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function() {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.3s';
    setTimeout(function() { t.remove(); }, 300);
  }, 2500);
}

// ===== 初始化（无预加载，直接启动，确保本地双击可用） =====
function init() {
  // 初始化粒子
  var pCanvas = $('#scene-particles');
  if (pCanvas) particles = new SceneParticles(pCanvas);

  // 设置首页背景（按需加载，不阻塞）
  var homeBg = $('#home-bg');
  if (homeBg) {
    var bgUrl = SCENE_IMAGES.sunset_street;
    homeBg.style.backgroundImage = 'url(' + bgUrl + ')';
    homeBg.style.backgroundSize = 'cover';
    homeBg.style.backgroundPosition = 'center';
  }

  // 直接隐藏加载画面
  var progressBar = $('#load-progress');
  if (progressBar) progressBar.style.width = '100%';
  setTimeout(function() {
    var loader = $('#loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.8s';
      setTimeout(function() { loader.remove(); }, 800);
    }
    var footer = $('#app-footer');
    if (footer) footer.classList.remove('hidden');
  }, 600);

  // 开始按钮
  $('#btn-start').addEventListener('click', function() {
    state.sceneIndex = 0;
    state.choices = {};
    state.reactions = {};
    state.result = null;
    state.currentChapter = 1;
    $('#page-home').classList.add('hidden');
    var footer = $('#app-footer');
    if (footer) footer.classList.add('hidden');
    var scenePage = $('#page-scene');
    scenePage.classList.remove('hidden');
    playScene(0);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
