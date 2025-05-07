import { motion } from "framer-motion";

export default function CourseInfoCard() {
  return (
    <aside className="w-full md:w-[280px] lg:w-[300px] sticky top-4">
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Course Info Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="bg-green-700 text-white text-base font-medium px-4 py-2 rounded-t-xl">
            Course Information
          </div>
          <div className="px-4 py-3 space-y-2 text-sm text-gray-700">
            <InfoRow label="Name" value="Smart Bootcamp" />
            <InfoRow label="Cost" value="$0 (Free)" />
            <InfoRow label="Location" value="Dhaka Campus" />
            <InfoRow label="Date" value="01 Jun, 2025" />
            <InfoRow label="Duration" value="3 Days" noBorder />
          </div>
        </div>

        {/* Questions Card */}
        <motion.div
          className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img
            src="/public/event1.jpg"
            alt="Contact"
            className="w-full h-28 object-cover"
          />
          <div className="p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Got any questions? <br /> Contact us today
            </p>
            <a
              href="mailto:hello@yourmail.com"
              className="inline-flex items-center gap-2 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded transition-all duration-300"
            >
              <span>Contact</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </aside>
  );
}

function InfoRow({ label, value, noBorder }) {
  return (
    <div className={`flex justify-between py-1 ${!noBorder ? "border-b" : ""}`}>
      <span className="text-gray-600">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
