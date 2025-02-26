import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopOnce } from "three";
import CameraController from "../CameraController";
import UkeleleLights from "./UkeleleLights";

const positionsCamera = {
  initial: { x: 80, y: 25, z: 100 },
  afterUkeleleMove: { x: -10, y: 40, z: 22 },
};

const targetsCamera = {
  initial: { x: -35, y: 25, z: 0 },
  afterUkeleleMove: { x: -35, y: 16, z: 19 },
};

function UkeleleModel({
  width = "100vw",
  height = "100vh",
  clicked = false,
  setClicked,
  passingAnimationFunction
}) {
  const [position, setPosition] = useState(positionsCamera.initial);
  const [targetCamera, setTargetCamera] = useState(targetsCamera.initial);

  useEffect(() => {
    if (clicked) {
      setTargetCamera(targetsCamera.afterUkeleleMove);
      setPosition(positionsCamera.afterUkeleleMove);
    }
  }, [clicked]);

  return (
    <Canvas
      style={{ width, height, backgroundColor: "#000" }}
      camera={{ position: [position.x, position.y, position.z], zoom: 3 }}
      shadows
    >
      <CameraController
        position={position}
        target={targetCamera}
        duration={6}
      />

      <UkeleleLights clicked={clicked} duration={4} />
      <MainModel setClicked={setClicked} passingAnimationFunction={passingAnimationFunction} />
    </Canvas>
  );
}

function MainModel({ setClicked, passingAnimationFunction = () => {} }) {
  const group = useRef(); // Referencia al grupo principal
  const { scene, animations } = useGLTF("/model3d/Ukelele.glb");
  const { actions } = useAnimations(animations, group);
  const [ukAnimationStarted, setUkAnimationStarted] = useState(false);

  // Encontrar el grupo del ukelele y las cuerdas
  const emptyGroup = scene.children.find((child) => child.name === "Empty");
  const strings =
    emptyGroup.children.filter((child) => child.name.startsWith("String_")) ||
    [];

  // Activar sombras en todos los objetos
  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  // Función para iniciar la animación del ukelele
  const handleClickUkelele = () => {
    if (ukAnimationStarted) return;

    setUkAnimationStarted(true);
    setClicked(true);

    const ukeleleMoveAction = actions["UkeleleAnimation"];
    if (ukeleleMoveAction) {
      ukeleleMoveAction.setLoop(LoopOnce);
      ukeleleMoveAction.clampWhenFinished = true;
      ukeleleMoveAction.play();

      ukeleleMoveAction.getMixer()
    }
  };

  // Función para animar una cuerda individualmente
  const handleClickString = (event, stringName) => {
    if (event) event.stopPropagation();
    //get the number of the string clicked
    const stringNumber = stringName.split("_")[1];
    const stringAction = actions[`Vibration_${stringNumber}`];
    if (stringAction) {
      stringAction.reset().setLoop(LoopOnce).play();
    }
  };

  useEffect(() => {
    // Marcar como interactivo el ukelele y las cuerdas
    if (emptyGroup) {
      emptyGroup.traverse((node) => {
        if (node.isMesh) node.userData.clickable = "ukelele";
      });
    }

    strings.forEach((string) => {
      string.userData.clickable = string.name;
    });

    const animation = (stringName) => {
      const stringNumber = notes[stringName];
      const stringAction = actions[`Vibration_${stringNumber}`];

      if (stringAction) {
        stringAction.reset().setLoop(LoopOnce).play();
      }
    }

    passingAnimationFunction(animation);
  }, [scene]);

  const notes = {
    a: "1",
    c: "2",
    e: "3",
    g: "4",
  }

/*   useEffect(() => {
    console.log("dentro")
    if (stringToPlay) {
      const stringNumber = notes[stringToPlay];
      const stringAction = actions[`Vibration_${stringNumber}`];

      if (stringAction) {
        stringAction.reset().setLoop(LoopOnce).play();
      }
    }
  }, [stringToPlay]); */

  // Manejar clics en el modelo
  const handlePointerDown = (event) => {
    const { object } = event;

    if (object.userData.clickable) {
      if (object.userData.clickable === "ukelele") {
        handleClickUkelele();
      } else {
        handleClickString(event, object.userData.clickable);
      }
    }
  };

  return (
    <group ref={group} onPointerDown={handlePointerDown}>
      <primitive object={scene} />
    </group>
  );
}

export default UkeleleModel;
