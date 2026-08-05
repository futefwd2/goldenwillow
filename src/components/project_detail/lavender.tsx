import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { data } from '../../data/GoldenWillowsData';
import towerLavenderImg from "../../assets/Lavender_tower/Lavender_tower.png";

// Helper function to format floor name to ordinal (e.g., "Floor 3" -> "3rd Floor")
const getOrdinalFloorName = (name: string) => {
  const match = name.match(/\d+/);
  if (!match) return name;
  const num = parseInt(match[0]);
  let suffix = "th";
  if (num % 10 === 1 && num % 100 !== 11) suffix = "st";
  else if (num % 10 === 2 && num % 100 !== 12) suffix = "nd";
  else if (num % 10 === 3 && num % 100 !== 13) suffix = "rd";
  return `${num}${suffix} Floor`;
};

export default function Lavender() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);

  const handleBack = () => navigate(-1);

  // Find Lavender tower in the data
  const lavenderTower = data.find((t) => t.id === 2 || t.name === "LAVENDER");

  if (!lavenderTower) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1e2329] text-white">
        <p>Lavender Tower data not found.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden flex justify-center items-center bg-[#1e2329]">
      {/* SVG Canvas overlaying background image */}
      <svg
        viewBox="0 0 4096 2717"
        className="w-full h-full select-none"
        preserveAspectRatio="none"
      >
        <image href={towerLavenderImg} x="0" y="0" width="4096" height="2717" />

        {/* Polygons & Tooltips */}
        {lavenderTower.floorsData?.map((floor: any) => {
          if (!floor.polygon) return null;

          // Compute the vertical center of the floor polygon
          const yCoords = floor.polygon.split(',').map(Number).filter((_: number, idx: number) => idx % 2 === 1);
          const yMin = Math.min(...yCoords);
          const yMax = Math.max(...yCoords);
          const yCenter = (yMin + yMax) / 2;

          // Compute the horizontal center of the floor polygon
          const xCoords = floor.polygon.split(',').map(Number).filter((_: number, idx: number) => idx % 2 === 0);
          const xMax = Math.max(...xCoords);

          const isHovered = hoveredId === floor.id;
          const isClicked = clickedId === floor.id;

          return (
            <g key={floor.id}>
              {/* Interactive Floor Polygon */}
              <polygon
                points={floor.polygon}
                fill={isHovered || isClicked ? "rgba(251, 190, 36, 0.55)" : "transparent"}
                stroke={isHovered || isClicked ? "#fdaf17" : "transparent"}
                strokeWidth="2.5"
                className="cursor-pointer"
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={() => setHoveredId(floor.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setClickedId(floor.id === clickedId ? null : floor.id)}
                onDoubleClick={() => {
                  const floorNum = parseInt(floor.name.replace("Floor ", ""));
                  const refugeFloors = [6, 11, 16, 21, 26, 31, 36];
                  const isRefuge = refugeFloors.includes(floorNum);
                  const floorParam = isRefuge ? `${floorNum}-Refuge` : `${floorNum}`;
                  navigate(`/lavender_floor/${floorParam}`, { state: { floorName: floor.name, towerId: 2 } });
                }}
              />

              {/* Tooltip bubble pointing to the right of the floor (rendered statically for DOM stability) */}
              <g
                className="pointer-events-none"
                style={{
                  opacity: isClicked ? 1 : 0,
                  transition: "opacity 0.2s ease"
                }}
              >
                {/* Tooltip base arrow pointing left */}
                <polygon
                  points={`${xMax + 20},${yCenter - 11} ${xMax + 20},${yCenter + 11} ${xMax + 5},${yCenter}`}
                  fill="#fdaf17"
                />
                {/* Tooltip rounded rectangle */}
                <rect
                  x={xMax + 20}
                  y={yCenter - 34}
                  width="240"
                  height="68"
                  rx="10"
                  fill="#fdaf17"
                />
                {/* Tooltip text */}
                <text
                  x={xMax + 140}
                  y={yCenter + 10}
                  fill="#ffffff"
                  fontSize="30"
                  fontWeight="bold"
                  textAnchor="middle"
                  style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                  {getOrdinalFloorName(floor.name)}
                </text>
              </g>
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
          Tower Name: Lavender
        </h2>
        <p className="text-sm text-gray-200 leading-relaxed">
          Configuration Available:<br />
          <span className="text-lg font-semibold text-white mt-1 inline-block bg-amber-500/25 px-5 py-1.5 rounded-full border border-amber-500/40 shadow-inner">
            2 BHK
          </span>
        </p>
      </div>
    </div>
  );
}
