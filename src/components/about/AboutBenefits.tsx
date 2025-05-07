import { FaUserGraduate, FaChalkboardTeacher, FaLaptopCode, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <FaUserGraduate size={30} />,
    title: "Empowering Smart Learners",
    desc: "We guide students to become smarter learners using curated resources, mentorship, and community support.",
    points: ["Focused learning path", "Smart exam strategies"]
  },
  {
    icon: <FaChalkboardTeacher size={30} />,
    title: "Personalized Academic Support",
    desc: "Get tailored help from mentors, teachers, and successful alumni who care about your academic journey.",
    points: ["One-on-one mentoring", "Group guidance and live classes"]
  },
  {
    icon: <FaLaptopCode size={30} />,
    title: "Industry-Ready Skills",
    desc: "We offer workshops and projects to equip you with skills that matter in today’s job market.",
    points: ["Hands-on tech learning", "Portfolio-building activities"]
  },
  {
    icon: <FaUsers size={30} />,
    title: "Vibrant Digital Community",
    desc: "SOSB connects students across campuses with a shared vision of growth, knowledge, and success.",
    points: ["Discussion forums & peer help", "Events, challenges & rewards"]
  }
];

export default function AboutBenefits() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 py-12"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-[${colors.primary}] mb-4">
        Discover What Makes SOSB Unique
      </h2>
      <p className="text-gray-600 max-w-2xl mb-10">
        SOSB isn’t just a platform — it’s a movement toward smarter education, stronger collaboration, and real student growth.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-6 ${
              index % 2 === 0 ? "bg-white border border-gray-200" : "bg-yellow-50"
            } shadow-md transition duration-300 hover:shadow-xl`}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4 text-[${colors.green}]">
              <div className="bg-[${colors.green}] text-white p-2 rounded-full">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
            <p className="text-gray-700 mb-3">{item.desc}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {item.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  ✅ {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
