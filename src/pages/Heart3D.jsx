import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { heart as textsHeart } from "../data/texts.json";
import PersonHeartModel from "../components/PersonHeartModel";
import LoadingScreen from "../components/ThreeJs/LoadingScreen";
import SplitText from "../components/SplitText";

function Heart3D() {
  const [clicked, setClicked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <AnimatePresence>
        {!clicked && loaded && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 2,
                delay: 5,
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="text-gray-400 absolute top-10 md:top-5 left-1/2 transform -translate-x-1/2 font-love text-center leading-16 md:leading-normal z-50"
            style={{ fontSize: isMobile ? "8vh" : "10vh" }}
          >
            Toca el corazón
          </motion.h1>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {/* clicked && loaded */}
        {clicked && loaded && (
          <>
            <div
              className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 font-love text-gray-800 text-center"
              style={{ fontSize: isMobile ? "4vh" : "5vh" }}
            >
              <SplitText
                texts={textsHeart}
                delay={5}
              />
            </div>
          </>
        )}
      </AnimatePresence>
      <PersonHeartModel clicked={clicked} setClicked={setClicked} />
      <LoadingScreen setLoaded={setLoaded} />
    </div>
  );
}

export default Heart3D;
