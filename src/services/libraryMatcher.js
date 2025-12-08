// src/services/libraryMatcher.js
import DANGERS from "../data/dangerSigns.json";
import HERBALS from "../data/herbalMedicine.json";
import NUTRITIONS from "../data/nutritionalDiet.json";
import QUESTIONS from "../data/questions.json";
import { getTrimesterFromWeek } from "../utils/dateFormatter";

/** collect keywords from selected answers (supports multi-select answers) */
function collectKeywordsFromAnswers(answers = {}) {
  const kws = [];
  for (const q of QUESTIONS) {
    const selected = answers[q.id];
    if (!selected) continue;

    // allowMultiple -> selected can be array of option indices/texts/ids
    if (Array.isArray(selected)) {
      for (const sel of selected) {
        const matchOpt = q.options.find(
          (o) => o.text === sel || o.id === sel || o.value === sel
        );
        const label = matchOpt ? matchOpt.text : sel;
        if (label) {
          kws.push(
            ...label
              .toLowerCase()
              .split(/[^a-z0-9\u00C0-\u017F]+/)
              .filter(Boolean)
          );
        }
      }
    } else {
      const matchOpt = q.options.find(
        (o) => o.text === selected || o.id === selected || o.value === selected
      );
      const label = matchOpt ? matchOpt.text : selected;
      if (label) {
        kws.push(
          ...label
            .toLowerCase()
            .split(/[^a-z0-9\u00C0-\u017F]+/)
            .filter(Boolean)
        );
      }
    }
  }
  return Array.from(new Set(kws));
}

/** match by keyword overlap and filter by trimester & age (motherAge) */
function matchLibrary(items = [], keywords = [], trimester = 2, age = null) {
  const kwSet = new Set(keywords.map((k) => k.toLowerCase()));
  const candidates = [];

  for (const it of items) {
    if (it.trimester_safe && !it.trimester_safe.includes(trimester)) continue;
    if (it.min_age && age !== null && age < it.min_age) continue;
    if (it.max_age && age !== null && age > it.max_age) continue;

    const matches = (it.matches || []).map((m) => m.toLowerCase());
    const common = matches.filter((m) => kwSet.has(m));
    if (common.length > 0) {
      candidates.push({ item: it, score: common.length });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.map((c) => c.item);
}

/**
 * matchAll({ answers, userProfile })
 * returns { dangerSigns: [ids], herbals: [ids], nutrition: [ids], raw: {...} }
 */
export function matchAll({ answers = {}, userProfile = {} } = {}) {
  const keywords = collectKeywordsFromAnswers(answers);
  const week = userProfile.currentWeek ?? userProfile.registeredWeek ?? 0;
  const trimester = getTrimesterFromWeek(week);
  const age = userProfile.motherAge ?? null;

  const dangerMatches = matchLibrary(DANGERS, keywords, trimester, age);
  const herbalMatches = matchLibrary(HERBALS, keywords, trimester, age);
  const nutritionMatches = matchLibrary(NUTRITIONS, keywords, trimester, age);

  return {
    dangerSigns: dangerMatches.slice(0, 5).map((i) => i.id),
    herbals: herbalMatches.slice(0, 4).map((i) => i.id),
    nutrition: nutritionMatches.slice(0, 4).map((i) => i.id),
    raw: {
      dangerMatches,
      herbalMatches,
      nutritionMatches,
    },
  };
}
