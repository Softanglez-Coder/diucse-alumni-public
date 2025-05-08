import { blogs } from "../../constants/blogs";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentBlogSection() {
  const visibleBlogs = blogs.slice(0, 3); // Show only 3 blogs

  return (
    <section className="py-20 px-4 bg-[#0f172a]">
      <h2 className="text-4xl font-bold text-center mb-5 text-green-400 tracking-wide">
        Latest Blogs
      </h2>
      <div className="w-24 h-1 bg-green-700 mb-10 mx-auto rounded-full animate-pulse"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {visibleBlogs.map((news, idx) => (
          <motion.div
            key={news.id}
            className="bg-[#1e293b] rounded-2xl overflow-hidden border border-green-500/20 shadow-lg hover:shadow-green-500/30 transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-white">
              <h3 className="text-lg font-semibold mb-2 text-green-300 font-[Orbitron]">
                {news.title}
              </h3>
              <p className="text-xs text-gray-400 mb-1">{news.date}</p>
              <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                {news.excerpt}
              </p>
              <a
                href={'/blog/'+news.id}
                className="inline-flex items-center text-green-400 hover:text-green-300 transition"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-14">
        <a
          href="/blog"
          className="inline-block px-6 py-3 text-green-300 border border-green-500 rounded-full font-semibold hover:bg-green-500 hover:text-black transition-all duration-300 shadow-md hover:shadow-green-500/40"
        >
          Explore More Blogs
        </a>
      </div>
    </section>
  );
}
