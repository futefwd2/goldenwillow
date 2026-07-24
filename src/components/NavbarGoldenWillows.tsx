import { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "Project Highlights", href: "/project_highlights" },
  { label: "Location", href: "/location" },
  { label: "Golden Willows Layout", href: "/goldenwillowslayout" },
  { label: "Project Details", href: "/projectdetails" },
  // { label: "Project Details", href: "https://hiranandanigoldenwillows.com/project-detail.php" },
  { label: "Project Status", href: "/project_status" },
  { label: "Gallery", href: "/gallery" }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white text-2xl p-2 bg-black/50 rounded-lg"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navbar */}
      <div
        className={`
          fixed top-[11%] md:top-[11%] lg:top-[92%]  left-1/2 -translate-x-1/2 
    bg-black/50 z-40 rounded-2xl  border-2 
    flex justify-center items-center px-4 py-2
    transition-all duration-300
    ${mobileOpen ? "block" : "hidden"} lg:flex
        `}
      >
        <nav className="flex justify-center items-center w-full">
          <ul className="flex flex-col lg:flex-row gap-3 md:gap-5 text-white 
          justify-start items-start lg:justify-center lg:items-center w-full">
            {menuItems.map((item, index) => (
              <li key={index} className="w-full md:w-auto">
                <NavLink
                  to={item.href}
                  onClick={() => setMobileOpen(false)} // close mobile menu on click
                  className={({ isActive }) =>
                    `transition font-bold w-full text-left md:text-center ${item.icon ? "text-3xl" : "text-sm"
                    } ${isActive
                      ? "text-[#e6a524] underline underline-offset-4"
                      : "text-white hover:text-yellow-300 hover:underline underline-offset-4"}`
                  }
                >
                  {item.icon ? item.icon : item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
