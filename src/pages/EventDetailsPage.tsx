import { useParams } from "react-router-dom";
import { events } from "../constants/events";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex !== null && faqRefs.current[openIndex]) {
      faqRefs.current[openIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openIndex]);

  if (!event) {
    return <div className="text-center text-red-500 mt-20">Event not found.</div>;
  }

  return (
    <>
      <MainNav />
      <section className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8 mt-4">
        {/* Right Content */}
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
          {event.faq?.length > 0 && (
            <div>
              <h2 className="text-4xl font-bold text-[#002D72] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {event.faq.map((faq, index) => (
                  <div
                    key={index}
                    ref={(el) => { faqRefs.current[index] = el; }} // Update this line
                    onClick={() => toggleFAQ(index)}
                    role="button"
                    aria-expanded={openIndex === index ? "true" : "false"}
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
          )}
        </main>

        {/* Left Sticky Info */}
        <aside className="order-2 lg:order-1 w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24 h-fit">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Course Info Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="bg-green-700 text-white text-base font-medium px-4 py-2 rounded-t-xl">
                Course Information
              </div>
              <div className="px-4 py-3 space-y-2 text-sm text-gray-700">
                <InfoRow label="Name" value={event.title || "N/A"} />
                <InfoRow label="Cost" value={event.courseInfo.cost || "N/A"} />
                <InfoRow label="Location" value={event.courseInfo.location || "N/A"} />
                <InfoRow label="Date" value={event.courseInfo.date || "N/A"} />
                <InfoRow label="Duration" value={event.courseInfo.duration || "N/A"} noBorder />
              </div>
              {/* Button for registration */}
              <div className="px-4 py-3 border-t border-gray-200">
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-all duration-300"
                >
                  Register Now
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <motion.div
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img
                src={event.image || "/event1.jpg"} // Use event image if available
                alt="Contact"
                className="w-full h-28 object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-medium text-gray-800 mb-3">
                  Got any questions? <br /> Contact us today
                </p>
                <a
                  href="mailto:hello@yourmail.com"
                  className="inline-flex items-center gap-2 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded transition-all duration-300"
                >
                  <span>Contact</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </aside>
      </section>
      <Footer />
    </>
  );
}

// Assuming InfoRow component
const InfoRow = ({ label, value, noBorder }: { label: string; value: string; noBorder?: boolean }) => (
  <div className={`flex justify-between ${noBorder ? "" : "border-b border-gray-200"} py-2`}>
    <span className="font-medium">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);