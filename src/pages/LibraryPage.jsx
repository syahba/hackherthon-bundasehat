import { useState } from "react";
import Navbar from "../components/Navbar";
import LibraryCard from "../components/LibraryCard";
import { useParams } from "react-router-dom";
import HERBAL from "../data/herbalMedicines.json";
import NUTRITION from "../data/nutritionalDiets.json";
import DANGER from "../data/dangerSigns.json";

function LibraryPage() {
  const { category } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  let heading;
  let data;
  if (category == "herbal") {
    heading = "Ramuan Herbal";
    data = HERBAL;
  } else if (category == "nutrition") {
    heading = "Asupan Nutrisi";
    data = NUTRITION;
  } else {
    heading = "Tanda Bahaya";
    data = DANGER;
  }

  return (
    <div className="screen">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen}></Navbar>

      <div className="mt-20 w-full">
        <div className="relative secondary flex items-center justify-center relative py-2 w-full rounded-lg shadow-lg">
          <h2 className="text-white heading h2">{heading}</h2>
        </div>

        <div className="flex flex-col gap-4 mt-4.5">
          {data.map((v) => (
            <LibraryCard library={v}></LibraryCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
