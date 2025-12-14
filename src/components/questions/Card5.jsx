function Card5({ option, answers, setAnswers }) {
  let loop;
  const id = option.optionId;

  if (id == "Q05_OPT_LESS4") {
    loop = 3;
  } else if (id == "Q05_OPT_4_6") {
    loop = 4;
  } else {
    loop = 6;
  }

  const renderImg = Array.from({ length: loop });

  return (
    <button
      onClick={() =>
        setAnswers({ ...answers, q5: { ...answers.q5, answers: [id] } })
      }
      className={`p-4 mb-1 mt-6 h-20 gap-1 ${
        answers.q5.answers[0] == id ? "secondary" : "accent"
      } w-full flex items-center justify-between rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <p className="neutral paragraph p1 max-w-30 text-start w-24">{option.text}</p>

      <div className="flex">
        {
          renderImg.map((v, i) => (
            <img key={i} src={'/hackherthon-bundasehat/q5.svg'} alt="icon" className="max-w-24 -m-0.5" />
          ))
        }
      </div>
    </button>
  );
}

export default Card5;
