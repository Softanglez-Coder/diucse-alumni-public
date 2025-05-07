import { events } from "../../constants/home";
import { CalendarClock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-white via-green-50 to-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
        Upcoming Events
      </h2>
      <div className="space-y-8 max-w-6xl mx-auto">
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
          >
            {/* Left Banner */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full md:w-72 h-56 md:h-auto object-cover"
            />

            {/* Middle Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarClock className="h-4 w-4 text-green-600" />
                <span>
                  {event.remainingTime
                    ? `Registration ends in ${event.remainingTime}`
                    : `Last Date: ${event.date}`}
                </span>
              </div>
            </div>

            {/* Right Button */}
            <div className="p-6 flex items-center">
              <a
                href="#"
                className="inline-flex items-center bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
