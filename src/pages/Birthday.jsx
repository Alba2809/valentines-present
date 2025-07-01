import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import "../components/styles/Gift.css";
import CakeAnimation from "../components/Birthday/CakeAnimation";
import { transform } from "motion";
import Messages from "../components/Birthday/Messages";
import Sparkles from "../components/Birthday/Sparkles";

function Birthday() {
  const [isTurnOn, setIsTurnOn] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [giftClicked, setGiftClicked] = useState(false);
  const [cakeAppear, setCakeAppear] = useState(false);

  const animationsDurations = {
    textDissapear: 1,
    btnTurnOnMove: 0.8,
    lightAppearDelay: 4000,
    stringMoveDelay: 3,
  };

  const buttonVariants = {
    btnTurnOn: {
      width: "160px",
      height: "60px",
      backgroundColor: "transparent",
      border: "2px solid #808080",
      borderRadius: "12px",
      padding: "0px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      transition: { duration: 0.5 },
    },
    bulb: {
      width: "50px",
      height: "50px",
      backgroundColor: isTurnOn ? "#fff" : "transparent",
      border: "2px solid #fff",
      borderRadius: "999px",
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translate(-50%, -50%)",
      transition: {
        backgroundColor: { duration: 0.3 },
        duration: animationsDurations.btnTurnOnMove,
        delay: animationsDurations.textDissapear, // sincronizado con el texto
      },
    },
  };

  /* 
  position: absolute;
  top: 0;
  width: 200px;
  background: #ec9c4a;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #e76f51;
  border-radius: 20px;
  z-index: -1;
  transition: 0.5s ease;
  transition-delay: 1.2s;

  transform: translateY(-240px);
   */

  const cakeVariants = {
    message: {
      translateY: "-240px",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 1.2,
      },
    },
    cake: {
      background: "#fff",
      height: "4px",
      width: "330px",
      padding: "0px",
      bottom: "0",
      transform: "translateY(0px)",
      border: "0px",
      transition: {
        transform: {
          delay: 1,
        },
        duration: 0.5,
        ease: "easeOut",
        delay: 1,
      },
    },
    in: {
      translateY: "0px",
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const giftContainerVariants = {
    vibration: {
      scaleX: [1, 0.95, 1.1, 0.9, 1],
      scaleY: [1, 1.05, 0.9, 1.1, 1],
    },
    disabled: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    appear: {
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 0.5,
      },
    },
  };

  const giftCoverVariants = {
    move: {
      y: -240,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.8,
      },
    },
    initial: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    disabled: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const giftBoxVariants = {
    stop: {
      y: 0,
    },
    bounce: {
      y: [-24, 0, -24],
    },
    disabled: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const shadowCakeVariants = {
    stop: {
      y: 0,
      scale: 1,
    },
    bounce: {
      y: [24, 0, 24],
      scale: [0.7, 1, 0.7],
    },
    disabled: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleClick = () => {
    if (hasClicked) return;

    setHasClicked(true);

    setTimeout(() => {
      setIsTurnOn(true);
    }, animationsDurations.lightAppearDelay);
  };

  const handleGiftBoxClick = () => {
    if (cakeAppear) return;

    setGiftClicked(!giftClicked);
  };

  const giftAnimationsSelected = {
    shadow: !giftClicked ? "bounce" : !cakeAppear ? "stop" : "disabled",
    giftBox: !giftClicked ? "bounce" : !cakeAppear ? "stop" : "disabled",
    giftContainer: giftClicked
      ? "vibration"
      : cakeAppear
      ? "disabled"
      : "appear",
    text: giftClicked && !cakeAppear ? "message" : cakeAppear ? "cake" : "in",
    cover: giftClicked ? "move" : cakeAppear ? "disabled" : "initial",
  };

  return (
    <div className="h-screen w-full bg-gray-900 overflow-hidden flex justify-center relative">
      {/* Sparkles */}
      {cakeAppear && <Sparkles />}

      {/* Lamp effect */}
      <div className="relative">
        {/* Bulb */}
        <motion.button
          onClick={handleClick}
          className={`z-10 text-white relative ${
            !isTurnOn && "cursor-pointer"
          }`}
          variants={buttonVariants}
          initial="btnTurnOn"
          animate={hasClicked ? "bulb" : "btnTurnOn"}
        >
          <AnimatePresence>
            {!hasClicked && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: animationsDurations.textDissapear }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                Ilumina el día
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        {/* String */}
        <motion.div
          className={`h-[220px] border-2 w-0 absolute left-1/2 -translate-x-1/2 ml-[50px] top-[-120px] transition duration-150 ${
            isTurnOn ? "border-[#c9c5a4]" : "border-[#808080]"
          }`}
          initial={{ y: 0 }}
          animate={
            hasClicked
              ? {
                  y: [0, 500, 0],
                  transition: {
                    delay: animationsDurations.stringMoveDelay,
                    duration: 0.7,
                  },
                }
              : null
          }
        ></motion.div>
        {/* Light */}
        <div
          className={`w-[50px] h-0 mt-[-35px] border-[715px] border-solid border-transparent border-t-0 border-b-[900px] border-b-[#9e9e72] transition duration-300 image [mask-image:_linear-gradient(to_bottom,transparent_0,_black_0px,_black_calc(-100%),transparent_100%)] ${
            isTurnOn ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>

      {/* Gift box */}
      <AnimatePresence>
        {isTurnOn && (
          <motion.div
            className="gift-container"
            variants={giftContainerVariants}
            animate={giftAnimationsSelected.giftContainer}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <motion.div
              className="shadow"
              variants={shadowCakeVariants}
              animate={giftAnimationsSelected.shadow}
              transition={{
                duration: 4,
                ease: "easeOut",
                repeat: giftClicked ? 0 : Infinity,
                repeatType: "loop",
              }}
            ></motion.div>
            <motion.div
              className={`gift-box ${!giftClicked && "cursor-pointer"}`}
              onClick={handleGiftBoxClick}
              variants={giftBoxVariants}
              animate={giftAnimationsSelected.giftBox}
              transition={{
                duration: 4,
                ease: "easeOut",
                repeat: giftClicked ? 0 : Infinity,
                repeatType: "loop",
              }}
            >
              <motion.div
                className="cover"
                variants={giftCoverVariants}
                animate={giftAnimationsSelected.cover}
                transition={{
                  duration: 4,
                  ease: "easeOut",
                  repeat: giftClicked ? 0 : Infinity,
                  repeatType: "loop",
                }}
              ></motion.div>
            </motion.div>
            <motion.div
              onClick={() => setCakeAppear(true)}
              className={`absolute text-white top-0 w-[200px] p-[20px] text-center text-lg rounded-2xl z-[5] border border-[#ec9c4a] before:absolute before:w-full before:transition-all before:duration-400 hover:before:w-full before:-left-full hover:before:left-0 before:rounded-full before:bg-[#ec9c4a] before:-z-10 before:aspect-square hover:before:scale-150 overflow-hidden isolation-auto ${
                !cakeAppear && "cursor-pointer"
              }`}
              variants={cakeVariants}
              animate={giftAnimationsSelected.text}
            >
              {!cakeAppear && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Feliz cumpleaños!!!
                </motion.h2>
              )}
            </motion.div>
            {cakeAppear && (
              <motion.div
                className="absolute z-[200] top-[-290px] left-1/2 transform -translate-1/2 scale-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CakeAnimation />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cakeAppear && (
          <motion.div
            className="absolute top-[23%] left-1/2 transform -translate-x-1/2 font-[Raleway]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 5, when: "beforeChildren" } }}
            exit={{ opacity: 0 }}
          >
            <Messages />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Birthday;
