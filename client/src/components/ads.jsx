// Ads.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ad1 from "../assets/Music/dj.jpeg";
import ad2 from "../assets/Electronics/headphone.jpg";
import ad3 from "../assets/BeautyProducts/facewash.jpg";

const ads = [
  {
    id: 1,
    image: ad1,
    desc: "Up to 50% off on musics",
    button: "Shop Now",
    category: "Music"
  },
  {
    id: 2,
    image: ad2,
    desc: "Latest electronics collections",
    button: "Explore",
    category: "Electronics"
  },
  {
    id: 3,
    image: ad3,
    desc: "Best Beauty Products",
    button: "Order Now",
    category: "Beauty Products"
  },
];

const Ads = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === ads.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent(current === 0 ? ads.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === ads.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-4 sm:mt-6 px-3 sm:px-4">
      <div className="relative h-[180px] sm:h-[240px] md:h-[320px] overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Background Image */}
            <img
              src={ad.image}
              alt="Ad Banner"
              className="w-full h-full object-cover"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-4 sm:left-8 md:left-12 transform -translate-y-1/2 text-left z-10 max-w-[85%] sm:max-w-md">
              <h2 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 drop-shadow-md">
                {ad.button === "Shop Now" ? "Music Sale" : ad.button === "Explore" ? "Tech Gear" : "Beauty Glow"}
              </h2>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl">
                {ad.desc}
              </p>
              <button
                onClick={() => navigate(`/category/${ad.category}`)}
                className="mt-2 sm:mt-4 w-fit bg-[#1A73E8] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-md hover:bg-blue-600 transition text-xs sm:text-sm md:text-base"
              >
                {ad.button}
              </button>
            </div>
          </div>
        ))}

        {/* LEFT ARROW */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2
                     w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80
                     flex items-center justify-center
                     hover:bg-white transition text-sm sm:text-base"
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2
                     w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80
                     flex items-center justify-center
                     hover:bg-white transition text-sm sm:text-base"
        >
          ❯
        </button>

        {/* DOTS */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full
              ${index === current ? "bg-white" : "bg-white/50"} `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;