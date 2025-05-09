import { useState } from "react";
import { motion } from "framer-motion";
import { events } from "../constants/events";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";

const filters = ["All", "Running", "Upcoming", "Past"];

const getEventStatus = (eventDate: string): "Running" | "Upcoming" | "Past" => {
  const today = new Date();
  const date = new Date(eventDate);
  if (date.toDateString() === today.toDateString()) return "Running";
  if (date > today) return "Upcoming";
  return "Past";
};

export default function AllEventsPage() {
  const [active, setActive] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredEvents = events
    .filter(event => {
      const status = getEventStatus(event.courseInfo.date);
      return active === "All" || status === active;
    })
    .sort((a, b) => {
      const dateA = new Date(a.courseInfo.date).getTime();
      const dateB = new Date(b.courseInfo.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <>
      <MainNav />
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-400 drop-shadow-md tracking-wide animate-pulse">
            🌌 Explore Events in Time
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Filter and explore past, running, and upcoming events</p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
          {/* Filter Buttons */}
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                active === f
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
              }`}
            >
              {f}
            </button>
          ))}

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}
            className="ml-4 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-green-300 hover:bg-gray-700 border border-gray-600 transition"
          >
            {sortOrder === "asc" ? <ArrowDownAZ size={16} /> : <ArrowUpZA size={16} />}
            {sortOrder === "asc" ? "Oldest First" : "Newest First"}
          </button>
        </div>

        {/* Event Banners */}
        <div className="space-y-12">
          {filteredEvents.map(event => {
            const status = getEventStatus(event.courseInfo.date);
            return (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.01 }}
                className="relative flex flex-col md:flex-row bg-gray-900 text-white rounded-2xl overflow-hidden border border-gray-700 shadow-xl backdrop-blur-lg max-h-60"
              >
                {/* Blurred glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-800/20 via-transparent to-purple-800/20 pointer-events-none" />

                {/* Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="md:w-1/2 w-full h-64 md:h-auto object-cover"
                />

                {/* Content */}
                <div className="p-6 z-10 flex flex-col justify-between md:w-1/2">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-extrabold text-green-400 tracking-wide">{event.title}</h3>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          status === "Running"
                            ? "bg-yellow-300 text-black"
                            : status === "Upcoming"
                            ? "bg-blue-400 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-4 min-h-[72px]">
                      {event.longDescription}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">📅 {event.courseInfo.date}</p>
                  </div>
                  <a
                    href={`/event/${event.id}`}
                    className="text-green-300 hover:text-green-100 font-semibold underline underline-offset-2"
                  >
                    View Details → 
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
