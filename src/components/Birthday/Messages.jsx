import { useMediaQuery } from "@uidotdev/usehooks";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "¡Feliz cumpleaños!",
  "Que todos tus sueños se hagan realidad",
  "¡Te deseo un día lleno de alegría!",
  "Celebra en grande, te lo mereces",
  "Un año más de éxitos"
];

function Messages() {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={messages[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className={`text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-lime-500 drop-shadow-lg text-center ${isMobile ? "text-4xl" : "text-5xl"}`}
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Messages;
