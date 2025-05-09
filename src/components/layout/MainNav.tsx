import { useState } from "react";
import { navLinks } from "../../constants/home";
import { NavLink } from "../../types";
import logo from "../../../public/image/logo/logo.png";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className=" sticky top-0 z-50 shadow-md bg-[#ddf1ff] px-4 py-3 flex items-center justify-between  "
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="SOSB Logo"
        className="h-10 sm:h-12 cursor-pointer"
      />

      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="md:hidden text-gray-800 text-xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown menu
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          isOpen ? "block" : "hidden" // Show/hide the dropdown based on `isOpen`
        } md:flex md:space-x-6 absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none mt-2 md:mt-0 z-50`}
      >
        <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6 text-gray-800 font-medium p-4 md:p-0">
          {navLinks.map((link: NavLink) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="block text-sm sm:text-base hover:text-green-600 transition duration-300"
                onClick={() => setIsOpen(false)} // Close the dropdown after clicking a link
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}