import { motion } from "motion/react";
import { IoFlowerSharp, IoHeart } from "react-icons/io5";
import { FlowerAndCard, HeartModel } from "../../data/paths.json";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";

function ChooseSection() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const navigateTo = (path) => {
    localStorage.setItem("completedFlowerChallenge", "true");
    navigate(path);
  };

  return (
    <>
      <motion.div
        className={`fixed bg-pink-100/80 dark:bg-gray-900/80 backdrop-blur-sm z-[101] flex flex-col items-center justify-center px-5 py-3 gap-y-2 shadow-2xl rounded-lg size-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          exit={{ opacity: 0, transition: { delay: 0 } }}
          className="text-red-600 dark:text-red-400 mb-6 text-center font-love"
          style={{ fontSize: isMobile ? "1.8rem" : "2.5rem" }}
        >
          ¿A sección te gustaría ir?
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.8, duration: 0.8 },
          }}
          exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
          className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-300 transition duration-300 cursor-pointer w-full"
          onClick={() => navigateTo(FlowerAndCard)}
        >
          <IoFlowerSharp className={isMobile ? "size-[25px]" : "size-[30px]"} />
          <p className="font-ephesis" style={{ fontSize: isMobile ? "1.7rem" : "2rem" }}>
            Flor
          </p>
        </motion.div>

        {/* line */}
        <hr className="w-full text-gray-400" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.1, duration: 0.8 },
          }}
          exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
          className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-300 cursor-pointer w-full"
          onClick={() => navigateTo(HeartModel)}
        >
          <IoHeart className={isMobile ? "size-[25px]" : "size-[30px]"} />
          <p className="font-ephesis" style={{ fontSize: isMobile ? "1.7rem" : "2rem" }}>
            Corazón
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full z-[100] bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
    </>
  );
}

export default ChooseSection;
