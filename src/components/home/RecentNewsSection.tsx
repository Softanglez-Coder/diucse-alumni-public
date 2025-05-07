import { recentNews } from "../../constants/home";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentNewsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-gray-50 via-white to-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
        Recent News
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {recentNews.map((news, idx) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {news.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{news.date}</p>
              <p className="text-gray-600 mb-4 line-clamp-3">{news.summary}</p>
              <a
                href="#"
                className="inline-flex items-center text-green-600 font-medium hover:underline"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
