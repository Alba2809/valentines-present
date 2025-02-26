import { useHelper } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DirectionalLightHelper, Object3D } from "three";

function UkeleleLights({ clicked, duration = 2 }) {
  const mainLightUkelele = useRef();
  const secondaryLightUkelele = useRef();
  const shadowUkelele = useRef();
  const shadowLightWindow = useRef();
 
  useEffect(() => {
    if (clicked) {
      gsap.to(mainLightUkelele.current, {
        intensity: 0,
        duration: duration,
        ease: "power2.out",
      });

      gsap.to(shadowUkelele.current, {
        intensity: 0,
        duration: duration,
        ease: "power2.out",
      });

      gsap.to(secondaryLightUkelele.current, {
        intensity: 8,
        duration: duration,
        ease: "power2.out",
      });
    }
  }, [clicked]);

  const [o] = useState(() => new Object3D());

  return (
    <>
      <pointLight
        ref={mainLightUkelele}
        position={[0, 5, 2]}
        intensity={8}
        color={"white"}
        decay={1}
      />

      <directionalLight
        ref={shadowUkelele}
        castShadow
        color={"white"}
        intensity={0.05}
        position={[-10, 20, 15]}
        shadow-mapSize={1024}
        shadow-bias={-0.00001}
        target-position={[0, 10, 0]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 20, 20, -20]} />
      </directionalLight>

      <group>
        <primitive object={o} position={[-31.5, 0, 45]} />
        <directionalLight
          ref={shadowLightWindow}
          castShadow
          color={"white"}
          intensity={0.05}
          position={[-31.5, 60, -20]}
          shadow-mapSize={1024}
          shadow-bias={-0.00001}
          target={o}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-400, 400, 50, -50]}
          />
        </directionalLight>
      </group>

      <pointLight
        ref={secondaryLightUkelele}
        position={[-35, 35, 20]}
        intensity={0}
        color={"white"}
        // color={"#ffffb7"}
        decay={1}
      />

      {/* x: -22, y: 30, z: 22 */}
    </>
  );
}

export default UkeleleLights;
