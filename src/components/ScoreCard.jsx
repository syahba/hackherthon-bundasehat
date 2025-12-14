function ScoreCard({ summary }) {
  return (
    <div className="flex gap-5">
      <div className="primary pt-2 pb-4 px-4 rounded-xl shadow-lg flex flex-col items-start justify-center gap-2">
        <h3 className="heading p1 text-white text-start">Skor Kesehatan</h3>

        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full px-1.5 py-1 outline-[var(--secondary)] outline-1">
            <img src="/hackherthon-bundasehat/health-score.svg" alt="icon" className="w-6" />
          </div>

          <h1 className="heading h1 text-white">{summary.healthScore}/10</h1>
        </div>
      </div>

      <div className="primary pt-2 pb-4 px-4 rounded-xl shadow-lg flex flex-col items-start justify-center gap-2">
        <h3 className="heading p1 text-white text-start">Skor Kesehatan</h3>

        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full px-1 pb-1 outline-[var(--secondary)] outline-1">
            <img src="/hackherthon-bundasehat/nutrition-score.svg" alt="icon" className="w-6 m-1" />
          </div>

          <h1 className="heading h1 text-white">{summary.nutritionScore}/10</h1>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
