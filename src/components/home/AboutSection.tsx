import { events } from "../../constants/events";
import { motion } from "framer-motion";
import FeaturedEventCard from "../layout/GetUpcomingEvent ";

export default function AboutSection() {
  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <section className="py-16 px-4 bg-[#fdfdfb] relative overflow-hidden">
      <div
        className={`max-w-6xl mx-auto transition-all duration-500 ${
          latestEvent
            ? "grid grid-cols-1 md:grid-cols-2 gap-12"
            : "flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left"
        }`}
      >
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`flex ${
            latestEvent
              ? "flex-col items-center md:items-start space-y-6 text-center md:text-left"
              : "flex-col-reverse md:flex-row items-center justify-center text-center md:text-left gap-10"
          }`}
        >
          <img
            src="/image/logo/roundLogo.png"
            alt="About"
            className="w-48 h-48 object-contain rounded-full border-4 border-green-700 shadow-lg hover:rotate-3 hover:scale-105 transition duration-500"
          />
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-3">
              About DIU Alumni
            </h2>
            <div className="w-24 h-1 bg-green-700 mb-4 mx-auto md:mx-0 rounded-full animate-pulse"></div>
            <p className="text-gray-700 text-base leading-relaxed">
              We connect graduates of Dhaka International University to share
              opportunities, memories, and achievements. Join a growing network
              of changemakers and lifelong learners.
            </p>
          </div>
        </motion.div>

        {/* Latest Event Section */}
        <FeaturedEventCard />
      </div>
    </section>
  );
}
