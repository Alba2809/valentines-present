import { motion } from "motion/react";

function GlassFlower({ glassContainerAnimationDurations, isMobile, glassStartPosition }) {

  return (
    <>
      <motion.div
        className="h-[600px] md:h-[1000px] w-[400px] md:w-[800px] bg-[#122139]/50 backdrop-blur-[1px] rounded-t-full rounded-b-none absolute z-20 bottom-10 left-1/2 transform -translate-x-1/2"
        initial={glassStartPosition}
        animate={{
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          transition: {
            duration: glassContainerAnimationDurations.duration,
            delay: glassContainerAnimationDurations.delay,
          },
        }}
      >
        <div className="size-12 md:size-20 origin-center border-[15px] md:border-[25px] border-[#122139] rounded-full absolute top-[-10%] left-1/2 transform -translate-x-1/2"></div>
        <div className="w-[15px] h-[130px] md:w-[26px] md:h-[330px] bg-white opacity-20 absolute left-[85%] top-[23%] rounded-[100px] z-10">
          <div className="w-[15px] h-[20px] md:w-[26px] md:h-[40px] absolute bg-white top-[110%] rounded-[100px]"></div>
        </div>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          transition: {
            duration: 1.5,
          },
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 2,
            delay: glassContainerAnimationDurations.delay + 0.5,
          },
        }}
        className="absolute h-[20px] w-[400px] md:w-[800px] bg-[#a52a2a] bottom-5 -left-[50%] transform -translate-x-1/2"
      ></motion.div>
    </>
  );
}

export default GlassFlower;
