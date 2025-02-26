import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function BloomEffect({ clicked, duration = 2, initialIntensity, finalIntensity }) {
  const bloomRef = useRef();

  useEffect(() => {
    const targetIntensity = clicked ? finalIntensity : initialIntensity;

    gsap.to(bloomRef.current, {
      intensity: targetIntensity * 4,
      duration: duration,
      ease: "power2.inOut",
    });
  }, [clicked]);

  return (
    <EffectComposer disableNormalPass>
      <Bloom
        ref={bloomRef}
        mipmapBlur
        luminanceThreshold={1}
        levels={8}
        intensity={initialIntensity * 4}
      />
      <ToneMapping />
    </EffectComposer>
  );
}

export default BloomEffect;
