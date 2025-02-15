import { AnimatePresence, motion } from "motion/react";
import ValentineCard from "./ValentineCard";
import CardDialog from "./CardDialog";

function AnimatedCard({
  isMobile,
  handleCardInteraction,
  handleCloseDialog,
  cardClicked,
  dialogVisible,
  cardAnimation,
  cardStartPosition,
  textCard,
  controlsValentineCard
}) {

  return (
    <>
      <motion.div
        className="absolute z-40 font-kissme"
        initial={cardStartPosition}
        animate={cardAnimation}
        onClick={() => handleCardInteraction(true)}
        style={{ fontSize: "3vh" }}
      >
        <ValentineCard
          cardClicked={cardClicked}
          controlsUp={controlsValentineCard.controlsUp}
          controlsLidOne={controlsValentineCard.controlsLidOne}
          controlsLidTwo={controlsValentineCard.controlsLidTwo}
          controlsLetter={controlsValentineCard.controlsLetter}
        />
      </motion.div>

      <AnimatePresence>
        {dialogVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="bg-[#eae2b7] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[50] w-[80%] h-[80%] flex items-center justify-center"
          >
            <CardDialog handleCloseDialog={handleCloseDialog} isMobile={isMobile} textCard={textCard} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AnimatedCard;
