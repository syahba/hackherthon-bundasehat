function Card3({ option, answers, setAnswers }) {
  let img;
  let color;
  const id = option.optionId;
  const isQ03 = id.includes('Q03');

  if (isQ03) {
    if (id == "Q03_OPT_A") {
      img = "/q3-1.svg";
    } else if (id == "Q03_OPT_B") {
      img = "/q3-2.svg";
    } else if (id == "Q03_OPT_C") {
      img = "/q3-3.svg";
    } else {
      img = "/q3-4.svg";
    }
  } else {
    if (id == "Q09_OPT_NONE") {
      img = "/happy.svg";
    } else if (id == "Q09_OPT_SPOT") {
      img = "/avg.svg";
    } else if (id == "Q09_OPT_CLEAR") {
      img = "/sad.svg";
    } else {
      img = "/cringe.svg";
    }
  }

  const handleAnswer = () => {
    if (isQ03) {
      setAnswers({ ...answers, q3: { ...answers.q3, answers: [id] } })
    } else {
      setAnswers({ ...answers, q9: { ...answers.q9, answers: [id] } })
    }
  }

  if (isQ03) {
    color = answers.q3.answers[0] == id ? 'secondary' : 'accent'
  } else {
    color = answers.q9.answers[0] == id ? 'secondary' : 'accent'
  }

  return (
    <button
      onClick={handleAnswer}
      className={`p-4 gap-6 ${color} w-full flex flex-col items-center justify-between rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <p className="neutral paragraph p1 max-w-30">{option.text}</p>
      <img src={img} alt="icon" className="max-w-24" />
    </button>
  );
}

export default Card3;
