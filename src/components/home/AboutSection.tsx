import { events } from "../../constants/home";
import { motion } from "framer-motion";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";

export default function AboutSection() {
  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <section className="py-16 px-4 bg-[#fdfdfb] relative overflow-hidden">
      <div
        className={`max-w-6xl mx-auto transition-all duration-500 ${
          latestEvent
            ? "grid grid-cols-1 md:grid-cols-2 gap-12"
            : "flex flex-col items-center justify-center"
        }`}
      >
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
        >
          <img
            src="/image/logo/roundLogo.png"
            alt="About"
            className="w-48 h-48 object-contain rounded-full border-4 border-green-700 shadow-lg hover:rotate-3 hover:scale-105 transition duration-500"
          />
          <div>
            <h2 className="text-4xl font-extrabold text-blue-900 mb-3">
              About DIU Alumni
            </h2>
            <div className="w-24 h-1 bg-green-700 mb-4 mx-auto md:mx-0 rounded-full animate-pulse"></div>
            <p className="text-gray-700 text-base leading-relaxed max-w-xl">
              We connect graduates of Dhaka International University to share
              opportunities, memories, and achievements. Join a growing
              network of changemakers and lifelong learners.
            </p>
          </div>
        </motion.div>

        {/* Latest Event Section */}
        {latestEvent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white border border-blue-900 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            <img
              src={latestEvent.image}
              alt={latestEvent.title}
              className="w-full h-52 object-cover rounded-lg mb-4 hover:scale-105 transition duration-500"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#3B7C3F] mb-2">
                {latestEvent.title}
              </h3>
              <p className="text-gray-700 mb-2">{latestEvent.description}</p>
              <p className="text-sm text-gray-500">📅 Last Date: {latestEvent.deadline}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={latestEvent.registrationLink}
                className="flex items-center gap-2 px-5 py-2 bg-[#3B7C3F] text-white rounded-full hover:bg-[#2e6233] text-sm transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaArrowRight /> Register Now
              </a>
              <a
                href={latestEvent.detailsLink}
                className="flex items-center gap-2 px-5 py-2 border-2 border-[#3B7C3F] text-[#3B7C3F] rounded-full hover:bg-[#f0fdf4] text-sm transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInfoCircle /> More Details
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
