import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "1. What are the benefits of joining the Alumni Network?",
      answer:
        "By joining, you stay connected with DIU, access career opportunities, attend reunions, and help build a stronger alumni community.",
    },
    {
      question: "2. How can I register for the alumni portal?",
      answer:
        "You can register by visiting the alumni portal website and filling out the registration form with your DIU credentials.",
    },
    {
      question: "3. Can I attend DIU events as an alumnus?",
      answer:
        "Yes, alumni are welcome at many DIU events. Keep an eye on your email or the alumni portal for invitations.",
    },
    {
      question: "4. Is there a job board or career support?",
      answer:
        "Yes, the alumni portal includes a job board and career resources specifically for DIU graduates.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Logo Row */}
        <div className="flex flex-wrap justify-center gap-12 items-center">
          <img
            src="/image/logo/diulogo.png"
            alt="University Logo"
            className="h-30 md:h-30 object-contain hover:scale-150 transition-transform duration-300"
          />
          <img
            src="/image/logo/diucselogo.png"
            alt="Department Logo"
            className="h-30 md:h-30 object-contain hover:scale-150 transition-transform duration-300"
          />
          <img
            src="/image/logo/logo.png"
            alt="Alumni Logo"
            className="h-30 md:h-30 object-contain hover:scale-150 transition-transform duration-300"
          />
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10  text-cyan-400 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 border-2 shadow-xl backdrop-blur-md ${
                  openIndex === index
                    ? "bg-white/10 border-cyan-400"
                    : "bg-white/5 border-white/10 hover:border-cyan-300"
                }`}
              >
                <h3 className="flex justify-between items-center text-lg font-medium text-cyan-200">
                  {faq.question}
                  <span className="text-cyan-400 text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </h3>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 text-sm text-gray-300 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
