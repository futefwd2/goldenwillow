import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Tooltip, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { data } from '../../data/GoldenWillowsData';
import WithoutbgHeader from "../../components/WithoutbgHeader";

// Layout types for the unit detail view
type LayoutType = "default" | "2D" | "2Dstatic";

// Refuge floors for Iris tower
const REFUGE_FLOORS = [6, 11, 16, 21, 26, 31, 36];

// Convert rgba with transparency to fully opaque for polygon highlights
const getSolidColor = (rgbaStr: string, alpha: string = "1") => {
    if (!rgbaStr) return `rgba(255, 165, 0, ${alpha})`;
    if (rgbaStr.startsWith("rgba")) return rgbaStr.replace(/[\d\.]+\)$/, `${alpha})`);
    return rgbaStr;
};

export default function UnitPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // ─── Persist towerId in sessionStorage so refresh doesn't lose it ───
    const stateTowerId = location.state?.towerId;
    if (stateTowerId) sessionStorage.setItem("irisTowerId", String(stateTowerId));
    const towerId = stateTowerId || Number(sessionStorage.getItem("irisTowerId")) || 4;

    // Find the Iris tower from data
    const tower = data.find((t) => t.id === towerId) || data.find((t) => t.name === "IRIS") || data[0];

    // Parse floor number and unit number from the dynamic ID
    // ID format: floorNumber * 100 + unitNum (e.g. 301 = floor 3, unit 1)
    const numericId = Number(id);
    const floorNum = numericId ? Math.floor(numericId / 100) : 3;
    const unitNum = numericId ? (numericId % 100) : 1;
    const isRefugeFloor = REFUGE_FLOORS.includes(floorNum);

    // Find the matching unit template from tower floors data
    const allUnits = tower.floors.flatMap((f: any) => f.units);
    const typicalUnit = allUnits.find((u: any) => (u.id % 100) === unitNum) || allUnits[0];

    // Use refuge-specific fields on refuge floors if available, otherwise fall back to typical
    const singleUnit = typicalUnit ? {
        ...typicalUnit,
        id: numericId,
        type:          isRefugeFloor && typicalUnit.refugeType          ? typicalUnit.refugeType          : typicalUnit.type,
        name:          isRefugeFloor && typicalUnit.refugeName          ? typicalUnit.refugeName          : typicalUnit.name,
        size:          isRefugeFloor && typicalUnit.refugeSize          ? typicalUnit.refugeSize          : typicalUnit.size,
        unitimage:     isRefugeFloor && typicalUnit.refugeUnitimage     ? typicalUnit.refugeUnitimage     : typicalUnit.unitimage,
        image2D:       isRefugeFloor && typicalUnit.refugeImage2D       ? typicalUnit.refugeImage2D       : typicalUnit.image2D,
        image2Dstatic: isRefugeFloor && typicalUnit.refugeImage2Dstatic ? typicalUnit.refugeImage2Dstatic : typicalUnit.image2Dstatic,
        rooms:         isRefugeFloor && typicalUnit.refugeRooms         ? typicalUnit.refugeRooms         : typicalUnit.rooms,
        roomstatic:    isRefugeFloor && typicalUnit.refugeRoomstatic    ? typicalUnit.refugeRoomstatic    : typicalUnit.roomstatic,
        hoverColor:    isRefugeFloor && typicalUnit.refugeHoverColor    ? typicalUnit.refugeHoverColor    : typicalUnit.hoverColor,
    } : null;

    // ─── Layout state — default (3D view), 2D (interactive), 2Dstatic (flat image) ───
    const [activeLayout, setActiveLayout] = useState<LayoutType>("default");

    // Zoom overlay state
    const [zoomOpen, setZoomOpen] = useState(false);

    // Hover states for room polygons
    const [hoveredRoomDefault, setHoveredRoomDefault] = useState<number | null>(null);
    const [hoveredRoom2D, setHoveredRoom2D] = useState<number | null>(null);

    // Fallback if unit not found
    if (!singleUnit) {
        return (
            <div className="flex flex-col w-full items-center justify-center bg-[#5d5c61] text-center p-6 h-screen">
                <div className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md mb-4">
                    Unit not found.
                </div>
                <button
                    onClick={() => navigate(`/iris_floor/${floorNum}`, { state: { towerId } })}
                    className="px-5 py-2 rounded-lg border border-white/70 text-white hover:bg-white hover:text-[#5d5c61] transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Returns the correct image based on active layout
    const getActiveImage = () => {
        if (activeLayout === "2D") return singleUnit.image2D;
        if (activeLayout === "2Dstatic") return singleUnit.image2Dstatic;
        return singleUnit.unitimage; // default (3D/rendered view)
    };

    return (
        <section className="flex flex-col lg:flex-row gap-2 overflow-auto lg:overflow-hidden h-screen w-full p-2 bg-[#e8e8e8] select-none">
            <WithoutbgHeader />

            {/* ═══════════════════════════════════════════
                LEFT SIDEBAR
                Shows: unit name + room list with hover sync
                Hidden in 2Dstatic layout (no room polygons in static view)
            ═══════════════════════════════════════════ */}
            <div className="lg:w-[20%] mt-14 w-full justify-center flex flex-col border-r p-4 rounded-lg lg:mt-4 h-screen">
                <h3 className="bg-gradient-to-r from-[#e3a528] to-[#e8e8e8] border-l-4 border-[#b97f0b] text-[#333] text-center font-semibold mb-5 p-3 text-lg rounded-sm shadow-sm">
                    {singleUnit.name}
                </h3>

                {/* Room list — hidden in 2Dstatic since there are no interactive polygons */}
                {activeLayout !== "2Dstatic" && (
                    <div className="lg:max-h-[450px] max-h-[300px] overflow-y-scroll p-2 bg-[rgba(251,245,222,0.6)] rounded-md">
                        {/* Show rooms for default layout, roomstatic for 2D layout */}
                        {(activeLayout === "default" ? singleUnit.rooms : singleUnit.roomstatic)?.map((room: any, index: number) => {
                            const isDefaultLayout = activeLayout === "default";
                            const isHighlight = isDefaultLayout
                                ? hoveredRoomDefault === room.id
                                : hoveredRoom2D === room.id;

                            const bgClass = index % 2 === 0 ? "bg-[#f7f6f6] text-black" : "bg-white text-black";

                            return (
                                <div
                                    key={room.id}
                                    onMouseEnter={() => isDefaultLayout ? setHoveredRoomDefault(room.id) : setHoveredRoom2D(room.id)}
                                    onMouseLeave={() => isDefaultLayout ? setHoveredRoomDefault(null) : setHoveredRoom2D(null)}
                                    className={`${isHighlight ? "" : bgClass} transition-all mb-1 ease-in-out duration-300 p-2 border rounded-lg flex justify-between items-center cursor-pointer`}
                                    style={isHighlight ? { backgroundColor: getSolidColor(singleUnit.hoverColor, "0.9"), color: "black" } : undefined}
                                >
                                    <h4 className="font-semibold text-[13px]">{room.name}</h4>
                                    <p className="text-[12px]">{room.size}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ═══════════════════════════════════════════
                CENTER — UNIT IMAGE WITH SVG ROOM POLYGONS
                - default layout: 3D/rendered image with interactive room polygons
                - 2D layout: 2D plan image with interactive room polygons
                - 2Dstatic layout: flat static image, no polygons
                Clicking the image opens the zoom overlay.
            ═══════════════════════════════════════════ */}
            <div className="lg:w-[65%] w-full justify-center h-screen items-center flex p-2">
                <div className="relative flex justify-center items-center w-full h-full">

                    {/* Main unit image */}
                    <img
                        src={getActiveImage()}
                        alt={singleUnit.name}
                        className="w-full h-full rounded-lg shadow-md shadow-black/30 object-contain"
                        onClick={() => setZoomOpen(true)}
                        style={{ cursor: "zoom-in" }}
                    />

                    {/* Room polygons for default (3D) layout */}
                    {activeLayout === "default" && singleUnit.rooms && (
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 3000 1688">
                            {singleUnit.rooms.map((room: any) => (
                                <Tooltip
                                    key={`default-${room.id}`}
                                    title={`${room.name} - ${room.size}`}
                                    arrow
                                    placement="top"
                                    slotProps={{
                                        tooltip: {
                                            sx: { backgroundColor: "rgba(0,0,0,0.7)", color: "white", fontSize: "14px", padding: "6px 12px" }
                                        },
                                        arrow: { sx: { color: "rgba(0,0,0,0.7)" } }
                                    }}
                                >
                                    <polygon
                                        points={room.polygon}
                                        fill={hoveredRoomDefault === room.id
                                            ? getSolidColor(singleUnit.hoverColor, "0.5")
                                            : "transparent"
                                        }
                                        strokeWidth="4"
                                        style={{ cursor: "default", transition: "fill 0.3s ease-in-out" }}
                                        onMouseEnter={() => setHoveredRoomDefault(room.id)}
                                        onMouseLeave={() => setHoveredRoomDefault(null)}
                                    />
                                </Tooltip>
                            ))}
                        </svg>
                    )}

                    {/* Room polygons for 2D layout */}
                    {activeLayout === "2D" && singleUnit.roomstatic && (
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 3000 1688">
                            {singleUnit.roomstatic.map((room: any) => (
                                <Tooltip
                                    key={`2d-${room.id}`}
                                    title={`${room.name} - ${room.size}`}
                                    arrow
                                    placement="top"
                                    slotProps={{
                                        tooltip: {
                                            sx: { backgroundColor: "rgba(0,0,0,0.7)", color: "white", fontSize: "14px", padding: "6px 12px" }
                                        },
                                        arrow: { sx: { color: "rgba(0,0,0,0.7)" } }
                                    }}
                                >
                                    <polygon
                                        points={room.polygon}
                                        fill={hoveredRoom2D === room.id
                                            ? getSolidColor(singleUnit.hoverColor, "0.5")
                                            : "transparent"
                                        }
                                        strokeWidth="4"
                                        style={{ cursor: "default", transition: "fill 0.3s ease-in-out" }}
                                        onMouseEnter={() => setHoveredRoom2D(room.id)}
                                        onMouseLeave={() => setHoveredRoom2D(null)}
                                    />
                                </Tooltip>
                            ))}
                        </svg>
                    )}
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                RIGHT SIDEBAR
                Buttons: Go Back | Zoom Image | 2D Unit Plan | 2D Static
                - Go Back: if not on default layout → go back to default layout
                           if on default layout → go back to floor page
                - Zoom Image: opens current image fullscreen
                - 2D Unit Plan: switches to interactive 2D plan (shown only on default layout)
                - 2D Static: switches to flat static image (shown only on default layout)
            ═══════════════════════════════════════════ */}
            <div className="lg:w-[15%] w-full flex flex-col justify-center p-4 border-l mt-5">
                <div className="bg-[#f0eeee] p-4 rounded-sm flex flex-col gap-2">

                    {/* Go Back — returns to floor page if on default, else resets to default layout */}
                    <Button
                        fullWidth
                        onClick={() => {
                            if (activeLayout !== "default") {
                                setActiveLayout("default");
                            } else {
                                navigate(`/iris_floor/${floorNum}`, { state: { towerId: tower.id } });
                            }
                        }}
                        sx={{
                            color: "white", backgroundColor: "#fdaf17",
                            borderRadius: "4px", textTransform: "none",
                            fontSize: "14px", fontWeight: "semibold", py: 1.2,
                            "&:hover": { backgroundColor: "#5d5c61" },
                        }}
                    >
                        Go Back
                    </Button>

                    {/* Zoom Image — opens current layout image fullscreen */}
                    <Button
                        fullWidth
                        onClick={() => setZoomOpen(true)}
                        sx={{
                            color: "white", backgroundColor: "#fdaf17",
                            borderRadius: "4px", textTransform: "none",
                            fontSize: "14px", fontWeight: "semibold", py: 1.2,
                            "&:hover": { backgroundColor: "#5d5c61" },
                        }}
                    >
                        Zoom Image
                    </Button>

                    {/* 2D Unit Plan — only shown on default layout */}
                    {activeLayout === "default" && (
                        <Button
                            fullWidth
                            onClick={() => setActiveLayout("2D")}
                            sx={{
                                color: "white", backgroundColor: "#fdaf17",
                                borderRadius: "4px", textTransform: "none",
                                fontSize: "14px", fontWeight: "semibold", py: 1.2,
                                "&:hover": { backgroundColor: "#5d5c61" },
                            }}
                        >
                            2D Unit Plan
                        </Button>
                    )}

                    {/* 2D Static — only shown on default layout */}
                    {activeLayout === "default" && (
                        <Button
                            fullWidth
                            onClick={() => setActiveLayout("2Dstatic")}
                            sx={{
                                color: "white", backgroundColor: "#fdaf17",
                                borderRadius: "4px", textTransform: "none",
                                fontSize: "14px", fontWeight: "semibold", py: 1.2,
                                "&:hover": { backgroundColor: "#5d5c61" },
                            }}
                        >
                            2D Static
                        </Button>
                    )}
                </div>

                {/* Apartment features */}
                <div className="max-h-72 overflow-y-auto p-4 bg-white/85 border border-gray-200 rounded-md mt-4 text-left">
                    <h3 className="font-bold text-[11px] text-gray-800 uppercase border-b pb-1 mb-2">
                        Apartment Features
                    </h3>
                    <ol className="list-decimal list-outside pl-4 text-[10px] text-gray-700 space-y-2.5">
                        <li><span className="font-bold text-gray-900">Homes have wide sundecks</span></li>
                        <li>
                            <span className="font-bold text-gray-900">Internal Flooring</span>
                            <p className="mt-0.5 text-gray-600 font-normal leading-relaxed">
                                Large format Vitrified tiles, anti-skid Vitrified tiles in balcony and utility room
                            </p>
                        </li>
                        <li>
                            <span className="font-bold text-gray-900">Windows</span>
                            <p className="mt-0.5 text-gray-600 font-normal leading-relaxed">
                                Heavy Duty aluminium Single-glazed windows
                            </p>
                        </li>
                        <li>
                            <span className="font-bold text-gray-900">Doors</span>
                            <p className="mt-0.5 text-gray-600 font-normal leading-relaxed">
                                Main entrance door in veneer with melamine finish & laminate on all internal doors
                            </p>
                        </li>
                    </ol>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                ZOOM OVERLAY — fullscreen unit image
            ═══════════════════════════════════════════ */}
            {zoomOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90">
                    <IconButton
                        onClick={() => setZoomOpen(false)}
                        sx={{
                            position: "absolute", top: 20, right: 20,
                            color: "white", backgroundColor: "rgba(0,0,0,0.6)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
                            zIndex: 1100,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={getActiveImage()}
                        alt="Zoomed"
                        className="max-h-[92vh] max-w-[92vw] rounded-lg shadow-lg object-contain"
                        onClick={() => setZoomOpen(false)}
                        style={{ cursor: "zoom-out" }}
                    />
                </div>
            )}
        </section>
    );
}
