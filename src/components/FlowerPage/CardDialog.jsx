import { motion } from "motion/react";
import { MdCloseFullscreen } from "react-icons/md";

function CardDialog({ handleCloseDialog, isMobile, textCard }) {

  return (
    <div className="w-[95%] h-[96%] md:h-[90%] border-dotted border-[3px] border-[#003049] py-5 px-5 md:py-10 md:px-14 relative z-50">
      <motion.h1
        initial={{ opacity: 0, y: -5 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 1.1 },
        }}
        className="text-left font-love font-bold subpixel-antialiased"
        style={{ fontSize: "3.5vh" }}
      >
        Para alguien especial:
      </motion.h1>

      <motion.div className="max-h-[93%] overflow-y-auto customScroll pr-1">
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 1.6 },
          }}
          className="text-left font-montez my-3 mb-10"
          style={{ fontSize: "2.5vh", textWrap: "pretty" }}
          dangerouslySetInnerHTML={{ __html: textCard }}
        >
          {/* TODO: Agregar texto aquí, el texto final será por variable de entorno */}
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
