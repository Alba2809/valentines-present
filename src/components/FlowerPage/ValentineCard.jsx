import { AnimatePresence, motion, useAnimation } from "motion/react";
import "../styles/ValentineCard.css";
import { useEffect, useState } from "react";

function ValentineCard({ isClicked, initialDelay = 0 }) {
  const controlsUp = useAnimation();
  const controlsLidOne = useAnimation();
  const controlsLidTwo = useAnimation();
  const controlsLetter = useAnimation();
  const [prevClicked, setPrevClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      setPrevClicked(true);
      controlsUp.stop();
      controlsLidOne.start({
        rotateX: 90,
        transition: {
          delay: initialDelay,
        },
      });

      controlsLidTwo.start({
        rotateX: 180,
        transition: {
          delay: initialDelay + 0.25,
        },
      });

      controlsLetter.start({
        y: [0, -300, 0], // Sube a -300px, luego baja a 0
        zIndex: 100, // Sube a 2 y luego baja a 1
        rotateY: 180,
        transition: {
          delay: initialDelay + 1.5,
          duration: 2, // Ajusta la velocidad
          ease: "linear",
          zIndex: {
            delay: initialDelay + 3,
          },
          rotateY: {
            delay: initialDelay + 4,
          },
        },
      });
    } else {
      controlsUp.start({
        y: [0, -30, 0],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        },
      });
      controlsLidOne.start({
        rotateX: 0,
        transition: {
          delay: initialDelay + 2,
        },
      });
      controlsLidTwo.start({
        rotateX: 0,
        transition: {
          delay: initialDelay + 2,
        },
      });
      controlsLetter.start({
        y: prevClicked ? [0, -300, 0] : 0,
        zIndex: 2,
        rotateY: 0,
        transition: {
          delay: initialDelay + 1,
          rotateY: {
            delay: initialDelay,
          },
        },
      });
      setPrevClicked(false);
    }
  }, [isClicked, controlsUp]);

  return (
    <>
      <motion.div animate={controlsUp} className="wrapper">
        <motion.div
          initial={{ rotateX: 0 }}
          animate={controlsLidOne}
          className={`lid one`}
        ></motion.div>

        <motion.div
          initial={{ rotateX: 0 }}
          animate={controlsLidTwo}
          className={`lid two`}
        ></motion.div>

        <motion.div className="envelope"></motion.div>

        <motion.div
          initial={{ y: 0, zIndex: 2 }}
          animate={controlsLetter}
          className="letter transform-3d"
          //   layoutId="letter"
        >
          {/* Cara frontal */}
          <p className="font-bold backface-hidden">
            Para
            <br />
            alguien
            <br />
            especial
          </p>

          {/* Cara trasera */}

          <div className="backface-hidden rotate-y-180 size-full">
            <p className="font-ephesis font-bold mt-1">
              ~~~~~~~~~~~~~~
              <br />
              ~~~~~~~~~~
              <br />
              ~~~~~~~~~~~~~~~~~~~~~~
              <br />
              ~~~~~~~~
            </p>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {!isClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="shadowCard"
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ValentineCard;
