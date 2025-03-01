import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function CameraController({ position, target, duration = 2, animate = true }) {
  const { camera } = useThree();
  const cameraRef = useRef(null);

  const cameraAnimate = () => {
    if (cameraRef.current) {
      gsap.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: duration,
        onUpdate: () => camera.lookAt(target.x, target.y, target.z),
        ease: "expo.inOut",
      });
      gsap.to(cameraRef.current.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: duration,
        ease: "expo.inOut",
      })
    }
  };

  useEffect(() => {
    if(animate) cameraAnimate();
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
