import { Canvas } from "@react-three/fiber";
import LoadingScreen from "../components/ThreeJs/LoadingScreen";
import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import UkeleleModel from "../components/ThreeJs/UkelelePage/UkeleleModel";

function Ukelele3D() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <UkeleleModel />
      <LoadingScreen setLoaded={setLoaded} />
    </div>
  );
}

export default Ukelele3D;
