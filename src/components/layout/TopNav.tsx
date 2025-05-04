import { Mail, Phone } from "lucide-react";
import { contactInfo } from "../../constants/home";
import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <motion.div
      className="bg-[#A7D3F5] text-[#002D72] py-3 px-4 sm:px-6 flex justify-between items-center shadow-md text-xs sm:text-sm"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Contact Info */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span className="flex items-center gap-1">
          <Phone size={14} className="text-[#002D72]" />
          {contactInfo.phone}
        </span>

        <span className="flex items-center gap-1">
          <Mail size={14} className="text-[#002D72]" />
          {contactInfo.email}
        </span>
      </div>

      {/* Portal Link */}
      <a
        href={contactInfo.portalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded transition-all duration-300 shadow hover:shadow-md"
      >
        Go to Alumni Portal
      </a>
    </motion.div>
  );
}
