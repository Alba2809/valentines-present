import { Dock, DockIcon } from "../../Dock";
import {
  PiBird,
  PiGiftFill,
  PiMoonStarsFill,
  PiShootingStarFill,
  PiSunDimFill,
} from "react-icons/pi";
import { AnimatePresence, motion } from "motion/react";

function DockOptions({
  showComponent = true,
  notes = {
    string1: "a",
    string2: "c",
    string3: "e",
    string4: "g",
    gift: "gift",
  },
  handlePlayNote
}) {
  return (
    <AnimatePresence>
      {showComponent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 6, duration: 1 } }}
          className="absolute z-10 bottom-5"
        >
          <Dock
            direction="bottom"
            className="border-gray-700/80 bg-gray-600/20"
            iconMagnification={60}
            iconDistance={100}
          >
            <DockIcon
              className="bg-black/10"
              onClick={() => handlePlayNote(notes.string1)}
            >
              <PiBird className="size-full text-green-200" />
            </DockIcon>
            <DockIcon
              className="bg-black/10"
              onClick={() => handlePlayNote(notes.string2)}
            >
              <PiSunDimFill className="size-full text-yellow-200" />
            </DockIcon>
            <DockIcon
              className="bg-black/10"
              onClick={() => handlePlayNote(notes.string3)}
            >
              <PiShootingStarFill className="size-full text-blue-200" />
            </DockIcon>
            <DockIcon
              className="bg-black/10"
              onClick={() => handlePlayNote(notes.string4)}
            >
              <PiMoonStarsFill className="size-full text-gray-100" />
            </DockIcon>
            <DockIcon className="bg-black/10" onClick={() => handlePlayNote(notes.gift)}>
              <PiGiftFill className="size-full text-red-100" />
            </DockIcon>
          </Dock>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DockOptions;
