import Slider from "../Slider";

function Bar6({ option, answers, setAnswers, isBarActive, isSliderVisible }) {
  let img;
  let width;
  let rounded;
  let margin;
  const id = option.optionId;

  if (id == "Q06_OPT_7_9") {
    img = "/smile.svg";
    width = "pl-[0.190rem]";
    rounded = "rounded-t-full";
    margin = "mt-6";
  } else if (id == "Q06_OPT_6_7") {
    img = "/happy.svg";
    width = "w-12";
  } else if (id == "Q06_OPT_5") {
    img = "/avg.svg";
    width = "w-12";
  } else if (id == "Q06_OPT_3_4") {
    img = "/sad.svg";
    width = "w-12";
  } else {
    img = "/dizzy.svg";
    width = "pl-[0.190rem]";
    rounded = "rounded-b-full";
    margin = "mb-8";
  }

  const text = option.text.split("; ");

  return (
    <div className={`${margin} flex items-center gap-6`}>
      <div className="w-34">
        {text.map((v, i) => (
          <p key={i} className="neutral paragraph p1">
            {v}
          </p>
        ))}
      </div>

      <button
        onClick={() =>
          setAnswers({ ...answers, q6: { ...answers.q6, answers: [id] } })
        }
        className="relative w-12 flex justify-center h-fit cursor-pointer"
      >
        <div className={`h-26 w-4 disabled ${rounded} flex items-end`}>
          <div className={`${isBarActive ? 'accent' : 'disabled'} w-4 ${answers.q6.answers[0] == id ? 'h-16' : 'h-26'} ${rounded}`}></div>
        </div>
        {isSliderVisible && <Slider id={id}></Slider>}
      </button>

      <img src={`/hackherthon-bundasehat${img}`} alt="" className={`${width} ml-10`} />
    </div>
  );
}

export default Bar6;
