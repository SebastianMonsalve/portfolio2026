export default function NeonLight({ size = 400, color, className = "" }) {
  const randomDelay = `${Math.random() * 3}s`;
  const randomDuration = `${4 + Math.random() * 4}s`;
  return (
    <div
      className={`${color} neon absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: randomDelay,
        animationDuration: randomDuration,
      }}
    />
  );
}
