function ProgressBar({ page }) {
  let w;

  if (page == 1) {
    w = `w-[10%]`;
  } else if (page == 2) {
    w = `w-[20%]`;
  } else if (page == 3) {
    w = `w-[30%]`;
  } else if (page == 4) {
    w = `w-[40%]`;
  } else if (page == 5) {
    w = `w-[50%]`;
  } else if (page == 6) {
    w = `w-[60%]`;
  } else if (page == 7) {
    w = `w-[70%]`;
  } else if (page == 8) {
    w = `w-[80%]`;
  } else if (page == 9) {
    w = `w-[90%]`;
  } else if (page == 10) {
    w = `w-[100%]`;
  }

  return <div className="w-84 h-3.5 bg-[#C5c5c5] rounded-full">
      <div className={`${w} h-3.5 primary rounded-full`}></div>
    </div>;
}

export default ProgressBar;
