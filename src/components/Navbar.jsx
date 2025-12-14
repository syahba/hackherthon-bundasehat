import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [isSubMenu, setIsSubMenu] = useState(false);

  const handleNavigate = (path) => {
    setIsOpen(false)
    navigate(path)
  };

  return (
    <div className="w-full absolute top-0 flex flex-col">
      <div className="pt-2.5 pb-4 pl-4 pr-5 bg-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-1.5">
          <img
            src="/logo.svg"
            alt="logo"
            className="max-w-8 -mb-1"
          />
          <h1 className="text-3xl logo neutral">BundaSehat</h1>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <img src="/hamburg.svg" alt="hamburger" className="w-5 mt-2.5" />
        </button>
      </div>

      {isOpen && (
        <nav className="primary h-[48.1rem] w-60 absolute right-0 top-[3.90rem] z-10 shadow-[-3px_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-col">
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-4 text-white cursor-pointer p-4 my-2 hover:bg-[#B8E5DE] hover:text-[var(--neutral)] transition-all duration-150"
          >
            <img src="/nav-1.svg" alt="icon" />
            <p className="paragraph p1 font-bold">Home Page</p>
          </button>

          <div className="w-full">
            <button
              onClick={() => setIsSubMenu(!isSubMenu)}
              className="w-full flex items-center gap-4 text-white cursor-pointer p-4 hover:bg-[#B8E5DE] hover:text-[var(--neutral)] transition-all duration-150"
            >
              <img src="/nav-2.svg" alt="icon" />
              <p className="paragraph p1 font-bold">Perpustakaan</p>
              <img
                src="/arrow.svg"
                className={`${isSubMenu ? "" : "rotate-180"} w-3`}
              ></img>
            </button>

            {isSubMenu && (
              <div className="flex flex-col justify-start items-end mr-2">
                <button
                  onClick={() => handleNavigate("/library/herbal")}
                  className="flex items-center gap-3 text-white cursor-pointer py-2 px-4 hover:bg-[#B8E5DE] hover:text-[var(--neutral)] transition-all duration-150"
                >
                  <img src="/nav-4.svg" alt="icon" />
                  <p className="paragraph p1">Ramuan Herbal</p>
                </button>

                <button
                  onClick={() => handleNavigate("/library/nutrition")}
                  className="flex items-center gap-3 text-white cursor-pointer py-2 px-4 hover:bg-[#B8E5DE] hover:text-[var(--neutral)] transition-all duration-150"
                >
                  <img
                    src="/summary-2.svg"
                    alt="icon"
                    className="max-w-6 mr-0.5"
                  />
                  <p className="paragraph p1 pr-1">Asupan Nutrisi</p>
                </button>

                <button
                  onClick={() => handleNavigate("/library/danger")}
                  className="flex items-center gap-3 text-white cursor-pointer py-2 px-4 hover:bg-[#B8E5DE] hover:text-[var(--neutral)] transition-all duration-150"
                >
                  <img src="/summary-4.svg" alt="icon" className="max-w-6" />
                  <p className="paragraph p1 pr-3">Tanda Bahaya</p>
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
