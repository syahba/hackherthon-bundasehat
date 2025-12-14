function Card7({ option, answers, setAnswers }) {
  let img;
  let color;
  let width;
  let gap;
  let margin = 'mt-4 mb-1';

  const id = option.optionId;
  const isQ07 = id.includes('Q07')

  if (isQ07) {
    width = 'max-w-30'
    gap = 'gap-36'

    if (id == "Q07_OPT_MUAL") {
      img = "/D04.svg";
    } else if (id == "Q07_OPT_PUSING") {
      img = "/D05.svg";
    } else if (id == "Q07_OPT_NYERI_PERUT") {
      img = "/q7-3.svg";
    } else if (id == "Q07_OPT_NYERI_DADA") {
      img = "/q7-4.svg";
    } else {
      img = "/x.svg";
    }
  } else {
    width = 'w-40'
    gap = 'gap-18'

    if (id == "Q10_OPT_NORMAL") {
      img = "/q10-1.svg";
    } else if (id == "Q10_OPT_LESS") {
      img = "/q10-2.svg";
    } else if (id == "Q10_OPT_NONE") {
      img = "/q10-3.svg";
    } else {
      img = "/x.svg";
      margin = 'mt-4 mb-12'
    }
  }

  const handleAnswer = () => {
    if (isQ07) {
      setAnswers({
      ...answers,
      q7: { ...answers.q7, answers: [...answers.q7.answers, id] },
      });

      if (id === "Q07_OPT_NONE") {
        setAnswers({ ...answers, q7: { ...answers.q7, answers: [id] } });
      } else if (
        answers.q7.answers.includes("Q07_OPT_NONE") &&
        id !== "Q07_OPT_NONE"
      ) {
        const removed = answers.q7.answers.filter((v) => v !== "Q07_OPT_NONE");
        setAnswers({
          ...answers,
          q7: { ...answers.q7, answers: [...removed, id] },
        });
      }
    } else {
      setAnswers({ ...answers, q10: { ...answers.q10, answers: [id] } })
    }
  };

  if (isQ07) {
    if (answers.q7.answers.includes(id)) {
      color = 'secondary'
  } else {
    color = 'accent'
  }
  } else {
    if (answers.q10.answers[0] == id) {
    color = 'secondary'
  } else {
    color = 'accent'
  }
  }

  return (
    <button
      onClick={handleAnswer}
      className={`py-3 px-5 ${gap} ${color} ${margin} flex items-center justify-between rounded-lg shadow-lg cursor-pointer hover:scale-107 transition-all duration-300`}
    >
      <p className={`neutral paragraph p1 ${width} text-start w-24`}>
        {option.text}
      </p>

      <img src={`/hackherthon-bundasehat${img}`} alt="icon" className="max-w-12 -m-0.7"></img>
    </button>
  );
}

export default Card7;
