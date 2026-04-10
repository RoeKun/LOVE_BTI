/**
 * 恋爱动物人格测试 - 评分引擎
 * 
 * 核心算法：
 * 1. 收集用户每道题的选择，累加各维度原始分
 * 2. 将原始分归一化到 0-100 区间
 * 3. 计算用户得分向量与每种人格理想向量的欧氏距离
 * 4. 距离最小的即为最佳匹配人格
 */

import { QUESTIONS, DIMENSIONS, PERSONALITIES, getPersonalityById } from './data.js';

/**
 * 计算各维度的理论最高分和最低分
 * 用于后续归一化
 */
function calculateDimensionRanges() {
  const ranges = {};
  DIMENSIONS.forEach(d => {
    ranges[d.id] = { min: 0, max: 0 };
  });

  QUESTIONS.forEach(q => {
    q.dimensions.forEach(dimId => {
      let minScore = Infinity;
      let maxScore = -Infinity;
      q.options.forEach(opt => {
        const score = opt.scores[dimId] || 0;
        if (score < minScore) minScore = score;
        if (score > maxScore) maxScore = score;
      });
      ranges[dimId].min += minScore;
      ranges[dimId].max += maxScore;
    });
  });

  return ranges;
}

// 预计算维度范围
const DIMENSION_RANGES = calculateDimensionRanges();

/**
 * 根据用户的答案计算各维度原始分
 * @param {Array<number>} answers - 用户选择的选项索引数组，长度等于题目数
 * @returns {Object} 各维度的原始分 { D1: number, D2: number, ... }
 */
export function calculateRawScores(answers) {
  const rawScores = {};
  DIMENSIONS.forEach(d => {
    rawScores[d.id] = 0;
  });

  answers.forEach((optionIndex, questionIndex) => {
    if (optionIndex < 0 || questionIndex >= QUESTIONS.length) return;
    const question = QUESTIONS[questionIndex];
    const option = question.options[optionIndex];
    if (!option) return;

    Object.entries(option.scores).forEach(([dimId, score]) => {
      rawScores[dimId] = (rawScores[dimId] || 0) + score;
    });
  });

  return rawScores;
}

/**
 * 将原始分归一化到 0-100 区间
 * 使用线性映射：normalized = (raw - min) / (max - min) * 100
 * @param {Object} rawScores - 各维度原始分
 * @returns {Object} 各维度归一化分数 (0-100)
 */
export function normalizeScores(rawScores) {
  const normalized = {};

  DIMENSIONS.forEach(d => {
    const range = DIMENSION_RANGES[d.id];
    const raw = rawScores[d.id] || 0;
    const span = range.max - range.min;

    if (span === 0) {
      normalized[d.id] = 50;
    } else {
      // 线性归一化到 0-100
      let score = ((raw - range.min) / span) * 100;
      // 限制在 0-100 范围内
      score = Math.max(0, Math.min(100, score));
      normalized[d.id] = Math.round(score);
    }
  });

  return normalized;
}

/**
 * 计算两个向量之间的加权欧氏距离
 * @param {Object} vectorA - 向量A { D1: number, ... }
 * @param {Object} vectorB - 向量B { D1: number, ... }
 * @param {Object} weights - 各维度权重（可选）
 * @returns {number} 欧氏距离
 */
function weightedEuclideanDistance(vectorA, vectorB, weights = null) {
  let sumSquared = 0;

  DIMENSIONS.forEach(d => {
    const a = vectorA[d.id] || 0;
    const b = vectorB[d.id] || 0;
    const w = weights ? (weights[d.id] || 1) : 1;
    sumSquared += w * Math.pow(a - b, 2);
  });

  return Math.sqrt(sumSquared);
}

/**
 * 匹配最佳人格
 * @param {Object} normalizedScores - 归一化后的维度分数
 * @returns {Object} 匹配结果 { personality, matchScore, allMatches }
 */
export function matchPersonality(normalizedScores) {
  const matches = PERSONALITIES.map(p => {
    const distance = weightedEuclideanDistance(normalizedScores, p.profile);
    // 将距离转换为匹配度百分比（0-100）
    // 最大可能距离约为 sqrt(6 * 100^2) ≈ 245
    const maxDistance = Math.sqrt(DIMENSIONS.length * 10000);
    const matchScore = Math.max(0, Math.round((1 - distance / maxDistance) * 100));

    return {
      personality: p,
      distance,
      matchScore
    };
  });

  // 按距离排序（距离越小越匹配）
  matches.sort((a, b) => a.distance - b.distance);

  return {
    personality: matches[0].personality,
    matchScore: matches[0].matchScore,
    allMatches: matches
  };
}

/**
 * 完整的评分流程
 * @param {Array<number>} answers - 用户答案数组
 * @returns {Object} 完整结果
 */
export function evaluateTest(answers) {
  // 1. 计算原始分
  const rawScores = calculateRawScores(answers);

  // 2. 归一化
  const normalizedScores = normalizeScores(rawScores);

  // 3. 匹配人格
  const matchResult = matchPersonality(normalizedScores);

  // 4. 生成维度解读
  const dimensionAnalysis = DIMENSIONS.map(d => {
    const score = normalizedScores[d.id];
    let level, label;
    if (score >= 75) {
      level = 'high';
      label = d.labelHigh;
    } else if (score >= 50) {
      level = 'mid-high';
      label = `偏${d.labelHigh}`;
    } else if (score >= 25) {
      level = 'mid-low';
      label = `偏${d.labelLow}`;
    } else {
      level = 'low';
      label = d.labelLow;
    }

    return {
      ...d,
      score,
      level,
      label
    };
  });

  // 5. 获取最佳匹配和最差匹配的详细信息
  const bestMatchPersonality = getPersonalityById(matchResult.personality.bestMatch);
  const worstMatchPersonality = getPersonalityById(matchResult.personality.worstMatch);

  return {
    rawScores,
    normalizedScores,
    personality: matchResult.personality,
    matchScore: matchResult.matchScore,
    topMatches: matchResult.allMatches.slice(0, 5),
    dimensionAnalysis,
    bestMatchPersonality,
    worstMatchPersonality
  };
}
