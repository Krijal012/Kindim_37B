import { useState, useEffect } from "react";
import ad from "../assets/icons/image.png";

const ads = [
  {
    id: 1,
    title: "",
    desc: "Up to 50% off on electronics",
    image: ad,
    button: "Shop Now",
  },
  {
    id: 2,
    title: "",
    desc: "Latest fashion collections",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    button: "Explore",
  },
  {
    id: 3,
    title: "",
    desc: "On orders above Rs. 2000",
    image: "https://images.unsplash.com/photo-1602524209059-6f6d57f27b3b",
    button: "Order Now",
  },
];

export default function AdsBoard() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <div className="relative h-[220px] sm:h-[260px] md:h-[320px] overflow-hidden rounded-xl shadow-lg">

        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`absolute inset-0 transition-opacity duration-700
            ${index === current ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 sm:px-10">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                {ad.title}
              </h2>
              <p className="text-white/90 mt-2 max-w-md">
                {ad.desc}
              </p>
              <button className="mt-4 w-fit bg-[#1A73E8] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                {ad.button}
              </button>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-2 rounded-full
              ${index === current ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
