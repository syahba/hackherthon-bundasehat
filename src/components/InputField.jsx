function InputField({ label, type, placeholder, form, setForm }) {
  const formatString = (str) => {
    const removeSpace = str.replace(/\s/g, "");

    if (removeSpace.length === 0) {
      return "";
    }
    const firstChar = removeSpace.charAt(0).toLowerCase();
    const restOfString = removeSpace.slice(1);
    return firstChar + restOfString;
  }

  const id = formatString(label);

  return (
    <div className="flex flex-col neutral paragraph mx-3 gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="disabled outline-1 rounded py-2 px-3"
        value={form[id]}
        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
      />
    </div>
  );
}

export default InputField;
