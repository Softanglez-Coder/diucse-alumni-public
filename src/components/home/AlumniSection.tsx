import { alumniList } from "../../constants/home";

export default function AlumniSection() {

  return (
    <section className="bg-gray-100 py-10 px-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Notable Alumni</h2>

      <div className="overflow-x-auto py-4">
        <div
          className={`flex gap-4 max-w-full px-2 ${
            alumniList.length < 3 ? "justify-center" : ""
          }`}
        >
          {alumniList.map((alumnus) => (
            <div
              key={alumnus.name}
              className="w-60 flex-shrink-0 bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={alumnus.image}
                alt={alumnus.name}
                className="w-24 h-24 mx-auto rounded-full mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold">{alumnus.name}</h3>
              <p className="text-sm text-gray-600">{alumnus.occupation}</p>
              <button className="text-green-600 text-xs mt-2 underline hover:no-underline">
                View Full Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
