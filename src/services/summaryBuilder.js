import TEMPLATES from "../data/templates.json";
import { matchAll } from "./libraryMatcher";
import { computeScores } from "./scoreCalculator";
import { formatISODate, getTrimesterFromWeek } from "../utils/dateFormatter";
import DANGERS from "../data/dangerSigns.json";

function getDangerDetailsByIds(ids = []) {
  return ids.map((id) => DANGERS.find((d) => d.id === id)).filter(Boolean);
}
function scoreToPercent(score) {
  return Math.round((score / 10) * 100);
}

function determineOverallStatus(healthScore, nutritionScore, dangerIds = []) {
  const hp = scoreToPercent(healthScore);
  const np = scoreToPercent(nutritionScore);

  // any critical danger -> Bad
  if (dangerIds && dangerIds.length) {
    const critical = getDangerDetailsByIds(dangerIds).some(
      (d) => d.severity === "critical"
    );
    if (critical) return "Bad";
  }

  if (hp >= 75 && np >= 75) return "Good";
  if (hp < 40 || np < 40) return "Bad";
  return "Warning";
}

function buildDoctorAdvice(dangerIds = [], overallStatus) {
  if (!dangerIds || dangerIds.length === 0) {
    if (overallStatus === "Bad") {
      return {
        urgency: "24h",
        message:
          "Nilai menunjukkan kondisi yang perlu penanganan — hubungi fasilitas kesehatan dalam 24 jam.",
      };
    } else if (overallStatus === "Warning") {
      return {
        urgency: "3-7d",
        message:
          "Pantau kondisi; konsultasikan dalam 3-7 hari jika tidak membaik.",
      };
    }
    return null;
  }

  const details = getDangerDetailsByIds(dangerIds);
  const urgent = details.some((d) => d.severity === "critical");
  if (urgent)
    return {
      urgency: "immediate",
      message: "Terdapat tanda bahaya. Segera ke fasilitas kesehatan.",
    };
  return {
    urgency: "24h",
    message: "Ada tanda yang perlu diperiksa. Hubungi nakes dalam 24 jam.",
  };
}

function bandFromScore(score, templateKey) {
  const pct = scoreToPercent(score);
  if (pct >= 75) return { band: "good", text: TEMPLATES[templateKey].good };
  if (pct >= 40)
    return { band: "warning", text: TEMPLATES[templateKey].warning };
  return { band: "bad", text: TEMPLATES[templateKey].bad };
}

export function buildSummary({ answers = {}, userProfile = {} } = {}) {
  const today = formatISODate(new Date());
  const week = userProfile.currentWeek || userProfile.startWeek || 0;
  const trimester = getTrimesterFromWeek(week);

  // scores (with personalization)
  const { healthScore, nutritionScore } = computeScores({
    answers,
    userProfile,
  });

  // matches (library)
  const matches = matchAll({ answers, userProfile });

  // collect danger ids
  const dangerIds = matches.dangerSigns || [];

  // overall status & doctor advice
  const overallStatus = determineOverallStatus(
    healthScore,
    nutritionScore,
    dangerIds
  );
  const doctorAdvice = buildDoctorAdvice(dangerIds, overallStatus);

  // sections
  const condition = bandFromScore(healthScore, "overallCondition");
  const nutrition = bandFromScore(nutritionScore, "nutritionBalance");
  const energy = bandFromScore(healthScore, "energyControl"); // health influences rest band
  const pain = bandFromScore(healthScore, "painManagement");

  // build item recommendations for nutrition/herbal based on raw matches
  const recFoods = ((matches.raw && matches.raw.nutritionMatches) || [])
    .slice(0, 3)
    .map((i) => ({
      type: "food",
      id: i.id,
      title: i.title,
      reason: "Direkomendasikan berdasarkan kebutuhan nutrisi",
    }));
  const recHerb = ((matches.raw && matches.raw.herbalMatches) || [])
    .slice(0, 2)
    .map((i) => ({
      type: "herbal",
      id: i.id,
      title: i.title,
      reason: "Herbal yang relevan",
    }));

  const warningItems = getDangerDetailsByIds(dangerIds).map((d) => ({
    id: d.id,
    title: d.title,
    urgency: d.severity === "critical" ? "immediate" : "24h",
    advice: d.urgency,
  }));

  const final = {
    id: today,
    date: today,
    pregnancyWeek: week,
    trimester,
    healthScore,
    nutritionScore,
    overallStatus,
    overallCondition: {
      summary: condition.text,
      explanation: `Ringkasan berdasarkan condition fisik dan gerakan janin; usia kehamilan: minggu ke-${week}, trimester ${trimester}.`,
      doctorAdvice,
    },
    nutritionBalance: {
      summary: nutrition.text,
      recommendations: [...recFoods, ...recHerb],
    },
    energyControl: {
      summary: energy.text,
      recommendations:
        energy.band === "good"
          ? []
          : [
              "Tidur lebih awal",
              "Power nap 20 menit",
              "Teknik relaksasi pernapasan",
            ],
    },
    painManagement: {
      summary: pain.text,
      warnings: warningItems,
    },
    libraryMatches: {
      dangerSigns: matches.dangerSigns,
      herbals: matches.herbals,
      nutrition: matches.nutrition,
    },
  };

  return final;
}
