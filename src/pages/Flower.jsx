import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import "../components/styles/FlowerAnimated.css";
import MainFlower from "../components/FlowerPage/MainFlower";
import SecondaryFlowers from "../components/FlowerPage/SecondaryFlowers";
import GlassFlower from "../components/FlowerPage/GlassFlower";
import { useMediaQuery } from "@uidotdev/usehooks";
import AnimatedCard from "../components/FlowerPage/AnimatedCard";
import AudioPlayer from "../components/AudioPlayer";

function Flower() {
  const [canClick, setCanClick] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);
  const flowersInitialAnimation = 7000; /* Tiempo de espera para que el usuario vea la animacion growing */
  const messageAnimationDurations = {
    duration: 0.5,
    delay: 10 /* 3 segundos despues de la animacion inicial */,
  };
  const fadeFlowersDurantions = {
    /* Animacion de fade de flores/pasto (al hacer click) */ duration: 3,
  };
  const flowerAnimationDurations = {
    /* Animacion de la flor principal, despues de hacer click */ duration: 2,
    ease: "easeInOut",
    delay: 3 /* 3 segundos despues de que desaparezcan las flores/pasto */,
  };
  const glassContainerAnimationDurations = {
    duration: 5,
    delay: 6,
  };
  const controls = useAnimation();
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, flowersInitialAnimation);

    return () => clearTimeout(timer);
  }, []);
  const handleClick = () => {
    if (!canClick) return;

    setClicked(true);
  };

  // Ejecutar la animación cuando `clicked` es true
  useEffect(() => {
    if (clicked) {
      controls.start({
        scale: 0.5,
        marginTop: isMobile ? -200 : -180,
        transition: {
          duration: flowerAnimationDurations.duration,
          ease: flowerAnimationDurations.ease,
          delay: flowerAnimationDurations.delay,
        },
      });
    }
  }, [clicked, controls]);

  const handleClickedCard = (isClicked) => {
    setCardClicked(isClicked);
  };

  return (
    <div
      className={`h-screen w-full bg-gray-900 flex items-end justify-center overflow-hidden relative`}
    >
      <AnimatePresence>
        {!clicked && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: messageAnimationDurations.duration,
                delay: messageAnimationDurations.delay,
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="text-gray-400 absolute top-20 md:top-5 left-1/2 transform -translate-x-1/2 font-love text-center"
            style={{ fontSize: isMobile ? "8vh" : "10vh" }}
          >
            Toca las flores
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {clicked && !cardClicked && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: messageAnimationDurations.duration,
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

      <div className="flowers" onClick={handleClick}>
        <motion.div animate={controls} className="relative">
          <MainFlower />
          <AnimatePresence>
            {clicked && (
              <GlassFlower
                glassContainerAnimationDurations={
                  glassContainerAnimationDurations
                }
              />
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {!clicked && (
            <SecondaryFlowers fadeFlowersDurantions={fadeFlowersDurantions} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 13 } }}
          >
            <AnimatedCard handleClicked={handleClickedCard} />
          </motion.div>
        )}
      </AnimatePresence>

      <AudioPlayer />
    </div>
  );
}

export default Flower;
