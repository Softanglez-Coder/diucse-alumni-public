import { useState, useEffect, useRef } from "react";
import { carouselImages } from "../../constants/home";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  useEffect(() => {
    if (!isHovered) startAutoSlide();
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => {
        setIsHovered(true);
        intervalRef.current && clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {carouselImages.map((item, index) =>
          index === currentIndex ? (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-center items-center text-center text-white p-4">
                <motion.h2
                  className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  className="text-sm md:text-lg mt-2 max-w-2xl drop-shadow-md text-gray-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {item.desc}
                </motion.p>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 ${
              index === currentIndex
                ? "bg-white border-blue-900 scale-50"
                : "bg-white/40 border-white/60"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}
