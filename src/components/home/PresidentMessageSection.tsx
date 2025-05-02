import { presidentMessage } from "../../constants/home";
export default function PresidentMessageSection() {

  return (
    <section className="bg-gray-100 py-10 px-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-8">President's Message</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center bg-white shadow rounded-lg p-6">
        
        {/* Left Side */}
        <div className="flex flex-col items-center text-center md:text-left">
          <img
            src={presidentMessage.image}
            alt="President"
            className="w-40 h-40 object-cover rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">{presidentMessage.name}</h3>
          <p className="text-sm text-green-600">{presidentMessage.position}</p>
          <p className="text-sm text-gray-500 mt-2">
           {presidentMessage.description}
          </p>
        </div>

        {/* Right Side */}
        <div>
          <p className="text-gray-700 leading-relaxed text-justify">“{presidentMessage.message}”</p>
        </div>
      </div>
    </section>
  );
}
