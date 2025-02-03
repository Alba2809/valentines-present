import { motion } from "motion/react";
import ThemeToggle from "../components/ThemeToggle";

function Loading() {
  return (
    <ThemeToggle>
      <div className="flex flex-col items-center justify-center h-screen bg-[#fff0f5] text-[#ff1493] dark:bg-[#2d3748] dark:text-[#fd79a8]">
        <div className="heart animate-heart"></div>
        <div className="text-2xl mb-5 ">Verificando contraseña</div>
        <div className="flex flex-row gap-4">
          <motion.span
            className="size-3 bg-[#ff1493] dark:bg-[#fd79a8] rounded-full"
            initial={{ y: 2 }}
            animate={{ y: -2 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 0,
            }}
          />
          <motion.span
            className="size-3 bg-[#ff1493] dark:bg-[#fd79a8] rounded-full"
            initial={{ y: 2 }}
            animate={{ y: -2 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.span
            className="size-3 bg-[#ff1493] dark:bg-[#fd79a8] rounded-full"
            initial={{ y: 2 }}
            animate={{ y: -2 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </ThemeToggle>
  );
}

export default Loading;
