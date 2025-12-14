import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Navbar from "../components/Navbar";
import Questions from "../data/questions.json";
import { useState } from "react";
import Card1 from "../components/questions/Card1";
import Card2 from "../components/questions/Card2";
import Card3 from "../components/questions/Card3";
import Bar8 from "../components/questions/Bar8";
import Card7 from "../components/questions/Card7";
import Bar6 from "../components/questions/Bar6";
import Card5 from "../components/questions/Card5";
import Card4 from "../components/questions/Card4";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { finishCheckup } from "../redux/slices/summarySlice";

function QuestionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile } = useSelector((s) => s.profile);
  const { list: summaries } = useSelector((s) => s.summaries);

  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [hidden, setHidden] = useState(true);
  const [isLong, setIsLong] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [answers, setAnswers] = useState({
    q1: {
      id: "Q01",
      answers: [],
    },
    q2: {
      id: "Q02",
      answers: [],
    },
    q3: {
      id: "Q03",
      answers: [],
    },
    q4: {
      id: "Q04",
      answers: [],
    },
    q5: {
      id: "Q05",
      answers: [],
    },
    q6: {
      id: "Q06",
      answers: ["Q06_OPT_5"],
    },
    q7: {
      id: "Q07",
      answers: [],
    },
    q8: {
      id: "Q08",
      answers: ["Q08_OPT_SLIGHT"],
    },
    q9: {
      id: "Q09",
      answers: [],
    },
    q10: {
      id: "Q10",
      answers: [],
    },
  });

  const question = Questions[index];

  const getCard = (option) => {
    let card;
    if (index == 0) {
      card = (
        <Card1
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card1>
      );
    } else if (index == 1) {
      card = (
        <Card2
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card2>
      );
    } else if (index == 2) {
      card = (
        <Card3
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card3>
      );
    } else if (index == 3) {
      card = (
        <Card4
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card4>
      );
    } else if (index == 4) {
      card = (
        <Card5
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card5>
      );
    } else if (index == 5) {
      const selectedIndex = question.options.findIndex(
        (opt) => opt.optionId === answers.q6.answers[0]
      );
      const activeBarIds = question.options
        .slice(selectedIndex)
        .map((v) => v.optionId);

      card = (
        <Bar6
          option={option}
          answers={answers}
          setAnswers={setAnswers}
          isBarActive={activeBarIds.includes(option.optionId)}
          isSliderVisible={option.optionId === answers.q6.answers[0]}
        ></Bar6>
      );
    } else if (index == 6) {
      card = (
        <Card7
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card7>
      );
    } else if (index == 7) {
      const selectedIndex = question.options.findIndex(
        (opt) => opt.optionId === answers.q8.answers[0]
      );
      const activeBarIds = question.options
        .slice(selectedIndex)
        .map((v) => v.optionId);

      card = (
        <Bar8
          option={option}
          answers={answers}
          setAnswers={setAnswers}
          isBarActive={activeBarIds.includes(option.optionId)}
          isSliderVisible={option.optionId === answers.q8.answers[0]}
        ></Bar8>
      );
    } else if (index == 8) {
      card = (
        <Card3
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card3>
      );
    } else {
      card = (
        <Card7
          option={option}
          answers={answers}
          setAnswers={setAnswers}
        ></Card7>
      );
    }

    return card;
  };

  const handleAnswer = () => {
    setHidden(false);

    const response = question.options.find(
      (v) => v.optionId === answers[`q${index + 1}`].answers[0]
    ).response;
    setResponse(response);
  };

  const handleNext = () => {
    setHidden(true);

    if (index == 9) {
      dispatch(finishCheckup(answers, profile));

      const id = summaries ? summaries[summaries.length - 1].date : 'Daily CheckUp - 1'
      navigate(`/summary/${id}`);
    } else {
      setIndex(index + 1);
    }

    if (window.innerHeight > screen.height && isLong == false) {
      setIsLong(true);
    } else if (isLong == true) {
      setIsLong(false);
    }
  };

  return (
    <div className="screen h-full">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen}></Navbar>

      <div className="flex flex-col items-end gap-4 mt-20">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <img src="/hackherthon-bundasehat/cross.svg" alt="icon" />
        </button>

        <ProgressBar page={index + 1}></ProgressBar>
      </div>

      <div className="flex flex-col mt-4 items-center h-full">
        <div>
          <h3 className="neutral heading h3 text-start">{question.question}</h3>
          {index == 3 ||
            (index == 6 && (
              <p className="paragraph c mt-1">
                Bunda bisa pilih lebih dari satu ya
              </p>
            ))}
        </div>

        {index != 5 && index != 7 ? (
          <div
            className={
              index == 2 || index == 3 || index == 8
                ? "grid grid-cols-2 gap-6 mt-6 mb-10"
                : "flex flex-col items-center"
            }
          >
            {question.options.map((v) => getCard(v))}
          </div>
        ) : (
          <div className={index == 7 ? "flex h-full mb-32" : ""}>
            {question.options.map((v) => getCard(v))}
          </div>
        )}

        {hidden && (
          <div className={isLong ? "mb-10" : "absolute bottom-10"}>
            <Button text={"Submit"} onClick={handleAnswer}></Button>
          </div>
        )}
      </div>

      <div
        className={`${
          hidden ? "hidden" : "flex"
        } border-t-6 border-[var(--secondary)] rounded-xl absolute bottom-0 w-full flex-col items-center pt-4 pb-10 gap-4 bg-white`}
      >
        <div className="flex items-center justify-between gap-10">
          <p className="neutral paragraph p1 max-w-45">{response}</p>
          <img src="/hackherthon-bundasehat/heart.svg" alt="icon" />
        </div>

        <Button text={"Selanjutnya"} onClick={handleNext}></Button>
      </div>
    </div>
  );
}

export default QuestionPage;
