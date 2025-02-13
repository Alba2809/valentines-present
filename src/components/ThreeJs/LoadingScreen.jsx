import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import Loading from "../../pages/Loading";

function LoadingScreen({ setLoaded }) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
        setLoaded(true);
    }
  }, [progress]);

  return (
    <>
      <AnimatePresence>
        {progress < 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="fixed w-full h-full bg-black z-[100]"
          >
            <Loading message="Cargando modelo" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LoadingScreen;
