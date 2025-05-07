import { useParams } from "react-router-dom";
import { events } from "../constants/events";
import CourseInfoCard from "../components/event/CourseInfoCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex !== null && faqRefs.current[openIndex]) {
      faqRefs.current[openIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openIndex]);

  if (!event) {
    return <div className="text-center text-red-500 mt-20">Event not found.</div>;
  }

  return (
    <>
      <MainNav />
      <section className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8 mt-4">
        {/* Right Content - comes first on mobile, second on desktop */}
        <main className="order-1 lg:order-2 flex-1 space-y-10">
          <motion.img
            src={event.image}
            alt={event.title}
            className="rounded-xl w-full shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          <div>
            <h2 className="text-4xl font-bold text-green-700 mb-4">{event.title}</h2>
            <p className="text-gray-700 leading-relaxed text-[1.05rem]">{event.longDescription}</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.features.map((feature, i) => (
              <div
                key={i}
                className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-green-800 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-4xl font-bold text-[#002D72] mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  ref={(el) => (faqRefs.current[index] = el)}
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  aria-expanded={openIndex === index}
                  className={`rounded-xl px-6 py-5 border cursor-pointer transition-all duration-300 group ${
                    openIndex === index
                      ? "bg-[#002D72] text-white border-green-400"
                      : "bg-white text-[#002D72] border-gray-300 hover:border-green-400"
                  }`}
                >
                  <h3 className="font-semibold text-lg flex justify-between items-center">
                    {faq.question}
                    <span className="text-xl group-hover:scale-125 transition-transform">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </h3>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 text-sm leading-relaxed text-white"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Left Sticky Info - sticky on desktop, below content on mobile */}
        <aside className="order-2 lg:order-1 w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24 h-fit">
          <CourseInfoCard />
        </aside>
      </section>
      <Footer />
    </>
  );
}
