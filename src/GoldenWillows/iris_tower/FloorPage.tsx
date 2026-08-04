import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Tooltip, Button, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { data } from '../../data/GoldenWillowsData';
import irisRefugeFloorPlan from "../../assets/iris/Iris_floor_R.png.jpg";
import irisJodiTypicalPlan from "../../assets/iris/jodi/Iris Jodi Tower plan Typical.jpg";
import irisJodiRefugePlan from "../../assets/iris/jodi/Iris Jodi Tower plan Refuge.jpg";
import WithoutbgHeader from '../../components/WithoutbgHeader';

// Refuge floors for Iris tower
const REFUGE_FLOORS = [6, 11, 16, 21, 26, 31, 36];

const getSolidColor = (rgbaStr: string) => {
    if (!rgbaStr) return "#ffff00";
    if (rgbaStr.startsWith("rgba")) return rgbaStr.replace(/[\d\.]+\)$/, "1)");
    return rgbaStr;
};

// Returns refugeHoverColor when on a refuge floor (if present), else the normal hoverColor
const getActiveHoverColor = (item: any, isRefuge: boolean) =>
    isRefuge && item.refugeHoverColor ? item.refugeHoverColor : item.hoverColor;

// Parses "0 0 W H" -> { w, h } safely
// const parseViewBox = (vb?: string) => {
//     if (!vb) return { w: 3000, h: 1688 };
//     const parts = vb.split(" ").map(Number);
//     return { w: parts[2] || 3000, h: parts[3] || 1688 };
// };

