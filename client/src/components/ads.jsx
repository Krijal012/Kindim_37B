import { useState, useEffect } from "react";
import ad1 from "../assets/Music/dj.jpeg";
import ad2 from "../assets/Electronics/headphone.jpg";
import ad3 from "../assets/BeautyProducts/facewash.jpg";

const ads = [
  {
    id: 1,
    image: ad1,
    desc: "Up to 50% off on electronics",
    button: "Shop Now",
  },
  {
    id: 2,
    image: ad2,
    desc: "Latest fashion collections",
    button: "Explore",
  },
  {
    id: 3,
    image: ad3,
    desc: "On orders above Rs. 2000",
    button: "Order Now",
  },
];

export default function AdsBoard() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? ads.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <div className="relative h-[220px] sm:h-[260px] md:h-[320px] overflow-hidden rounded-xl shadow-lg">

        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`absolute inset-0 transition-opacity duration-700
            ${index === current ? "opacity-100" : "opacity-0"}`}
          >
            {/* Image */}
            <img
              src={ad.image}
              alt="Advertisement"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35 flex flex-col justify-center px-6 sm:px-10">
              <p className="text-white text-lg sm:text-xl max-w-md">
                {ad.desc}
              </p>
              <button className="mt-4 w-fit bg-[#1A73E8] text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
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
              className={`h-2.5 w-2.5 rounded-full
              ${index === current ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
