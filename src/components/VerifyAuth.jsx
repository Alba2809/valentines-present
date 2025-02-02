import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";

function VerifyAuth() {
  const [verifingAuth, setVerifingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Si estamos en la ruta "/", establecer localStorage como "false"
    if (location.pathname === "/") {
        console.log("permitido")
      localStorage.setItem("completedFlowerChallenge", "false");
      setVerifingAuth(false); // Permitir acceso a "/"
      return;
    }

    // Verificar el estado de autenticación para otras rutas
    if (localStorage.getItem("completedFlowerChallenge") === "true") {
      setVerifingAuth(false); // Permitir acceso
    } else {
      console.log("Unauth");
      navigate("/"); // Redirigir a "/" si no está autenticado
    }
  }, []);

  if (verifingAuth) {
    return <Loading />;
  }

  return <Outlet />;
}

export default VerifyAuth;