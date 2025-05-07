import { useState } from "react";
import { motion } from "framer-motion";
import { events } from "../constants/events";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

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

  const filteredEvents = events.filter(event => {
    const status = getEventStatus(event.date);
    return active === "All" || status === active;
  });

  return (
    <>
      <MainNav />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">Explore Our Events</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                active === f
                  ? "bg-green-600 text-white shadow"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => {
            const status = getEventStatus(event.date);
            return (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl border shadow hover:shadow-lg overflow-hidden transition"
              >
                {/* Thumbnail */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-green-700">{event.title}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        status === "Running"
                          ? "bg-yellow-200 text-yellow-800"
                          : status === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-3">📅 {event.date}</p>

                  <a
                    href={`/event/${event.id}`}
                    className="inline-block mt-4 text-green-600 font-semibold hover:underline"
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
