import { news } from "../../constants/news";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentNewsSection() {
  // Sort the news array by date in descending order (most recent first)
  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <h2 className="text-4xl font-extrabold text-center mb-5 tracking-wider text-cyan-400">
        Latest Tech News
      </h2>
      <div className="w-24 h-1 bg-cyan-500 mb-10 mx-auto rounded-full animate-pulse"></div>

      {/* News Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {sortedNews.slice(0, 3).map((newsItem, idx) => (
          <motion.div
            key={newsItem.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="relative backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-3xl p-6 overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            {/* Top Image */}
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-44 object-cover rounded-xl mb-4"
            />

            {/* Headline and Meta */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold font-[Orbitron] text-cyan-300 hover:text-cyan-400 transition">
                {newsItem.title}
              </h3>
              <p className="text-sm text-gray-400">{newsItem.date}</p>
              <p className="text-sm text-gray-300 line-clamp-3">
                {newsItem.description}
              </p>
            </div>

            {/* Read More Button */}
            <div className="mt-6 flex justify-between items-center">
              <a
                href={'/news/'+newsItem.id}
                className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <a
          href="/news"
          className="inline-block px-8 py-4 text-white bg-cyan-500 rounded-full font-semibold hover:bg-cyan-600 transition-all duration-300"
        >
          Explore More News
        </a>
      </div>
    </section>
  );
}
