import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useAPI";

const SellerDashboard = () => {
  const { loading, error, callApi } = useApi();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // 1. STATE: Initialized with all required fields
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    price: "", 
    rating: "", 
    category: "Electronics",
    description :"", // Default value to prevent "required" errors
    image: null 
  });

  const fetchProducts = async () => {
    try {
      const res = await callApi("GET", "/api/products");
      setProducts(res.data); 
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 2. FORMDATA: All fields MUST be appended here
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("rating", newProduct.rating);
    formData.append("category", newProduct.category); // CRITICAL FIX: Adding category
    formData.append("image", newProduct.image);
    formData.append("description", newProduct.description); // <--- Add this

    try {
      await callApi("POST", "/api/products", { 
        data: formData,
        headers: { "Content-Type": "multipart/form-data" } 
      });
      
      // 3. CLEANUP: Reset form and close modal on success
      setShowModal(false);
      setNewProduct({ name: "", price: "", rating: "", category: "Electronics", image: null });
      fetchProducts(); 
      alert("Product added successfully!");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // This calls your backend DELETE /api/products/:id
        await callApi("DELETE", `/api/products/${id}`);
        
        // This removes the product from the UI table immediately
        setProducts(products.filter((p) => p.id !== id));
        
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete product. " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 border-r">
        <div className="text-2xl font-bold text-blue-600 mb-10 flex items-center">
          <span className="mr-2">🛒</span> Kindim
        </div>
        <nav className="space-y-2">
          <div className="p-3 text-gray-400 hover:text-blue-600 cursor-pointer font-medium">Dashboard</div>
          <div className="p-3 bg-blue-600 text-white rounded-lg shadow-md font-medium">Product Management</div>
          <div className="p-3 text-gray-400 hover:text-blue-600 cursor-pointer font-medium">Orders</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Seller Management</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
          >
            Add New Product
          </button>
        </header>

        {loading && <div className="text-blue-500 animate-pulse font-bold mb-4">Syncing...</div>}
        {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg border border-red-200 mb-4">{error}</div>}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="p-5">Image</th>
                <th className="p-5">Name</th>
                <th className="p-5">Price</th>
                <th className="p-5">Status</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition">
                  <td className="p-5">
                    <img 
                      src={`http://localhost:5000/uploads/${p.image}`} 
                      className="w-14 h-14 rounded-lg object-cover border shadow-sm"
                      onError={(e) => e.target.src = "https://placehold.co/100x100?text=No+Image"} 
                      alt=""
                    />
                  </td>
                  <td className="p-5 font-semibold text-gray-700">{p.name}</td>
                  <td className="p-5 text-blue-600 font-black">Rs. {p.price}</td>
                  <td className="p-5"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span></td>
                  <td className="p-5">
  <button 
    onClick={() => handleDelete(p.id)} 
    className="text-red-400 hover:text-red-600 font-bold text-sm"
  >
    Delete
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl border">
            <h2 className="text-2xl font-black text-gray-800 mb-6">Create New Listing</h2>
            
            <div className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Product Title</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
                  required 
                />
              </div>

              {/* 4. UI: Category Dropdown (Crucial Fix) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Category</label>
                <select 
                  className="w-full border-gray-200 border p-3 rounded-xl outline-none bg-white"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home & Kitchen</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Price Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Price (Rs)</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    className="w-full border-gray-200 border p-3 rounded-xl outline-none" 
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
                    required 
                  />
                </div>
                {/* Rating Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Initial Rating</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newProduct.rating}
                    className="w-full border-gray-200 border p-3 rounded-xl outline-none" 
                    onChange={(e) => setNewProduct({...newProduct, rating: e.target.value})} 
                    required 
                  />
                </div>
              </div>


              <div className="space-y-1">
  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Product Description</label>
  <textarea 
    rows="4"
    value={newProduct.description}
    className="w-full border-gray-200 border p-3 rounded-xl outline-none resize-none" 
    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} 
    placeholder="Enter detailed product information..."
  />
</div>

              {/* Image Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Thumbnail Image</label>
                <input 
                  type="file" 
                  className="w-full border-gray-200 border p-3 rounded-xl bg-gray-50" 
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})} 
                  required 
                />
              </div>
            </div>

            <div className="flex justify-end mt-10 space-x-4">
              <button type="button" onClick={() => setShowModal(false)} className="font-bold text-gray-400 hover:text-gray-600">Discard</button>
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                Publish Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;