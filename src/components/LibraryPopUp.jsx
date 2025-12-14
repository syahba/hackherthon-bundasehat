function LibraryPopUp({ library, topic, isModal, setIsModal }) {
  let img;
  const isHerbal = library.id.includes('H');
  let arr = [];

  if (topic == "Gambaran Umum") {
    img = isHerbal ? "/popup-2.svg" : "/N01.svg";
  } else if (topic == "Cara Membuat") {
    img = "/popup-1.svg";
  } else if (topic == "Manfaat dan Kandungan") {
    img = "/popup-3.svg";
  } else if (topic == "Catatan Keamanan") {
    img = "/popup-4.svg";
    arr = library.safetyNotes;
  } else if (topic == "Ciri-Ciri") {
    img = "/D01.svg";
  } else if (topic == "Penyebab") {
    img = "/popup-5.svg";
    arr = library.impact;
  } else if (topic == "Cara Mengatasi") {
    img = "/popup-6.svg";
    arr = library.management;
  } else {
    img = "/popup-7.svg";
    arr = library.impact;
  }

  return (
    <div className="bg-white py-8 px-6 relative flex flex-col rounded-2xl outline-4 outline-[var(--secondary)]">
      <button
        onClick={() => setIsModal(!isModal)}
        className="absolute top-4 right-4 cursor-pointer"
      >
        <img src="/hackherthon-bundasehat/close.svg" alt="icon" className="w-5" />
      </button>

      <div className="w-68 flex flex-col gap-5">
        <div className="flex flex-col items-center gap-4">
          <img src={`/hackherthon-bundasehat${img}`} alt="icon" />

          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-[var(--primary)] heading h2 text-center">
              {topic}
            </h2>

            <div className="h-0.5 w-60 primary"></div>
          </div>
        </div>

        {topic == "Gambaran Umum" || topic == "Ciri-Ciri" ? (
          <div className="">
            <p className="p1 neutral paragraph text-center">
              {library.summary}
            </p>
          </div>
        ) : topic == "Cara Membuat" ? (
          <div className="neutral p1 paragraph flex flex-col gap-4">
            <div>
              <p className="font-bold">Bahan</p>
              <ul className="list-disc ml-6">
                {
                  library.ingredients.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))
                }
              </ul>
            </div>

            <div>
              <p className="font-bold">Cara Membuat</p>
              <ul className="list-disc ml-6">
                {
                  library.preparation.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        ) : topic == "Manfaat dan Kandungan" ? (
          <div className="neutral p1 paragraph flex flex-col gap-4">
            <div>
              <p className="font-bold">Manfaat</p>
              <ul className="list-disc ml-6">
                {
                  library.benefits.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))
                }
              </ul>
            </div>

            <div>
              <p className="font-bold">{isHerbal ? 'Kandungan' : 'Nutrisi'}</p>
              <ul className="list-disc ml-6">
                {
                  library.nutritions.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        ) : (
          <div className="neutral p1 paragraph">
            <ul className="list-disc ml-6">
                {
                  arr.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))
                }
              </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryPopUp;
