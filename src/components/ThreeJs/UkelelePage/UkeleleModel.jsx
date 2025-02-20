import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import CameraController from "../CameraController";
import BloomEffect from "../BloomEffect";
import UkeleleLights from "./UkeleleLights";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopOnce } from "three";

function UkeleleModel({
  width = "100vw",
  height = "100vh",
  clicked,
  setClicked,
}) {
  const [position, setPosition] = useState({ x: 80, y: 25, z: 100 });
  const [target, setTarget] = useState({ x: -35, y: 25, z: 0 });

  const handleClicked = () => {
    setClicked(true);
    setPosition({ x: 0, y: 1.35, z: 1 });
  };

  return (
    <Canvas
      style={{ width, height }}
      camera={{ position: [position.x, position.y, position.z], zoom: 3 }}
      shadows
    >
      <CameraController position={position} target={target} duration={4} />

      <BloomEffect
        clicked={clicked}
        duration={4}
        initialIntensity={0.3}
        finalIntensity={0.4}
      />

      <UkeleleLights clicked={clicked} duration={4} />
      <Model />
    </Canvas>
  );
}

function Model() {
  const group = useRef(); // Referencia al grupo principal del modelo
  const { scene, animations } = useGLTF("/model3d/Ukelele.glb");
  const { actions } = useAnimations(animations, group);
  const [animationsStarted, setAnimationsStarted] = useState(false);

  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  const handleClickUkelele = () => {
    if (animationsStarted) return;

    setAnimationsStarted(true);
    const ukeleleMoveAction = actions["UkeleleAnimation"];

    if (ukeleleMoveAction) {
      ukeleleMoveAction.setLoop(LoopOnce); // Ejecutar una sola vez
      ukeleleMoveAction.clampWhenFinished = true; // Mantener pose final
      ukeleleMoveAction.play();
    }
  };

  useEffect(() => {
    const emptyGroup = scene.children.find((child) => child.name === "Empty");

    if (emptyGroup) {
      emptyGroup.traverse((node) => {
        if (node.isMesh) {
          node.userData.clickable = true; // Marcar como interactivo
        }
      });
    }
  }, [scene]);

  const handlePointerDown = (event) => {
    if (event.object.userData.clickable) {
      handleClickUkelele();
    }
  };

  return (
    <group ref={group} onPointerDown={handlePointerDown}>
      <primitive object={scene} />
    </group>
  );
}

export default UkeleleModel;
