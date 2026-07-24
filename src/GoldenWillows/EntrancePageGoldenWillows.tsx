import { Link } from 'react-router-dom';
import WithoutbgHeader from '../components/WithoutbgHeader'
import { RiArrowGoBackLine } from "react-icons/ri";

export default function EntrancePageGoldenWillows() {

   
    return (<>

        <div className="w-screen h-screen">
            <WithoutbgHeader />
            <iframe
                src="pano/pano1/index.html"
                className="w-full h-full border-0"
                title="Pano2VR Tour"
            ></iframe>

            {/* Overlay Buttons */}
            <div className="absolute bottom-10 right-6 z-30 pointer-events-auto">
                <Link to="https://hiranandanifortunecity.com/" target="_blank" rel="noopener noreferrer">
                <button  className="bg-white/70 text-gray-800/90 hover:text-black text-[18px] w-16 h-16 font-bold rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center">
                    <RiArrowGoBackLine size={20} />
                </button></Link>
            </div>
        </div>
    </>)
}