import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import LibraryPopUp from "../components/LibraryPopUp";
import HERBAL from "../data/herbalMedicines.json";
import NUTRITION from "../data/nutritionalDiets.json";
import DANGER from "../data/dangerSigns.json";

function MindMapPage() {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [topic, setTopic] = useState("");

  const labels = {
    herbal: [
      "Gambaran Umum",
      "Cara Membuat",
      "Manfaat dan Kandungan",
      "Catatan Keamanan",
    ],
    nutrition: [
      "Gambaran Umum",
      "Cara Membuat",
      "Manfaat dan Kandungan",
      "Catatan Keamanan",
    ],
    danger: ["Ciri-Ciri", "Penyebab", "Cara Mengatasi", "Dampak Dibiarkan"],
  };

  let raw;
  if (category == "herbal") {
    raw = HERBAL;
  } else if (category == "nutrition") {
    raw = NUTRITION;
  } else {
    raw = DANGER;
  }
  const data = raw.find((v) => v.id == id);

  const handlePopup = (label) => {
    setTopic(label);
    setIsModal(true);
  };

  return (
    <div className="screen bg-[url('/bg.svg')] bg-cover bg-center h-screen relative">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen}></Navbar>

      <div className="h-full flex flex-col items-center justify-center relative">
        <button
          onClick={() => navigate(`/library/${category}`)}
          className="absolute top-20 right-0 cursor-pointer"
        >
          <img src="/close.svg" alt="icon" />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handlePopup(labels[category][0])}
                className="py-5 px-4 h-24 w-36 flex items-center justify-center rounded-[100%] primary outline-3 outline-[var(--secondary)] shadow-xl z-10 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <h3 className="heading text-white h3 text-center">
                  {labels[category][0]}
                </h3>
              </button>

              <div
                className={`w-1 h-40 secondary -rotate-[36deg] -mt-6 ml-21`}
              ></div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => handlePopup(labels[category][1])}
                className="py-5 px-4 h-24 w-36 flex items-center justify-center rounded-[100%] primary outline-3 outline-[var(--secondary)] shadow-xl z-10 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <h3 className="heading text-white h3 text-center">
                  {labels[category][1]}
                </h3>
              </button>

              <div
                className={`w-1 h-40 secondary rotate-[36deg] -mt-6 mr-21`}
              ></div>
            </div>
          </div>

          <div className="text-white text-center secondary flex flex-col items-center w-72 py-7 -my-4 rounded-full">
            <h2 className="heading h2 mb-1 max-w-56">{data.title}</h2>
            <p className="paragraph p2 max-w-62">{data.function}</p>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <div
                className={`w-1 h-40 secondary rotate-[36deg] -mb-6 ml-21`}
              ></div>

              <button
                onClick={() => handlePopup(labels[category][2])}
                className="py-5 px-4 h-24 w-36 flex items-center justify-center rounded-[100%] primary outline-3 outline-[var(--secondary)] shadow-xl z-10 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <h3 className="heading text-white h3 text-center">
                  {labels[category][2]}
                </h3>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-1 h-40 secondary -rotate-[36deg] -mb-6 mr-21`}
              ></div>

              <button
                onClick={() => handlePopup(labels[category][3])}
                className="py-5 px-4 h-24 w-36 flex items-center justify-center rounded-[100%] primary outline-3 outline-[var(--secondary)] shadow-xl z-10 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <h3 className="heading text-white h3 text-center">
                  {labels[category][3]}
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModal && (
        <div className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center">
          <LibraryPopUp
            library={data}
            topic={topic}
            isModal={isModal}
            setIsModal={setIsModal}
          ></LibraryPopUp>
        </div>
      )}
    </div>
  );
}

export default MindMapPage;
