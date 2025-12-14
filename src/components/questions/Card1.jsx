function Card1({ option, answers, setAnswers }) {
  let img;
  const id = option.optionId;

  if (id == "Q01_OPT_A") {
    img = "/q1-1.svg";
  } else if (id == "Q01_OPT_B") {
    img = "/q1-2.svg";
  } else {
    img = "/q1-3.svg";
  }

  return (
    <button
      onClick={() =>
        setAnswers({ ...answers, q1: { ...answers.q1, answers: [id] } })
      }
      className="flex items-center relative mt-10 mb-6 cursor-pointer hover:scale-105 transition-all duration-300"
    >
      <img src={img} alt="icon" className="w-24 absolute -left-1.5" />
      <p
        className={`neutral paragraph p1 ${
          answers.q1.answers[0] == id ? "secondary" : "accent"
        } py-3 pr-6 pl-26 w-72 text-center rounded-lg shadow-md`}
      >
        {option.text}
      </p>
    </button>
  );
}

export default Card1;
