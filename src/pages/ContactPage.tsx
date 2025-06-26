import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function ContactPage() {
  return (
    <div>
      <MainNav />
      <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-green-700 text-center mb-12"
      >
        Contact Us
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-800">Get in Touch</h3>
          <p className="text-gray-700 mb-6">
            We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="text-green-600" /> support@example.com
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="text-green-600" /> +880 1234-567890
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-green-600" /> Dhaka International University, Bangladesh
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted! (not really — you can connect it to a backend)");
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={5}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
    <Footer />
    </div>
  );
}