export default function FloorPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // ─── Persist towerId so refresh doesn't lose it ───
    const stateTowerId = location.state?.towerId;
    if (stateTowerId) sessionStorage.setItem("irisTowerId", String(stateTowerId));
    const towerId = stateTowerId || Number(sessionStorage.getItem("irisTowerId")) || 4;

    const tower = data.find((t) => t.id === towerId) || data.find((t) => t.name === "IRIS") || data[0];

    const floorNumber = id ? parseInt(id) : 3;
    const isRefugeFloor = REFUGE_FLOORS.includes(floorNumber);

    // ─── Standard floor units (template from floors[0]) ───
    const rawFloor = tower?.floors?.[0];
    const singleFloor = rawFloor ? {
        ...rawFloor,
        id: floorNumber,
        units: rawFloor.units
            .filter((unit: any) => !(isRefugeFloor && (unit.id % 100) === 2))
            .map((unit: any) => ({
                ...unit,
                id: floorNumber * 100 + (unit.id % 100),
                type:          isRefugeFloor && unit.refugeType          ? unit.refugeType          : unit.type,
                name:          isRefugeFloor && unit.refugeName          ? unit.refugeName          : unit.name,
                size:          isRefugeFloor && unit.refugeSize          ? unit.refugeSize          : unit.size,
                unitimage:     isRefugeFloor && unit.refugeUnitimage     ? unit.refugeUnitimage     : unit.unitimage,
                image2D:       isRefugeFloor && unit.refugeImage2D       ? unit.refugeImage2D       : unit.image2D,
                image2Dstatic: isRefugeFloor && unit.refugeImage2Dstatic ? unit.refugeImage2Dstatic : unit.image2Dstatic,
            }))
    } : null;

    // ─── Jodi units (from tower.jodi) ───
    // Jodi IDs: floorNumber * 100 + 90 + jodiNum
    const mappedJodi: any[] = (tower as any).jodi?.map((jodiUnit: any) => ({
        ...jodiUnit,
        id: floorNumber * 100 + 90 + (jodiUnit.id % 10),
        unitimage: isRefugeFloor && jodiUnit.refugeUnitimage ? jodiUnit.refugeUnitimage : jodiUnit.unitimage,
        image2D: isRefugeFloor && jodiUnit.refugeImage2D ? jodiUnit.refugeImage2D : jodiUnit.image2D,
        image2Dstatic: isRefugeFloor && jodiUnit.refugeImage2Dstatic ? jodiUnit.refugeImage2Dstatic : jodiUnit.image2Dstatic,
    })) || [];

    // ─── Jodi mode toggle — switches image, sidebar, polygons on same page ───
    // Available on both typical AND refuge floors
    const [isJodiMode, setIsJodiMode] = useState(false);
    const activeJodiMode = isJodiMode;

    // ─── Floor plan image ───
    // Standard: typical floor image or refuge floor image
    // Jodi: typical jodi tower plan or refuge jodi tower plan
    const refugeImg = typeof tower.refugeImage === 'object'
        ? (tower.refugeImage as any)[floorNumber]
        : tower.refugeImage;
    const standardImage = isRefugeFloor ? (refugeImg || irisRefugeFloorPlan) : singleFloor?.image;
    const jodiImage = isRefugeFloor ? irisJodiRefugePlan : irisJodiTypicalPlan;
    const floorImage = activeJodiMode ? jodiImage : standardImage;

    // ─── Image settings for SVG viewBox ───
    // Standard mode always uses singleFloor.imageSettings (unchanged, original behavior).
    // Jodi mode uses jodiImageSettings/refugeJodiImageSettings if you've added them to the
    // floor object in GoldenWillowsData.tsx — otherwise it safely falls back to the
    // standard floor's imageSettings so nothing ever crashes.
    const jodiImageSettings = isRefugeFloor
        ? (singleFloor as any)?.refugeJodiImageSettings || (singleFloor as any)?.jodiImageSettings || singleFloor?.imageSettings
        : (singleFloor as any)?.jodiImageSettings || singleFloor?.imageSettings;

    const activeImageSettings = activeJodiMode ? jodiImageSettings : singleFloor?.imageSettings;

    // ─── Hover state — syncs sidebar list with SVG polygons ───
    const [hoveredUnit, setHoveredUnit] = useState<number | null>(null);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [comingSoonOpen, setComingSoonOpen] = useState(false);

    if (!singleFloor) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#5d5c61] text-center p-6">
                <div className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md mb-4">
                    Floor data not found.
                </div>
                <button onClick={() => navigate('/iris')} className="px-5 py-2 rounded-lg border border-white/70 text-white hover:bg-white hover:text-[#5d5c61] transition">
                    Go Back
                </button>
            </div>
        );
    }

    // Active units/jodi list for sidebar and polygons
    const activeUnits = activeJodiMode ? mappedJodi : singleFloor.units;

    return (
        <div className="flex flex-col md:flex-row h-screen w-full p-5 gap-6 overflow-hidden bg-[#E8E8E8] select-none">
            <WithoutbgHeader />

            {/* ═══════════════════════════════════════════
                LEFT SIDEBAR
                Standard mode: shows unit list (Unit 1, 2, 3, 4)
                Jodi mode: shows jodi unit list (Unit 1&2, Unit 3&4)
                Hovering syncs with polygon highlight on floor plan image
            ═══════════════════════════════════════════ */}
            <div className="lg:w-[25%] xl:w-[20%] md:w-[40%] mb-2 w-full flex flex-col items-center justify-center border-r p-4 overflow-y-auto">
                <h3 className="bg-gradient-to-r mt-[50%] md:mt-5 w-full from-[#e3a528] to-[#e8e8e8] border-l-4 border-[#b97f0b] text-[#333] text-center font-semibold mb-5 p-4 text-lg rounded-sm shadow-sm">
                    {activeJodiMode ? "JODI UNITS" : "FLOOR PLANS"}
                </h3>

                <div className="bg-[#F0EEEE] p-4 rounded-lg w-full">
                    {/* Floor number badge */}
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 shadow-md flex-wrap">
                        <span className="inline-block text-yellow-600 text-2xl font-bold px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                            {floorNumber}
                        </span>
                        <span className="whitespace-nowrap">{isRefugeFloor ? "REFUGE FLOOR" : "FLOOR"}</span>
                    </h3>

                    {/* Unit / Jodi list — hover syncs with polygon */}
                    {activeUnits.map((unit: any) => (
                        <ul key={unit.id}>
                            <li
                                className={`cursor-pointer transition-transform duration-200 mt-2 flex p-1 rounded-sm justify-between border-b pb-2 text-[12px] ${hoveredUnit === unit.id ? "scale-105 bg-slate-200" : "scale-100"}`}
                                onMouseEnter={() => setHoveredUnit(unit.id)}
                                onMouseLeave={() => setHoveredUnit(null)}
                                onClick={() => {
                                    if (activeJodiMode) {
                                        navigate(`/iris_jodi/${unit.id}`, { state: { towerId: tower.id } });
                                    } else {
                                        navigate(`/iris_unit/${unit.id}`, { state: { towerId: tower.id } });
                                    }
                                }}
                            >
                                <p>{unit.name}</p>
                                <p>{unit.type}</p>
                            </li>
                        </ul>
                    ))}
                </div>

                {/* BHK legend buttons */}
                <div className="mt-3 gap-4 flex flex-col justify-center items-center w-full">
                    {Object.values(singleFloor.buttonSettings).map((btn: any, idx: number) => (
                        <button key={idx} className="py-2 rounded-lg w-full text-sm font-medium" style={{ backgroundColor: btn.bgColor }}>
                            {btn.text}
                        </button>
                    ))}
                    {isRefugeFloor && (
                        <button className="py-2 rounded-lg w-full text-sm font-medium" style={{ backgroundColor: "#fde617" }}>
                            4 BHK
                        </button>
                    )}
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                CENTER — FLOOR PLAN IMAGE WITH SVG POLYGONS
                Standard mode: shows typical/refuge floor plan with unit polygons
                Jodi mode: shows jodi tower plan image (Typical or Refuge)
                           with jodi polygons (polygon array from jodi data)
                Hover highlights polygon and syncs with sidebar.
                Click navigates to unit/jodi detail page.
            ═══════════════════════════════════════════ */}
            <div className="relative w-full md:h-screen flex items-center justify-center">
                <svg
                    viewBox={activeImageSettings?.svgSize || singleFloor?.imageSettings?.svgSize || "0 0 7000 3939"}
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <image
                        href={floorImage}
                        width={activeImageSettings?.imageWidth || singleFloor?.imageSettings?.imageWidth || "7000"}
                        height={activeImageSettings?.imageHeight || singleFloor?.imageSettings?.imageHeight || "3939"}
                    />

                    {activeJodiMode ? (
                        mappedJodi.map((jodiUnit: any) => {
                            const activeColor = getActiveHoverColor(jodiUnit, isRefugeFloor);
                            const pts = isRefugeFloor && jodiUnit.refugePolygonPoints
                                ? jodiUnit.refugePolygonPoints
                                : jodiUnit.polygonPoints;
                            if (!pts) return null;

                            return (
                                <Tooltip
                                    key={jodiUnit.id}
                                    title={jodiUnit.name}
                                    placement="top"
                                    slotProps={{ tooltip: { sx: { backgroundColor: getSolidColor(activeColor), color: "#000", fontSize: "14px", padding: "8px 16px", borderRadius: "4px" } } }}
                                >
                                    <polygon
                                        points={pts}
                                        fill={hoveredUnit === jodiUnit.id ? activeColor : "transparent"}
                                        style={{ cursor: "pointer", transition: "fill 0.2s ease" }}
                                        onMouseEnter={() => setHoveredUnit(jodiUnit.id)}
                                        onMouseLeave={() => setHoveredUnit(null)}
                                        onDoubleClick={() => navigate(`/iris_jodi/${jodiUnit.id}`, { state: { towerId: tower.id } })}
                                    />
                                </Tooltip>
                            );
                        })
                    ) : (
                        // ── Standard mode ──
                        singleFloor.units.map((unit: any) => {
                            if (!unit.polygonPoints) return null;
                            const activeColor = getActiveHoverColor(unit, isRefugeFloor);
                            return (
                                <Tooltip
                                    key={unit.id}
                                    title={`${unit.name} (${unit.type})`}
                                    placement="top"
                                    slotProps={{ tooltip: { sx: { backgroundColor: getSolidColor(activeColor), color: "#000", fontSize: "14px", padding: "8px 16px", borderRadius: "4px" } } }}
                                >
                                    <polygon
                                        points={isRefugeFloor && (unit as any).refugePolygonPoints ? (unit as any).refugePolygonPoints : unit.polygonPoints}
                                        fill={hoveredUnit === unit.id ? activeColor : "transparent"}
                                        style={{ cursor: "pointer", transition: "fill 0.2s ease" }}
                                        onMouseEnter={() => setHoveredUnit(unit.id)}
                                        onMouseLeave={() => setHoveredUnit(null)}
                                        onDoubleClick={() => navigate(`/iris_unit/${unit.id}`, { state: { towerId: tower.id } })}
                                    />
                                </Tooltip>
                            );
                        })
                    )}
                </svg>
            </div>

            {/* ═══════════════════════════════════════════
                RIGHT SIDEBAR
                Go Back       → /iris (always)
                Zoom Image    → fullscreen current floor image
                Walk Through  → Coming Soon modal (TODO: add video)
                Jodi Unit     → toggles to jodi mode (typical floors only)
                Standa═══════════════════════════════════════════rd Unit → toggles back to standard mode (when in jodi mode)
             */}
            <div className="md:w-[20%] w-full flex flex-col items-center justify-center border-r p-4">
                <div className="bg-[#f0eeee] p-4 rounded-sm flex flex-col gap-2 w-full">

                    {/* Go Back → Standard mode first (if in Jodi mode), else Iris tower main page */}
                    <Button fullWidth onClick={() => {
                        if (activeJodiMode) {
                            setIsJodiMode(false);
                            setHoveredUnit(null);
                        } else {
                            navigate('/iris');
                        }
                    }}
                        sx={{ mb: 1, color: "white", backgroundColor: "#fdaf17", borderRadius: "4px", textTransform: "none", fontSize: "15px", py: 1, "&:hover": { backgroundColor: "#5d5c61" } }}>
                        Go Back
                    </Button>

                    {/* Zoom Image → fullscreen current image (standard or jodi) */}
                    <Button fullWidth onClick={() => setZoomOpen(true)}
                        sx={{ mb: 1, color: "white", backgroundColor: "#fdaf17", borderRadius: "4px", textTransform: "none", fontSize: "15px", py: 1, "&:hover": { backgroundColor: "#5d5c61" } }}>
                        Zoom Image
                    </Button>

                    {/* Walk Through — TODO: replace with video once available */}
                    <Button fullWidth onClick={() => setComingSoonOpen(true)}
                        sx={{ mb: 1, color: "white", backgroundColor: "#fdaf17", borderRadius: "4px", textTransform: "none", fontSize: "15px", py: 1, "&:hover": { backgroundColor: "#5d5c61" } }}>
                        Walk Through
                    </Button>

                    {/* Jodi Unit / Standard Unit toggle — available on all floors including refuge */}
                    {(
                        <Button
                            fullWidth
                            onClick={() => {
                                setIsJodiMode(!isJodiMode);
                                setHoveredUnit(null); // clear hover when switching modes
                            }}
                            sx={{ mb: 1, color: "white", backgroundColor: isJodiMode ? "#5d5c61" : "#fdaf17", borderRadius: "4px", textTransform: "none", fontSize: "15px", py: 1, "&:hover": { backgroundColor: "#5d5c61" } }}
                        >
                            {isJodiMode ? "Standard Unit" : "Jodi Unit"}
                        </Button>
                    )}

                    {/* Tower info */}
                    <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #dcdcdc", display: "flex", flexDirection: "column", gap: 1.5, textAlign: "left", width: "100%" }}>
                        <div className="text-[13px] text-gray-700 font-semibold">
                            Tower: <span className="font-normal text-gray-600">{tower.name.charAt(0) + tower.name.slice(1).toLowerCase()}</span>
                        </div>
                        <div className="text-[13px] text-gray-700 font-semibold">
                            Config: <span className="font-normal text-gray-600">{tower.description[0]?.configuration || "3 BHK & 4 BHK"}</span>
                        </div>
                        <div className="text-[13px] text-gray-700 font-semibold">4 Apartments Per Floor</div>
                        <div className="text-[13px] text-gray-700 font-semibold">
                            Views: <span className="font-normal text-gray-600">Garden and City</span>
                        </div>
                    </Box>
                </div>
            </div>

            {/* ── ZOOM MODAL ── */}
            <Modal open={zoomOpen} onClose={() => setZoomOpen(false)}>
                <Box className="flex items-center justify-center h-screen w-screen bg-black/80" sx={{ outline: "none" }}>
                    <IconButton onClick={() => setZoomOpen(false)} sx={{ position: "absolute", top: 20, right: 20, color: "white", backgroundColor: "rgba(0,0,0,0.6)", "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" } }}>
                        <CloseIcon />
                    </IconButton>
                    <img src={floorImage} alt={`Floor ${floorNumber}`} className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg" />
                </Box>
            </Modal>

            {/* ── WALK THROUGH VIDEO MODAL ── */}
            <Modal open={comingSoonOpen} onClose={() => setComingSoonOpen(false)}>
                <Box className="flex items-center justify-center h-screen w-screen bg-black/90" sx={{ outline: "none" }}>
                    {/* Back button — top-left, same style as right-side menu buttons */}
                    <Button
                        onClick={() => setComingSoonOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 20,
                            left: 20,
                            zIndex: 1100,
                            color: "white",
                            backgroundColor: "#fdaf17",
                            borderRadius: "4px",
                            textTransform: "none",
                            fontSize: "15px",
                            py: 1,
                            px: 3,
                            "&:hover": { backgroundColor: "#5d5c61" },
                        }}
                    >
                        Go Back
                    </Button>

                    <iframe
                        src="https://fast.wistia.net/embed/iframe/bbkkdvtoa8"
                        title="Walk Through Video"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="w-[90vw] h-[80vh] rounded-lg shadow-lg"
                        style={{ border: "none" }}
                    />
                </Box>
            </Modal>
        </div>
    );
}