/**
 * 恋爱动物人格 - 沉浸式场景剧本
 * 
 * 场景类型：
 *   - narration: 自动播放的叙事（打字机效果，自动推进）
 *   - dialogue: 对话选择（NPC说话后，弹出用户回应选项）
 *   - action: 场景点击交互（场景中出现可点击热区）
 *   - transition: 场景过渡（黑屏+文字）
 * 
 * 维度映射隐藏在对话选择和场景动作中
 */

// ===== 场景背景图 =====
export const SCENE_IMAGES = {
  sunset_street: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/88c27d68-1d3e-4b24-b8c3-44be60181fb3/image_1775807111_3_3.jpg',
  convenience_store: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/f6a107e8-5f1f-4016-941f-c65f8903321c/image_1775807117_1_1.jpg',
  coffee_shop: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/e8a343ab-f3c6-448e-b557-46163d0386c4/image_1775807126_1_1.jpg',
  rainy_street: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/7aba6660-1b35-4040-9895-ad125ca7e894/image_1775807136_1_3.jpg',
  rooftop_sunset: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/1b7bd059-2697-45bf-9cf3-dca36ce52f56/image_1775807146_1_1.jpg',
  park_autumn: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/e8095e2b-ec38-4e2e-abcd-29d183c3cee8/image_1775807153_1_3.jpg',
  starry_night: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/4143eb64-8cf7-483b-8453-3b81731f2a3f/image_1775807159_1_1.jpg',
  night_store: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/652bf87f-94ab-418b-be7a-0aaa533ce96a/image_1775807119_2_3.jpg',
  cafe_interior: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/2a307573-d5cb-4123-afb5-bc1943a47bdc/image_1775807126_2_3.jpg',
  rainy_couple: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/43ff5b51-3cd2-44df-92b5-2a085fe534e1/image_1775807134_2_1.jpg',
};

// ===== 章节定义 =====
export const CHAPTERS = [
  { id: 1, title: '下班路上', subtitle: '街角的便利店', emoji: '🌆', color: '#f59e0b' },
  { id: 2, title: '偶然重逢', subtitle: '咖啡馆的午后', emoji: '☕', color: '#ec4899' },
  { id: 3, title: '暧昧时光', subtitle: '雨中的秘密', emoji: '🌧️', color: '#6366f1' },
  { id: 4, title: '心意相通', subtitle: '天台的晚风', emoji: '🌅', color: '#f43f5e' },
  { id: 5, title: '关于我们', subtitle: '星空下的答案', emoji: '✨', color: '#a855f7' },
];

