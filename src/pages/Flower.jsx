import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import "../components/styles/FlowerAnimated.css";

function Flower() {
  const [canClick, setCanClick] = useState(false);
  const [clicked, setClicked] = useState(false);
  const flowersInitialAnimation = 7000; /* Tiempo de espera para que el usuario vea la animacion growing */
  const messageAnimationDurations = {
    duration: 0.5,
    delay: 10,  /* 3 segundos despues de la animacion inicial */
  };
  const fadeFlowersDurantions = { /* Animacion de fade de flores/pasto (al hacer click) */
    duration: 3,
  };
  const flowerAnimationDurations = { /* Animacion de la flor principal, despues de hacer click */
    duration: 2,
    ease: "easeInOut",
    delay: 3,  /* 3 segundos despues de que desaparezcan las flores/pasto */
  };
  const controls = useAnimation();

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
        marginTop: -100,
        transition: {
          duration: flowerAnimationDurations.duration,
          ease: flowerAnimationDurations.ease,
          delay: flowerAnimationDurations.delay,
        },
      });
    }
  }, [clicked, controls]);

  return (
    <div
      className={`h-screen w-full bg-gray-900 flex items-end justify-center overflow-hidden`}
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
            exit={{ opacity: 0 }}
            className="text-gray-400 absolute top-5 left-1/2 transform -translate-x-1/2 font-love"
            style={{ fontSize: "10vh" }}
          >
            Toca la flor
          </motion.h1>
        )}
      </AnimatePresence>
      <div className="flowers" onClick={handleClick}>
        <motion.div animate={controls} className="relative">
          <div className="flower flower--1 z-10">
            <div className="flower__leafs flower__leafs--1">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>

              <div className="flower__light flower__light--1"></div>
              <div className="flower__light flower__light--2"></div>
              <div className="flower__light flower__light--3"></div>
              <div className="flower__light flower__light--4"></div>
              <div className="flower__light flower__light--5"></div>
              <div className="flower__light flower__light--6"></div>
              <div className="flower__light flower__light--7"></div>
              <div className="flower__light flower__light--8"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
              <div className="flower__line__leaf flower__line__leaf--5"></div>
              <div className="flower__line__leaf flower__line__leaf--6"></div>
            </div>
          </div>
          <AnimatePresence>
            {clicked && (
              <motion.div
                className="h-[1000px] w-[800px] bg-[#122139]/50 backdrop-blur-[1px] rounded-t-full rounded-b-none absolute z-20 bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ x: 400, y: -1000, rotate: 45, opacity: 0 }}
                animate={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: 5, delay: 6 },
                }}
              >
                <div className="size-20 origin-center border-[25px] border-[#122139] rounded-full absolute top-[-10%] left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute h-[2%] w-full bg-[#a52a2a] top-full left-0"></div>
                <div className="w-[26px] h-[330px] bg-white opacity-20 absolute left-[85%] top-[200px] rounded-[100px] z-10">
                  <div className="w-[26px] h-[40px] absolute bg-white top-[365px] rounded-[100px]"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {!clicked && (
            <>
              <motion.div
                className="flower flower--2"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__leafs flower__leafs--2">
                  <div className="flower__leaf flower__leaf--1"></div>
                  <div className="flower__leaf flower__leaf--2"></div>
                  <div className="flower__leaf flower__leaf--3"></div>
                  <div className="flower__leaf flower__leaf--4"></div>
                  <div className="flower__white-circle"></div>

                  <div className="flower__light flower__light--1"></div>
                  <div className="flower__light flower__light--2"></div>
                  <div className="flower__light flower__light--3"></div>
                  <div className="flower__light flower__light--4"></div>
                  <div className="flower__light flower__light--5"></div>
                  <div className="flower__light flower__light--6"></div>
                  <div className="flower__light flower__light--7"></div>
                  <div className="flower__light flower__light--8"></div>
                </div>
                <div className="flower__line">
                  <div className="flower__line__leaf flower__line__leaf--1"></div>
                  <div className="flower__line__leaf flower__line__leaf--2"></div>
                  <div className="flower__line__leaf flower__line__leaf--3"></div>
                  <div className="flower__line__leaf flower__line__leaf--4"></div>
                </div>
              </motion.div>

              <motion.div
                className="flower flower--3"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__leafs flower__leafs--3">
                  <div className="flower__leaf flower__leaf--1"></div>
                  <div className="flower__leaf flower__leaf--2"></div>
                  <div className="flower__leaf flower__leaf--3"></div>
                  <div className="flower__leaf flower__leaf--4"></div>
                  <div className="flower__white-circle"></div>

                  <div className="flower__light flower__light--1"></div>
                  <div className="flower__light flower__light--2"></div>
                  <div className="flower__light flower__light--3"></div>
                  <div className="flower__light flower__light--4"></div>
                  <div className="flower__light flower__light--5"></div>
                  <div className="flower__light flower__light--6"></div>
                  <div className="flower__light flower__light--7"></div>
                  <div className="flower__light flower__light--8"></div>
                </div>
                <div className="flower__line">
                  <div className="flower__line__leaf flower__line__leaf--1"></div>
                  <div className="flower__line__leaf flower__line__leaf--2"></div>
                  <div className="flower__line__leaf flower__line__leaf--3"></div>
                  <div className="flower__line__leaf flower__line__leaf--4"></div>
                </div>
              </motion.div>

              <motion.div
                className="grow-ans"
                style={{ "--d": "1.2s" }}
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__g-long">
                  <div className="flower__g-long__top"></div>
                  <div className="flower__g-long__bottom"></div>
                </div>
              </motion.div>

              <motion.div
                className="growing-grass"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__grass flower__grass--1">
                  <div className="flower__grass--top"></div>
                  <div className="flower__grass--bottom"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                  <div className="flower__grass__overlay"></div>
                </div>
              </motion.div>

              <motion.div
                className="growing-grass"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__grass flower__grass--2">
                  <div className="flower__grass--top"></div>
                  <div className="flower__grass--bottom"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                  <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                  <div className="flower__grass__overlay"></div>
                </div>
              </motion.div>

              <motion.div
                className="grow-ans"
                style={{ "--d": "2.4s" }}
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__g-right flower__g-right--1">
                  <div className="leaf"></div>
                </div>
              </motion.div>

              <motion.div
                className="grow-ans"
                style={{ "--d": "2.8s" }}
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__g-right flower__g-right--2">
                  <div className="leaf"></div>
                </div>
              </motion.div>

              <motion.div
                className="grow-ans"
                style={{ "--d": "2.8s" }}
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__g-front">
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
                    <div className="flower__g-front__leaf"></div>
                  </div>
                  <div className="flower__g-front__line"></div>
                </div>
              </motion.div>

              <motion.div
                className="grow-ans"
                style={{ "--d": "3.2s" }}
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="flower__g-fr">
                  <div className="leaf"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
                  <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--0"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "3s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "2.2s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.4s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.6s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--1"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "3.6s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.8s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.2s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--2"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "4s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.2s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.4s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.6s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--3"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "4s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.2s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.6s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--4"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "4s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.2s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.6s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--5"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "4s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.2s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.6s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--6"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "4.2s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.4s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.6s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "4.8s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>

              <motion.div
                className="long-g long-g--7"
                exit={{ opacity: 0, y: 100, transition: { duration: fadeFlowersDurantions.duration } }}
              >
                <div className="grow-ans" style={{ "--d": "3s" }}>
                  <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.2s" }}>
                  <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.5s" }}>
                  <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{ "--d": "3.6s" }}>
                  <div className="leaf leaf--3"></div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Flower;
