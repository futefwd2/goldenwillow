import bgImage from '../assets/goldenwillows/projecthighlights.jpg'
import { FaBuilding, FaLeaf } from "react-icons/fa";
import WithoutbgHeader from '../components/WithoutbgHeader'

export default function ProjectHighlights_Gold() {

    const plot = [
        "11.11 Acres",
        "85% Open space:",
        "5.2 Acres of green space(50%)",
        "2.7 Acres of garden on the podium",
        "2.5 Acres of garden on the ground",
    ];

    const highlights = [
        "Integrated Township (1st in Mumbai NXT)",
        "19 Towers | 2200+ Apartments Delivered",
        "Fully Functional School, Retail & Commercial",
        "Wide Roads with Pedestrian Pathways",
        "100 Acres of Open Green Spaces",
        "25 Acres of Adjacent Reserve Forest",
        "Hill, Forest & River Views",
    ];

    const amenities = [
        "Clubhouse",
        "Hospital",
        "School",
        "Fire Station",
        "Cycling Track + Wide Roads",
        "Retail Shopping",
        "Garden Areas",
        "Playground"
    ];

    return (
        <>
            <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
            <section
                id="project-highlights-section"
                className="relative w-full h-screen bg-cover bg-end bg-no-repeat text-white overflow-hidden font-sans"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Logos Header */}
                <WithoutbgHeader />

                {/* Right Panel - Compact Premium Floating Container */}
                <div className="absolute bg-black/45 backdrop-blur-xl p-6 lg:p-8 right-6 top-20 bottom-32 w-full md:w-[40%] lg:w-[30%] flex flex-col no-scrollbar overflow-y-auto border border-white/20 rounded-2xl shadow-2xl transition-all duration-700">

                    <h2 className="text-xl lg:text-2xl font-bold mb-6 tracking-widest uppercase border-b border-white/30 pb-3">
                        PROJECT OVERVIEW
                    </h2>

                    {/* Plot Area */}
                    <div className="mb-5">
                        <h3 className="flex items-center gap-3 text-sm lg:text-base font-bold mb-3 text-yellow-500 uppercase tracking-widest">
                            <FaBuilding className="text-yellow-500" size={20} /> PLOT AREA:
                        </h3>
                        <ul className="list-none space-y-1.5 text-[13px] lg:text-[14px] font-medium text-gray-200 pl-2">
                            {plot.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-yellow-500 text-lg leading-4">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Highlights */}
                    <div className="mb-5">
                        <h3 className="flex items-center gap-3 text-sm lg:text-base font-bold mb-3 text-yellow-500 uppercase tracking-widest leading-tight">
                            <FaLeaf className="text-yellow-500 shrink-0" size={18} />
                            <div>
                                KEY TOWNSHIP HIGHLIGHTS
                                <span className="text-[10px] block font-normal normal-case opacity-70 mt-0.5 italic">(1st in Mumbai NXT)</span>
                            </div>
                        </h3>
                        <ul className="list-none space-y-1.5 text-[13px] lg:text-[14px] font-medium text-gray-200 pl-2">
                            {highlights.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-yellow-500 text-lg leading-4">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Amenities */}
                    <div className="mb-2">
                        <h3 className="flex items-center gap-3 text-sm lg:text-base font-bold mb-3 text-yellow-500 uppercase tracking-widest">
                            <FaLeaf className="text-yellow-500" size={18} /> PROPOSED TOWNSHIP AMENITIES
                        </h3>
                        <ul className="list-none space-y-1.5 text-[13px] lg:text-[14px] font-medium text-gray-200 pl-2">
                            {amenities.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-yellow-500 text-lg leading-4">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </section>
        </>
    );
}