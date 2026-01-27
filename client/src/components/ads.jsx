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

  // Auto slide
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
    <div className="w-full max-w-6xl mx-auto mt-6">
      <div className="relative h-[220px] sm:h-[260px] md:h-[320px] overflow-hidden rounded-xl shadow-lg">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`absolute inset - 0 transition - opacity duration - 1000 ease -in -out ${index === current ? "opacity-100" : "opacity-0"
              } `}
          >
            {/* Background Image */}
            <img
              src={ad.image}
              alt="Ad Banner"
              className="w-full h-full object-cover"
            />

            {/* Overlay Gradient (Optional for better text readability) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-8 sm:left-12 transform -translate-y-1/2 text-left z-10">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-md">
                {ad.button === "Shop Now" ? "Music Sale" : ad.button === "Explore" ? "Tech Gear" : "Beauty Glow"}
              </h2>
              <p className="text-white text-lg sm:text-xl max-w-md">
                {ad.desc}
              </p>
              <button
                onClick={() => navigate(`/ category / ${ad.category} `)}
                className="mt-4 w-fit bg-[#1A73E8] text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {ad.button}
              </button>
            </div>
          </div>
        ))}

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2
                     w-10 h-10 rounded-full bg-white/80
                     flex items-center justify-center
                     hover:bg-white transition"
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2
                     w-10 h-10 rounded-full bg-white/80
                     flex items-center justify-center
                     hover:bg-white transition"
        >
          ❯
        </button>

        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h - 2.5 w - 2.5 rounded - full
              ${index === current ? "bg-white" : "bg-white/50"} `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
