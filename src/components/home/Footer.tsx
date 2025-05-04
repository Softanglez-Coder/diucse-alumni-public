import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { footerContent } from "../../constants/home";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#1A2F80] text-white px-6 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={footerContent.footerLogo}
            alt="DIU Alumni Logo"
            className="h-14 mb-4"
          />
          <p className="text-sm text-blue-100 leading-relaxed">
            {footerContent.description}
          </p>
        </motion.div>

        {/* Middle: Important Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-white">
            Important Links
          </h3>
          <ul className="space-y-2 text-sm text-blue-100">
            {footerContent.importantLinks.map(
              (link: { name: string; href: string }, index: number) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:underline transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              )
            )}
          </ul>
        </motion.div>

        {/* Right: Contact Info & Social */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
          <p className="text-sm flex items-center gap-2 text-blue-100 mb-1">
            <Mail size={16} /> {footerContent.contact.email}
          </p>
          <p className="text-sm flex items-center gap-2 text-blue-100">
            <Phone size={16} /> {footerContent.contact.phone}
          </p>

          <div className="flex gap-4 mt-5">
            {footerContent.socialLinks.map(
              (
                link: { name: string; href: string; icon: string },
                index: number
              ) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-200 hover:text-white transition duration-200"
                >
                  {link.icon === "Facebook" && <Facebook size={22} />}
                  {link.icon === "Twitter" && <Twitter size={22} />}
                  {link.icon === "Instagram" && <Instagram size={22} />}
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Copyright */}
      <motion.div
        className="mt-12 text-center text-sm text-blue-200 border-t border-blue-400 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        &copy; {new Date().getFullYear()} {footerContent.copyRightText}
      </motion.div>
    </footer>
  );
}
