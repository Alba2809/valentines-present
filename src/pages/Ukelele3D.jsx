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

function Ukelele3D() {
  const [loaded, setLoaded] = useState(false);
  const [ukeleleClicked, setUkeleleClicked] = useState(false);
  const [stringToPlay, setStringToPlay] = useState(null);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const [stringAnimation, setStringAnimation] = useState(null);
  const [sparklesAnimation, setSparklesAnimation] = useState(null);

  const handlePlayNote = (note) => {
    if (note !== notes.loaded && note !== notes.gift) {
      setStringToPlay(note);
      if(stringAnimation) stringAnimation(note);
      if(sparklesAnimation) sparklesAnimation(note);
      return PlayUkeleleSound(note);
    }
  };

  const passingAnimationsFunction = (ukeleleAnimationFunction, sparklesAnimationFunction) => {
    if (ukeleleAnimationFunction) {
      setStringAnimation(() =>ukeleleAnimationFunction)
    }
    if (sparklesAnimationFunction) {
      setSparklesAnimation(() =>sparklesAnimationFunction)
    }
  }

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        PlayUkeleleSound(notes.loaded);
      }, 700);
    }
  }, [loaded]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <DockOptions showComponent={ukeleleClicked} notes={notes} handlePlayNote={handlePlayNote} />
      <UkeleleModel
        clicked={ukeleleClicked}
        setClicked={setUkeleleClicked}
        passingAnimationsFunction={passingAnimationsFunction}
      />
      <LoadingScreen setLoaded={setLoaded} />
    </div>
  );
}

const audios = {};

function PlayUkeleleSound(note) {
  // Ruta del archivo de audio
  const audioPath = `/sounds/ukelele-${note}.wav`;

  // Si ya hay un audio sonando para esta nota, detenerlo y reiniciarlo
  if (audios[note]) {
    audios[note].pause();
    audios[note].currentTime = 0;
  }

  // Crear un nuevo objeto de audio
  const audio = new Audio(audioPath);

  if(note !== notes.loaded) audio.volume = 0.5;

  // Manejar errores
  audio.addEventListener("error", (error) => {
    console.error(`Error al cargar el sonido: ${error.message}`);
  });

  // Reproducir el nuevo audio
  audio.play().catch((error) => {
    console.error(`Error al reproducir el sonido: ${error.message}`);
  });

  // Guardar el audio en el objeto
  audios[note] = audio;

  // Eliminar el audio del objeto cuando termine de reproducirse
  audio.addEventListener("ended", () => {
    delete audios[note];
  });
}

export default Ukelele3D;
