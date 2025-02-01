import { useState } from "react";

function InputLetter({ correctLetter, handleInput, index, showAnswer }) {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const letter = e.target.value;
    if (letter.match(/^[a-zA-ZñÑ]$/)) {
      setInput(letter);
      let next = e.target.nextElementSibling;
      while (next && next.disabled) {
        next = next.nextElementSibling;
      }
      if (next) {
        next.focus();
      }
      handleInput();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (input === "") {
        // Busca el primer input anterior que no esté deshabilitado
        let prev = e.target.previousElementSibling;
        while (prev && prev.disabled) {
          prev = prev.previousElementSibling;
        }
        if (prev) {
          prev.focus();
        }
      } else {
        setInput("");
      }
    }
  };

  return (
    <input
      type="text"
      id={`input-${index}`}
      value={showAnswer ? correctLetter : input}
      onChange={onChange}
      className={`w-[25px] h-[40px] rounded-lg border-2 border-neutral-400 dark:border-gray-700 text-center text-2xl text-slate-800 dark:text-gray-100 ${
        showAnswer
          ? "bg-slate-200 dark:bg-slate-500 dark:text-gray-800"
          : "bg-transparentdark:text-gray-100"
      } focus:outline-none focus:border-gray-600 focus:dark:border-gray-400`}
      maxLength={1}
      onKeyDown={onKeyDown}
      disabled={showAnswer}
      autoFocus={index === 0}
    />
  );
}

export default InputLetter;
