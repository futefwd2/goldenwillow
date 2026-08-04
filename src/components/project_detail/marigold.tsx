import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { data } from '../../data/GoldenWillowsData';
import towerMarigoldImg from "../../assets/Marigold/towermarigold.jpg";

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

export default function Marigold() {
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [clickedId, setClickedId] = useState<number | null>(null);

    const handleBack = () => navigate(-1);

    // Find Marigold tower in the data
    const marigoldTower = data.find((t) => t.id === 7 || t.name === "MARIGOLD");

    if (!marigoldTower) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#1e2329] text-white">
                <p>Marigold Tower data not found.</p>
            </div>
        );
    }

    const viewBox = (marigoldTower as any).imageSettings?.viewBox || "0 0 3000 1688";
    const imageWidth = (marigoldTower as any).imageSettings?.width || "3000";
    const imageHeight = (marigoldTower as any).imageSettings?.height || "1688";

    return (
        <div className="relative h-screen w-screen overflow-hidden flex justify-center items-center bg-[#1e2329]">
            {/* SVG Canvas overlaying background image */}
            <svg
                viewBox={viewBox}
                className="w-full h-full select-none"
                preserveAspectRatio="none"
            >
                <image href={towerMarigoldImg} x="0" y="0" width={imageWidth} height={imageHeight} preserveAspectRatio="none" />

                {/* Polygons & Rectangles & Tooltips */}
                {marigoldTower.floorsData?.map((floor: any) => {
                    let yCenter = 0;
                    let xMax = 0;
                    const hasPolygon = !!floor.polygon;

                    let rectX = 0;
                    let rectY = 0;
                    let rectW = 140;
                    let rectH = 15;

                    if (hasPolygon) {
                        // Compute the vertical center of the floor polygon
                        const yCoords = floor.polygon.split(',').map(Number).filter((_: number, idx: number) => idx % 2 === 1);
                        const yMin = Math.min(...yCoords);
                        const yMaxCoords = Math.max(...yCoords);
                        yCenter = (yMin + yMaxCoords) / 2;

                        // Compute the horizontal center of the floor polygon
                        const xCoords = floor.polygon.split(',').map(Number).filter((_: number, idx: number) => idx % 2 === 0);
                        xMax = Math.max(...xCoords);
                    } else {
                        // Calculate SVG rect position from top/left percentages and width/height
                        const topPercent = parseFloat(floor.top || "0");
                        const leftPercent = parseFloat(floor.left || "0");
                        rectW = floor.width || 140;
                        rectH = floor.height || 15;

                        // Viewbox is 3000 x 1688
                        const xCenter = 3000 * (leftPercent / 100);
                        const yCenterCalc = 1688 * (topPercent / 100);

                        rectX = xCenter - rectW / 2;
                        rectY = yCenterCalc - rectH / 2;
                        xMax = xCenter + rectW / 2;
                        yCenter = yCenterCalc;
                    }

                    const isHovered = hoveredId === floor.id;
                    const isClicked = clickedId === floor.id;

                    return (
                        <g key={floor.id}>
                            {hasPolygon ? (
                                /* Interactive Floor Polygon */
                                <polygon
                                    points={floor.polygon}
                                    fill={isHovered || isClicked ? "rgba(251, 191, 36, 0.3)" : "transparent"}
                                    stroke={isHovered || isClicked ? "#fdaf17" : "transparent"}
                                    strokeWidth="3.5"
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
                                        navigate(`/marigold_floor/${floorParam}`, { state: { floorName: floor.name, towerId: 7 } });
                                    }}
                                />
                            ) : (
                                /* Interactive Floor Rectangle */
                                <rect
                                    x={rectX}
                                    y={rectY}
                                    width={rectW}
                                    height={rectH}
                                    fill={isHovered || isClicked ? "rgba(251, 191, 36, 0.3)" : "transparent"}
                                    stroke={isHovered || isClicked ? "#fdaf17" : "transparent"}
                                    strokeWidth="3.5"
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
                                        navigate(`/marigold_floor/${floorParam}`, { state: { floorName: floor.name, towerId: 7 } });
                                    }}
                                />
                            )}

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
                                    points={`${xMax + 20},${yCenter - 8} ${xMax + 20},${yCenter + 8} ${xMax + 5},${yCenter}`}
                                    fill="#fdaf17"
                                />
                                {/* Tooltip rounded rectangle */}
                                <rect
                                    x={xMax + 20}
                                    y={yCenter - 25}
                                    width="180"
                                    height="50"
                                    rx="8"
                                    fill="#fdaf17"
                                />
                                {/* Tooltip text */}
                                <text
                                    x={xMax + 110}
                                    y={yCenter + 7}
                                    fill="#ffffff"
                                    fontSize="22"
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
                    Tower Name: Marigold
                </h2>
                <p className="text-sm text-gray-200 leading-relaxed">
                    Configuration Available:<br />
                    <span className="text-lg font-semibold text-white mt-1 inline-block bg-amber-500/25 px-5 py-1.5 rounded-full border border-amber-500/40 shadow-inner">
                        2 BHK & 3 BHK
                    </span>
                </p>
            </div>
        </div>
    );
}
