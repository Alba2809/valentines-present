import "./styles/AnimatedFace.css";

function AnimatedFace({ attempts, isCorrect }) {
  // Determina el emoji basado en los intentos y si la respuesta es correcta
  const getEmoji = () => {
    if (isCorrect) return "🥰"; // Emoji feliz si la respuesta es correcta
    switch (attempts) {
      case 1:
        return "🙂"; // Cara sonriente después del primer error
      case 2:
        return "😐"; // Cara neutral después del segundo error
      default:
        return attempts >= 3 ? "🥲" : "😍"; // Cara llorando después del tercer error o más
    }
  };

  const emoji = getEmoji();

  return (
    <div className="emoji-container">
      <div className={`emoji ${emoji ?? "😍"}`}>
        <div className="skin"></div>
        <div className="cheek l"></div>
        <div className="cheek r"></div>
        <div className="mouth"></div>
        <div className="eye l">
          <i></i>
        </div>
        <div className="eye r">
          <i></i>
        </div>
        <div className="decor">
          <i></i>
        </div>
      </div>

    </div>
  );
}

export default AnimatedFace;
