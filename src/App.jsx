import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Flower from "./pages/Flower";
import VerifyAuth from "./components/VerifyAuth";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<ThemeToggle />}>
        <Route element={<VerifyAuth />}>
          <Route path="/" element={<Auth />} />
          <Route path="/flower" element={<Flower />} />
        </Route>
        {/* <Route path="/loading" element={<Loading />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
