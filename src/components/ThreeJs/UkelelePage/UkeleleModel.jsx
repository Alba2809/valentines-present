import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Stars, useAnimations, useGLTF } from "@react-three/drei";
import { AnimationMixer, LoopOnce } from "three";
import BloomEffect from "../BloomEffect";
import CameraController from "../CameraController";
import UkeleleLights from "./UkeleleLights";

function UkeleleModel({
  width = "100vw",
  height = "100vh",
  clicked = false,
  setClicked,
  passingAnimationsFunction = () => {},
  isMobile = false,
}) {
  const positionsCamera = {
    initial: { x: 80, y: 25, z: 100 },
    afterUkeleleMove: { x: -10, y: 40, z: 22 },
  };

  const targetsCamera = {
    initial: { x: isMobile ? -10 : -35, y: isMobile ? 28 : 25, z: 0 },
    afterUkeleleMove: { x: -35, y: 16, z: isMobile ? 20 : 19 },
  };

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
      <MainModel
        setClicked={setClicked}
        passingAnimationFunction={passingAnimationsFunction}
      />

      <Stars
        count={5000}
        fade={true}
        color="#fff"
        opacity={0.5}
        saturation={10}
      />
      <SparklesModel passingAnimationFunction={passingAnimationsFunction} />
      <BloomEffect
        clicked={true}
        duration={4}
        initialIntensity={0.3}
        finalIntensity={0.3}
      />
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

      ukeleleMoveAction.getMixer();
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
    };

    passingAnimationFunction(animation, null);
  }, [scene]);

  const notes = {
    a: "1",
    c: "2",
    e: "3",
    g: "4",
  };

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

function SparklesModel({ passingAnimationFunction = () => {} }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/model3d/SparkleAnimation.glb");
  const { mixer } = useAnimations(animations, group);

  const notesMap = useMemo(() => {
    return {
      a: scene.clone(),
      c: scene.clone(),
      e: scene.clone(),
      g: scene.clone(),
    };
  }, [scene]);

  useEffect(() => {
    passingAnimationFunction(null, animation);
  }, [scene]);

  const animation = (note) => {
    if (!notesMap[note]) return;

    // console.log(`Reproduciendo animación para nota: ${note}`);

    const target = notesMap[note];
    const newAction = mixer.clipAction(animations[0], target);
    newAction.reset().setLoop(LoopOnce).play();
    newAction.clampWhenFinished = true;
  };

  return (
    <group ref={group}>
      {Object.values(notesMap).map((clone, index) => (
        <primitive key={index} object={clone} />
      ))}
    </group>
  );
}

//preload models
useGLTF.preload("/model3d/Ukelele.glb");
useGLTF.preload("/model3d/SparkleAnimation.glb");

export default UkeleleModel;
