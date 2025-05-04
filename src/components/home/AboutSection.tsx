import { events } from "../../constants/home";

export default function AboutSection() {
  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <section className="py-12 px-4 bg-[#fdfdfb]">
      <div
        className={`max-w-6xl mx-auto ${
          latestEvent
            ? "grid grid-cols-1 md:grid-cols-2 gap-10"
            : "flex flex-col items-center justify-center"
        }`}
      >
        {/* About Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <img
            src="/image/logo/roundLogo.png"
            alt="About"
            className="w-48 h-48 object-contain rounded-full border-4 border-[#FFD600] shadow-lg transition-transform duration-300 hover:rotate-2"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#002D72] mb-2">
              About DIU Alumni
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              We connect graduates of Dhaka International University to share
              opportunities, memories, and achievements. Join a growing
              network of changemakers and lifelong learners.
            </p>
          </div>
        </div>

        {/* Latest Event Section */}
        {latestEvent && (
          <div className="bg-white border border-[#FFD600] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <img
              src={latestEvent.image}
              alt={latestEvent.title}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#3B7C3F]">
                {latestEvent.title}
              </h3>
              <p className="text-gray-700 mt-2">{latestEvent.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                📅 Last Date: {latestEvent.deadline}
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={latestEvent.registrationLink}
                className="px-5 py-2 bg-[#3B7C3F] text-white rounded-full hover:bg-[#2e6233] text-sm transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now
              </a>
              <a
                href={latestEvent.detailsLink}
                className="px-5 py-2 border-2 border-[#3B7C3F] text-[#3B7C3F] rounded-full hover:bg-[#f0fdf4] text-sm transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                More Details
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
