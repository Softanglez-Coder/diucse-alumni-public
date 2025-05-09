import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { footerContent } from "../../constants/home";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Left: Logo & Description */}
        <div>
          <img
            src={footerContent.footerLogo}
            alt="DIU Alumni Logo"
            className="h-12 mb-4"
          />
          <p className="text-sm text-gray-400">
            {footerContent.description}
          </p>
        </div>

        {/* Middle: Important Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Important Links</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            {footerContent.importantLinks.map((link: { name: string; href: string }, index: number) => (
              <li key={index}>
                <a href={link.href} className="hover:underline">
                  {link.name}
                </a>
              </li>
            ))}

          </ul>
        </div>

        {/* Right: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm flex items-center gap-2 text-gray-300">
            <Mail size={16} /> {footerContent.contact.email}
          </p>
          <p className="text-sm flex items-center gap-2 text-gray-300 mt-1">
            <Phone size={16} />  {footerContent.contact.phone}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            {footerContent.socialLinks.map((link: { name: string; href: string ; icon: string}, index: number) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.icon === "Facebook" && <Facebook size={20} />}
                {link.icon === "Twitter" && <Twitter size={20} />}
                {link.icon === "Instagram" && <Instagram size={20} />}
                
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} {footerContent.copyRightText}
      </div>
    </footer>
  );
}
