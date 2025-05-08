import { membershipBenefits } from "../../constants/home";
import { ShieldCheck, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function MembershipBenefitsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#f0fdf4] to-[#e4f7ec]">
      <h2 className="text-4xl font-extrabold text-center text-green-800 mb-5 ">
      Membership Benefits
      </h2>
      {/* Horixontal line */}
      <div className="w-24 h-1 bg-green-700 mb-10 mx-auto rounded-full animate-pulse mb-15"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {membershipBenefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            className="relative p-8 rounded-3xl border border-green-200 bg-white/30 backdrop-blur-lg shadow-[0_8px_30px_rgb(34_197_94_/_0.2)] hover:shadow-[0_12px_45px_rgb(34_197_94_/_0.35)] hover:-translate-y-2 transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
          >
            {/* Glowing Ring Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_15px_5px_rgba(34,197,94,0.3)] flex items-center justify-center">
              {benefit.icons === "ShieldCheck" && <ShieldCheck className="text-white" size={30} />}
              {benefit.icons === "Users" && <Users className="text-white" size={30} />}
              {benefit.icons === "Star" && <Star className="text-white" size={30} />}
            </div>

            <div className="mt-14 text-center">
              <h3 className="text-2xl font-semibold text-green-900 mb-2 font-[Orbitron]">
                {benefit.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
