import { useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
import bgImage from '../assets/goldenwillows/projectnewimage.webp'
import WithoutbgHeader from '../components/WithoutbgHeader'
import { useState } from 'react';
import { data } from '../data/GoldenWillowsData';
export default function ProjectDetailsPage() {
    const navigate = useNavigate();
    const [selectedFloor, setSelectedFloor] = useState<Number | null>(null);
    const [hoveredFloor, setHoveredFloor] = useState<Number | null>(null);


    return (<>
        <div className="flex h-screen overflow-hidden flex-col md:flex-row justify-center items-center relative">
            {/* <div className='  bg-[rgba(151,156,164,0.9)] absolute w-full h-full'></div> */}
            {/* Header */}
            <WithoutbgHeader />



            {/* Master Plan SVG */}
            <div className="md:flex-1  w-full inset-0  flex justify-center items-center">
                <svg
                    viewBox="0 0 5000 2813"
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Image */}
                    <image href={bgImage} x="0" y="0" width="5000" height="2813" />

                    {/* Polygons */}
                    {data.map((e) => (
                        <Tooltip
                            key={e.id}
                            title={e.name}
                            placement="top"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        backgroundColor: '#e6a524',
                                        color: 'white',
                                        fontSize: '14px',
                                        padding: '6px 10px',
                                        borderRadius: '4px',
                                    },
                                },
                            }}
                        >
                            <polygon
                                points={e.polygon}
                                fill={
                                    selectedFloor === e.id
                                        ? 'rgba(255,112,67,0.5)'
                                        : hoveredFloor === e.id
                                            ? e.hoverColor
                                            : 'transparent'
                                }
                                // stroke="orange"
                                // strokeWidth={2}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setHoveredFloor(e.id)}
                                onMouseLeave={() => setHoveredFloor(null)}
                                onClick={() => {
                                    setSelectedFloor(e.id);
                                    navigate(e.link);
                                }}
                            />
                        </Tooltip>
                    ))}
                </svg>

                {/* Left Side Panel */}
                {/* Left Side Panel */}
                <div className="absolute hidden sm:hidden sm:top-1/4 top-auto left-2 lg:left-0 xl:left-16 right-2 sm:right-auto 
                md:flex flex-col justify-center bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-5 m-2 sm:m-4
                w-[90%] sm:w-72 md:w-52 lg:w-72 xl:w-80">

                    <button className="font-bold bg-gradient-to-r mb-4 rounded-sm px-6 md:px-10 lg:px-16 py-2 text-white from-[#e6a524] to-[#696a68] w-full">
                        GOLDEN WILLOWS
                    </button>

                    <ul className="list-disc pl-5 sm:pl-6 text-white leading-6 sm:leading-7 mt-2 text-sm sm:text-base">
                        <li>10.19 acres land parcel</li>
                        <li>80% open spaces</li>
                        <li>5.3 acres sports themed landscaping</li>
                        <li>80+ exclusive active-life amenities</li>
                        <li>2, 3 & 4 BHK Luxe homes</li>
                    </ul>
                </div>

            </div>

            {/* <Navbar /> */}
        </div>
    </>)
}