// src/services/libraryMatcher.js
import DANGERS from "../data/dangerSigns.json";
import HERBALS from "../data/herbalMedicines.json";
import NUTRITIONS from "../data/nutritionalDiets.json";
import QUESTIONS from "../data/questions.json";
import MOOD from "../data/recommendations/mood.json";
import HYDRATION from "../data/recommendations/hydration.json";
import PHYSICAL from "../data/recommendations/physical.json";
import REST from "../data/recommendations/rest.json";
import TEMPLATES from "../data/templates.json";
import {
  formatSummaryDate,
  getTrimesterFromWeek,
} from "../utils/dateFormatter";
import { calculatePregnancyWeek } from "../utils/userCalculation";
import { get } from "../utils/persistData";

const STORAGE_KEY = "summarries";

export const buildRecap = (answers, profile) => {
  const recomPain = [];
  const recomNutrition = [];
  const recomEnergy = [];

  // TODO: baru increment, perlu dibuat format 10/10
  const MAX_HEALTH_SCORE = 21;
  const MAX_NUTRITION_SCORE = 13;
  let healthScore = 0;
  let nutritionScore = 0;

  const trimester = getTrimesterFromWeek(profile.week);

  Object.keys(answers).map((key) => {
    const question = QUESTIONS.find((v) => v.id === answers[key].id);
    const category = question.category;

    answers[key].answers.map((opt) => {
      const option = question.options.find((v) => v.optionId === opt);
      console.log();

      // map answers to get recommendation
      const match = option.matches;
      console.log(match);
      let recom;
      if (match.length !== 0) {
        console.log(match);
        recom = match.map((m) => findRecom(m, trimester));
        console.log(recom);
      }

      // increment score and add recommendation list
      if (category == "pain") {
        if (recom) recomPain.push(...recom);
        healthScore += option.score;
      } else if (category == "energy") {
        if (recom) recomEnergy.push(...recom);
        healthScore += option.score;
      } else {
        if (recom) recomNutrition.push(...recom);
        nutritionScore += option.score;
      }
    });
  });

  // normalize score
  const normalizedHealthPct = Math.min(
    100,
    (healthScore / MAX_HEALTH_SCORE) * 100
  );
  const normalizedNutritionPct = Math.min(
    100,
    (nutritionScore / MAX_NUTRITION_SCORE) * 100
  );
  const finalHealthScore = Math.round(normalizedHealthPct / 10);
  const finalNutritionScore = Math.round(normalizedNutritionPct / 10);

  const currentTime = new Date();
  const status = getStatus(healthScore, nutritionScore, recomPain);
  const summary = generateSummary(answers);

  const recap = {
    id: createId(),
    date: formatSummaryDate(currentTime),
    pregnancyWeek: calculatePregnancyWeek(
      profile.registeredWeek,
      profile.registeredDate
    ),
    trimester,
    healthScore: finalHealthScore,
    nutritionScore: finalNutritionScore,
    status,
    overallCondition: {
      summary: summary.overallCondition,
      doctorAdvice: getAdvice(status),
    },
    nutritionBalance: {
      summary: summary.nutritionBalance,
      recommendations: recomNutrition,
    },
    energyControl: {
      summary: summary.energyControl,
      recommendations: recomEnergy,
    },
    painManagement: {
      summary: summary.painManagement,
      recommendations: recomPain,
    },
  };

  return recap;
};

const createId = () => {
  const data = get(STORAGE_KEY);
  const index = data ? data.length + 1 : "1";
  return `Daily CheckUp - ${index}`;
};

