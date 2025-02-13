import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function CameraController({ position, target, duration }) {
  const { camera } = useThree();
  const cameraRef = useRef(null);

  const cameraAnimate = () => {
    if (cameraRef.current) {
      gsap.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: duration || 2,
        onUpdate: () => camera.lookAt(target.x, target.y, target.z),
        ease: "expo.inOut",
      });
    }
  };

  useEffect(() => {
    cameraAnimate();
  }, [target, position]);

  return (
    <OrbitControls
      ref={cameraRef}
      enableZoom={false}
      enableRotate={false}
      enablePan={false}
      target={[target.x, target.y, target.z]}
    />
  );
}

export default CameraController;
