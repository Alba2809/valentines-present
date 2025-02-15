import { useMediaQuery } from "@uidotdev/usehooks";
import { useAnimation } from "motion/react";
import { useEffect, useState } from "react";

export const useFlower = () => {
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  // Estado para la interacción de las flores
  const [isFlowerClickable, setIsFlowerClickable] = useState(false);
  const [isFlowerClicked, setIsFlowerClicked] = useState(false);

  // Estado para la interacción de la carta
  const [cardClicked, setCardClicked] = useState(false);
  const [isCardLocked, setIsCardLocked] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [prevClicked, setPrevClicked] = useState(false);

  // Estado para el manejo del texto de la carta
  const [textCard, setTextCard] = useState("");

  // Controles de animación
  const flowerAnimation = useAnimation();
  const cardAnimation = useAnimation(); // Movimiento de la carta
  const controlsUp = useAnimation(); // Movimiento de flotar de la carta
  const controlsLidOne = useAnimation();
  const controlsLidTwo = useAnimation();
  const controlsLetter = useAnimation();

  const animationConfig = {
    initialDelay: 7000,
    message: { duration: 0.5, delay: 10 },
    fadeFlowers: { duration: 3 },
    flowerTransition: { duration: 2, ease: "easeInOut", delay: 3 },
    glassEffect: { duration: 5, delay: 6 },
    cardMovement: { duration: 1, ease: "easeInOut", delay: 0.5 },
    lidAnimationDelay: 0.25,
    letterAnimationDelay: 1.5,
  };

  const glassStartPosition = {
    x: isMobile ? 200 : 400,
    y: isMobile ? -600 : -1000,
    rotate: 45,
    opacity: 0,
  };

  const cardStartPosition = {
    top: isMobile ? "82%" : "84%",
    left: isMobile ? "70%" : "60%",
    scale: isMobile ? 0.25 : 0.4,
    translateX: isMobile ? "-50%" : "-60%",
    translateY: isMobile ? "-80%" : "-90%",
    skewY: "-25deg",
  };

  useEffect(() => {
    setTextCard(import.meta.env.VITE_TEXT_CARD || "");

    const timer = setTimeout(
      () => setIsFlowerClickable(true),
      animationConfig.initialDelay
    );
    return () => clearTimeout(timer);
  }, []);

  const handleFlowerClick = () => {
    if (!isFlowerClickable) return;
    setIsFlowerClicked(true);
  };

  useEffect(() => {
    if (isFlowerClicked) {
      flowerAnimation.start({
        scale: 0.5,
        marginTop: isMobile ? -200 : -180,
        transition: animationConfig.flowerTransition,
      });
    }
  }, [isFlowerClicked, flowerAnimation]);

  useEffect(() => {
    cardAnimation.start(
      cardClicked
        ? {
            top: "50%",
            left: "50%",
            scale: 1,
            translateX: "-50%",
            translateY: "-50%",
            skewY: "0deg",
            transition: animationConfig.cardMovement,
          }
        : cardStartPosition
    );
  }, [cardClicked, cardAnimation]);

  const handleCardInteraction = (value) => {
    if (cardClicked || isCardLocked) return;

    setCardClicked(value);
    if (value) {
      setIsCardLocked(true);
      setTimeout(() => {
        setDialogVisible(true);
      }, 8500);
    }
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
    setTimeout(() => setIsCardLocked(false), 10000);
    setTimeout(() => setCardClicked(false), 1000);
  };

  useEffect(() => {
    if(!isFlowerClicked) return

    if (cardClicked) {
      setPrevClicked(true);
      controlsUp.stop();
      controlsLidOne.start({
        rotateX: 90,
        transition: { delay: animationConfig.cardMovement.duration },
      });
      controlsLidTwo.start({
        rotateX: 180,
        transition: {
          delay:
            animationConfig.cardMovement.duration +
            animationConfig.lidAnimationDelay,
        },
      });
      controlsLetter.start({
        y: [0, -300, 0],
        zIndex: 100,
        rotateY: 180,
        transition: {
          delay:
            animationConfig.cardMovement.duration +
            animationConfig.letterAnimationDelay,
          duration: 2,
          ease: "linear",
          zIndex: { delay: animationConfig.cardMovement.duration + 3 },
          rotateY: { delay: animationConfig.cardMovement.duration + 4 },
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
        transition: { delay: animationConfig.cardMovement.duration + 2 },
      });
      controlsLidTwo.start({
        rotateX: 0,
        transition: { delay: animationConfig.cardMovement.duration + 2 },
      });
      controlsLetter.start({
        y: prevClicked ? [0, -300, 0] : 0,
        zIndex: 2,
        rotateY: 0,
        transition: {
          delay: animationConfig.cardMovement.duration + 1,
          rotateY: { delay: animationConfig.cardMovement.duration },
        },
      });
      setPrevClicked(false);
    }
  }, [cardClicked, isFlowerClicked]);

  return {
    isMobile,
    isFlowerClicked,
    cardClicked,
    dialogVisible,
    handleFlowerClick,
    handleCardInteraction,
    handleCloseDialog,
    flowerAnimation,
    cardAnimation,
    animationConfig,
    cardStartPosition,
    textCard,
    controlsValentineCard: {
      controlsUp,
      controlsLidOne,
      controlsLidTwo,
      controlsLetter,
    },
    glassStartPosition
  };
};
