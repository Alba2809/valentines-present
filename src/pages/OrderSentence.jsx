import { Fragment, useEffect, useState } from "react";
import { passwords } from "../data/passwords.json";
import { AnimatePresence, motion } from "motion/react";
import Decorations from "../components/AuthPage/Decorations";
import AnimatedFace from "../components/AuthPage/AnimatedFace";
import MessageTimer from "../components/AuthPage/MessageTimer";
import ThemeToggle from "../components/ThemeToggle";
import ReorderWord from "../components/AuthPage/ReorderWord";
import ChooseSection from "../components/AuthPage/ChooseSection";
import "../components/styles/Arrow.css";

function OrderSentence() {
  const [attempts, setAttempts] = useState(0);
  const [passwordOrdered, setPasswordOrdered] = useState(false);
  const [passwordData, setPasswordData] = useState(null);
  const [wordsOrdered, setWordsOrdered] = useState([]);
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * passwords.length);
    setPasswordData(passwords[randomIndex]);
  }, []);

  const handleFinish = () => {
    setShowSections(true);
  };

  const handleReorder = (indexWord, isOrdered) => {
    // if word is ordered, added it to wordsOrdered (if not already there) else remove it
    if (isOrdered) {
      if (!wordsOrdered.includes(indexWord)) {
        const newWorlds = [...wordsOrdered, indexWord];
        setWordsOrdered(newWorlds);
      }
    } else {
      setWordsOrdered((prev) => prev.filter((item) => item !== indexWord));
    }
  };

  useEffect(() => {
    if (wordsOrdered.length === passwordData?.password.length) {
      setPasswordOrdered(true);
    }
  }, [wordsOrdered]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAttempts((prevAttempts) => {
        if (prevAttempts >= 3) {
          clearInterval(timer); // Detener el intervalo si alcanza el máximo
          return prevAttempts;
        }
        return prevAttempts + 1;
      });
    }, 8000);

    return () => clearInterval(timer); // Limpiar el intervalo al desmontar
  }, [passwordOrdered]);

  return (
    <div className="min-h-screen bg-pink-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ThemeToggle />
      <Decorations />
      <div className="bg-white/30 backdrop-blur-sm dark:backdrop-blur-sm dark:bg-gray-800/30 rounded-lg shadow-xl p-8 max-w-md w-full relative z-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.h1
            key={"title"}
            className="text-red-600 dark:text-red-400 mb-6 text-center font-montez font-bold"
            style={{ fontSize: "3.8vh" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0 }}
            layout
          >
            {attempts >= 3 &&
              !passwordOrdered &&
              `La contraseña es: ${passwordData?.password.join(" ")}`}
            {attempts < 3 && !passwordOrdered && passwordData?.messages.initial}
            {passwordOrdered && passwordData?.messages.success}
          </motion.h1>
          <motion.div key={"face"} className="mb-4" layout>
            <AnimatedFace
              attempts={attempts}
              passwordOrdered={passwordOrdered}
            />
          </motion.div>
          <div key="paswword" className="flex flex-col gap-y-5 items-center">
            {passwordData?.password.map((word, index) => (
              <Fragment key={index}>
                <ReorderWord
                  handleReorder={handleReorder}
                  indexOriginalWord={index}
                  originalWord={word}
                />
              </Fragment>
            ))}
          </div>
        </AnimatePresence>
      </div>
      {passwordOrdered && (
        <MessageTimer
          message={"Continuando con tu regalo..."}
          time={5}
          handleFinish={handleFinish}
        />
      )}

      {showSections && <ChooseSection />}
    </div>
  );
}

export default OrderSentence;
