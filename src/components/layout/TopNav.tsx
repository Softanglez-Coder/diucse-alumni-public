import { contactInfo } from "../../constants/home";

export default function TopNav() {
  return (
    <div className="bg-[#A7D3F5]  text-[#002D72] py-3 px-4 sm:px-6 flex justify-between items-center shadow-md">

      <div className="flex space-x-4 sm:space-x-6">
        
        <span className="flex items-center text-xs sm:text-sm">
          📞 {contactInfo.phone}
        </span>

        <span className="flex items-center text-xs sm:text-sm">
          📧 {contactInfo.email}
        </span>
      </div>

      <a
        href={contactInfo.portalLink}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded transition duration-300 ease-in-out shadow-lg text-xs sm:text-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Alumni Portal
      </a>
    </div>
  );
}