import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Flower from "./pages/Flower";
import VerifyAuth from "./pages/VerifyAuth";
import ThemeToggle from "./components/ThemeToggle"

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<VerifyAuth />}>
        <Route element={<ThemeToggle />}>
          <Route path="/" element={<Auth />} />
        </Route>
        <Route path="/flower" element={<Flower />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
