import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import CameraController from "../components/ThreeJs/CameraController";
import { Cloud, Sparkles, Stars } from "@react-three/drei";

const positionsCamera = {
  initial: { x: 0, y: 0, z: 0 },
};

const targetsCamera = {
  initial: { x: 0, y: 0, z: 0 },
};

function Test() {
  const width = "100vw";
  const height = "100vh";
  const [trigger, setTrigger] = useState(false);
  const handlePlayNote = () => {
    setTrigger(true);
  };
  return (
    <>
      <Canvas
        style={{ width, height, backgroundColor: "#000" }}
        camera={{ position: [0, 0, 10], zoom: 3 }}
      >
        <CameraController
          position={positionsCamera.initial}
          target={targetsCamera.initial}
          animate={false}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* <SparklesEffect trigger={true} /> */}

        {/* <Sparkles count={50} color="#fff" size={2} opacity={1} speed={0.5} /> */}

        

        {/* <Cloud
          volume={3}
          segments={30}
          opacity={0.05}
          fade={5}
          color={"#fff"}
          growth={5}
          smallestVolume={1}
          seed={100}
        /> */}
      </Canvas>
    </>
  );
}

export default Test;
