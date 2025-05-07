import { recentBlog } from "../../constants/home";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentBlogSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
        Recent Blog
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {recentBlog.map((news, idx) => (
          <motion.div
            key={news.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
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
              <p className="text-gray-700 mb-4">{news.summary}</p>
              <a
                href="#"
                className="inline-flex items-center text-green-600 hover:underline font-medium"
              >
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
