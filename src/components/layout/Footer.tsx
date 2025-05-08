import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { footerContent } from "../../constants/home";
import { motion } from "framer-motion";

// Step 1: Define the allowed icon names
type IconName = "Facebook" | "Twitter" | "Instagram";

// Step 2: Strictly typed icon map
const iconsMap: Record<IconName, React.ElementType> = {
  Facebook,
  Twitter,
  Instagram,
};

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white px-6 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <img
              src={footerContent.footerLogo}
              alt="DIU Alumni Logo"
              className="h-14 mr-3"
            />
            <p className="text-lg text-green-100 font-bold">
              {footerContent.footerName}
            </p>
          </div>
          <p className="text-sm text-blue-100 leading-relaxed">
            {footerContent.description}
          </p>
        </motion.div>

        {/* Middle: Important Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Important Links</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            {footerContent.importantLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Contact & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
          <ul className="text-sm space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <Mail size={16} /> {footerContent.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> {footerContent.contact.phone}
            </li>
          </ul>

          <div className="flex gap-4 mt-5">
            {footerContent.socialLinks.map((link, index) => {
              // Type-safe icon selection
              const Icon = iconsMap[link.icon as IconName] || Facebook;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-200 hover:text-white transition"
                >
                  <Icon size={22} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Copyright */}
      <motion.div
        className="mt-12 text-center text-sm text-blue-200 border-t border-green-700 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        &copy; {new Date().getFullYear()} {footerContent.copyRightText}
      </motion.div>
    </footer>
  );
}
