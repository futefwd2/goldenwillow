
import { IoReturnUpBackOutline } from "react-icons/io5";

import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { data } from '../../data/GoldenWillowsData'

export default function MainTowerPage() {
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const { towerId } = useParams<{ towerId: string }>();

    const handleBack = () => navigate(-1);

    return (<>

        {data && data.map((e) => {

            const id = Number(towerId) === e.id;
            return id && (
                <div className="relative h-screen w-screen overflow-hidden flex justify-center items-center select-none">

                    {/* Background Image */}
                    <img src={e.image} alt="Arena" className="w-full h-full object-contain lg:object-fill" />

                    {/* Floor Hotspots */}
                    {
                        e.floorsData?.map((floor: any) => (
                            <div key={floor.id}>
                                {/* Hotspot */}
                                <div
                                    data-tooltip-id={`tooltip-${floor.id}`}
                                    // onClick={() => navigate(`/arena_floorarcadia/${floor.id}`)}
                                    className="absolute cursor-pointer rounded-sm  transition-all duration-300"
                                    style={{
                                        top: floor.top,
                                        left: floor.left,
                                        height: `${floor.height}px`,
                                        width: `${floor.width}px`,
                                        transform: "translate(-50%, -50%)",
                                        backgroundColor: hoveredId === floor.id ? floor.hoverColor : "transparent",
                                    }}
                                    onMouseEnter={() => setHoveredId(floor.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => navigate(`/tower_goldenwillows/${floor.id}`)}
                                />

                                {/* Tooltip */}
                                <Tooltip
                                    id={`tooltip-${floor.id}`}
                                    place="right"
                                    content={floor.name}
                                    className="border-l-4 border-l-orange-700 rounded-md"
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.7)",
                                        color: "white",
                                        padding: "6px 12px",
                                        fontSize: "14px",
                                    }}
                                />
                            </div>
                        ))
                    }

                    {/* Back Button */}
                    <div
                        onClick={handleBack}
                        className="absolute top-2 left-2 p-2 bg-black/50 w-[55px] h-[55px] flex items-center justify-center rounded-full z-20 cursor-pointer hover:bg-black/70 transition"
                    >
                        <IoReturnUpBackOutline size={40} color="white" />
                    </div>

                    {/* Content Box */}
                    <div className="absolute z-20 bottom-24 md:bottom-52 lg:bottom-16 right-20 md:right-2 p-10 bg-black/60 rounded-xl max-w-lg text-center text-white">
                        {
                            e.description?.map((item, index) => (
                                <div key={index}>
                                    <p className="mb-2 font-semibold">
                                        Tower Name: {item.towerName}
                                    </p>

                                    <p>
                                        Configuration Available: <br />
                                        {item.configuration}
                                    </p>
                                </div>
                            )
                            )
                        }



                    </div>
                </div>)
        })}</>
    );
}
