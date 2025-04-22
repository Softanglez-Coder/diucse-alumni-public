import { recentNews } from "../../constants/home";
import { ArrowRight } from "lucide-react";

export default function RecentNewsSection() {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        Recent News
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {recentNews.map((news) => (
          <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all">
            <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{news.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{news.date}</p>
              <p className="text-gray-700 mb-4">{news.summary}</p>
              <a
                className="inline-flex items-center text-green-600 hover:underline font-medium"
              >
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
