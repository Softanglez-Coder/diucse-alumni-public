import { useState } from "react";
import { navLinks } from "../../constants/home";
import { NavLink } from "../../types";
import logo from "../../../public/vite.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 px-4 py-3 shadow-md backdrop-blur-md bg-blue-900"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-10 sm:h-12 cursor-pointer transition-transform duration-300 hover:scale-105"
        />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-white focus:outline-none transition-transform duration-300 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-8 text-sm sm:text-base font-medium">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white hover:text-green-200 transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="block w-0 group-hover:w-full h-0.5 bg-green-400 transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white text-sm text-gray-800 rounded-md shadow-lg mt-2 overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-3 space-y-3">
              {navLinks.map((link: NavLink) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
