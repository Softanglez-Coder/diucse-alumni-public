import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="bg-[#fffef8] min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24 overflow-hidden">
      
      {/* Left - Image Stack */}
      <motion.div 
        className="relative md:w-1/2 w-full flex justify-center mb-10 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/1076327228/photo/computer-lab-blur-background-with-pc-desktop-computer-machine-in-blurry-empty-school-class.jpg?s=170667a&w=0&k=20&c=6DB1HgfoCk573TlxI_g3iVDoaaj8_QGXJfHQOcBtK9M="
            alt="CSE Background"
            className="rounded-xl w-full max-w-md md:max-w-xl shadow-xl rotate-[-6deg]"
          />
          <img
            src="/image/logo/diucselogo.png"
            alt="CSE Logo"
            className="absolute top-8 left-8 w-36 md:w-48 rounded-xl shadow-xl rotate-[4deg] border-4 border-white"
          />
          <div className="absolute bottom-[-20px] left-0 md:left-8 bg-[#FFD600] w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full text-center text-[#002D72] font-semibold text-xs md:text-sm rotate-[12deg] shadow-lg">
            Get <br /> Membership
          </div>
        </div>
      </motion.div>

      {/* Right - Content */}
      <motion.div 
        className="md:w-1/2 w-full text-center md:text-left px-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-[#FFD600] uppercase font-semibold tracking-wide mb-3 text-sm">
          About Us
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-[#002D72]">
          Welcome to the DIU Alumni Network
        </h2>
        <p className="text-[#4A5568] mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
          Join a vibrant community of Dhaka International University graduates. Reconnect, share opportunities, and contribute to a brighter future for all.
        </p>

        <div className="space-y-6 text-left">
          {[
            {
              title: "Stay Connected Beyond Graduation",
              desc: "Build lasting connections with fellow alumni, mentors, and students across the globe.",
            },
            {
              title: "Grow Through Shared Opportunities",
              desc: "Discover career opportunities, collaborative projects, and exclusive alumni benefits.",
            },
            {
              title: "Give Back to Inspire the Future",
              desc: "Support current students through mentorship, events, and scholarship initiatives.",
            },
          ].map((item, idx) => (
            <div className="flex items-start space-x-3" key={idx}>
              <span className="text-[#FFD600] text-xl mt-1">✔️</span>
              <div>
                <p className="font-semibold text-[#002D72]">{item.title}</p>
                <p className="text-[#4A5568] text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/membership"
          className="inline-block mt-10 px-6 py-3 bg-[#FFD600] text-[#002D72] font-semibold rounded-full hover:bg-[#e6c300] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Join the Network
        </Link>
      </motion.div>
    </section>
  );
}