// ===== 场景序列 =====
export const SCENES = [

  // ========== 第一章：下班路上 ==========
  {
    id: 'ch1_transition',
    chapter: 1,
    type: 'transition',
    text: '第一章',
    subtext: '下班路上 · 街角的便利店',
    duration: 2800,
  },
  {
    id: 'ch1_s1',
    chapter: 1,
    type: 'narration',
    bg: 'sunset_street',
    bgEffect: 'slowZoomIn',
    lines: [
      { text: '傍晚六点半，城市被染成了橘红色。', delay: 0 },
      { text: '你拖着疲惫的身体走出写字楼，', delay: 2200 },
      { text: '街道上的人群匆匆而过。', delay: 4000 },
      { text: '手机震了一下——', delay: 6000 },
      { text: '"今天也辛苦了。"', delay: 7500, style: 'italic' },
      { text: '是一条来自老朋友的消息。', delay: 9200 },
    ],
    autoDuration: 11500,
  },
  {
    id: 'ch1_s2',
    chapter: 1,
    type: 'narration',
    bg: 'convenience_store',
    bgEffect: 'panRight',
    lines: [
      { text: '你路过街角那家便利店，', delay: 0 },
      { text: '暖黄色的灯光从玻璃门里透出来。', delay: 2000 },
      { text: '门铃叮咚一声——', delay: 4000 },
    ],
    autoDuration: 5800,
  },
  {
    id: 'ch1_s3',
    chapter: 1,
    type: 'action',
    bg: 'night_store',
    bgEffect: 'none',
    prompt: '便利店里灯光温暖，你走了进去。\n货架上摆满了各种东西……你的目光被什么吸引了？',
    hotspots: [
      {
        id: 'pick_flower',
        label: '🌸 门口的一束花',
        x: 15, y: 65, w: 22, h: 20,
        scores: { D2: 18, D5: 16 },
        reaction: '你拿起那束淡粉色的花，花瓣上还沾着水珠。\n也许……可以送给谁？',
      },
      {
        id: 'pick_coffee',
        label: '☕ 热咖啡',
        x: 42, y: 45, w: 20, h: 20,
        scores: { D6: 16, D1: 14 },
        reaction: '你拿了一杯热美式。\n一个人的夜晚，一杯咖啡刚刚好。',
      },
      {
        id: 'pick_snack',
        label: '🍙 两份饭团',
        x: 68, y: 50, w: 22, h: 20,
        scores: { D3: 14, D2: 12 },
        reaction: '你习惯性地拿了两份。\n……等等，为什么是两份？',
      },
    ],
  },
  {
    id: 'ch1_s4',
    chapter: 1,
    type: 'dialogue',
    bg: 'night_store',
    bgEffect: 'none',
    speaker: '？？？',
    speakerEmoji: '😊',
    dialogueLines: [
      { text: '"好巧啊，是你！"', delay: 0 },
      { text: '一个熟悉的声音从身后传来。', delay: 1800, isNarration: true },
      { text: '你转过身——', delay: 3200, isNarration: true },
      { text: '是那个人。你们大学时候的朋友。', delay: 4500, isNarration: true },
      { text: '"好久不见了，你怎么在这？"', delay: 6200 },
    ],
    dialogueDuration: 7800,
    choices: [
      {
        text: '"天哪！真的是你！我就住附近，你呢？"',
        scores: { D2: 18, D3: 16 },
        reaction: '你的声音不自觉地提高了，惊喜溢于言表。',
      },
      {
        text: '微微一笑："嗯，好久不见。"',
        scores: { D2: 6, D6: 14 },
        reaction: '你保持着一贯的从容，但心跳确实快了半拍。',
      },
      {
        text: '"我刚下班……你还是老样子啊。"',
        scores: { D1: 14, D3: 10 },
        reaction: '你打量着对方，有些东西变了，有些没有。',
      },
      {
        text: '愣了一下，有点不知所措地挥挥手',
        scores: { D1: 6, D3: 4 },
        reaction: '你的手在空中僵了一秒。对方笑了，和记忆中一样好看。',
      },
    ],
  },
  {
    id: 'ch1_s5',
    chapter: 1,
    type: 'dialogue',
    bg: 'sunset_street',
    bgEffect: 'slowZoomOut',
    speaker: '老朋友',
    speakerEmoji: '😄',
    dialogueLines: [
      { text: '你们走出便利店，并肩走在街上。', delay: 0, isNarration: true },
      { text: '夕阳把两个人的影子拉得很长。', delay: 2000, isNarration: true },
      { text: '"最近怎么样？还是一个人吗？"', delay: 4000 },
      { text: '对方的语气很随意，但你感觉到了一丝试探。', delay: 6000, isNarration: true },
    ],
    dialogueDuration: 7800,
    choices: [
      {
        text: '"对啊，一个人挺好的，自由自在。"',
        scores: { D6: 20, D1: 16 },
        reaction: '对方看了你一眼，似乎想说什么，但只是笑了笑。',
      },
      {
        text: '"嗯……说实话，有时候还是会觉得孤单。"',
        scores: { D2: 16, D5: 14 },
        reaction: '你难得这么坦诚。对方的眼神柔和了下来。',
      },
      {
        text: '"你呢？"反问回去，不想暴露自己',
        scores: { D4: 8, D6: 12 },
        reaction: '对方被你反将一军，笑着说"我先问的你"。',
      },
      {
        text: '"还在等那个对的人出现吧。"',
        scores: { D5: 20, D3: 8 },
        reaction: '对方沉默了一瞬，然后轻声说："也许……已经出现了呢？"',
      },
    ],
  },

  // ========== 第二章：偶然重逢 ==========
  {
    id: 'ch2_transition',
    chapter: 2,
    type: 'transition',
    text: '第二章',
    subtext: '偶然重逢 · 咖啡馆的午后',
    duration: 2800,
  },
  {
    id: 'ch2_s1',
    chapter: 2,
    type: 'narration',
    bg: 'coffee_shop',
    bgEffect: 'slowZoomIn',
    lines: [
      { text: '周末的午后，你来到一家安静的咖啡馆。', delay: 0 },
      { text: '阳光透过落地窗洒进来，', delay: 2200 },
      { text: '空气中弥漫着咖啡豆的香气。', delay: 4000 },
      { text: '你刚坐下，手机就亮了——', delay: 6000 },
      { text: '"我也在这附近，要不要一起坐坐？"', delay: 7800, style: 'italic' },
      { text: '是那天便利店遇到的老朋友。', delay: 9800 },
    ],
    autoDuration: 11800,
  },
  {
    id: 'ch2_s2',
    chapter: 2,
    type: 'action',
    bg: 'cafe_interior',
    bgEffect: 'none',
    prompt: '对方来了，坐在你对面。\n桌上摆着菜单、你的手机、还有窗外的风景。\n你们之间的气氛有点微妙……',
    hotspots: [
      {
        id: 'look_window',
        label: '🪟 望向窗外',
        x: 60, y: 20, w: 30, h: 30,
        scores: { D6: 16, D5: 12 },
        reaction: '你望向窗外，阳光正好。\n"在看什么？"对方顺着你的目光看去。\n"没什么，就是觉得今天的光线很好看。"',
      },
      {
        id: 'look_person',
        label: '👀 看着对方',
        x: 35, y: 40, w: 25, h: 25,
        scores: { D2: 16, D3: 14 },
        reaction: '你认真地看着对方的脸。\n"干嘛这样看我？"对方有点不好意思。\n"就是觉得你好像变了一点，又好像没变。"',
      },
      {
        id: 'check_phone',
        label: '📱 看手机',
        x: 10, y: 60, w: 22, h: 22,
        scores: { D1: 8, D4: 6 },
        reaction: '你下意识地拿起手机。\n"嘿，我在这儿呢。"对方笑着说。\n你有点不好意思地放下了手机。',
      },
    ],
  },
  {
    id: 'ch2_s3',
    chapter: 2,
    type: 'dialogue',
    bg: 'cafe_interior',
    bgEffect: 'none',
    speaker: '老朋友',
    speakerEmoji: '🤔',
    dialogueLines: [
      { text: '咖啡端上来了，你们聊了很多。', delay: 0, isNarration: true },
      { text: '从工作聊到生活，从过去聊到现在。', delay: 2000, isNarration: true },
      { text: '突然，对方放下咖啡杯，认真地看着你：', delay: 4000, isNarration: true },
      { text: '"你有没有想过，为什么我们大学那么好，后来却断了联系？"', delay: 6000 },
    ],
    dialogueDuration: 8200,
    choices: [
      {
        text: '"大概是……我不太擅长维持关系吧。"',
        scores: { D4: 16, D2: 14 },
        reaction: '你第一次这么直接地面对这个问题。对方的眼神变得温柔。',
      },
      {
        text: '"生活太忙了，不知不觉就疏远了。"',
        scores: { D1: 14, D6: 12 },
        reaction: '对方点点头，但你知道这不是全部的原因。',
      },
      {
        text: '"也许是因为……有些感觉说不清楚。"',
        scores: { D5: 18, D2: 10 },
        reaction: '空气突然安静了。对方的手指在杯沿上轻轻划过。',
      },
      {
        text: '沉默了一会儿，轻轻摇了摇头',
        scores: { D4: 4, D1: 8 },
        reaction: '你不知道怎么回答。有些话，卡在喉咙里很久了。',
      },
    ],
  },
  {
    id: 'ch2_s4',
    chapter: 2,
    type: 'dialogue',
    bg: 'coffee_shop',
    bgEffect: 'slowZoomOut',
    speaker: '老朋友',
    speakerEmoji: '😊',
    dialogueLines: [
      { text: '咖啡馆要打烊了。', delay: 0, isNarration: true },
      { text: '你们走到门口，夕阳已经落下，街灯亮了起来。', delay: 2000, isNarration: true },
      { text: '"今天聊得很开心。"对方说。', delay: 4200, isNarration: true },
      { text: '"下次……我们去看电影吧？"', delay: 6000 },
      { text: '对方的语气像是在邀请，又像是在试探。', delay: 8000, isNarration: true },
    ],
    dialogueDuration: 9500,
    choices: [
      {
        text: '"好啊！你想看什么？我来订票。"',
        scores: { D3: 20, D2: 16 },
        reaction: '你几乎是脱口而出。对方笑了，眼睛弯成了月牙。',
      },
      {
        text: '"看电影啊……好，你选时间。"',
        scores: { D3: 10, D1: 12 },
        reaction: '你故作淡定，但回家的路上嘴角一直翘着。',
      },
      {
        text: '"再说吧，看我那天有没有空。"',
        scores: { D6: 16, D3: 4 },
        reaction: '对方的笑容淡了一瞬，但很快恢复了。你有点后悔。',
      },
      {
        text: '心跳加速，小声说了句"嗯，好"',
        scores: { D1: 8, D5: 14 },
        reaction: '你的声音小得像蚊子叫。对方凑近了一点："你说什么？"',
      },
    ],
  },

  // ========== 第三章：暧昧时光 ==========
  {
    id: 'ch3_transition',
    chapter: 3,
    type: 'transition',
    text: '第三章',
    subtext: '暧昧时光 · 雨中的秘密',
    duration: 2800,
  },
  {
    id: 'ch3_s1',
    chapter: 3,
    type: 'narration',
    bg: 'rainy_street',
    bgEffect: 'slowZoomIn',
    lines: [
      { text: '电影散场的时候，外面下起了雨。', delay: 0 },
      { text: '你们站在影院门口的屋檐下，', delay: 2200 },
      { text: '看着雨帘从天空倾泻而下。', delay: 4200 },
      { text: '你只带了一把伞。', delay: 6200 },
    ],
    autoDuration: 8200,
  },
  {
    id: 'ch3_s2',
    chapter: 3,
    type: 'action',
    bg: 'rainy_couple',
    bgEffect: 'none',
    prompt: '雨越下越大，你们需要离开这里。\n你手里握着那把伞……',
    hotspots: [
      {
        id: 'share_umbrella',
        label: '🌂 撑开伞，递向对方',
        x: 30, y: 35, w: 40, h: 25,
        scores: { D2: 18, D3: 16 },
        reaction: '"一起走吧。"\n你撑开伞，自然地倾向对方那一侧。\n雨水打湿了你的半边肩膀，但你没在意。',
      },
      {
        id: 'give_umbrella',
        label: '☂️ 把伞给对方，自己淋雨',
        x: 10, y: 55, w: 35, h: 22,
        scores: { D2: 10, D6: 8 },
        reaction: '"你打伞，我没事。"\n对方接过伞，皱着眉看你。\n"你傻啊，过来。"对方拉住了你的手臂。',
      },
      {
        id: 'run_in_rain',
        label: '🏃 拉着对方冲进雨里',
        x: 60, y: 55, w: 30, h: 22,
        scores: { D3: 20, D5: 18 },
        reaction: '"跑！"\n你抓住对方的手就冲了出去。\n雨水浇在身上，你们笑得像两个疯子。',
      },
    ],
  },
  {
    id: 'ch3_s3',
    chapter: 3,
    type: 'narration',
    bg: 'rainy_street',
    bgEffect: 'panRight',
    lines: [
      { text: '你们跑进了一家小店的屋檐下。', delay: 0 },
      { text: '两个人都有点狼狈，头发滴着水。', delay: 2200 },
      { text: '对方看着你，突然笑了出来。', delay: 4200 },
      { text: '那个笑容，像是雨天里突然出现的彩虹。', delay: 6200 },
    ],
    autoDuration: 8500,
  },
  {
    id: 'ch3_s4',
    chapter: 3,
    type: 'dialogue',
    bg: 'rainy_street',
    bgEffect: 'none',
    speaker: '老朋友',
    speakerEmoji: '😳',
    dialogueLines: [
      { text: '对方擦了擦脸上的雨水，突然安静了下来。', delay: 0, isNarration: true },
      { text: '"我跟你说个事。"', delay: 2200 },
      { text: '"其实大学的时候……我就想跟你说了。"', delay: 4200 },
      { text: '对方的声音被雨声盖住了一半。', delay: 6500, isNarration: true },
      { text: '"我一直……"', delay: 8200 },
      { text: '话说到一半，对方突然停住了，看着你的眼睛。', delay: 9800, isNarration: true },
    ],
    dialogueDuration: 11500,
    choices: [
      {
        text: '心跳到了嗓子眼，但你直视着对方的眼睛，等着下文',
        scores: { D4: 18, D1: 14 },
        reaction: '你没有躲开。雨声很大，但你能听到自己的心跳。',
      },
      {
        text: '"我知道。"你轻声说，"我也是。"',
        scores: { D2: 20, D3: 18 },
        reaction: '对方愣住了。然后，嘴角慢慢弯了起来。',
      },
      {
        text: '紧张地移开目光，假装看雨',
        scores: { D1: 6, D4: 4 },
        reaction: '你不敢看对方的眼睛。雨水模糊了视线，也模糊了那些说不出口的话。',
      },
      {
        text: '"别说了……我们先找个地方避雨吧。"',
        scores: { D4: 8, D6: 14 },
        reaction: '你岔开了话题。对方沉默了一会儿，轻轻"嗯"了一声。',
      },
    ],
  },

  // ========== 第四章：心意相通 ==========
  {
    id: 'ch4_transition',
    chapter: 4,
    type: 'transition',
    text: '第四章',
    subtext: '心意相通 · 天台的晚风',
    duration: 2800,
  },
  {
    id: 'ch4_s1',
    chapter: 4,
    type: 'narration',
    bg: 'rooftop_sunset',
    bgEffect: 'slowZoomIn',
    lines: [
      { text: '那天之后，你们的关系变得不一样了。', delay: 0 },
      { text: '不再只是"老朋友"，但也还没有一个明确的名字。', delay: 2500 },
      { text: '今天，对方约你去天台看日落。', delay: 5000 },
      { text: '城市的轮廓在夕阳下镀上了一层金边。', delay: 7200 },
    ],
    autoDuration: 9500,
  },
  {
    id: 'ch4_s2',
    chapter: 4,
    type: 'action',
    bg: 'rooftop_sunset',
    bgEffect: 'none',
    prompt: '天台上只有你们两个人。\n晚风吹过，带来远处的城市声响。\n对方站在栏杆旁，背对着你……',
    hotspots: [
      {
        id: 'stand_beside',
        label: '🚶 走到对方身边',
        x: 35, y: 30, w: 30, h: 30,
        scores: { D3: 16, D2: 14 },
        reaction: '你走过去，和对方并肩站着。\n肩膀几乎贴在一起，你能感觉到对方的体温。',
      },
      {
        id: 'stay_back',
        label: '🧍 站在原地看着',
        x: 10, y: 50, w: 25, h: 25,
        scores: { D6: 16, D1: 10 },
        reaction: '你站在几步之外，看着对方的背影。\n夕阳把对方的轮廓勾勒得很好看。',
      },
      {
        id: 'take_photo',
        label: '📸 偷偷拍一张照片',
        x: 65, y: 50, w: 25, h: 25,
        scores: { D5: 16, D2: 8 },
        reaction: '你悄悄举起手机，按下快门。\n逆光中的对方，像一幅画。\n你把这张照片设成了壁纸。',
      },
    ],
  },
  {
    id: 'ch4_s3',
    chapter: 4,
    type: 'dialogue',
    bg: 'rooftop_sunset',
    bgEffect: 'slowZoomOut',
    speaker: '老朋友',
    speakerEmoji: '🥺',
    dialogueLines: [
      { text: '太阳快要落下去了。', delay: 0, isNarration: true },
      { text: '天边的云被染成了玫瑰色。', delay: 2000, isNarration: true },
      { text: '"你说……"对方的声音很轻。', delay: 4000, isNarration: true },
      { text: '"如果两个人之间有了那种感觉，应该说出来吗？"', delay: 6000 },
      { text: '"还是……就这样保持现在的关系比较好？"', delay: 8500 },
    ],
    dialogueDuration: 10500,
    choices: [
      {
        text: '"当然要说出来。错过了就没有了。"',
        scores: { D4: 20, D3: 18 },
        reaction: '你的声音很坚定。对方转过头来，眼睛里映着最后一缕阳光。',
      },
      {
        text: '"要看时机吧……有些话说早了，反而会吓到对方。"',
        scores: { D4: 12, D1: 14 },
        reaction: '对方若有所思地点了点头。你在想，现在算不算一个好时机。',
      },
      {
        text: '"不说出来的话，对方怎么知道呢？"看着对方的眼睛',
        scores: { D2: 18, D4: 16 },
        reaction: '你们对视了三秒。那三秒里，好像什么都说了，又好像什么都没说。',
      },
      {
        text: '"我觉得……有些感觉不需要说，对方能感受到的。"',
        scores: { D2: 6, D5: 12 },
        reaction: '对方笑了，但笑容里有一丝无奈。"可是我感受不到啊。"',
      },
    ],
  },
  {
    id: 'ch4_s4',
    chapter: 4,
    type: 'dialogue',
    bg: 'rooftop_sunset',
    bgEffect: 'none',
    speaker: '老朋友',
    speakerEmoji: '💕',
    dialogueLines: [
      { text: '最后一缕阳光消失在地平线。', delay: 0, isNarration: true },
      { text: '城市的灯光一盏一盏亮起来。', delay: 2200, isNarration: true },
      { text: '对方深吸一口气，转向你：', delay: 4200, isNarration: true },
      { text: '"其实我今天约你来，是想告诉你——"', delay: 6000 },
      { text: '"我喜欢你。不是朋友那种喜欢。"', delay: 8200 },
      { text: '风停了。世界好像只剩下你们两个人。', delay: 10500, isNarration: true },
    ],
    dialogueDuration: 12500,
    choices: [
      {
        text: '心脏快要跳出来了，但你笑着说："我也是。等你这句话很久了。"',
        scores: { D2: 20, D1: 18 },
        reaction: '对方的眼眶红了。你伸出手，对方紧紧握住。',
      },
      {
        text: '沉默了很久，然后轻轻把头靠在对方肩上',
        scores: { D2: 12, D4: 8 },
        reaction: '你没有说话，但你的动作已经说明了一切。对方的手轻轻搭上了你的肩。',
      },
      {
        text: '"我……需要一点时间想想。但我不想失去你。"',
        scores: { D1: 10, D6: 16 },
        reaction: '对方点了点头，没有追问。你们就这样安静地站着，看着城市的灯火。',
      },
      {
        text: '眼泪突然就掉了下来："你知道我等这句话等了多久吗？"',
        scores: { D5: 20, D2: 18 },
        reaction: '对方慌了，手忙脚乱地帮你擦眼泪。你破涕为笑，觉得这一刻比任何电影都浪漫。',
      },
    ],
  },

  // ========== 第五章：关于我们 ==========
  {
    id: 'ch5_transition',
    chapter: 5,
    type: 'transition',
    text: '第五章',
    subtext: '关于我们 · 星空下的答案',
    duration: 2800,
  },
  {
    id: 'ch5_s1',
    chapter: 5,
    type: 'narration',
    bg: 'park_autumn',
    bgEffect: 'panRight',
    lines: [
      { text: '在一起之后的日子，像秋天的阳光一样温暖。', delay: 0 },
      { text: '你们一起逛公园、一起做饭、一起加班到深夜。', delay: 2500 },
      { text: '但生活不只有甜蜜——', delay: 5000 },
      { text: '第一次争吵，来得猝不及防。', delay: 7000 },
    ],
    autoDuration: 9200,
  },
  {
    id: 'ch5_s2',
    chapter: 5,
    type: 'dialogue',
    bg: 'cafe_interior',
    bgEffect: 'none',
    speaker: '恋人',
    speakerEmoji: '😤',
    dialogueLines: [
      { text: '"你总是这样，什么都不说！"', delay: 0 },
      { text: '对方的声音带着委屈和愤怒。', delay: 2000, isNarration: true },
      { text: '"我不是不说，我只是需要时间想清楚……"', delay: 4000, isNarration: true, isProtagonist: true },
      { text: '"每次都是这个理由！你到底在不在乎这段关系？"', delay: 6500 },
      { text: '咖啡杯里的拿铁已经凉了。', delay: 8500, isNarration: true },
    ],
    dialogueDuration: 10000,
    choices: [
      {
        text: '深呼吸，认真地说："对不起，我在乎。我们好好谈谈。"',
        scores: { D4: 22, D2: 14 },
        reaction: '你放下了防备。对方的眼神从愤怒变成了心疼。',
      },
      {
        text: '"你能不能别这么激动？冷静下来再说。"',
        scores: { D4: 14, D6: 16 },
        reaction: '对方沉默了。你知道这不是最好的回应，但你真的需要空间。',
      },
      {
        text: '握住对方的手："我知道你在生气，但我真的不是故意的。"',
        scores: { D2: 16, D1: 14 },
        reaction: '对方的手在你掌心里微微颤抖。愤怒在慢慢消退。',
      },
      {
        text: '低下头，不知道该说什么',
        scores: { D4: 4, D1: 6 },
        reaction: '沉默蔓延开来。你想说很多，但一个字都说不出口。',
      },
    ],
  },
  {
    id: 'ch5_s3',
    chapter: 5,
    type: 'narration',
    bg: 'starry_night',
    bgEffect: 'slowZoomIn',
    lines: [
      { text: '那天晚上，你们和好了。', delay: 0 },
      { text: '你躺在床上，看着天花板，想了很多。', delay: 2500 },
      { text: '关于爱情，关于自己，关于未来。', delay: 5000 },
      { text: '窗外的星星很亮。', delay: 7200 },
    ],
    autoDuration: 9200,
  },
  {
    id: 'ch5_s4',
    chapter: 5,
    type: 'action',
    bg: 'starry_night',
    bgEffect: 'none',
    prompt: '夜深了，你一个人站在窗前。\n星空很美，你的心里有很多话想说……\n如果可以对星星许一个关于爱情的愿望——',
    hotspots: [
      {
        id: 'wish_together',
        label: '💑 希望我们能一直在一起',
        x: 15, y: 20, w: 30, h: 25,
        scores: { D5: 16, D6: 4 },
        reaction: '你闭上眼睛，在心里默默许愿。\n"请让我们一直走下去。"',
      },
      {
        id: 'wish_brave',
        label: '💪 希望我能更勇敢地去爱',
        x: 55, y: 20, w: 30, h: 25,
        scores: { D4: 18, D1: 12 },
        reaction: '你知道自己还有很多不足。\n但你愿意为了这个人，变得更好。',
      },
      {
        id: 'wish_balance',
        label: '⚖️ 希望我们都能做自己',
        x: 35, y: 55, w: 30, h: 25,
        scores: { D6: 20, D1: 16 },
        reaction: '爱情不是失去自己，而是找到另一个自己。\n你希望你们都能在爱里自由呼吸。',
      },
    ],
  },
  {
    id: 'ch5_s5',
    chapter: 5,
    type: 'dialogue',
    bg: 'starry_night',
    bgEffect: 'slowZoomOut',
    speaker: '内心独白',
    speakerEmoji: '💭',
    dialogueLines: [
      { text: '故事还在继续。', delay: 0, isNarration: true },
      { text: '你不知道未来会怎样，', delay: 2000, isNarration: true },
      { text: '但此刻，你想问自己最后一个问题——', delay: 4000, isNarration: true },
      { text: '"对你来说，爱情最重要的是什么？"', delay: 6500 },
    ],
    dialogueDuration: 8500,
    choices: [
      {
        text: '"是那个人让我觉得，做自己就很好。"',
        scores: { D1: 20, D6: 18 },
        reaction: '你笑了。原来答案一直都在心里。',
      },
      {
        text: '"是即使吵架了，也愿意回头的勇气。"',
        scores: { D4: 20, D2: 14 },
        reaction: '爱不是永远不吵架，而是吵完了还想在一起。',
      },
      {
        text: '"是两个人一起，把平凡的日子过成诗。"',
        scores: { D5: 18, D2: 16 },
        reaction: '不需要轰轰烈烈，只要有你在身边。',
      },
      {
        text: '"是我可以脆弱，你不会离开。"',
        scores: { D1: 8, D4: 12 },
        reaction: '你终于承认了自己的脆弱。而这，恰恰是最勇敢的事。',
      },
    ],
  },
  {
    id: 'ch5_ending',
    chapter: 5,
    type: 'narration',
    bg: 'starry_night',
    bgEffect: 'slowZoomOut',
    lines: [
      { text: '星光洒在你的脸上。', delay: 0 },
      { text: '这个故事，是你写的。', delay: 2500 },
      { text: '每一个选择，每一次心动，每一个犹豫——', delay: 4500 },
      { text: '都是真实的你。', delay: 7000 },
      { text: '现在，让我们看看……', delay: 9000 },
      { text: '在爱情的世界里，你是什么样的存在？', delay: 11000, style: 'highlight' },
    ],
    autoDuration: 13500,
    isEnding: true,
  },
];

/** 获取所有收集维度的场景（dialogue + action） */
export function getCollectionScenes() {
  return SCENES.filter(s => s.type === 'dialogue' || s.type === 'action');
}

/** 获取某章节的场景 */
export function getChapterScenes(chapterId) {
  return SCENES.filter(s => s.chapter === chapterId);
}
