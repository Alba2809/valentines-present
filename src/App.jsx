import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Flower from "./pages/Flower";
import VerifyAuth from "./pages/VerifyAuth";
import Test from "./pages/Test";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<VerifyAuth />}>
        <Route path="/" element={<Auth />} />
        <Route path="/flower" element={<Flower />} />
      </Route>
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
