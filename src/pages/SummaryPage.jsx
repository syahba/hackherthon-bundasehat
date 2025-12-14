import { useState } from "react";
import Navbar from "../components/Navbar";
import ScoreCard from "../components/ScoreCard";
import SummaryCard from "../components/SummaryCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SummaryPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { list: summaries } = useSelector((s) => s.summaries);

  const summary = summaries[summaries.length - 1]
  return (
    <div className="screen">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen}></Navbar>

      <div className="mt-20 flex flex-col gap-6">
        <div className="text-center">
          <h3 className="heading neutral h3">Hasil {summary.id}</h3>
          <p className="paragraph neutral p2">{summary.date}</p>
        </div>

        <ScoreCard summary={summary}></ScoreCard>

        <div className="flex flex-col gap-6 mb-4">
          <SummaryCard summary={summary} type={"condition"}></SummaryCard>
          <SummaryCard summary={summary} type={"nutrition"}></SummaryCard>
          <SummaryCard summary={summary} type={"energy"}></SummaryCard>
          <SummaryCard summary={summary} type={"pain"}></SummaryCard>
        </div>

        <div className="mb-8">
        <Button text={"Selesai"} onClick={() => navigate("/")}></Button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
