import { events } from "../../constants/home";
import { CalendarClock, ArrowRight } from "lucide-react";

export default function EventsSection() {
  return (
    <section className="py-10 px-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8 text-green-700">
        Upcoming Events
      </h2>
      <div className="space-y-6 max-w-6xl mx-auto">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col md:flex-row items-center bg-gray-50 shadow-md rounded-lg overflow-hidden h-100 md:h-50">
            {/* Left Banner */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full md:w-80 h-100 md:h-full object-cover"
            />


            {/* Middle Content */}
            <div className="flex-1 p-4">
              <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-600 mt-1">{event.description}</p>
              <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                <span>
                  {event.remainingTime
                    ? `Registration ends in ${event.remainingTime}`
                    : `Last Date: ${event.date}`}
                </span>
              </div>
            </div>

            {/* Right Button */}
            <div className="p-4">
              <a
                className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
              >
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
