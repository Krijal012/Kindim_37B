import { useNavigate } from "react-router-dom";
import beauty from "../assets/BeautyProducts/facewash.jpg";
import clothes from "../assets/Clothings/hoodies.jpg";
import decor from "../assets/Decorations/table-lamp.jpg";
import mobile from "../assets/Electronics/headphone.jpg";
import music from "../assets/Music/dj.jpeg";


function Categories() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-10">

      {/* Grid Container */}
      <div className="h-[250px] flex gap-9  transition duration-300" >

        {/* Category Box */}
        {[
          { img: beauty, name: "Beauty Products" },
          { img: clothes, name: "Clothing" },
          { img: decor, name: "Decorations" },
          { img: mobile, name: "Electronics" },
          { img: music, name: "Music" },


        ].map((item, index) => (

          <div
            key={index}
            className=" flex flex-col items-center bg-gray-100 shadow-md rounded-xl p-4 w-[190px] h-[190px] hover:scale-105 hover:rounded-full hover:bg-gray-300 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/category/${item.name}`)}
          >
            <div className=" w-[100px] h-[100px] flex items-center justify-center ">
              <img src={item.img} className="w-full h-full object-contain" />
            </div>
            <p className=" text-black mt-5 font-medium text-sm ">{item.name}</p>
          </div>

        ))}

      </div>
    </div>
  );
}



export default Categories;