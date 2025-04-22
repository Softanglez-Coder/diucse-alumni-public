import { contactInfo } from "../../constants/home";

export default function TopNav() {
  return (
    <div className="bg-gray-800 text-white text-sm py-2 px-4 flex justify-between items-center">
      <div className="space-x-4">
        <span>📞 {contactInfo.phone}</span>
        <span>📧 {contactInfo.email}</span>
      </div>
      <a
        href={contactInfo.portalLink}
        className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-500 transition"
        target="_blank"
      >
        Go to Portal
      </a>
    </div>
  );
}
