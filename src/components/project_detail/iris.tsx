import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { data } from '../../data/GoldenWillowsData';
import towerIrisImg from "../../assets/iris/iristower_new.png"

export default function Iris() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleBack = () => navigate(-1);

  // Find Iris tower in the data
  const irisTower = data.find((t) => t.id === 4 || t.name === "IRIS");

  if (!irisTower) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1e2329] text-white">
        <p>Iris Tower data not found.</p>
      </div>
    );
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex justify-center items-center bg-[#1e2329]">
      {/* SVG Canvas overlaying background image */}
      <svg
        viewBox="0 0 4020 2458"
        className="w-full h-full select-none"
        preserveAspectRatio="none"
      >
        <image href={towerIrisImg} x="0" y="0" width="4020" height="2458" />

        {/* Polygons & Tooltips */}
        {irisTower.floorsData?.map((floor: any) => {
          if (!floor.polygon) return null;

          const isHovered = hoveredId === floor.id;

          // Compute center for tooltip positioning
          const coords = floor.polygon.split(',').map(Number);
          const xCoords = coords.filter((_: number, i: number) => i % 2 === 0);
          const yCoords = coords.filter((_: number, i: number) => i % 2 === 1);
          const xMax = Math.max(...xCoords);
          const yCenter = (Math.min(...yCoords) + Math.max(...yCoords)) / 2;

          return (
            <g key={floor.id}>
              <polygon
                points={floor.polygon}
                fill={isHovered ? "rgba(251, 191, 36, 0.3)" : "transparent"}
                stroke={isHovered ? "#fdaf17" : "transparent"}
                strokeWidth="3.5"
                className="cursor-pointer"
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={() => setHoveredId(floor.id)}
                onMouseLeave={() => setHoveredId(null)}
                onDoubleClick={() => {
                  const floorNum = parseInt(floor.name.replace("Floor ", ""));
                  const refugeFloors = [6, 11, 16, 21, 26, 31, 36];
                  const isRefuge = refugeFloors.includes(floorNum);
                  const floorParam = isRefuge ? `${floorNum}-Refuge` : `${floorNum}`;
                  navigate(`/iris_floor/${floorParam}`, { state: { floorName: floor.name, towerId: 4 } });
                }}
              />
              {isHovered && (
                <g className="pointer-events-none">
                  <polygon points={`${xMax + 20},${yCenter - 8} ${xMax + 20},${yCenter + 8} ${xMax + 5},${yCenter}`} fill="#fdaf17" />
                  <rect x={xMax + 20} y={yCenter - 25} width="180" height="50" rx="8" fill="#fdaf17" />
                  <text x={xMax + 110} y={yCenter + 7} fill="#ffffff" fontSize="22" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}>
                    {floor.name.replace("Floor ", "")} Floor
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Back Button */}
      <div
        onClick={handleBack}
        className="absolute bottom-24 left-6 p-2 bg-black/[0.07] backdrop-blur-xl border border-white/15 w-[55px] h-[55px] flex items-center justify-center rounded-full z-20 cursor-pointer hover:bg-white/15 hover:border-amber-400 transition-all duration-300"
      >
        <IoReturnUpBackOutline size={30} color="white" />
      </div>

      {/* Content Box */}
      <div className="absolute z-20 bottom-24 right-6 p-6 bg-black/[0.3] backdrop-blur-xl border border-white/15 rounded-2xl max-w-sm text-center text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <h2 className="text-xl font-bold mb-2 tracking-wide text-amber-400">
          Tower Name: Iris
        </h2>
        <p className="text-sm text-gray-200 leading-relaxed">
          Configuration Available:<br />
          <span className="text-lg font-semibold text-white mt-1 inline-block bg-amber-500/25 px-5 py-1.5 rounded-full border border-amber-500/40 shadow-inner">
            3 BHK & 4 BHK
          </span>
        </p>
      </div>
    </div>
  );


}