const generateSummary = (answers) => {
  const reportingData = {};
  const summaries = {};

  const questionMap = QUESTIONS.reduce((map, q) => {
    map[q.id] = q;
    return map;
  }, {});

  const getAnswerText = (qId) => {
    const answerData = answers[`q${qId.slice(1)}`];
    const q = questionMap[qId];

    if (!q || !answerData || answerData.answers.length === 0) {
      return "belum dilaporkan";
    }

    const selectedIds = q.allowMultiple
      ? answerData.answers
      : [answerData.answers[0]];

    const texts = selectedIds
      .map((aId) => {
        const option = q.options.find((opt) => opt.optionId === aId);
        return option ? option.text : null;
      })
      .filter(
        (text) =>
          text !== null &&
          text !== "Tidak ada keluhan" &&
          text !== "Tidak ada sama sekali"
      );

    // text length adjustment
    if (qId === "Q04")
      return texts.length > 0 ? texts.join(", ") : "makanan selain ini";
    if (texts.length === 0 && q.category === "pain") return "tidak ada"; // Jika semua keluhan NONE

    return texts.join(" & ");
  };

  // collect answers
  reportingData.q1 = getAnswerText("Q01").replace("Merasa ", "").toLowerCase();
  reportingData.q2 = getAnswerText("Q02").replace("Ada ", "").toLowerCase();
  reportingData.q3 = getAnswerText("Q03").toLowerCase();
  reportingData.q4List = getAnswerText("Q04").toLowerCase();
  reportingData.q5 = getAnswerText("Q05").toLowerCase();
  reportingData.q6 = getAnswerText("Q06")
    .toLowerCase()
    .replace("jam", "j")
    .replace("sangat buruk", "buruk");

  // handle complaints
  const q7Answers = answers.q7 ? answers.q7.answers : [];
  console.log(q7Answers, answers.q7);
  const hasQ7Complaint = q7Answers.some((aId) => aId !== "Q07_OPT_NONE");
  reportingData.q7List = hasQ7Complaint
    ? getAnswerText("Q07")
    : "tidak ada keluhan";

  reportingData.q8 = getAnswerText("Q08").toLowerCase();
  reportingData.q9 = getAnswerText("Q09").toLowerCase();
  reportingData.q10 = getAnswerText("Q10").toLowerCase().replace("terasa ", "");

  // energy control summary
  let summaryEnergy = TEMPLATES.energyControl
    .replace("{{q1}}", reportingData.q1)
    .replace("{{q2}}", reportingData.q2)
    .replace("{{q6}}", reportingData.q6);
  summaries.energyControl =
    summaryEnergy.charAt(0).toUpperCase() + summaryEnergy.slice(1); // Kapitalisasi

  // nutrition balance summary
  summaries.nutritionBalance = TEMPLATES.nutritionBalance
    .replace("{{q3}}", reportingData.q3)
    .replace("{{q4List}}", reportingData.q4List)
    .replace("{{q5}}", reportingData.q5);

  // pain balance summary
  summaries.painManagement = TEMPLATES.painManagement
    .replace("{{q7List}}", reportingData.q7List)
    .replace("{{q8}}", reportingData.q8)
    .replace("{{q9}}", reportingData.q9)
    .replace("{{q10}}", reportingData.q10);

  // overall condition summary
  summaries.overallCondition = TEMPLATES.overallCondition
    .replace("{{q1}}", reportingData.q1)
    .replace("{{q2}}", reportingData.q2)
    .replace("{{q3}}", reportingData.q3)
    .replace("{{q5}}", reportingData.q5)
    .replace("{{q7List}}", reportingData.q7List)
    .replace("{{q8}}", reportingData.q8)
    .replace("{{q9}}", reportingData.q9);

  return summaries;
};

const getStatus = (healthScore, nutritionScore, recomPain) => {
  let status;

  // calculate status
  const score = (healthScore + nutritionScore) / 2;
  if (score <= 3) {
    status = "Bahaya";
  } else if (score >= 4 && score <= 7) {
    status = "Waspada";
  } else {
    status = "Aman";
  }

  // get recommended signs
  const filterIds = recomPain.map((v) => v.id);
  const idSet = new Set(filterIds);
  const signs = DANGERS.filter((v) => idSet.has(v.id));

  // check condition
  const criticalStatus = signs.some((v) => v.severity == "critical");
  const moderateStatus = signs.some((v) => v.severity == "moderate");

  // override status
  if (criticalStatus) status = "Bahaya";
  if (moderateStatus && status == "Aman") status = "Waspada";

  return status;
};

const getAdvice = (status) => {
  const str = status.toLocaleLowerCase();

  if (str == "aman") return TEMPLATES.doctorAdvice.aman;
  if (str == "waspada") return TEMPLATES.doctorAdvice.waspada;
  if (str == "bahaya") return TEMPLATES.doctorAdvice.bahaya;
};

const getData = (type, match) => {
  let data = "";
  console.log(match);

  // find match
  if (type == "nutrition") {
    data = NUTRITIONS.find((v) => v.id == match);
  } else if (type == "herbal") {
    data = HERBALS.find((v) => v.id == match);
  } else if (type == "danger") {
    data = DANGERS.find((v) => v.id == match);
  } else if (type == "mood") {
    data = MOOD.find((v) => v.id == match);
  } else if (type == "hydration") {
    data = HYDRATION.find((v) => v.id == match);
  } else if (type == "physical") {
    data = PHYSICAL.find((v) => v.id == match);
  } else if (type == "rest") {
    data = REST.find((v) => v.id == match);
    console.log(data);
  }

  return data;
};

const findRecom = (match, trimester) => {
  let prefix = "";
  let type = "";
  console.log(match);

  // get recommandation
  if (match.startsWith("N")) {
    type = "nutrition";
    prefix = "Konsumsi ";
  } else if (match.startsWith("H")) {
    type = "herbal";
    prefix = "Minum ramuan herbal ";
  } else if (match.startsWith("D")) {
    type = "danger";
    prefix = "Pelajari penyebab ";
  } else if (match.includes("HYDRATION")) {
    type = "hydration";
  } else if (match.includes("MOOD")) {
    type = "mood";
  } else if (match.includes("PHYS")) {
    type = "physical";
  } else if (match.includes("REST")) {
    type = "rest";
  }

  console.log(type);
  const data = getData(type, match, trimester);
  console.log(data);
  // if (data.hasOwnProperty('name')) {
  //   if (!data.trimesterSafe.includes(trimester)) return null;
  // }

  const item = data.title;

  return {
    type,
    id: data.id,
    item: prefix ? prefix + item : item,
  };
};
