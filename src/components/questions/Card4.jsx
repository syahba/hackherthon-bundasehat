function Card4({ option, answers, setAnswers }) {
  let img;
  const id = option.optionId;

  if (id == "Q04_OPT_AYAM") {
    img = "/q4-1.svg";
  } else if (id == "Q04_OPT_SAPI") {
    img = "/q4-2.svg";
  } else if (id == "Q04_OPT_IKAN") {
    img = "/q4-3.svg";
  } else if (id == "Q04_OPT_TELUR") {
    img = "/q4-4.svg";
  } else if (id == "Q04_OPT_SAYUR") {
    img = "/q4-5.svg";
  } else if (id == "Q04_OPT_BIJIBIJIAN") {
    img = "/q4-6.svg";
  } else if (id == "Q04_OPT_TAHUTEMPE") {
    img = "/q4-7.svg";
  } else {
    img = "/x.svg";
  }

  const handleAnswer = () => {
    setAnswers({ ...answers, q4: { ...answers.q4, answers: [...answers.q4.answers, id] } });

    if (id === 'Q04_OPT_OTHER') {
      setAnswers({ ...answers, q4: { ...answers.q4, answers: [id] } });
    } else if (answers.q4.answers.includes('Q04_OPT_OTHER') && id !== 'Q04_OPT_OTHER') {
      const removed = answers.q4.answers.filter(v => v !== 'Q04_OPT_OTHER');
      setAnswers({ ...answers, q4: { ...answers.q4, answers: [...removed, id] } });    }
  }

  return (
    <button
      onClick={handleAnswer}
      className={`pt-3 pl-3 pr-1 ${
        answers.q4.answers.includes(id) ? "secondary" : "accent"
      } w-full flex items-start justify-center rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <p className="neutral paragraph p1 text-start w-16">{option.text}</p>
      <img src={img} alt="icon" className="py-5 px-2 -m-2" />
    </button>
  )
}

export default Card4;
