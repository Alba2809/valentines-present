import { AnimatePresence, motion } from "motion/react";
import "../components/styles/FlowerAnimated.css";
import MainFlower from "../components/FlowerPage/MainFlower";
import SecondaryFlowers from "../components/FlowerPage/SecondaryFlowers";
import GlassFlower from "../components/FlowerPage/GlassFlower";
import AnimatedCard from "../components/FlowerPage/AnimatedCard";
import { useFlower } from "../hooks/useFlower";

function Flower() {
  const {
    isMobile,
    isFlowerClicked,
    handleFlowerClick,
    handleCardInteraction,
    handleCloseDialog,
    flowerAnimation,
    animationConfig,
    cardAnimation,
    cardStartPosition,
    cardClicked,
    dialogVisible,
    textCard,
    controlsValentineCard,
    glassStartPosition,
  } = useFlower();

  return (
    <div
      className={`h-screen w-full bg-gray-900 flex items-end justify-center overflow-hidden relative`}
    >
      <AnimatePresence>
        {!isFlowerClicked && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: animationConfig.message }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="text-gray-400 absolute top-20 md:top-5 left-1/2 transform -translate-x-1/2 font-love text-center"
            style={{ fontSize: isMobile ? "8vh" : "10vh" }}
          >
            Toca las flores
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFlowerClicked && !cardClicked && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: animationConfig.message.duration,
                delay: 15,
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="text-gray-400 absolute top-10 md:top-5 left-1/2 transform -translate-x-1/2 font-love text-center leading-16 md:leading-normal"
            style={{ fontSize: isMobile ? "8vh" : "10vh" }}
          >
            Toca la carta
          </motion.h1>
        )}
      </AnimatePresence>

      <div className="flowers" onClick={handleFlowerClick}>
        <motion.div animate={flowerAnimation} className="relative">
          <MainFlower />
          <AnimatePresence>
            {isFlowerClicked && (
              <GlassFlower
                glassContainerAnimationDurations={animationConfig.glassEffect}
                isMobile={isMobile}
                glassStartPosition={glassStartPosition}
              />
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {!isFlowerClicked && (
            <SecondaryFlowers
              fadeFlowersDurantions={animationConfig.fadeFlowers}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFlowerClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 13 } }}
          >
            <AnimatedCard
              isMobile={isMobile}
              cardAnimation={cardAnimation}
              handleCardInteraction={handleCardInteraction}
              handleCloseDialog={handleCloseDialog}
              cardClicked={cardClicked}
              dialogVisible={dialogVisible}
              cardStartPosition={cardStartPosition}
              textCard={textCard}
              controlsValentineCard={controlsValentineCard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Flower;
