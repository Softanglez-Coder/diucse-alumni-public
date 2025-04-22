import { useState } from "react";
import { navLinks } from "../../constants/home";
import { NavLink } from "../../types";
import logo from "../../../public/image/logo/logo.png";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <img src={logo} alt="SOSB Logo" className="h-10" />
      <button
        className="md:hidden text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex space-x-6 text-gray-800 font-medium`}
      >
        {navLinks.map((link: NavLink) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-green-600 transition"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
