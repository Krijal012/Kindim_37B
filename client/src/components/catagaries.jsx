import { Link } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

const elet = "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=150";
const Clothes = "https://images.unsplash.com/photo-1445205170230-053b83016050?w=150";
const gro = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150";
const mobile = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150";
const Game = "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=150";

function Categories() {
  return (
    <div className="flex justify-center mt-10">
      
      {/* Grid Container */}
      <div className="h-[250px] flex gap-9  transition duration-300" >

        {/* Category Box */}
        {[ 
          { img: elet, name: "Electronics" },
          { img: Clothes, name: "Fashion" },
          { img: gro, name: "Groceries" },
          { img: mobile, name: "Mobiles" },
          { img: Game, name: "game" },
    
          
        ].map((item, index) => (
          
          <div 
            key={index}
            className=" flex flex-col items-center bg-gray-100 shadow-md rounded-xl p-4 w-[190px] h-[190px] hover:scale-105 hover:rounded-full hover:bg-gray-300 transition-all duration-300 "
          >
            <div className=" w-[100px] h-[100px] flex items-center justify-center ">
              <img src={item.img} className="w-full h-full object-contain" />
            </div>
            <p className= " text-black mt-5 font-medium text-sm ">{item.name}</p>
          </div>

        ))}

      </div>
    </div>
  );
}



export default Categories;