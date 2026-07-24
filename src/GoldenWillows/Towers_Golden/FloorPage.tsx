import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Tooltip, Button, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { data } from '../../../data/GoldenWillowsData';
import { data } from '../../data/GoldenWillowsData';
import jasmineRefugeFloorPlan from "../../assets/jasmin_tower/Jasmine Tower plan Refuge.jpg";


// import WithoutbgHeader from '../../../components/WithoutbgHeader';
import WithoutbgHeader from '../../components/WithoutbgHeader'

export default function FloorPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Convert semi-transparent rgba hover color to solid color for tooltips
    const getSolidColor = (rgbaStr: string) => {
        if (!rgbaStr) return "#ffff00";
        if (rgbaStr.startsWith("rgba")) {
            return rgbaStr.replace(/[\d\.]+\)$/, "1)");
        }
        return rgbaStr;
    };

    // Parse floor number from id parameter (e.g. "6-Refuge" -> 6, "3" -> 3)
    const floorNumber = id ? parseInt(id) : 2;
    const refugeFloors = [6, 11, 16, 21, 26, 31, 36];
    const isRefugeFloor = refugeFloors.includes(floorNumber);

    const location = useLocation();
    const towerId = location.state?.towerId || 1;
    const tower = data.find((t) => t.id === towerId) || data[0];

    const rawFloor = tower?.floors?.[0];
    const singleFloor = rawFloor ? {
        ...rawFloor,
        id: floorNumber,
        title: `FLOOR-${floorNumber}`,
        units: rawFloor.units.map((unit: any) => {
            const unitNum = unit.id % 100;
            const dynamicId = floorNumber * 100 + unitNum;
            return {
                ...unit,
                id: dynamicId,
            };
        })
    } : null;

    const mappedJodi = (tower as any).jodi?.map((jodiUnit: any) => {
        const jodiNum = jodiUnit.id % 10;
        const dynamicId = floorNumber * 100 + 90 + jodiNum;
        return {
            ...jodiUnit,
            id: dynamicId,
        };
    });

    const floorImage = isRefugeFloor ? (tower.refugeImage || jasmineRefugeFloorPlan) : singleFloor?.image;

    const [hoveredUnit, setHoveredUnit] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [isJodiMode, setIsJodiMode] = useState(() => {
        return sessionStorage.getItem("isJodiMode") === "true";
    });

    // Disable Jodi mode on refuge floors
    const activeJodiMode = isRefugeFloor ? false : isJodiMode;

    console.log("singleFloor", singleFloor)
    if (!singleFloor) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#5d5c61] text-center p-6">
                <div className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md mb-4">
                    Floor data not found.
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2 rounded-lg border border-white/70 text-white hover:bg-white hover:text-[#5d5c61] transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-screen w-full p-5 gap-6 overflow-hidden bg-[#E8E8E8] select-none">
            <WithoutbgHeader />
            {/* Left Sidebar */}
            <div className="lg:w-[25%] xl:w-[20%] md:w-[40%]  mb-2 w-full flex flex-col items-center justify-center border-r p-4 overflow-y-auto">
                <h3 className="bg-gradient-to-r mt-[50%] md:mt-5 w-full from-[#e3a528] to-[#e8e8e8] border-l-4 border-[#b97f0b] text-[#333] text-center font-semibold mb-5 p-4 text-lg rounded-sm shadow-sm">
                    FLOOR PLANS
                </h3>
                {/* <h3 className="text-xl font-semibold mb-4">  UNITS→ {singleFloor.title}</h3> */}



                <div

                    className="bg-[#F0EEEE] p-4 rounded-lg w-full"
                >
                    {/* <h3 className="text-lg font-semibold mb-4 text-center"> {singleFloor.title}</h3> */}
                    <h3 className="text-lg font-semibold mb-4   flex items-center gap-4 shadow-md">
                        <span className="inline-block text-yellow-600 text-2xl font-bold px-2 py-1 rounded-md shadow-md">
                            {floorNumber}
                        </span>
                        {isRefugeFloor ? "REFUGE FLOOR" : "FLOOR"}
                    </h3>

                    {activeJodiMode ? (
                        mappedJodi?.map((unit: any) => (
                            <ul key={unit.id}>
                                <li
                                    className={`
                                        cursor-pointer transition-transform duration-200 mt-2 flex p-1 rounded-sm justify-between border-b pb-2 text-[12px]
                                        ${hoveredUnit === unit.id ? "scale-105 bg-slate-200" : "scale-100"}
                                    `}
                                    onMouseEnter={() => setHoveredUnit(unit.id)}
                                    onMouseLeave={() => setHoveredUnit(null)}
                                    onClick={() => setSelectedUnit(unit.id)}
                                >
                                    <p>{unit.name}</p> <p>{unit.type}</p>
                                </li>
                            </ul>
                        ))
                    ) : (
                        singleFloor.units.map((unit: any) => (
                            <ul key={unit.id}>
                                <li
                                    className={`
                                        cursor-pointer transition-transform duration-200 mt-2 flex p-1 rounded-sm justify-between border-b pb-2 text-[12px]
                                        ${hoveredUnit === unit.id ? "scale-105 bg-slate-200" : "scale-100"}
                                    `}
                                    onMouseEnter={() => setHoveredUnit(unit.id)}
                                    onMouseLeave={() => setHoveredUnit(null)}
                                    onClick={() => setSelectedUnit(unit.id)}
                                >
                                    <p>{unit.name}</p> <p>{unit.type}</p>
                                </li>
                            </ul>
                        ))
                    )}

                </div>


                <div className="mt-3 gap-4 flex flex-col justify-center items-center w-full">
                    {activeJodiMode ? (
                        <div className="flex items-center gap-2 w-full p-2 bg-[#F0EEEE] rounded">
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: "#ffff00",
                                    borderRadius: "2px",
                                    flexShrink: 0
                                }}
                            />
                            <span className="text-[12px] font-semibold text-gray-800">
                                2BHK Premia & Grande Jodi Option
                            </span>
                        </div>
                    ) : (
                        Object.values(singleFloor.buttonSettings).map((btn, idx) => (
                            <button
                                key={idx}
                                className="py-2 rounded-lg w-full"
                                style={{ backgroundColor: btn.bgColor }}
                            >
                                {btn.text}
                            </button>
                        ))
                    )}
                </div>

            </div>

            {/* Floor Plan */}
            <div className="relative w-full md:h-screen flex items-center justify-center">
                <svg
                    viewBox={singleFloor.imageSettings.svgSize}
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <image
                        href={floorImage}
                        width={singleFloor.imageSettings.imageWidth}
                        height={singleFloor.imageSettings.imageHeight}
                    />
                    {activeJodiMode && mappedJodi ? (
                        mappedJodi.map((jodiUnit: any) => (
                            <g key={jodiUnit.id}>
                                {jodiUnit.polygons.map((pts: string, idx: number) => (
                                    <Tooltip
                                        key={`${jodiUnit.id}-${idx}`}
                                        title={jodiUnit.name}
                                        placement="top"
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    backgroundColor: getSolidColor(jodiUnit.hoverColor),
                                                    color: "#000000",
                                                    fontSize: "14px",
                                                    fontWeight: "normal",
                                                    padding: "8px 16px",
                                                    borderRadius: "4px",
                                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                                                }
                                            }
                                        }}
                                    >
                                        <polygon
                                            points={pts}
                                            fill={
                                                selectedUnit === jodiUnit.id
                                                    ? "rgba(255,112,67,0.5)"
                                                    : hoveredUnit === jodiUnit.id
                                                        ? jodiUnit.hoverColor
                                                        : "transparent"
                                            }
                                            style={{ cursor: "pointer" }}
                                            onMouseEnter={() => setHoveredUnit(jodiUnit.id)}
                                            onMouseLeave={() => setHoveredUnit(null)}
                                            onClick={() => navigate(`/golden_jodi/${jodiUnit.id}`)}
                                        />
                                    </Tooltip>
                                ))}
                            </g>
                        ))
                    ) : (
                        singleFloor.units.map((unit) => (
                            <Tooltip
                                key={unit.id}
                                title={`${unit.name} (${unit.type})`}
                                placement="top"
                                slotProps={{
                                    tooltip: {
                                        sx: {
                                            backgroundColor: getSolidColor(unit.hoverColor),
                                            color: "#000000",
                                            fontSize: "14px",
                                            fontWeight: "normal",
                                            padding: "8px 16px",
                                            borderRadius: "4px",
                                            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                                        }
                                    }
                                }}
                            >
                                <polygon
                                    points={unit.polygonPoints}
                                    fill={
                                        selectedUnit === unit.id
                                            ? "rgba(255,112,67,0.5)"
                                            : hoveredUnit === unit.id
                                                ? unit.hoverColor
                                                : "transparent"
                                    }
                                    // stroke="black"
                                    // strokeWidth={2}
                                    style={{ cursor: "pointer" }}
                                    onMouseEnter={() => setHoveredUnit(unit.id)}
                                    onMouseLeave={() => setHoveredUnit(null)}
                                    onClick={() => navigate(`/golden_unit/${unit.id}`, { state: { towerId: tower.id } })}
                                />
                            </Tooltip>
                        ))
                    )}
                </svg>
            </div>

            {/* Right Sidebar */}
            <div className="md:w-[20%] w-full flex flex-col items-center justify-center border-r p-4">
                <div className="bg-[#f0eeee] p-4 rounded-sm flex flex-col gap-2 w-full">
                    <Button
                        fullWidth
                        onClick={() => navigate(-1)}
                        sx={{
                            mb: 1,
                            color: "white",
                            backgroundColor: "#fdaf17",
                            borderRadius: "4px",
                            textTransform: "none",
                            fontSize: "15px",
                            fontWeight: "semibold",
                            py: 1,
                            "&:hover": { backgroundColor: "#5d5c61" },
                        }}
                    >
                        Go Back
                    </Button>

                    <Button
                        fullWidth
                        onClick={() => setZoomOpen(true)}
                        sx={{
                            mb: 1,
                            color: "white",
                            backgroundColor: "#fdaf17",
                            borderRadius: "4px",
                            textTransform: "none",
                            fontSize: "15px",
                            fontWeight: "semibold",
                            py: 1,
                            "&:hover": { backgroundColor: "#5d5c61" },
                        }}
                    >
                        Zoom Image
                    </Button>

                    {!isRefugeFloor && (
                        <Button
                            fullWidth
                            onClick={() => {
                                const newVal = !isJodiMode;
                                setIsJodiMode(newVal);
                                sessionStorage.setItem("isJodiMode", String(newVal));
                            }}
                            sx={{
                                mb: 1,
                                color: "white",
                                backgroundColor: isJodiMode ? "#5d5c61" : "#fdaf17",
                                borderRadius: "4px",
                                textTransform: "none",
                                fontSize: "15px",
                                fontWeight: "semibold",
                                py: 1,
                                "&:hover": { backgroundColor: "#5d5c61" },
                            }}
                        >
                            {isJodiMode ? "Standard Units" : "Jodi Unit"}
                        </Button>
                    )}

                    <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #dcdcdc", display: "flex", flexDirection: "column", gap: 1.5, textAlign: "left", width: "100%" }}>
                        <div className="text-[13px] text-gray-700 font-semibold">
                            Tower Name: <span className="font-normal text-gray-600">{tower.name.charAt(0) + tower.name.slice(1).toLowerCase()}</span>
                        </div>
                        <div className="text-[13px] text-gray-700 font-semibold">
                            Configuration Available: <span className="font-normal text-gray-600">{tower.description[0]?.configuration || "2 BHK"}</span>
                        </div>
                        <div className="text-[13px] text-gray-700 font-semibold">
                            {(tower.id === 1) ? "8" : "4"} Apartments Per Floor
                        </div>
                        <div className="text-[13px] text-gray-700 font-semibold">
                            Unique Views Of the <span className="font-normal text-gray-600">{(tower.id === 1 || tower.id === 2) ? "Garden and Temple" : "Garden and City"}</span>
                        </div>
                    </Box>
                </div>

                {/* <div className="mt-3 p-2 border border-gray-300 rounded-sm w-full">
                    <h3 className="text-lg font-semibold mb-4">TOWER FEATURES</h3>
                    <ul className="list-disc list-inside space-y-2 text-[12px]">
                        {singleFloor.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </div> */}
            </div>

            {/* Zoom Modal */}
            <Modal open={zoomOpen} onClose={() => setZoomOpen(false)}>
                <Box
                    className="flex items-center justify-center h-screen w-screen bg-black/80"
                    sx={{ outline: "none" }}
                >
                    <IconButton
                        onClick={() => setZoomOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={floorImage}
                        alt={`Floor ${singleFloor.id}`}
                        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                    />
                </Box>
            </Modal>

            {/* <Modal open={image3DOpen} onClose={() => setImage3DOpen(false)}>
                <Box
                    className="flex items-center justify-center h-screen w-screen bg-black/80"
                    sx={{ outline: "none" }}
                >
                    <IconButton
                        onClick={() => setImage3DOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={singleFloor.image1}
                        alt={`Floor ${singleFloor.id}`}
                        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                    />
                </Box>
            </Modal> */}

        </div>
    );
}
