import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { motion } from "framer-motion";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

type Alumni = {
  name: string;
  batch: string;
  role: string;
  image: string;
  linkedin?: string;
  facebook?: string;
};

const alumniList: Alumni[] = [
  {
    name: "Sadia Rahman",
    batch: "Batch 2018",
    role: "Software Engineer at Google",
    image: "/images/alumni/sadia.jpg",
    linkedin: "https://linkedin.com/in/sadiarahman",
  },
  {
    name: "Mahmud Hasan",
    batch: "Batch 2017",
    role: "AI Researcher at OpenAI",
    image: "/images/alumni/mahmud.jpg",
    linkedin: "https://linkedin.com/in/mahmudhasan",
    facebook: "https://facebook.com/mahmud.ai",
  },
  {
    name: "Nusrat Jahan",
    batch: "Batch 2019",
    role: "Product Manager at Meta",
    image: "/images/alumni/nusrat.jpg",
    linkedin: "https://linkedin.com/in/nusratjahann",
  },
];

export default function AlumniPage() {
  return (
   <div>
    <MainNav />
    <section className="py-16 px-4 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Our Proud Alumni</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {alumniList.map((alum, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-green-50 border border-green-200 rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={alum.image}
              alt={alum.name}
              className="w-32 h-32 object-cover rounded-full mb-4 shadow-sm"
            />
            <h3 className="text-xl font-semibold text-green-800">{alum.name}</h3>
            <p className="text-sm text-gray-600">{alum.batch}</p>
            <p className="text-sm text-gray-800 mt-1">{alum.role}</p>
            <div className="flex gap-4 mt-4">
              {alum.linkedin && (
                <a
                  href={alum.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 transition"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {alum.facebook && (
                <a
                  href={alum.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 transition"
                >
                  <FaFacebookSquare size={20} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    <Footer />
   </div>
  );
}
