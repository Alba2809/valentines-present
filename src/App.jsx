import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  FlowerAndCard,
  HeartModel,
  UkeleleModel,
  Home,
  Birthday as BirthdayPath,
  TestPage,
} from "./data/paths.json";
import OrderSentence from "./pages/OrderSentence";
import Flower from "./pages/Flower";
import Test from "./pages/Test";
import Navigator from "./components/Navigator";
import Heart3D from "./pages/Heart3D";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import Ukelele3D from "./pages/Ukelele3D";
import Birthday from "./pages/Birthday";

function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path={Home} element={<OrderSentence />} />

      <Route element={<Navigator />}>
        <Route element={<AudioPlayer />}>
          <Route path={FlowerAndCard} element={<Flower />} />
          <Route path={HeartModel} element={<Heart3D />} />
          <Route path={BirthdayPath} element={<Birthday />} />
        </Route>
        <Route path={UkeleleModel} element={<Ukelele3D />} />
      </Route>
      
      {/* <Route path={TestPage} element={<Test />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
