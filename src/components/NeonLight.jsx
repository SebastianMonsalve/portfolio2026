import React, { useRef, useMemo } from "react";

function NeonLight({ size = 400, color = "bg-neon1", className = "" }) {
  const delayRef = useRef(`${Math.random() * 3}s`);
  const durationRef = useRef(`${4 + Math.random() * 4}s`);

  const style = useMemo(() => {
    const value = (v) => (typeof v === "number" ? `${v}px` : v);
    return {
      width: value(size),
      height: value(size),
      animationDelay: delayRef.current,
      animationDuration: durationRef.current,
      willChange: "transform, opacity",
      transform: "translateZ(0)",
    };
  }, [size]);

  return (
    <div
      aria-hidden="true"
      className={`${color} neon absolute rounded-full pointer-events-none ${className}`}
      style={style}
    />
  );
}

export default React.memo(NeonLight);
