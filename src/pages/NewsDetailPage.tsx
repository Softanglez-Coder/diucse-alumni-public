import { useParams } from "react-router-dom";
import { news } from "../constants/news";
import { CalendarDays } from "lucide-react";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function NewsDetailPage() {
  const { id } = useParams();
  const newsItem = news.find(n => n.id === Number(id));

  if (!newsItem) return <div className="text-center mt-20 text-red-500">News not found</div>;

  return (
    <div>
      <MainNav  />
      <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{newsItem.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <CalendarDays className="h-4 w-4 text-green-600 mr-1" />
          {newsItem.date}
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{newsItem.content}</p>
      </div>
    </section>
      <Footer />
    </div>
  );
}
