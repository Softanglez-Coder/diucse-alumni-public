import { membershipBenefits } from "../../constants/home";
import { ShieldCheck, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function MembershipBenefitsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-white px-4">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Membership Benefits
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {membershipBenefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            {/* Icon */}
            <div className="text-green-600 text-5xl mb-6">
              {benefit.icons === "ShieldCheck" && <ShieldCheck />}
              {benefit.icons === "Users" && <Users />}
              {benefit.icons === "Star" && <Star />}
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {benefit.title}
            </h3>
            <p className="text-center text-gray-600 text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
