import { events } from "../../constants/home";

export default function AboutSection() {
  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <section className="py-10 px-4 bg-white">
      <div className={`max-w-6xl mx-auto ${latestEvent ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col md:flex-row items-center justify-center"}`}>
        
        {/* About Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img
            src="../../public/image/logo/roundLogo.png"
            alt="About"
            className="w-64 h-64 object-fit rounded"
          />
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">About DIU Alumni</h2>
            <p className="text-gray-700">
              We connect graduates of Dhaka International University to share opportunities, memories, and achievements.
            </p>
          </div>
        </div>

        {/* Latest Event Section (conditionally rendered) */}
        {latestEvent && (
          <div className="bg-gray-100 p-6 rounded shadow flex flex-col justify-between">
            <img
              src={latestEvent.image}
              alt={latestEvent.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold text-green-800">{latestEvent.title}</h3>
            <p className="text-gray-700 mt-2">{latestEvent.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Last Date: {latestEvent.deadline}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={latestEvent.registrationLink}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Register Now
              </a>
              <a
                href={latestEvent.detailsLink}
                className="px-4 py-2 border border-green-600 text-green-700 rounded hover:bg-green-50 text-sm"
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
