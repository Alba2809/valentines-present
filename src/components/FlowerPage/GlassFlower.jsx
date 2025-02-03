import { motion } from "motion/react";

function GlassFlower({ glassContainerAnimationDurations }) {
  return (
    <motion.div
      className="h-[1000px] w-[800px] bg-[#122139]/50 backdrop-blur-[1px] rounded-t-full rounded-b-none absolute z-20 bottom-10 left-1/2 transform -translate-x-1/2"
      initial={{ x: 400, y: -1000, rotate: 45, opacity: 0 }}
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
      <div className="size-20 origin-center border-[25px] border-[#122139] rounded-full absolute top-[-10%] left-1/2 transform -translate-x-1/2"></div>
      <div className="w-[26px] h-[330px] bg-white opacity-20 absolute left-[85%] top-[200px] rounded-[100px] z-10">
        <div className="w-[26px] h-[40px] absolute bg-white top-[365px] rounded-[100px]"></div>
      </div>
      <div className="absolute h-[2%] w-full bg-[#a52a2a] top-full left-0"></div>
    </motion.div>
  );
}

export default GlassFlower;
