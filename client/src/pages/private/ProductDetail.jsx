import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductDetail = ({ onLogout }) => {
  const { id } = useParams();
  const { loading, error, callApi } = useApi();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await callApi("GET", `/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;
  if (!product) return <div className="mt-20 text-center">Product not found.</div>;

  return (
    <>
      <Header show={true} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-6 py-10 mt-20 bg-gray-50">
        
        {/* Top Section: Image and Purchase Options */}
        <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-10">
          
          {/* Gallery Section */}
          <div className="flex-1">
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 border">
              <img 
                src={`http://localhost:5000/uploads/${product.image}`} 
                className="w-full h-[400px] object-contain" 
                alt={product.name} 
              />
            </div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i} 
                  src={`http://localhost:5000/uploads/${product.image}`} 
                  className="w-20 h-20 rounded-lg border object-cover cursor-pointer hover:border-blue-500" 
                  alt="thumbnail"
                />
              ))}
            </div>
          </div>

          {/* Info & Selectors Section */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-2xl font-black text-blue-600">Rs. {product.price}</p>

            {/* Color Selector */}
            <div>
              <label className="text-sm font-bold text-gray-400 uppercase">Color</label>
              <div className="flex gap-3 mt-2">
                {['Blue', 'Black', 'White', 'Red'].map(color => (
                  <button key={color} className="border px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium">{color}</button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="text-sm font-bold text-gray-400 uppercase">Size</label>
              <div className="flex gap-3 mt-2">
                {['Small', 'Medium', 'Large'].map(size => (
                  <button key={size} className="border px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium">{size}</button>
                ))}
              </div>
            </div>

            {/* Quantity Counter */}
            <div>
              <label className="text-sm font-bold text-gray-400 uppercase">Quantity</label>
              <div className="flex items-center gap-4 mt-2">
                <button className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300">-</button>
                <span className="font-bold text-lg">1</span>
                <button className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300">+</button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-blue-300 text-blue-900 py-3 rounded-xl font-bold hover:bg-blue-400">Add To Cart</button>
              <button className="flex-1 border py-3 rounded-xl font-bold hover:bg-gray-50">Wishlist</button>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">Buy Now</button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-8 bg-gray-200 p-8 rounded-2xl shadow-inner border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product details</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {product.description || "No detailed description provided for this product."}
          </p>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-8 bg-gray-200 p-8 rounded-2xl shadow-inner border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 font-medium text-gray-500">
                Review {i}
              </div>
            ))}
          </div>
        </div>

        {/* Questions Section */}
        <div className="mt-8 bg-gray-200 p-8 rounded-2xl shadow-inner border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Questions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white h-14 rounded-xl border border-gray-100 shadow-sm"></div>
            ))}
            <textarea 
              className="w-full bg-white h-24 rounded-xl border border-gray-100 shadow-sm p-4 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your question here..."
            />
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">Submit</button>
            </div>
          </div>
        </div>

      </main>
      <Footer show={true} />
    </>
  );
};

export default ProductDetail;