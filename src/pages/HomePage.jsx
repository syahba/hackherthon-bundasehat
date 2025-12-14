import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatusCard from "../components/StatusCard";
import CheckUpCard from "../components/CheckUpCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data: profile } = useSelector((s) => s.profile);
  const { list: summaries } = useSelector((s) => s.summaries);

  console.log(profile);

  useEffect(() => {
    if (!profile) navigate("/register");
  }, []);

  return (
    profile && (
      <div className="screen">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen}></Navbar>

        <div className="flex flex-col justify-start gap-4 mt-20">
          <p className="neutral p1 paragraph font-bold text-start">
            Hai {profile.name}, jangan lupa Daily Checkup ya!
          </p>

          <div className="primary flex items-center py-4 px-5 rounded-xl shadow-lg justify-center gap-4.5">
            <img src="/hackherthon-bundasehat/hero.svg" alt="hero" className="max-w-32 -ml-3.5" />

            <div className="flex flex-col items-end gap-8 -mt-2">
              <h1 className="text-white h2 heading text-end leading-8">
                Pregnancy <br></br> Daily CheckUp
              </h1>
              <button
                onClick={() => navigate(`/question`)}
                className="text-[var(--primary)] cursor-pointer bg-white heading p2 py-0.5 px-2.5 rounded hover:scale-110 transition-all duration-300"
              >
                CheckUp Sekarang
              </button>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <StatusCard
              title={"Usia Kehamilan"}
              value={profile.currentWeek}
              affix={"minggu"}
            ></StatusCard>
            <StatusCard
              title={"Perkiraan Lahir"}
              value={profile.dueDateCountDown}
              affix={"hari lagi"}
            ></StatusCard>
            <StatusCard
              title={"CheckUp Streak"}
              value={profile.streak}
              affix={"hari"}
            ></StatusCard>
          </div>

          <h3 className="h3 heading neutral">Riwayat Daily CheckUp</h3>

          {summaries ? (
            <div className="flex flex-col gap-3">
              {summaries.map((v) => (
                <CheckUpCard
                  title={v.id}
                  date={v.date}
                  healthScore={v.healthScore}
                  nutritionScore={v.nutritionScore}
                  status={v.status}
                  onClick={() => navigate("/summary/1")}
                ></CheckUpCard>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-10">
              <img src="/hackherthon-bundasehat/empty.svg" alt="icon" />
              <p className="neutral paragraph p2 text-center">
                Riwayat daily checkup masih kosong. <br></br> Yuk lakukan
                checkup pertama!
              </p>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default HomePage;
