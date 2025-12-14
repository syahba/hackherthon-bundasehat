function Slider({ id }) {
  let position;
  if (id.includes('Q06')) {
    position = 'top-6'
  } else {
    if (id == 'Q08_OPT_NONE') {
      position = '-top-4 left-0'
    } else if (id == 'Q08_OPT_SEVERE') {
      position = '-top-4 right-0'
    } else {
      position = '-top-4'
    }
  }

  return (
    <div className={`absolute ${position} z-10`}>
      <div className="secondary px-4 py-2 rounded-full shadow-md">
        <img src="/hackherthon-bundasehat/arrow.svg" alt="icon" className="w-4 mb-3" />
        <img src="/hackherthon-bundasehat/arrow.svg" alt="icon" className="w-4 rotate-180" />
      </div>
    </div>
  );
}

export default Slider;
