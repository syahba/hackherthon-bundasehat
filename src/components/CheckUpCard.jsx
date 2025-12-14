function CheckUpCard({
  title,
  date,
  healthScore,
  nutritionScore,
  status,
  onClick,
}) {
  let bgColor;
  let outlineColor;
  let img;

  if (status == "Aman") {
    bgColor = "bg-[#C6E4D5]";
    outlineColor = "outline-[#0DB561]";
    img = "/aman.svg";
  } else if (status == "Waspada") {
    bgColor = "bg-[#FFF9DF]";
    outlineColor = "outline-[#FFB300]";
    img = "/waspada.svg";
  } else {
    bgColor = "bg-[#FFC9C9]";
    outlineColor = "outline-[#BC0C0C]";
    img = "/bahaya.svg";
  }

  return (
    <button
      onClick={onClick}
      className="flex primary justify-between items-center pt-2 pb-4 px-4 rounded-lg cursor-pointer shadow-lg hover:scale-105 transition-all duration-300"
    >
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="text-white text-start">
          <h3 className="h3 heading">{title}</h3>
          <p className="c paragraph">{date}</p>
        </div>

        <div
          className={`${bgColor} outline-1 ${outlineColor} neutral flex items-center justify-center px-2 py-0.5 gap-2 rounded-sm`}
        >
          <p className="paragraph p2 font-bold neutral">{status}</p>
          <img src={`/hackherthon-bundasehat${img}`} alt="icon" />
        </div>
      </div>

      <div className="text-white p1 heading gap-3 flex flex-col">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full px-1.5 py-1 outline-[var(--secondary)] outline-1">
            <img src="/hackherthon-bundasehat/health-score.svg" alt="icon" className="w-4" />
          </div>
          <p className="">{healthScore}/10</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full px-1.5 pt-1 pb-1.5 outline-[var(--secondary)] outline-1">
            <img src="/hackherthon-bundasehat/nutrition-score.svg" alt="icon" className="w-4" />
          </div>
          <p className="">{nutritionScore}/10</p>
        </div>
      </div>
    </button>
  );
}

export default CheckUpCard;
