import { useState, useEffect, useRef } from "react";
import { carouselImages } from "../../constants/home";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
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
      className="relative w-full h-80 md:h-[500px] overflow-hidden"
      onMouseEnter={() => {
        setIsHovered(true);
        intervalRef.current && clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {carouselImages.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 drop-shadow-md">
              {item.title}
            </h2>
            <p className="text-sm md:text-lg mt-2 max-w-2xl drop-shadow-md">
              {item.desc}
            </p>
          </div>
        </div>
      ))}

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-yellow-400" : "bg-white/50"
            } transition-all duration-300`}
          ></button>
        ))}
      </div>
    </div>
  );
}
