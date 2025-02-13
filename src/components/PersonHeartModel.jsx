import { Canvas } from "@react-three/fiber";
import CameraController from "./ThreeJs/cameraController";
import BloomEffect from "./ThreeJs/BloomEffect";
import Lights from "./ThreeJs/Lights";
import { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce, LoopRepeat } from "three";

function PersonHeartModel({
  width = "100vw",
  height = "100vh",
  clicked,
  setClicked,
}) {
  const [position, setPosition] = useState({ x: 0, y: 1.37, z: 0.6 });
  const [target, setTarget] = useState({ x: 0, y: 1.35, z: 0.3 });

  const handleClicked = () => {
    setClicked(true);
    setPosition({ x: 0, y: 1.35, z: 1 });
  };

  return (
    <Canvas
      style={{ width, height }}
      camera={{ position: [position.x, position.y, position.z], zoom: 3 }}
    >
      <CameraController position={position} target={target} duration={4} />

      <BloomEffect
        clicked={clicked}
        duration={4}
        initialIntensity={0.3}
        finalIntensity={0.4}
      />

      <Lights clicked={clicked} duration={4} />
      <HumanAndHeart handleClicked={handleClicked} />
    </Canvas>
  );
}

const HumanAndHeart = ({ handleClicked }) => {
  const group = useRef(); // Referencia al grupo principal del modelo
  const heartRef = useRef();
  const { scene, animations } = useGLTF("/model3d/ValentineHeart.glb");
  const { actions } = useAnimations(animations, group);
  const [animationsStarted, setAnimationsStarted] = useState(false);

  useEffect(() => {
    const heartMesh = scene.getObjectByName("HeartModel");
    heartRef.current = heartMesh;
  }, [scene]);

  const handleClick = () => {
    if (animationsStarted) return;

    setAnimationsStarted(true);
    handleClicked();
    const bodyAction = actions["Body"]; // Animación del cuerpo
    const heartMoveAction = actions["HeartMove"]; // Animación del corazón
    const heartRotationAction = actions["HeartRotation"]; // Animación de rotación del corazón

    if (bodyAction && heartMoveAction && heartRotationAction) {
      bodyAction.setLoop(LoopOnce); // Ejecutar una sola vez
      bodyAction.clampWhenFinished = true; // Mantener pose final
      bodyAction.play();

      heartMoveAction.setLoop(LoopOnce);
      heartMoveAction.clampWhenFinished = true;
      heartMoveAction.play();

      heartMoveAction.getMixer().addEventListener("finished", () => {
        heartRotationAction.setLoop(LoopRepeat); // Ciclo infinito
        heartRotationAction.play();
      });
    }
  };

  return (
    <group ref={group}>
      <primitive object={scene} />
      <mesh position={[0, 1.35, 0.05]} onClick={handleClick}>
        <boxGeometry args={[0.05, 0.05, 0.05]} /> {/* Tamaño ajustable */}
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

export default PersonHeartModel;
