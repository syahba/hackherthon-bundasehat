import { useNavigate } from "react-router-dom";

function LibraryCard({ library }) {
  const navigate = useNavigate();

  let category;

  if (library.id.startsWith("H")) {
    category = "herbal";
  } else if (library.id.startsWith("N")) {
    category = "nutrition";
  } else if (library.id.startsWith("D")) {
    category = "danger";
  }

  return (
    <button
      onClick={() => navigate(`/library/${category}/${library.id}`)}
      className="primary flex px-4 py-2 items-center justify-between rounded-xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="text-white flex flex-col items-start w-full -mt-0.5 text-start">
        <p className="p2 paragraph font-bold">{library.title}</p>
        <p className="c paragraph">{library.function}</p>
      </div>

			<img src={`/hackherthon-bundasehat/${library.id}.svg`} alt="icon" className="pt-0.5" />
    </button>
  );
}

export default LibraryCard;
