import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { music as tracks } from "../data/musics.json";
import {
  FiMaximize2,
  FiMinimize2,
  FiPause,
  FiPlay,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";
import { useState } from "react";
import Slider from "./Slider";
import { motion, AnimatePresence } from "motion/react";
import { useMediaQuery } from "@uidotdev/usehooks";

function AudioPlayer() {
  const {
    currentTrack,
    playerState,
    togglePlayPause,
    handleNext,
    handlePrevious,
    seek,
  } = useAudioPlayer(tracks);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const windowWidth = window.innerWidth;
  const smallContainerWidth = isMobile ? 64 : 256;
  const bigContainerWidth = isMobile ? windowWidth - 50 : 448;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleValueChange = (value) => {
    seek(value);
  };

  return (
    <>
      <motion.div
        className={`fixed bg-[#1a2633]/40 backdrop-blur-sm z-[100] ${
          isExpanded ? "shadow-2xl" : "shadow-lg"
        } ${isMobile && !isExpanded ? "rounded-full" : "rounded-lg"}`}
        initial={{
          top: 16,
          right: 16,
          height: 64,
          width: smallContainerWidth,
        }}
        animate={{
          top: isExpanded ? "50%" : 16,
          left: isExpanded ? "50%" : "auto",
          right: isExpanded ? "auto" : 16,
          transform: isExpanded ? "translate(-50%, -50%)" : "translate(0, 0)",
          width: isExpanded ? "100%" : smallContainerWidth,
          height: isExpanded ? "auto" : 64,
          maxWidth: isExpanded ? bigContainerWidth : 256,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div
          className={`w-full h-full p-4 flex items-center ${
            isExpanded ? "flex-col space-y-4" : "space-x-4"
          }`}
        >
          <div
            className={`flex items-center w-full ${
              isExpanded ? "gap-x-4" : "gap-x-2"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, width: 48, height: 48 }}
              animate={{
                opacity: 1,
                width: isExpanded ? 80 : 48,
                height: isExpanded ? 80 : 48,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: isExpanded ? 0.2 : 0,
                },
              }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={currentTrack.thumbnail || ""}
                alt={`${currentTrack.title}`}
                initial={{ rotate: 0 }}
                /* spin animaiton */
                animate={
                  isMobile && !isExpanded
                    ? {
                        rotate: 360,
                        transition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }
                    : { rotate: 0 }
                }
                exit={{ rotate: 0 }}
                className={`size-full object-contain ${
                  isMobile && !isExpanded ? "rounded-full " : "rounded"
                }`}
                onClick={isMobile && !isExpanded ? toggleExpand : null}
              />
            </motion.div>
            <div
              className={`flex-grow ${isExpanded ? "flex-col" : ""} ${
                isMobile && !isExpanded ? "hidden" : ""
              }`}
            >
              <h2
                className={`text-white line-clamp-1 ${
                  isExpanded ? "text-lg font-semibold " : "text-sm"
                }`}
              >
                {currentTrack.title}
              </h2>
              <p
                className={`text-gray-400 line-clamp-1 ${
                  isExpanded ? "text-base" : "text-xs"
                }`}
              >
                {currentTrack.artist}
              </p>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 line-clamp-1"
                >
                  {currentTrack.album}
                </motion.p>
              )}
            </div>
            <div
              className={`flex gap-5 ${isExpanded ? "self-start" : ""}  ${
                isMobile ? "hidden" : ""
              }`}
            >
              {!isExpanded && (
                <button
                  className="rounded-full text-gray-400 hover:text-white flex items-center justify-center"
                  onClick={togglePlayPause}
                >
                  {playerState.isPlaying ? (
                    <FiPause className="w-4 h-4" />
                  ) : (
                    <FiPlay className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                className="text-gray-400 hover:text-white hover:bg-transparent"
                onClick={toggleExpand}
              >
                {isExpanded ? (
                  <FiMinimize2 className="w-6 h-6" />
                ) : (
                  <FiMaximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.7 } }}
                  exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
                  className="space-y-2 w-full"
                >
                  <div className="relative">
                    <Slider
                      value={playerState.currentTime}
                      max={playerState.duration || 100}
                      step={1}
                      onValueChange={handleValueChange}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-sky-300">
                      {formatTime(playerState.currentTime)}
                    </span>
                    <span className="text-gray-500">
                      {formatTime(playerState.duration)}
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.9 } }}
                  exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
                  className="flex items-center justify-around w-full"
                >
                  <button
                    className="text-gray-400 hover:text-white hover:bg-transparent"
                    onClick={handlePrevious}
                  >
                    <FiSkipBack className="w-6 h-6" />
                  </button>
                  <button
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                    onClick={togglePlayPause}
                  >
                    {playerState.isPlaying ? (
                      <FiPause className="w-6 h-6" />
                    ) : (
                      <FiPlay className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    className="text-gray-400 hover:text-white hover:bg-transparent"
                    onClick={handleNext}
                  >
                    <FiSkipForward className="w-6 h-6" />
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleExpand}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AudioPlayer;
