import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Flower from "./pages/Flower";
import VerifyAuth from "./pages/VerifyAuth";
import Test from "./pages/Test";
import Navigator from "./components/Navigator";
import { FlowerAndCard, HeartModel, Home, TestPage } from "./data/paths.json";
import Heart3D from "./pages/Heart3D";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route element={<VerifyAuth />}>
        <Route path={Home} element={<Auth />} />

        <Route element={<Navigator />}>
          <Route element={<AudioPlayer />}>
            <Route path={FlowerAndCard} element={<Flower />} />
            <Route path={HeartModel} element={<Heart3D />} />
          </Route>
        </Route>
      </Route>
      <Route path={TestPage} element={<Test />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
