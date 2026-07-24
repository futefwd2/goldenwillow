import { Link } from "react-router-dom";



export default function Header() {
  return (
    <header className="w-screen bg-white/50  absolute z-30 top-2  flex items-center justify-between pr-14 lg:px-16 py-4 shadow-md">
      {/* Video Logo */}
      <div className="flex  justify-between w-full">
        <div className="w-1/2 justify-start flex">

          <Link to="/"><img src="/logo1.png" className="w-48 h-[47px] object-contain rounded-lg" /></Link>
        </div>
        <div className="w-1/2 justify-end flex">
          <img src="/logo2.png" className="w-40 h-[47px] object-contain rounded-lg" />
        </div>
      </div>


    </header>
  );
}
