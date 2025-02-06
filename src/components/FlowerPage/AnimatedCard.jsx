import { AnimatePresence, motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";
import ValentineCard from "./ValentineCard";
import CardDialog from "./CardDialog";
import { useMediaQuery } from "@uidotdev/usehooks";

function AnimatedCard({ handleClicked }) {
  const [isClicked, setIsClicked] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const initialData = {
    top: isMobile ? "82%" : "84%",
    left: isMobile ? "70%" : "60%",
    scale: isMobile ? 0.25 : 0.4,
    translateX: isMobile ? "-50%" : "-60%",
    translateY: isMobile ? "-80%" : "-90%",
    skewY: "-25deg",
  }
  const constrolsMove = useAnimation();
  const cardMoveAnimationDuration = {
    duration: 1,
    delay: 0.5,
  };

  useEffect(() => {
    if (isClicked) {
      constrolsMove.start({
        top: "50%",
        left: "50%",
        scale: 1,
        translateX: "-50%",
        translateY: "-50%",
        skewY: "0deg",
        transition: {
          duration: cardMoveAnimationDuration.duration,
          ease: "easeInOut",
          delay: cardMoveAnimationDuration.delay,
        },
      });
    } else {
      constrolsMove.start(initialData);
    }
  }, [isClicked, constrolsMove]);

  const handleClick = () => {
    if (clickDisabled) return; // Evita múltiples clics
    setIsClicked(!isClicked);
    setClickDisabled(true);
  };

  useEffect(() => {
    if (clickDisabled) {
      const timer = setTimeout(() => {
        setShowDialog(true);
        handleClicked(true)
      }, 8500);

      return () => clearTimeout(timer);
    }
  }, [clickDisabled]);

  const handleCloseDialog = () => {
    setShowDialog(false);
    handleClicked(false)

    const startCloseAnimation = setTimeout(() => {
      setIsClicked(false);
    }, 1000);

    const allowClick = setTimeout(() => {
      setClickDisabled(false);
    }, 10000);

    return () => {
      clearTimeout(allowClick);
      clearTimeout(startCloseAnimation);
    };
  };

  return (
    <>
      <motion.div
        className="absolute z-40 font-kissme"
        initial={initialData}
        animate={constrolsMove}
        onClick={handleClick}
        style={{ fontSize: "3vh" }}
      >
        <ValentineCard
          isClicked={isClicked}
          initialDelay={cardMoveAnimationDuration.duration}
        />
      </motion.div>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="bg-[#eae2b7] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[50] w-[80%] h-[80%] flex items-center justify-center"
          >
            <CardDialog handleCloseDialog={handleCloseDialog} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AnimatedCard;
