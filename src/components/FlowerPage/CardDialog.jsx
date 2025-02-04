import { useMediaQuery } from "@uidotdev/usehooks";
import { motion } from "motion/react";
import { MdCloseFullscreen } from "react-icons/md";

function CardDialog({ handleCloseDialog }) {
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <div className="w-[95%] h-[96%] md:h-[90%] border-dotted border-[3px] border-[#003049] py-5 px-5 md:py-10 md:px-14 relative">
      
      <motion.h1
        className="text-left font-love font-bold"
        style={{ fontSize: "3.5vh" }}
      >
        Para alguien especial:
      </motion.h1>
      
      <motion.div className="max-h-[93%] overflow-y-auto customScroll pr-1">
        <motion.p
          className="text-left font-montez my-3 mb-10 text-pretty"
          style={{ fontSize: "2.5vh" }}
        >
          ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi
          amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser
          mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero?
          ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi
          amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser
          mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero?
          ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi
          amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi amigo?
          <br />
          <br />
          Si quieres ser mi amigo, ¡te lo agradeceré! Si quieres ser mi
          compañero, ¡te lo agradeceré! Si quieres ser mi amigo, ¡te lo
          agradeceré! Si quieres ¿Quieres ser mi amigo? ¿Quieres ser mi
          compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres
          ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi amigo?
          ¿Quieres ser mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi
          compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres
          ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi amigo?
          ¿Quieres ser mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi
          compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres
          ser mi amigo?
          <br />
          <br />
          Si quieres ser mi amigo, ¡te lo agradeceré! Si quieres ser mi
          compañero, ¡te lo agradeceré! Si quieres ser mi amigo, ¡te lo
          agradeceré! Si quieres ¿Quieres ser mi amigo? ¿Quieres ser mi
          compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres
          ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi amigo?
          ¿Quieres ser mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi
          compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres
          ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres ser mi amigo?
          ¿Quieres ser mi compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi
          compañero? ¿Quieres ser mi amigo? ¿Quieres ser mi compañero? ¿Quieres
          ser mi amigo?
          <br />
          <br />
          Si quieres ser mi amigo, ¡te lo agradeceré! Si quieres ser mi
          compañero, ¡te lo agradeceré! Si quieres ser mi amigo, ¡te lo
          agradeceré! Si quieres
        </motion.p>
      </motion.div>

      <MdCloseFullscreen
        className="absolute top-1 right-1 cursor-pointer rounded-full hover:bg-amber-100 p-1 transition duration-500 ease-in-out"
        onClick={handleCloseDialog}
        size={!isMobile ? "3.5vh" : "4vh"}
      />
    </div>
  );
}

export default CardDialog;
