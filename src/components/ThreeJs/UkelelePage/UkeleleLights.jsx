import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

function UkeleleLights() {
  const light1Ref = useRef();
  const directionalLight = useRef();

  //use axis for the directional light using the DirectionalLightHelper
  useHelper(directionalLight, DirectionalLightHelper)
  

  return (
    <>
      <pointLight
        ref={light1Ref}
        position={[0, 5, 2]}
        intensity={8}
        color={"white"}
        decay={1}
      />

      <directionalLight
        ref={directionalLight}
        castShadow
        color={"white"}
        intensity={0.05}
        position={[-10, 20, 15]}
        shadow-mapSize={1024}
        shadow-bias={-0.00001}
        target-position={[0, 10, 0]}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
      </directionalLight>
    </>
  );
}

export default UkeleleLights;
