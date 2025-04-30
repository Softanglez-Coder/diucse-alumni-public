import { membershipBenefits } from "../../constants/home";
import { ShieldCheck, Users, Star } from "lucide-react";

export default function MembershipBenefitsSection() {
  return (
    <section className="py-10 bg-white px-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Membership Benefits
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {membershipBenefits.map((benefit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-gray-100 transition-all"
          >
            {/* Icon */}
            <div className="text-green-600 text-4xl mb-4">
              {benefit.icons === "ShieldCheck" && <ShieldCheck />}
              {benefit.icons === "Users" && <Users />}
              {benefit.icons === "Star" && <Star />}
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {benefit.title}
            </h3>
            <p className="text-center text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
