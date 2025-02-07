import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function MessageTimer({ message, time, handleFinish }) {
  const [countdown, setCountdown] = useState(time);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      handleFinish();
    }
  }, [countdown]);

  return (
    <motion.div
      initial={{ opacity: 0, top: -10 }}
      animate={{ opacity: 1, top: 40, transition: { duration: 0.3 } }}
      //   exit={{ y: 10, opacity: 0 }}
      className="absolute top-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:backdrop-blur-sm rounded-lg w-fit flex items-center justify-center gap-x-2 shadow-xl font-hachi font-bold text-gray-800 dark:text-gray-200 h-fit z-50"
      style={{ fontSize: "1.6vh" }}
    >
      {/* create a animation for the message, where each letter move up and down in different speeds each letter */}
      <p className="text-center text-nowrap">
        {message}
      </p>
      {/* create a animation for the countdown number */}
      <AnimatePresence mode="wait">
        <motion.p
          key={countdown} // Usamos la clave para reiniciar la animación
          className="text-center"
          initial={{ y: -5, opacity: 0 }} // Posición inicial (arriba)
          animate={{ y: 0, opacity: 1 }} // Posición final (centro)
          exit={{ y: 5, opacity: 0 }} // Posición al salir (abajo)
          transition={{ duration: 0.2 }} // Duración de la animación
        >
          {countdown}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

export default MessageTimer;
