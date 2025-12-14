import Slider from "../Slider";

function Bar8({ option, answers, setAnswers, isBarActive, isSliderVisible }) {
  let img;
  let width;
  let rounded;
  let margin;
  let position;
  let bar;
  const id = option.optionId;

  if (id == "Q08_OPT_NONE") {
    img = "/smile.svg";
    rounded = "rounded-l-full";
    position = 'items-start text-start'
    width = "w-16";
  } else if (id == "Q08_OPT_SEVERE") {
    img = "/cringe.svg";
    rounded = "rounded-r-full"
    width = "w-16";
    position = 'items-end text-end'
  } else {
    img = "";
    margin = 'mt-2'
    position = 'items-center'
  }

  if (isBarActive) {
    if (answers.q8.answers[0] == "Q08_OPT_SEVERE") {
      bar = 'disabled'
    } else {
      bar = 'accent'
    }
  } else {
    bar = 'disabled'
  }

  return (
    <div className={`${margin} flex flex-col-reverse ${position} gap-10 justify-center h-full`}>
      <p className={`neutral paragraph p1 w-24`}>{id != 'Q08_OPT_SLIGHT' ? option.text : ''}</p>

      <button
        onClick={() =>
          setAnswers({ ...answers, q8: { ...answers.q8, answers: [id] } })
        }
        className="relative flex justify-center h-fit cursor-pointer"
      >
        <div className={`h-4 w-26 disabled ${rounded} flex justify-end`}>
          <div
            className={`${bar} h-4 ${
              answers.q8.answers[0] == id ? "w-16" : "w-26"
            } ${rounded}`}
          ></div>
        </div>
        {isSliderVisible && <Slider id={id}></Slider>}
      </button>

      <img src={`/hackherthon-bundasehat${img}`} alt="" className={`${width}`} />
    </div>
  );
}

export default Bar8;
