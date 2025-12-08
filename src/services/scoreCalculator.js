import QUESTIONS from "../data/questions.json";
import { getTrimesterFromWeek } from "../utils/dateFormatter";

const CATEGORY_WEIGHTS = {
  pain: 3,
  nutrition: 2,
  energy: 1,
};

function mapOptionValue(rawScore) {
  if (rawScore === 3) return 2;
  if (rawScore === 2) return 1;
  if (rawScore === 1) return 0;
  return -2;
}

// Apply personalization adjustments based on age & trimester & specific answers
function personalizationAdjustments(answers = {}, userProfile = {}) {
  let healthAdj = 0;
  let nutritionAdj = 0;

  const age = userProfile.age || null;
  const week = userProfile.currentWeek || userProfile.startWeek || 0;
  const trimester = getTrimesterFromWeek(week);

  // Age modifier (high risk)
  const highRiskAge = age !== null && (age < 18 || age > 35);
  if (highRiskAge) {
    // if any poor answer (score <= 1) -> -2, else -1
    const anyPoor = Object.entries(answers).some(([qid, aid]) => {
      const q = QUESTIONS.find((x) => x.id === qid);
      if (!q) return false;
      const a = q.answers.find((x) => x.id === aid);
      const raw = a ? a.score : 1;
      return raw <= 1;
    });
    healthAdj += anyPoor ? -2 : -1;
  }

  // Per-question trimester-sensitive adjustments
  for (const q of QUESTIONS) {
    const selectedId = answers[q.id];
    const answer = q.answers.find((a) => a.id === selectedId);
    const raw = answer ? answer.score : 1;

    // bleeding / fluid (q9)
    if (q.id === "q9") {
      if (raw <= 1) {
        healthAdj += trimester === 3 ? -3 : -2;
      }
    }

    // fetal movement (q10)
    if (q.id === "q10") {
      if ((week || 0) >= 20) {
        if (raw === 0) healthAdj += -3;
        else if (raw === 1) healthAdj += -2;
      } else {
        // before 18-20 weeks, no movement is expected - do nothing
      }
    }

    // swelling (q8)
    if (q.id === "q8") {
      if (raw === 0) healthAdj += trimester === 3 ? -3 : -2;
      else if (raw === 2) healthAdj += -1;
    }

    // sleep (q6)
    if (q.id === "q6") {
      if (raw <= 1) healthAdj += trimester === 3 ? -2 : -1;
    }

    // nutrition-specific extra penalty in T1 if very poor (q3/q4/q5)
    if (q.category.includes("nutrition")) {
      if (raw === 0 && trimester === 1) nutritionAdj += -2;
    }

    // general symptom (q7)
    if (q.id === "q7") {
      if (raw <= 1) healthAdj += trimester === 3 ? -2 : -1;
    }
  }

  return { healthAdj, nutritionAdj };
}

export function computeScores({ answers = {}, userProfile = {} } = {}) {
  let healthRaw = 0;
  let healthWeightTotal = 0;
  let nutritionRaw = 0;
  let nutritionWeightTotal = 0;

  let healthMin = 0;
  let healthMax = 0;
  let nutritionMin = 0;
  let nutritionMax = 0;

  for (const q of QUESTIONS) {
    const selectedId = answers[q.id];
    const answerObj = q.answers.find((a) => a.id === selectedId);
    const rawScore = answerObj ? answerObj.score : 1;
    const val = mapOptionValue(rawScore);

    for (const cat of q.category) {
      const weight = CATEGORY_WEIGHTS[cat] || 0;
      if (!weight) continue;
      if (cat === "nutrition") {
        nutritionRaw += val * weight;
        nutritionMin += -2 * weight;
        nutritionMax += 2 * weight;
        nutritionWeightTotal += weight;
      } else {
        healthRaw += val * weight;
        healthMin += -2 * weight;
        healthMax += 2 * weight;
        healthWeightTotal += weight;
      }
    }
  }

  // ensure non-zero totals
  if (healthWeightTotal === 0) {
    healthWeightTotal = 1;
    healthMin = -2;
    healthMax = 2;
  }
  if (nutritionWeightTotal === 0) {
    nutritionWeightTotal = 1;
    nutritionMin = -2;
    nutritionMax = 2;
  }

  // personalization adjustments
  const { healthAdj, nutritionAdj } = personalizationAdjustments(
    answers,
    userProfile
  );

  const finalHealthRaw = healthRaw + healthAdj;
  const finalNutritionRaw = nutritionRaw + nutritionAdj;

  function normalize(raw, min, max) {
    if (max === min) return 5;
    const scaled = ((raw - min) / (max - min)) * 10;
    return Math.round(Math.max(0, Math.min(10, scaled)));
  }

  const healthScore = normalize(finalHealthRaw, healthMin, healthMax);
  const nutritionScore = normalize(
    finalNutritionRaw,
    nutritionMin,
    nutritionMax
  );

  return {
    healthScore,
    nutritionScore,
    raw: {
      finalHealthRaw,
      finalNutritionRaw,
      healthAdj,
      nutritionAdj,
    },
  };
}
