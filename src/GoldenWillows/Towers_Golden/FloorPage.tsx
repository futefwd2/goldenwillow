import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Tooltip, Button, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { data } from '../../../data/GoldenWillowsData';
import { data } from '../../data/GoldenWillowsData';



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
    const towerName = tower.name.toLowerCase();
    const destinationTower = towerName === "acacia" ? "golden" : towerName;

    const rawFloor = (isRefugeFloor && tower?.floors?.[1]) ? tower?.floors?.[1] : tower?.floors?.[0];
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

    const refugeJodiPolygonOverrides: Record<number, string> = {
        901: "273,82,269,77,277,43,301,43,304,31,353,32,353,23,398,24,397,33,434,35,493,33,494,26,534,25,534,32,546,32,587,32,589,41,597,42,614,42,617,61,621,74,619,82,557,82,557,90,517,92,518,112,472,112,473,91,419,91,420,112,375,112,376,91,333,89,334,81",
        902: "633,173,624,131,668,131,680,129,678,118,717,118,722,124,776,123,780,129,810,131,827,172,818,178,763,179,776,218,841,220,859,270,832,270,833,281,777,279,771,288,720,287,715,271,702,270,704,278,666,280,666,270,650,265",
        904: "254,211,244,271,231,271,228,280,189,280,191,269,182,269,176,286,162,289,162,296,138,298,136,288,121,289,123,282,116,282,114,291,79,291,77,283,60,280,63,273,56,274,52,279,41,280,35,266,54,219,118,218,129,179,71,180,66,172,83,131,89,129,92,143,103,141,102,131,111,129,115,122,128,121,131,128,162,129,162,122,169,123,170,116,183,117,182,128,203,128,203,118,217,117,213,128,223,130,256,128,255,136,267,138"
    };

    const isZenia = tower?.name === "ZENIA" || tower?.id === 8;

    const rawJodiList = (isZenia && isRefugeFloor && (tower as any).jodiRefuge)
        ? (tower as any).jodiRefuge
        : (tower as any).jodi;

    const mappedJodi = rawJodiList?.map((jodiUnit: any) => {
        const jodiNum = jodiUnit.id % 10;
        const dynamicId = floorNumber * 100 + 90 + jodiNum;
        const polygons = isZenia && isRefugeFloor && refugeJodiPolygonOverrides[jodiUnit.id]
            ? refugeJodiPolygonOverrides[jodiUnit.id]
            : jodiUnit.polygons;
        return {
            ...jodiUnit,
            id: dynamicId,
            polygons,
        };
    });

    const [hoveredUnit, setHoveredUnit] = useState<number | null>(null);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [isJodiMode, setIsJodiMode] = useState(() => {
        return sessionStorage.getItem("isJodiMode") === "true";
    });

    // Disable Jodi mode on refuge floors or if the tower doesn't have jodi options (unless it's Zenia)
    const activeJodiMode = (isZenia ? (!tower?.jodi || tower.jodi.length === 0) : (isRefugeFloor || !tower?.jodi || tower.jodi.length === 0)) ? false : isJodiMode;

    const jodiSvgSize = (tower as any).jodiSvgSize || singleFloor?.imageSettings.svgSize;
    const activeSvgSize = isRefugeFloor ? singleFloor?.imageSettings.svgSize : (activeJodiMode ? jodiSvgSize : singleFloor?.imageSettings.svgSize);

    const floorImage = isRefugeFloor
        ? (activeJodiMode && (tower as any).jodiRefugeImage
            ? (typeof (tower as any).jodiRefugeImage === 'object' ? ((tower as any).jodiRefugeImage as any)[floorNumber] : (tower as any).jodiRefugeImage)
            : (typeof tower.refugeImage === 'object' ? (tower.refugeImage as any)[floorNumber] : tower.refugeImage))
        : (activeJodiMode && ((tower as any).jodiImage || (tower as any).jodiFloorImage)
            ? ((tower as any).jodiImage || (tower as any).jodiFloorImage)
            : singleFloor?.image);

    const activeFloorImage = floorImage;

    const unit5 = singleFloor?.units.find((u: any) => u.id % 100 === 5);

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
                        mappedJodi?.filter((unit: any) => !(isRefugeFloor && unit.id % 10 === 3)).map((unit: any) => (
                            <ul key={unit.id}>
                                <li
                                    className={`
                                        transition-transform duration-200 mt-2 flex p-1 rounded-sm justify-between border-b pb-2 text-[12px]
                                        ${hoveredUnit === unit.id ? "scale-105 bg-slate-200" : "scale-100"}
                                    `}
                                    onMouseEnter={() => setHoveredUnit(unit.id)}
                                    onMouseLeave={() => setHoveredUnit(null)}
                                >
                                    <p>{unit.name}</p> <p>{unit.type}</p>
                                </li>
                            </ul>
                        ))
                    ) : isRefugeFloor && isJodiMode ? (
                        <>
                            {mappedJodi?.filter((unit: any) => unit.id % 10 !== 3).map((unit: any) => (
                                <ul key={unit.id}>
                                    <li
                                        className={`cursor-pointer transition-transform duration-200 mt-2 flex p-1 rounded-sm justify-between border-b pb-2 text-[12px] ${hoveredUnit === unit.id ? "scale-105 bg-slate-200" : "scale-100"}`}
                                        onMouseEnter={() => setHoveredUnit(unit.id)}
                                        onMouseLeave={() => setHoveredUnit(null)}
                                        onClick={() => navigate(`/${destinationTower}_jodi/${unit.id}`, { state: { towerId: tower.id } })}
                                    >
                                        <p>{unit.name}</p> <p>{unit.type}</p>
                                    </li>
                                </ul>
                            ))}
                            {unit5 && (
                                <ul key={unit5.id}>
                                    <li
                                        className={`cursor-pointer transition-transform duration-200 mt-2 flex p-1 rounded-sm justify-between border-b pb-2 text-[12px] ${hoveredUnit === unit5.id ? "scale-105 bg-slate-200" : "scale-100"}`}
                                        onMouseEnter={() => setHoveredUnit(unit5.id)}
                                        onMouseLeave={() => setHoveredUnit(null)}
                                        onClick={() => navigate(`/${destinationTower}_unit/${unit5.id}`, { state: { towerId: tower.id } })}
                                    >
                                        <p>{unit5.name}</p> <p>{unit5.type}</p>
                                    </li>
                                </ul>
                            )}
                        </>
                    ) : (
                        singleFloor.units.filter((unit: any) => !(isRefugeFloor && unit.id % 100 === 6)).map((unit: any) => (
                            <ul key={unit.id}>
                                <li
                                    className={`
                                        transition-transform duration-200 mt-2 flex p-1 rounded-sm justify-between border-b pb-2 text-[12px]
                                        ${hoveredUnit === unit.id ? "scale-105 bg-slate-200" : "scale-100"}
                                    `}
                                    onMouseEnter={() => { if (!(isRefugeFloor && unit.id % 100 === 6)) setHoveredUnit(unit.id); }}
                                    onMouseLeave={() => setHoveredUnit(null)}
                                >
                                    <p>{unit.name}</p> <p>{unit.type}</p>
                                </li>
                            </ul>
                        ))
                    )}

                </div>


                <div className="mt-3 gap-4 flex flex-col justify-center items-center w-full">
                    {Object.values(singleFloor.buttonSettings).map((btn: any, idx) => (
                        <button
                            key={idx}
                            className="py-2 rounded-lg w-full"
                            style={{ backgroundColor: btn.bgColor }}
                        >
                            {btn.text}
                        </button>
                    ))}
                </div>

            </div>

            {/* Floor Plan */}
            <div className="relative w-full md:h-screen flex items-center justify-center">
                <svg
                    viewBox={activeSvgSize}
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <image
                        href={activeFloorImage}
                        width={activeSvgSize?.split(' ')[2]}
                        height={activeSvgSize?.split(' ')[3]}
                    />
                    {activeJodiMode && mappedJodi ? (
                        mappedJodi.filter((jodiUnit: any) => !(isRefugeFloor && jodiUnit.id % 10 === 3)).map((jodiUnit: any) => (
                            <g key={jodiUnit.id}>
                                {(Array.isArray(jodiUnit.polygons) ? jodiUnit.polygons : [jodiUnit.polygons]).map((pts: string, idx: number) => {
                                    const jodiNum = jodiUnit.id % 10;
                                    const isJodi1 = jodiNum === 1;
                                    const name = (isZenia && isRefugeFloor && isJodi1)
                                        ? (idx === 0 ? "Unit No-1" : "Unit No-2")
                                        : jodiUnit.name;
                                    const targetId = (isZenia && isRefugeFloor && isJodi1 && idx === 1)
                                        ? (floorNumber * 100 + 95)
                                        : jodiUnit.id;

                                    const hoverColor = (isZenia && isRefugeFloor)
                                        ? (jodiNum === 1 || jodiNum === 5 ? "rgba(253,230,23,0.35)" : "rgba(230,46,230,0.35)")
                                        : jodiUnit.hoverColor;

                                    let points = pts;
                                    if (isZenia && isRefugeFloor) {
                                        const rawRefugeFloor = tower.floors?.find((f: any) => f.title === `FLOOR-${floorNumber}`) || tower.floors?.[1];
                                        if (rawRefugeFloor && rawRefugeFloor.units) {
                                            let uIdx = 0;
                                            if (jodiNum === 1) {
                                                uIdx = idx;
                                            } else if (jodiNum === 5) {
                                                uIdx = 1;
                                            } else {
                                                uIdx = idx + 2;
                                            }
                                            points = rawRefugeFloor.units[uIdx]?.polygonPoints || pts;
                                        }
                                    }

                                    return (
                                        <Tooltip
                                            key={`${jodiUnit.id}-${idx}`}
                                            title={name}
                                            placement="top"
                                            slotProps={{
                                                tooltip: {
                                                    sx: {
                                                        backgroundColor: getSolidColor(hoverColor),
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
                                                points={points}
                                                fill={hoveredUnit === targetId ? hoverColor : "transparent"}
                                                style={{ cursor: "pointer" }}
                                                onMouseEnter={() => setHoveredUnit(targetId)}
                                                onMouseLeave={() => setHoveredUnit(null)}
                                                onClick={() => navigate(`/${destinationTower}_jodi/${targetId}`, { state: { towerId: tower.id } })}
                                            />
                                        </Tooltip>
                                    );
                                })}
                            </g>
                        ))
                    ) : isRefugeFloor && isJodiMode && mappedJodi ? (
                        <>
                            {mappedJodi.filter((jodiUnit: any) => jodiUnit.id % 10 !== 3).map((jodiUnit: any) => (
                                <g key={jodiUnit.id}>
                                    {(Array.isArray(jodiUnit.polygons) ? jodiUnit.polygons : [jodiUnit.polygons]).map((pts: string, idx: number) => (
                                        <Tooltip
                                            key={`${jodiUnit.id}-${idx}`}
                                            title={jodiUnit.name}
                                            placement="top"
                                            slotProps={{ tooltip: { sx: { backgroundColor: getSolidColor(jodiUnit.hoverColor), color: "#000000", fontSize: "14px", fontWeight: "normal", padding: "8px 16px", borderRadius: "4px", boxShadow: "0px 4px 10px rgba(0,0,0,0.15)" } } }}
                                        >
                                            <polygon
                                                points={pts}
                                                fill={hoveredUnit === jodiUnit.id ? jodiUnit.hoverColor : "transparent"}
                                                style={{ cursor: "pointer" }}
                                                onMouseEnter={() => setHoveredUnit(jodiUnit.id)}
                                                onMouseLeave={() => setHoveredUnit(null)}
                                                onClick={() => navigate(`/${destinationTower}_jodi/${jodiUnit.id}`, { state: { towerId: tower.id } })}
                                            />
                                        </Tooltip>
                                    ))}
                                </g>
                            ))}
                            {unit5 && (
                                <Tooltip
                                    title={`${unit5.name} (${unit5.type})`}
                                    placement="top"
                                    slotProps={{ tooltip: { sx: { backgroundColor: getSolidColor(unit5.hoverColor), color: "#000000", fontSize: "14px", fontWeight: "normal", padding: "8px 16px", borderRadius: "4px" } } }}
                                >
                                    <polygon
                                        points={unit5.polygonPoints}
                                        fill={hoveredUnit === unit5.id ? unit5.hoverColor : "transparent"}
                                        style={{ cursor: "pointer" }}
                                        onMouseEnter={() => setHoveredUnit(unit5.id)}
                                        onMouseLeave={() => setHoveredUnit(null)}
                                        onClick={() => navigate(`/${destinationTower}_unit/${unit5.id}`, { state: { towerId: tower.id } })}
                                    />
                                </Tooltip>
                            )}
                        </>
                    ) : (
                        singleFloor.units.map((unit: any) => (
                            <Tooltip
                                key={unit.id}
                                title={isRefugeFloor && unit.id % 100 === 6 ? "" : `${unit.name} (${unit.type})`}
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
                                    fill={hoveredUnit === unit.id ? unit.hoverColor : "transparent"}
                                    style={{ cursor: isRefugeFloor && unit.id % 100 === 6 ? "default" : "pointer" }}
                                    onMouseEnter={() => { if (!(isRefugeFloor && unit.id % 100 === 6)) setHoveredUnit(unit.id); }}
                                    onMouseLeave={() => setHoveredUnit(null)}
                                    onClick={() => { if (!(isRefugeFloor && unit.id % 100 === 6)) navigate(`/${destinationTower}_unit/${unit.id}`, { state: { towerId: tower.id } }); }}
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

                    {(!isRefugeFloor || isZenia) && tower?.jodi && tower.jodi.length > 0 && (
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
