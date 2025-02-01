import { useEffect, useState } from "react";

function Decorations() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // create a new heart every 500ms
    const interval = setInterval(() => {
      setHearts((prevHearts) => [...prevHearts, <Heart key={Date.now()} />]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-10 left-10 animate-bounce">
        <Daisy />
      </div>
      <div className="absolute bottom-10 right-10 animate-bounce">
        <Daisy />
      </div>
      {hearts}
    </div>
  );
}

function Daisy() {
  return <div className="text-6xl">🌼</div>;
}

function Heart() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000); // Elimina el corazón después de 5 segundos (duración de la animación)

    return () => clearTimeout(timeout);
  }, []);

  const style = {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 20 + 10}px`,
    opacity: visible ? 1 : 0,
    transition: "opacity 1s",
  };

  if (!visible) return null;

  return (
    <div className="absolute text-red-500 animate-float" style={style}>
      ❤️
    </div>
  );
}

export default Decorations;
