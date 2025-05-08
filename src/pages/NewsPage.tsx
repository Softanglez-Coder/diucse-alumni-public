import { motion } from "framer-motion";
import { CalendarDays, MoveRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { news } from "../constants/news";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function NewsPage() {
  return (
    <div>
      <MainNav />
      <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-10">Latest News</h2>

      {/* Top Story (Banner type news :-) ) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-16 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      >
        <img
          src={news[0].image}
          alt={news[0].title}
          className="w-full md:w-1/2 h-72 object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{news[0].title}</h3>
            <p className="text-gray-600 mb-4">{news[0].description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="h-4 w-4 text-green-600" />
            <span>{news[0].date}</span>
          </div>
          <Link
            to={`/news/${news[0].id}`}
            className="inline-flex items-center text-green-600 hover:text-green-700 mt-4"
          >
            Read More
            <MoveRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* News Grid  */}
      <div className="grid gap-8 max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {news.slice(1).map((newsItem, index) => (
          <motion.div
            key={newsItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{newsItem.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{newsItem.description}</p>
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <CalendarDays className="h-4 w-4 text-green-600" />
                {newsItem.date}
              </div>
              <Link
                to={`/news/${newsItem.id}`}
                className="inline-flex items-center text-green-600 hover:text-green-700 mt-4"
              >
                Read More
                <MoveRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
      <Footer />
    </div>
  );
}
