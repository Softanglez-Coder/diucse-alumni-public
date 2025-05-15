import { welcomeContent } from "../../constants/home";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <section className="py-16 px-4 text-center bg-gray-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-green-700 mb-4 relative inline-block">
          {welcomeContent.title}
          <span className="block w-16 h-1 bg-green-500 mx-auto mt-2 rounded-full animate-pulse" />
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-sm md:text-lg mt-4">
          {welcomeContent.body}
        </p>
      </motion.div>
    </section>
  );
}
