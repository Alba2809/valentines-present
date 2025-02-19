import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SplitText = ({
  texts = [[""]],
  delay = 100,
  animationFrom = { opacity: 0, y: 10 },
  animationTo = { opacity: 1, y: 0 },
  exitAnimation = { opacity: 0, y: -10 },
  duration = 0.5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const sentence = texts[currentIndex].map((paragraph) => paragraph.split(" "));
  const totalWords = sentence.reduce((acc, w) => acc + w.length, 0);

  useEffect(() => {
    if (isFinished) {
      const totalWait = duration * 1000 * totalWords * 2;
      // Espera 0.5s para la salida, luego cambia el texto
      setTimeout(() => {
        setIsFinished(false);
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentIndex(nextIndex);
      }, totalWait);
    }
  }, [isFinished, texts.length]);

  const handleAnimationComplete = () => {
    if (texts.length === 1 || isFinished) return;

    setTimeout(() => setIsFinished(true), 2000); // Espera 2s antes de salir
  };

  return (
    <p>
      {sentence.map((paragraph, paraIndex) => (
        <motion.span
          className="flex flex-wrap gap-[0.3em] justify-center animate-pulse"
          key={paraIndex}
        >
          {paragraph.map((word, wordIndex) => {
            const index =
              sentence
                .slice(0, paraIndex)
                .reduce((acc, w) => acc + w.length, 0) + wordIndex;
            const isLastWord = index === totalWords - 1;

            return (
              <motion.span
                key={index}
                initial={animationFrom}
                animate={isFinished ? exitAnimation : animationTo}
                transition={{
                  duration,
                  delay: index + (isFinished ? 0 : delay),
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
                onAnimationComplete={
                  isLastWord ? handleAnimationComplete : undefined
                }
              >
                {word}
              </motion.span>
            );
          })}
        </motion.span>
      ))}
      {}
    </p>
  );
};

export default SplitText;
