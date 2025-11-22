import NeonLight from "./assets/components/NeonLight.jsx";

export default function App() {
  return (
    <div className="relative w-screen min-h-screen bg-[#030303] overflow-hidden">
      <div className="grainy-overlay"></div>
      <NeonLight color="#ff2d95" className="-top-[200px] -left-[150px]" />
      <NeonLight color="#4f46e5" className="-bottom-[200px] -right-[100px]" />
      <NeonLight color="#00eaff" className="top-[40%] left-[60%]" />
      <div className="relative z-10 p-10">
        <h1 className="text-3xl font-bold text-white">Hello World!</h1>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="grainy">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".537"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </svg>
    </div>
  );
}
