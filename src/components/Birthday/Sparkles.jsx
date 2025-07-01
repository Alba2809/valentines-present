import "../styles/GiftSpakles.css";

function Sparkles() {

  return (
    <>
      {[...Array(15)].map((_, i) => (
        <div key={i} className={`firework firework-${i + 1}`} />
      ))}
    </>
  );
}

export default Sparkles;