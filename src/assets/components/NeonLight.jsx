export default function NeonLight({ color, className }) {
  return (
    <div
      className={`
        absolute w-[600px] h-[600px] rounded-full
        blur-[160px] opacity-[0.20] pointer-events-none z-1
        bg-[radial-gradient(circle,var(--color)_0%,transparent_70%)]
        animate-floatLight
        ${className}
      `}
      style={{ "--color": color }}
    />
  );
}
