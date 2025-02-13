import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { IoFlowerSharp, IoHeart } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import { FlowerAndCard, HeartModel, Home } from "../data/paths.json";

function Navigator() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const navigateTo = (path) => {
    setIsExpanded(false);
    navigate(path);
  };

  return (
    <>
      <motion.div
        className={`fixed bg-[#1a2633]/40 backdrop-blur-sm z-[101] flex flex-col items-center justify-center p-2 gap-y-2 ${
          isExpanded
            ? "shadow-2xl rounded-lg px-4 divide-y divide-gray-400"
            : "shadow-lg rounded-full cursor-pointer hover:bg-[#1a2633]/80 transition duration-400"
        }`}
        initial={{ width: 48, height: 48, top: 16, left: 16, right: "auto" }}
        animate={{
          top: isExpanded ? "50%" : 16,
          left: isExpanded ? "auto" : 16,
          right: isExpanded ? "50%" : "auto",
          transform: isExpanded ? "translate(50%, -50%)" : "translate(0, 0)",
          width: isExpanded ? "auto" : 48,
          height: isExpanded ? "auto" : 48,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onClick={!isExpanded ? toggleExpand : null}
      >
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              className="flex items-center justify-center size-full"
            >
              <CgMenuGridR className="size-full text-gray-100" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isExpanded && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.8 },
                }}
                exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition duration-300 cursor-pointer w-full"
                onClick={() => navigateTo(Home)}
              >
                <IoMdHome className="size-[30px]" />
                <p className="font-ephesis" style={{ fontSize: "2rem" }}>
                  Inicio
                </p>
              </motion.div>

              {currentPath !== FlowerAndCard && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.8, duration: 0.8 },
                  }}
                  exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
                  className="flex items-center gap-3 text-gray-300 hover:text-yellow-300 transition duration-300 cursor-pointer w-full"
                  onClick={() => navigateTo(FlowerAndCard)}
                >
                  <IoFlowerSharp className="size-[30px]" />
                  <p className="font-ephesis" style={{ fontSize: "2rem" }}>
                    Flor
                  </p>
                </motion.div>
              )}

              {currentPath !== HeartModel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 1.1, duration: 0.8 },
                  }}
                  exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
                  className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition duration-300 cursor-pointer w-full"
                  onClick={() => navigateTo(HeartModel)}
                >
                  <IoHeart className="size-[30px]" />
                  <p className="font-ephesis" style={{ fontSize: "2rem" }}>
                    Corazón
                  </p>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full z-[100] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleExpand}
          ></motion.div>
        )}
      </AnimatePresence>

      <Outlet />
    </>
  );
}

export default Navigator;
