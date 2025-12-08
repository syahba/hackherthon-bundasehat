import { useState } from "react";
import { buildSummary } from "../services/summaryBuilder";
import { saveSummary, loadSummaries } from "../utils/saveSummary";

export default function useDailyCheckup() {
  const [loading, setLoading] = useState(false);

  async function finishCheckup({ answers, userProfile }) {
    setLoading(true);
    try {
      const summary = buildSummary({ answers, userProfile });
      saveSummary(summary); // only summary, no streak or week update here
      setLoading(false);
      return summary;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  function getTodaySummary() {
    const today = new Date().toISOString().slice(0, 10);
    return loadSummaries().find((s) => s.date === today) || null;
  }

  return { loading, finishCheckup, getTodaySummary };
}
