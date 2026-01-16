import { useState } from "react";
import gui from "./guitar.jpeg";

export default function Guitar() {
  const [color, setColor] = useState("Blue");
  const [size, setSize] = useState("Small");
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState(gui);
  const colors = ["Blue", "Black", "Yellow", "Red"];
  const sizes = ["Small", "Medium", "Large"];

  const thumbnails = [
    gui,
    "https://via.placeholder.com/400/ff0000",
    "https://via.placeholder.com/400/00ff00",
    "https://via.placeholder.com/400/0000ff",
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
     
      <div className="max-w-5xl mx-auto bg-gray-200 p-6 rounded-2xl shadow">
        <div className="grid md:grid-cols-2 gap-6">
        
          <div>
            <img
              src={mainImage}
              alt="Product"
              className="rounded-xl mb-4 w-full"
            />
            <div className="flex gap-2">
              {thumbnails.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`styles ${i}`}
                  className="rounded-lg border cursor-pointer w-20 h-20 object-cover"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

        
          <div>
            <h1 className="text-xl font-semibold">
            Guitar
            </h1>
            <p className="text-lg font-bold mt-2">Rs 8000npr</p>

          
            <div className="mt-4">
              <p className="font-medium">Color</p>
              <div className="flex gap-2 mt-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-1 rounded border ${
                      color === c ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

        
            <div className="mt-4">
              <p className="font-medium">Size</p>
              <div className="flex gap-2 mt-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-1 rounded border ${
                      size === s ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          
            <div className="mt-4">
              <p className="font-medium">Quantity</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

           
            <div className="flex gap-3 mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                Add to Cart
              </button>
              <button className="bg-blue-800 text-white px-6 py-2 rounded-lg">
                BUY
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg ">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="max-w-5xl mx-auto mt-6 bg-gray-200 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Product details</h2>
        <p className="text-sm text-gray-700">
        Experience exceptional sound and style with this premium electric guitar, crafted for both aspiring musicians and seasoned performers. Made from high-quality tonewoods and precision-engineered components, it delivers rich, dynamic tones across a wide range of genres while ensuring comfortable playability.

Perfect for studio recording, live performances, or practice sessions, this guitar combines sleek design with durable construction. Its smooth fretboard, responsive pickups, and reliable hardware ensure long-lasting performance, making it a versatile and essential instrument for any guitarist.
        </p>
      </div>

     
      <div className="max-w-5xl mx-auto mt-6 bg-gray-200 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-3">Customer Reviews</h2>
        {["Review 1", "Review 2", "Review 3", "Review 4"].map((r) => (
          <div key={r} className="bg-white p-3 rounded mb-2 shadow-sm">
            {r}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-gray-200 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-3">Questions</h2>
        <textarea
          className="w-full border rounded p-3 mb-3"
          rows="3"
          placeholder="Ask a question..."
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
}
