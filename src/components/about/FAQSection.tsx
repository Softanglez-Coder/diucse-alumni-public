import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
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
    <section className="bg-[#fffef8] py-16 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-start">
    {/* Images Section - Smaller (col-span-3) */}
    <div className="space-y-6 col-span-12 md:col-span-3">
      <img
        src="/image/logo/diucselogo.png"
        alt="Alumni Kid"
        className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 w-full max-w-xs mx-auto"
      />
      <div className="bg-green-700 p-4 rounded-lg flex items-center gap-3 shadow-md">
        <div className="text-white font-semibold">
          <p>Got Questions?</p>
          <p>We're Here to Help!</p>
        </div>
      </div>
    </div>

    {/* Second Image - Smaller (col-span-3) */}
    <div className="col-span-12 md:col-span-3">
      <img
        src="/image/logo/roundLogo.png"
        alt="Alumni Main"
        className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 w-full max-w-xs mx-auto"
      />
    </div>

    {/* FAQ Section - Larger (col-span-6) */}
    <div className="col-span-12 md:col-span-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#002D72]">
        Frequently Asked Questions
        <br />
        About Our Alumni Network
      </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`rounded-xl px-5 py-4 shadow-md border-2 cursor-pointer transition-all duration-300 ${
                  openIndex === index
                    ? "bg-[#002D72] text-white border-green-700"
                    : "bg-white text-[#002D72] border-[#e0e0e0] hover:border-green-700"
                }`}
              >
                <h3 className="font-semibold text-lg flex justify-between items-center">
                  {faq.question}
                  <span>{openIndex === index ? "−" : "+"}</span>
                </h3>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-white"
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
