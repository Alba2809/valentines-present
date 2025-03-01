import LoadingScreen from "../components/ThreeJs/LoadingScreen";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import UkeleleModel from "../components/ThreeJs/UkelelePage/UkeleleModel";
import DockOptions from "../components/ThreeJs/UkelelePage/DockOptions";

const notes = {
  string1: "a",
  string2: "c",
  string3: "e",
  string4: "g",
  loaded: "open",
  gift: "gift",
};

const audiosInstances = {
  a: new Audio("/sounds/ukelele-a.wav"),
  c: new Audio("/sounds/ukelele-c.wav"),
  e: new Audio("/sounds/ukelele-e.wav"),
  g: new Audio("/sounds/ukelele-g.wav"),
  open: new Audio("/sounds/ukelele-open.wav"),
  gift: new Audio("/sounds/ukelele-gift.wav"),
};

const song = [
  { note: "c", delay: 500 }, 
  { note: "c", delay: 500 }, 
  { note: "g", delay: 500 }, 
  { note: "g", delay: 500 }, 
  { note: "a", delay: 500 }, 
  { note: "a", delay: 500 }, 
  { note: "g", delay: 1000 },

  { note: "e", delay: 500 },
  { note: "e", delay: 500 },
  { note: "c", delay: 500 },
  { note: "c", delay: 500 },
  { note: "g", delay: 500 },
  { note: "g", delay: 500 },
  { note: "c", delay: 1000 },
];

function Ukelele3D() {
  const [loaded, setLoaded] = useState(false);
  const [ukeleleClicked, setUkeleleClicked] = useState(false);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const [stringAnimation, setStringAnimation] = useState(null);
  const [sparklesAnimation, setSparklesAnimation] = useState(null);
  const [playingSong, setPlayingSong] = useState(false);

  const handlePlayNote = (note) => {
    if (note !== notes.loaded && note !== notes.gift) {
      playAnimations(note);
      return PlayUkeleleSound(note);
    } else if (note === notes.gift) {
      setPlayingSong(true);
      playCustomSong(
        song,
        () => {
          setPlayingSong(false);
        },
        playAnimations
      );
    }
  };

  const passingAnimationsFunction = (
    ukeleleAnimationFunction,
    sparklesAnimationFunction
  ) => {
    if (ukeleleAnimationFunction) {
      setStringAnimation(() => ukeleleAnimationFunction);
    }
    if (sparklesAnimationFunction) {
      setSparklesAnimation(() => sparklesAnimationFunction);
    }
  };

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        PlayUkeleleSound(notes.loaded);
      }, 700);
    }
  }, [loaded]);

  const playAnimations = (note) => {
    if (stringAnimation) stringAnimation(note);
    if (sparklesAnimation) sparklesAnimation(note);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <DockOptions
        showComponent={ukeleleClicked}
        notes={notes}
        handlePlayNote={handlePlayNote}
        playingSong={playingSong}
      />
      <UkeleleModel
        clicked={ukeleleClicked}
        setClicked={setUkeleleClicked}
        passingAnimationsFunction={passingAnimationsFunction}
        isMobile={isMobile}
      />
      <LoadingScreen setLoaded={setLoaded} />
    </div>
  );
}

let audioClones = [];

function PlayUkeleleSound(note) {
  const audio = audiosInstances[note];

  if (note !== notes.loaded) audio.volume = 0.5;

  if (!audio) {
    console.error(`No se encontró un audio para la nota: ${note}`);
    return;
  }

  if (!audio.paused) {
    const newAudio = audio.cloneNode(true);
    newAudio.volume = 0.5;

    audioClones.push(newAudio);

    newAudio.play().catch((error) => {
      console.error(`Error al reproducir el sonido: ${error.message}`);
    });

    newAudio.addEventListener("ended", () => {
      audioClones = audioClones.filter((audio) => audio !== newAudio);
    });

    return;
  }

  // Reproducir el nuevo audio
  audio.play().catch((error) => {
    console.error(`Error al reproducir el sonido: ${error.message}`);
  });
}

function playCustomSong(song, onFinish = () => {}, playAnimations = () => {}) {
  let currentStep = 0;

  const playNextNote = () => {
    if (currentStep >= song.length) {
      return onFinish();
    }

    const { note, delay } = song[currentStep];
    playAnimations(note); // Reproducir la nota
    PlayUkeleleSound(note); // Reproducir la nota
    currentStep++;

    // Esperar el tiempo indicado antes de reproducir la siguiente nota
    setTimeout(playNextNote, delay);
  };

  // Iniciar la reproducción de la canción
  playNextNote();
}

export default Ukelele3D;
