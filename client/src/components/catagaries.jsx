import { useNavigate } from "react-router-dom";
import beauty from "../assets/BeautyProducts/facewash.jpg";
import clothes from "../assets/Clothings/hoodies.jpg";
import decor from "../assets/Decorations/table-lamp.jpg";
import mobile from "../assets/Electronics/headphone.jpg";
import music from "../assets/Music/dj.jpeg";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { img: beauty, name: "Beauty Products" },
    { img: clothes, name: "Clothing" },
    { img: decor, name: "Decorations" },
    { img: mobile, name: "Electronics" },
    { img: music, name: "Music" },
  ];

  return (
    <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 px-3 sm:px-4">
      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-9 w-full max-w-6xl">
        {/* Category Box */}
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 shadow-md rounded-xl p-3 sm:p-4 
                       aspect-square max-w-[190px] mx-auto w-full
                       hover:scale-105 hover:rounded-full hover:bg-gray-300 
                       transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/category/${item.name}`)}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-black mt-3 sm:mt-4 md:mt-5 font-medium text-xs sm:text-sm text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;