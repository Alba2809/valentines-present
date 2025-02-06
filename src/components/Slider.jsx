import { useRef } from "react";
import "./styles/Slider.css";
import { useEffect } from "react";

function Slider({ value, max, step, onValueChange }) {
  const rangeRef = useRef(null);

  const handleOnChange = (e) => {
    onValueChange(e.target.value);
  };

  useEffect(() => {
    if (rangeRef.current) {
      const percentage = ((value / max) * 100);
      rangeRef.current.style.backgroundSize = `${percentage}% 100%`;
    }
  }, [value, max]);

  return (
    <div className="w-full flex flex-col z-50 mt-3">
      <input
        ref={rangeRef}
        type="range"
        className="cursor-pointer"
        step={step}
        min={0}
        max={max}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Slider;
