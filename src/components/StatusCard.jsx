function StatusCard({ title, value, affix }) {
  let img;

  if (title == "Usia Kehamilan") {
    img = "/usia-hamil.svg";
  } else if (title == "Perkiraan Lahir") {
    img = "/perkiraan-lahir.svg";
  } else {
    img = "/checkup-streak.svg";
  }

  return (
    <div className="text-white secondary relative pl-2 pr-4 h-24 pt-1 rounded-lg">
      <p className="c heading -mb-1.5">{title}</p>

      <div className="flex h-full">
        <div className="flex flex-col items-start justify-start">
          <p className="h2 heading">{value}</p>
          <p className="s paragraph">{affix}</p>
        </div>

        <img
          src={`/hackherthon-bundasehat${img}`}
          alt="icon"
          className="max-w-20 absolute bottom-1.5 right-1.5 -m-1"
        />
      </div>
    </div>
  );
}

export default StatusCard;
