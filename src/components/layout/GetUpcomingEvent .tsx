import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import { events } from "./../../constants/events"

// Helper function to get the most upcoming event
const getUpcomingEvent = () => {
  const today = new Date();
  const upcoming = events
    .filter(e => new Date(e.courseInfo.date) >= today)
    .sort((a, b) => new Date(a.courseInfo.date).getTime() - new Date(b.courseInfo.date).getTime());
  return upcoming[0];
};

const latestEvent = getUpcomingEvent();

export default function FeaturedEventCard() {
  return (
    latestEvent && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-white border border-green-700 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
      >
        <img
          src={latestEvent.image.replace("/public", "")}
          alt={latestEvent.title}
          className="w-full h-52 object-cover rounded-lg mb-4 hover:scale-105 transition duration-500"
        />
        <div>
          <h3 className="text-2xl font-semibold text-green-800 mb-2">
            {latestEvent.title}
          </h3>
          <p className="text-gray-700 text-sm mb-2">{latestEvent.shortDescription}</p>
          <p className="text-sm text-gray-500">📅 Date: {latestEvent.courseInfo.date}</p>
          <p className="text-sm text-gray-500">📍 Location: {latestEvent.courseInfo.location}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`/event/${latestEvent.id}`}
            className="flex items-center gap-2 px-5 py-2 border-2 border-green-700 text-green-700 rounded-full hover:bg-green-50 text-sm transition-all duration-300"
          >
            <FaInfoCircle /> More Details
          </a>
        </div>
      </motion.div>
    )
  );
}
