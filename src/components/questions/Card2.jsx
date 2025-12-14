function Card2({ option, answers, setAnswers }) {
  let img;
  let margin;
  const id = option.optionId;

  if (id == "Q02_OPT_A") {
    img = "/happy.svg";
    margin = 'mt-6'
  } else if (id == "Q02_OPT_B") {
    img = "/avg.svg";
    margin = 'mt-6'
  } else {
    img = "/sad.svg";
    margin = 'mt-6 mb-8'
  }

  return (
    <button
      onClick={() =>
        setAnswers({ ...answers, q2: { ...answers.q2, answers: [id] } })
      }
      className={`${
        answers.q2.answers[0] == id ? "secondary" : "accent"
      } w-full flex flex-col items-center justify-center py-6 px-10 ${margin} rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <img src={img} alt="icon" className="" />
      <p className="neutral paragraph p1">{option.text}</p>
    </button>
  );
}

export default Card2;
