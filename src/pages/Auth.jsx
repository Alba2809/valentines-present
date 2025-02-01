import { Fragment, useEffect, useRef, useState } from "react";
import Decorations from "../components/Decorations";
import ThemeToggle from "../components/ThemeToggle";
import AnimatedFace from "../components/AnimatedFace";
import InputLetter from "../components/InputLetter";
import passwordsData from "../data/passwords.json";
import "../components/styles/Arrow.css";

function Auth() {
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [letterToShow, setLetterToShow] = useState([]);
  const [correctPassword, setCorrectPassword] = useState(null);
  const formRef = useRef(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);

  useEffect(() => {
    const form = formRef.current;

    const handleScroll = () => {
      if (form) {
        // Verifica si hay contenido oculto a la izquierda
        setShowLeftIndicator(form.scrollLeft > 0);

        // Verifica si hay contenido oculto a la derecha
        setShowRightIndicator(
          form.scrollLeft + form.clientWidth < form.scrollWidth
        );
      }
    };

    if (!form) return;
    // Agrega el event listener para el scroll
    form.addEventListener("scroll", handleScroll);

    // Verifica el estado inicial al cargar el componente
    handleScroll();

    // Limpia el event listener al desmontar el componente
    return () => {
      form.removeEventListener("scroll", handleScroll);
    };
  }, [correctPassword]); // Dependencia para recalcular cuando cambia la contraseña

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * passwordsData.passwords.length
    );
    setCorrectPassword(passwordsData.passwords[2]);
  }, []);

  const verifyPassword = (password) => {
    if (password === correctPassword.password.replaceAll(" ", "")) {
      setIsCorrect(true);
      setMessage(correctPassword.messages.success);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      switch (newAttempts) {
        case 1:
          setLetterToShow((prev) => [
            ...prev,
            ...getRandomIndexes(correctPassword.revealLetters[0]),
          ]);
          setMessage(correctPassword.messages.error1);
          break;
        case 2:
          setLetterToShow((prev) => [
            ...prev,
            ...getRandomIndexes(correctPassword.revealLetters[1]),
          ]);
          setMessage(correctPassword.messages.error2);
          break;
        case 3:
          setLetterToShow((prev) => [
            ...prev,
            ...getRandomIndexes(correctPassword.revealLetters[2]),
          ]);
          setMessage(correctPassword.messages.error3);
        default:
          setMessage(`La contraseña es **${correctPassword.password}**.`);
      }
    }
  };

  const handleInput = () => {
    const inputs = document.querySelectorAll("input");
    const password = Array.from(inputs)
      .map((input) => input.value)
      .join("");
    if (
      password.length === correctPassword.password.replaceAll(" ", "").length
    ) {
      verifyPassword(password);
    }
  };

  const getRandomIndexes = (number) => {
    //get random indexes from 0 to correctPassword.length and they dont repeat in letterToShow
    //first, get all indexes that are not in letterToShow and then sort them randomly
    const indexes = Array.from(Array(correctPassword.password.length).keys())
      .filter((index) => {
        // Excluir índices que ya están en letterToShow
        const isNotInLetterToShow = !letterToShow.includes(index);
        // Excluir índices que corresponden a un espacio en la contraseña
        const isNotSpace = correctPassword.password[index] !== " ";
        return isNotInLetterToShow && isNotSpace;
      })
      .sort(() => Math.random() - 0.5);

    return indexes.slice(0, number); //slice the indexes to get the first number of indexes
  };

  const resetInputs = () => {
    // Resetear los inputs que no están en letterToShow
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => input.blur()); // Quitar el foco

    let firstAvailableInput = null; // Para enfocar el primer input disponible

    inputs.forEach((input) => {
      const inputIndex = Number(input.id.split("-")[1]);
      if (!letterToShow.includes(inputIndex)) {
        input.value = ""; // Vaciar el input
        if (!firstAvailableInput && !input.disabled) {
          firstAvailableInput = input; // Guardar el primer input disponible
        }
      }
    });

    // Enfocar el primer input disponible
    if (firstAvailableInput) {
      firstAvailableInput.focus();
    }
  };

  useEffect(() => {
    if (attempts > 0) resetInputs();
  }, [attempts]);

  return (
    <div className="min-h-screen bg-pink-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ThemeToggle />
      <Decorations />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full relative z-10">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6 text-center">
          {correctPassword?.messages.initial}
        </h1>
        <div>
          <AnimatedFace attempts={attempts} isCorrect={isCorrect} />
        </div>
        <p className="text-lg text-center m-4 text-gray-800 dark:text-gray-200">
          {message}
        </p>
        {!isCorrect && (
          <form
            ref={formRef}
            className="space-y-4 flex gap-3 justify-around px-4 overflow-x-auto"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            {correctPassword?.password.split("").map((letter, index) => (
              <Fragment key={index}>
                {letter === " " ? (
                  <input className={`w-[25px] h-[40px]`} disabled />
                ) : (
                  <InputLetter
                    correctLetter={letter}
                    handleInput={handleInput}
                    index={index}
                    showAnswer={letterToShow.includes(index)}
                  />
                )}
              </Fragment>
            ))}
            {/* A pulse indicator to show when there is more content to the left or right */}
            {showLeftIndicator && (
              <div
                className={`arrow absolute left-7 ${
                  showRightIndicator ? "bottom-[48px]" : "bottom-[64px]"
                }`}
              >
                <span></span>
                <span></span>
              </div>
            )}

            {showRightIndicator && (
              <div className="arrow absolute right-7 bottom-[64px] scale-x-[-1]">
                <span></span>
                <span></span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
