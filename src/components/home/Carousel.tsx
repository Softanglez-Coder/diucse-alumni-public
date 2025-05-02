import { useState, useEffect } from "react";
import { carouselImages } from "../../constants/home";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-80 md:h-[500px] overflow-hidden relative">
      {carouselImages.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-xl md:text-3xl font-bold">{item.title}</h2>
            <p className="text-sm md:text-lg mt-2 max-w-xl">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
