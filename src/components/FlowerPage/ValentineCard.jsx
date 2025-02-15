import { AnimatePresence, motion } from "motion/react";
import "../styles/ValentineCard.css";

function ValentineCard({ cardClicked, controlsUp, controlsLidOne, controlsLidTwo, controlsLetter }) {

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
        {!cardClicked && (
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
