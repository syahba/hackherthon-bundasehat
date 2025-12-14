import { useNavigate } from "react-router-dom";

function SummaryCard({ summary, type }) {
  const navigate = useNavigate();

  let title;
  let data = {};
  let bgColor;
  let outlineColor;
  let img;
  let advice;
  let icon;

  if (type == "condition") {
    title = "Kondisi Bunda";
    data = summary.overallCondition;
    icon = "/summary-1.svg";

    console.log(summary)
    if (summary.status == "Aman") {
      bgColor = "bg-[#C6E4D5]";
      outlineColor = "outline-[#0DB561]";
      img = "/aman.svg";

      advice = <p className="neutral paragraph c">{data.doctorAdvice}</p>;
    } else if (summary.status == "Waspada") {
      bgColor = "bg-[#FFF9DF]";
      outlineColor = "outline-[#FFB300]";
      img = "/waspada.svg";

      const str = data.doctorAdvice.split("3-7 hari");
      advice = (
        <p className="neutral paragraph c max-w-68">
          {str[0]}
          <span className="font-bold">3-7 hari</span>
          {str[1]}
        </p>
      );
    } else {
      bgColor = "bg-[#FFC9C9]";
      outlineColor = "outline-[#BC0C0C]";
      img = "/bahaya.svg";

      const str = data.doctorAdvice.split("24 jam");
      advice = (
        <p className="neutral paragraph c">
          {str[0]}
          <span className="font-bold">24 jam</span>
          {str[1]}
        </p>
      );
    }
  } else if (type == "nutrition") {
    title = "Nutrisi Bunda";
    data = summary.nutritionBalance;
    icon = "/summary-2.svg";
  } else if (type == "energy") {
    title = "Istirahat dan Mood";
    icon = "/summary-3.svg";
    data = summary.energyControl;
  } else if (type == "pain") {
    title = "Keluhan dan Tanda Bahaya";
    data = summary.painManagement;
    icon = "/summary-4.svg";
  }

  const getRecommendation = (recommendation) => {
    let keyword;

    if (recommendation.type == "nutrition") {
      keyword = "Konsumsi ";
    } else if (recommendation.type == "herbal") {
      keyword = "Minum ramuan herbal ";
    } else if (recommendation.type == "danger") {
      keyword = "Pelajari penyebab ";
    } else {
      keyword = "";
    }

    if (
      recommendation.type == "nutrition" ||
      recommendation.type == "herbal" ||
      recommendation.type == "danger"
    ) {
      const recom = recommendation.item.split(keyword);

      return (
        <li className="p2 neutral paragraph">
          {keyword}
          <button
            onClick={() =>
              navigate(`/library/${recommendation.type}/${recommendation.id}`)
            }
            className="text-[var(--primary)] cursor-pointer underline text-wrap"
          >
            {recom}
          </button>
        </li>
      );
    } else {
      return <li className="p2 neutral paragraph">{recommendation.item}</li>;
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white shadow-md outline-3 outline-[var(--secondary)] rounded-md pt-3 pb-5 px-4 items-center justify-center">
      <div className="flex justify-center items-start gap-3">
        <div className="">
          <h3 className="text-[var(--primary)] heading h3 mb-1">{title}</h3>
          <p className="p2 paragraph neutral w-56">{data.summary}</p>
        </div>
        <img src={icon} alt="icon" className="" />
      </div>

      {type == "condition" && (
        <div
          className={`${bgColor} outline-1 ${outlineColor} flex flex-col items-start py-1 px-2.5 rounded`}
        >
          <div className="flex items-center justify-center gap-2">
            <p className="neutral paragraph p2 font-bold">{summary.status}</p>
            <img src={img} alt="icon" className="w-4" />
          </div>

          {advice}
        </div>
      )}

      {type != "condition" && (
        <div className="flex flex-col items-start w-full">
          <p className="p2 paragraph neutral font-bold">Rekomendasi:</p>

          <ul className="list-disc ml-5 max-w-68">
            {data.recommendations.map((v) => getRecommendation(v))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SummaryCard;
