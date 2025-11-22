export default function NeonLight({
  size = 450,
  color,
  top,
  left,
  right,
  bottom,
}) {
  const randomDelay = `${Math.random() * 3}s`;
  const randomDuration = `${4 + Math.random() * 4}s`;
  return (
    <div
      className={`${color} neon absolute rounded-full pointer-events-none`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        animationDelay: randomDelay,
        animationDuration: randomDuration,
      }}
    />
  );
}
