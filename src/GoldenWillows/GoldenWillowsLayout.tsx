import { useState } from 'react';
import image from '../assets/goldenwillows/master_goldenwillows.jpg';
import WithoutbgHeader from '../components/WithoutbgHeader';
import Tooltip from '@mui/material/Tooltip';
import { data } from '../data/GoldenMasterPlanData';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/goldenwillows/masterplannewimage.webp'

export default function GoldenWillowsLayout() {
    const [hoveredId, setHoveredId] = useState<Number | null>(null);
    const [selectedId, setSelectedId] = useState<Number | null>(null);
    const [showVideo, setShowVideo] = useState(false);
    const [showImage, setShowImage] = useState(false);


    const uniqueAmenities = [
        ...new Map(data.map(item => [item.id, item])).values()
    ];

    const navigate = useNavigate();

    // Utility function to calculate centroid of a polygon
    function getPolygonCentroid(points: string) {
        const pts = points.split(" ").map(p => p.split(",").map(Number));
        let x = 30, y = 32, len = pts.length;
        pts.forEach(([px, py]) => {
            x += px;
            y += py;
        });
        return [x / len, y / len]; // centroid x, y
    }



    return (<>

        <div className="h-screen w-screen flex flex-col-reverse gap-4
         lg:flex-row relative bg-contain bg-no-repeat bg-white
         overflow-auto lg:overflow-hidden bg-center"

        >
            <WithoutbgHeader />
            <div className="xl:w-[30%] lg:w-[40%] w-full flex  flex-col px-6 py-20 
            bg-white shadow-sm border-l border-gray-100">
                {/* Optional Section Header */}
                <h3 className="text-[12px] uppercase tracking-[0.2em]
                 text-gray-400 font-bold mb-4 mt-2 px-4">
                    Exclusive Amenities
                </h3>

                <div className="lg:overflow-y-auto h-[400px] lg:h-screen pr-2 
    scrollbar-thin scrollbar-thumb-[#c59d5f] scrollbar-track-gray-50">

                    {uniqueAmenities.map((item) => (
                        <div key={item.id} className=" group">
                            {/* Category Heading */}
                            {item.heading && (
                                <div className="py-1 
                                text-[11px] uppercase tracking-widest 
                                text-[#333333]/60 font-semibold px-4 mb-1">
                                    {item.heading}
                                </div>
                            )}

                            {/* Amenity Card */}
                            <div
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => setSelectedId(item.id)}
                                className={`cursor-pointer transition-all duration-300 ease-in-out
            flex items-center px-4 py-3 gap-4 border border-transparent rounded-sm
            ${selectedId === item.id
                                        ? "bg-black/50 text-white shadow-md"
                                        : "hover:bg-[#f9f5f0] hover:border-[#c59d5f]/20"
                                    }`}
                            >
                                {/* Circular ID Indicator */}
                                <div className={`w-8 h-8 rounded-full
                                 flex items-center justify-center text-[10px] font-bold transition-colors
            ${selectedId === item.id
                                        ? "bg-[#c59d5f] text-white"
                                        : "bg-gray-100 text-gray-500 group-hover:bg-[#c59d5f] group-hover:text-white"
                                    }`}>
                                    {item.id < 10 ? `0${item.id}` : item.id}
                                </div>

                                {/* Title */}
                                <span className={`text-[14px] tracking-tight
                                 leading-tight w-full font-medium
            ${selectedId === item.id ? "text-white" : "text-[#333333]"}`}>
                                    {item.title}
                                </span>

                                {/* Selection Indicator Dot */}
                                {selectedId === item.id && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#c59d5f]" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='xl:w-[55%] lg-[70%] w-full flex justify-center
             items-center p-5 ' >

                <svg viewBox='0 0  3592 3592' className='w-full w-auto'
                    preserveAspectRatio="xMidYMid meet">

                    <image href={image} x="0" y="0" width="3592" height="3592" />

                    {data.map((item) => {

                        return (<g key={item.id}>
                            <Tooltip title={item.title} placement='top'
                                open={selectedId === item.id}

                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            backgroundColor: '#211832',
                                            color: 'white',
                                            fontSize: '10px',
                                            padding: '6px 10px',
                                            borderRadius: '4px',
                                        }
                                    }
                                }}
                            >
                                <polygon

                                    points={item.polygon}
                                    fill={


                                        selectedId === item.id
                                            ? "#ED3F27"
                                            : hoveredId === item.id
                                                ? "#842A3B"
                                                : "yellow"

                                    }

                                    //    fill = {
                                    //         selectedId === item.id
                                    //         ? "rgba(237, 63, 39, 0.8)"  // red with 80% opacity
                                    //         : hoveredId === item.id
                                    //             ? "rgba(132, 42, 59, 0.8)"  // dark pink/purple with 80% opacity
                                    //             : "rgba(255, 255, 0, 0.5)"  // yellow with 50% opacity
                                    // }

                                    // stroke="black"
                                    strokeWidth={2}
                                    cursor="pointer"
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => setSelectedId(item.id)}
                                />


                            </Tooltip>
                            {/* Text at centroid */}
                            {(() => {
                                const [cx, cy] = item.textPos || getPolygonCentroid(item.polygon);
                                return (
                                    <text
                                        x={cx}
                                        y={cy}
                                        fontSize="35"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill={
                                            selectedId === item.id
                                                ? "black"
                                                : hoveredId === item.id
                                                    ? "white"
                                                    : "black"
                                        }
                                    >
                                        {item.id}
                                    </text>
                                );
                            })()}

                        </g>)
                    })}


                </svg>

            </div>

            <div className='lg:w-[20%] xl:w-[20%] lg:mt-10 w-full  
            justify-center  items-center flex flex-col gap-3 md:mt-20 mt-20 '>

                <button onClick={() => navigate(-1)} className='rounded-lg transition-all text-sm duration-300 ease-in-out py-3 w-[70%] 
                bg-[#e6a524] hover:bg-black/70 text-white '>Go Back</button>
                <button onClick={() => setShowVideo(true)}
                    className='rounded-lg text-sm transition-all duration-300 
                ease-in-out py-3 w-[70%] bg-black/70 hover:bg-black/80
                 text-white'>Walkthrough</button>


                <button onClick={() => setShowImage(true)}
                    className='rounded-lg transition-all text-sm duration-300 
                 ease-in-out py-3 w-[70%] bg-black/70 hover:bg-black/80
                  text-white '>Zoom Image</button>

            </div>

            {showVideo && (
                <div className='w-full h-full absolute top-0 left-0 bg-black/90 z-[4000] flex justify-center items-center p-5'>

                    {/* Close button */}
                    <button
                        onClick={() => setShowVideo(false)}
                        className="absolute top-2  right-2 bg-black/80 text-white px-3 py-3 rounded-lg text-[16px] font-bold hover:bg-black/80 transition"
                    >
                        ✕
                    </button>
                    <iframe
                        src="https://fast.wistia.net/embed/iframe/tc3gj6wsb0?videoFoam=true&autoplay=1"

                        className="w-[85%] h-full"
                        allow="autoplay; fullscreen"
                    />

                </div>
            )}

            {showImage && (
                <div className='w-full h-full 
                absolute top-0 left-0 bg-black/80 
                z-[4000] flex justify-center items-center p-5'>

                    <button
                        onClick={() => setShowImage(false)}
                        className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1  rounded-lg text-[16px] font-bold hover:bg-black/80 transition"
                    >
                        ✕
                    </button>
                    <img src={image1} alt="Golden Willows Master Plan" className='w-[85%] h-full' />

                </div>
            )}


        </div>

    </>)
}