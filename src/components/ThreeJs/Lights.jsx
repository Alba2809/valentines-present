import { useEffect, useRef } from "react";
import gsap from "gsap";

function Lights({ clicked, duration }) {
  const light1Ref = useRef();
  const light2Ref = useRef();

  const lightAnimate = ({ intensity, duration }) => {
    if (light1Ref.current && light2Ref.current) {
      gsap.to(light1Ref.current, {
        intensity: intensity,
        duration: duration || 2,
        ease: "power2.out",
      });

      gsap.to(light2Ref.current, {
        intensity: intensity,
        duration: duration || 2,
        ease: "power2.out",
      });
    }
  }

  useEffect(() => {
    const targetIntensity = clicked ? 0.3 : 0.05;

    lightAnimate({intensity: targetIntensity, duration});
  }, [clicked]);

  return (
    <>
      <pointLight
        ref={light1Ref}
        position={[0, 1.4, -0.1]}
        intensity={0.05}
        color={"#FF0400"}
        decay={1}
      />
      <pointLight
        ref={light2Ref}
        position={[0, 1.4, 0.3]}
        intensity={0.05}
        color={"#FF0400"}
        decay={1}
      />
    </>
  );
}

export default Lights;
