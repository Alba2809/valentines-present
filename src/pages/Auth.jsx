import { Fragment, useEffect, useRef, useState } from "react";
import Decorations from "../components/AuthPage/Decorations";
import AnimatedFace from "../components/AnimatedFace";
import InputLetter from "../components/AuthPage/InputLetter";
import { passwords } from "../data/passwords.json";
import MessageTimer from "../components/AuthPage/MessageTimer";
import "../components/styles/Arrow.css";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import ThemeToggle from "../components/ThemeToggle";

function Auth() {
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [letterToShow, setLetterToShow] = useState([]);
  const [correctPassword, setCorrectPassword] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * passwords.length);
    setCorrectPassword(passwords[randomIndex]);
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

  const handleFinish = () => {
    localStorage.setItem("completedFlowerChallenge", "true");
    navigate("/flower");
  };

  return (
    <div className="min-h-screen bg-pink-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ThemeToggle />
      <Decorations />
      <div className="bg-white/30 backdrop-blur-sm dark:backdrop-blur-sm dark:bg-gray-800/30 rounded-lg shadow-xl p-8 max-w-md w-full relative z-10">
        <AnimatePresence mode="popLayout">
          <motion.h1
            className="text-red-600 dark:text-red-400 mb-6 text-center font-love font-bold text-4xl"
            style={{ fontSize: "3.8vh" }}
            layout
          >
            {correctPassword?.messages.initial}
          </motion.h1>
          <motion.div key="face" className="mb-4" layout>
            <AnimatedFace attempts={attempts} isCorrect={isCorrect} />
          </motion.div>
          {message && (
            <motion.p
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-800 dark:text-gray-200 font-montez"
              style={{ fontSize: "2.8vh" }}
              layout
            >
              {message}
            </motion.p>
          )}
          {!isCorrect && (
            <Fragment key="form">
              <motion.form
                ref={formRef}
                className="mt-4 flex gap-3 justify-around overflow-x-auto font-hachi font-bold customScroll pb-2"
                style={{ scrollBehavior: "smooth" }}
                layout
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
                
              </motion.form>
            </Fragment>
          )}
        </AnimatePresence>
      </div>
      {isCorrect && (
        <MessageTimer
          message={"Continuando con tu regalo..."}
          time={5}
          handleFinish={handleFinish}
        />
      )}
    </div>
  );
}

export default Auth;
