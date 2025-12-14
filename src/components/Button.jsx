function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white heading h3 primary py-1.5 w-80 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-all duration-300"
    >
      {text}
    </button>
  );
}

export default Button;
