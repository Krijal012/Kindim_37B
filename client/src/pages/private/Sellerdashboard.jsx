import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormState = {
  name: "",
  price: "",
  rating: "",
  category: "Electronics",
  description: "",
  image: null,
};

const SellerDashboard = ({ onLogout }) => {
  const { loading, error, callApi } = useApi();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState(initialFormState);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await callApi("GET", "/api/products");
      // API might return an array directly, or an object with a `data` property.
      const productList = Array.isArray(res) ? res : (res?.data || []);
      setProducts(productList);
    } catch (err) {
      console.error("Fetch failed:", err.message);
      setProducts([]); // Ensure it's an array on error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Safeguard against empty required fields
    if (!newProduct.name.trim() || !newProduct.price.toString().trim() || !newProduct.category) {
      toast.error("Name, price, and category are required.");
      return;
    }
    if (!editingProduct && !newProduct.image) {
      toast.error("An image is required for a new product.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name.trim());
    formData.append("price", newProduct.price);
    formData.append("rating", newProduct.rating || 0); // Default to 0 if empty
    formData.append("category", newProduct.category);
    formData.append("description", newProduct.description.trim());
    if (newProduct.image) formData.append("image", newProduct.image); 

    try {
      if (editingProduct) {
        // Update existing product
        await callApi("PUT", `/api/products/${editingProduct.id}`, formData);
        toast.success("Product updated successfully! 🎉");
      } else {
        // Add new product
        await callApi("POST", "/api/products", formData);
        toast.success("Product added successfully! 🎉");
      }

      // Reset modal & form
      handleCloseModal();
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Operation failed", err);
      toast.error(err.response?.data?.message || err.message || "Operation failed");
    }
  };

  // Delete product with confirmation toast
  const handleDelete = (id) => {
    toast.warn(
      <div>
        <p className="font-bold mb-2">Delete this product?</p>
        <p className="text-sm text-gray-600 mb-3">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={() => confirmDelete(id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const confirmDelete = async (id) => {
    toast.dismiss(); 
    try {
      await callApi("DELETE", `/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully! 🗑️");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to delete product");
    }
  };

  // Open modal to edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      rating: product.rating,
      category: product.category,
      description: product.description,
      image: null,
    });
    setShowModal(true);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setNewProduct(initialFormState);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setNewProduct(initialFormState);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 border-r flex flex-col">
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-10 flex items-center">
            <span className="mr-2">🛒</span> Kindim
          </div>
          <nav className="space-y-2">
            <div className="p-3 text-gray-400 hover:text-blue-600 cursor-pointer font-medium">Dashboard</div>
            <div className="p-3 bg-blue-600 text-white rounded-lg shadow-md font-medium">Product Management</div>
            <div className="p-3 text-gray-400 hover:text-blue-600 cursor-pointer font-medium">Orders</div>
          </nav>
        </div>
        <div className="mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h10a1 1 0 100-2H4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Seller Management</h1>
          <button
            onClick={handleOpenAddModal}
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
              {Array.isArray(products) && products.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition">
                  <td className="p-5">
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      className="w-14 h-14 rounded-lg object-cover border shadow-sm"
                      onError={(e) => (e.target.src = "https://placehold.co/100x100?text=No+Image")}
                      alt=""
                    />
                  </td>
                  <td className="p-5 font-semibold text-gray-700">{p.name}</td>
                  <td className="p-5 text-blue-600 font-black">Rs. {p.price}</td>
                  <td className="p-5">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                  </td>
                  <td className="p-5 flex space-x-2">
                    <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-500 hover:text-blue-700 font-bold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-400 hover:text-red-600 font-bold text-sm"
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                   
                </tr>
               
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border">
            {/* Header */}
            <div className="bg-gray-50 border-b px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-800">
                  {editingProduct ? "Edit Product" : "New Listing"}
                </h2>
                <p className="text-sm text-gray-500 font-medium">Fill in the information below to list your item.</p>
              </div>
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side: Media Upload */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Media</label>
                <div className="relative group border-2 border-dashed border-gray-200 rounded-3xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all overflow-hidden">
                  {newProduct.image ? (
                    <>
                      <img 
                        src={typeof newProduct.image === 'string' ? `http://localhost:5000/uploads/${newProduct.image}` : URL.createObjectURL(newProduct.image)} 
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white font-bold text-sm">Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <div className="text-4xl mb-2">📸</div>
                      <p className="text-sm font-bold text-gray-500">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                    required={!editingProduct}
                  />
                </div>
              </div>

              {/* Right Side: Primary Info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Wireless Headphones"
                    value={newProduct.name}
                    className="w-full bg-gray-50 border-transparent border focus:border-blue-500 focus:bg-white p-3 rounded-xl outline-none transition-all"
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Price (Rs)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={newProduct.price}
                      className="w-full bg-gray-50 border-transparent border focus:border-blue-500 focus:bg-white p-3 rounded-xl outline-none transition-all"
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="4.5"
                      value={newProduct.rating}
                      className="w-full bg-gray-50 border-transparent border focus:border-blue-500 focus:bg-white p-3 rounded-xl outline-none transition-all"
                      onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
                  <select
                    className="w-full bg-gray-50 border-transparent border focus:border-blue-500 focus:bg-white p-3 rounded-xl outline-none transition-all appearance-none cursor-pointer"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    required
                  >
                    <option value="Beauty Products">Beauty Products</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Decorations">Decorations</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
              </div>

              {/* Bottom Section: Full Width Description */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Description</label>
                <textarea
                  rows="3"
                  value={newProduct.description}
                  className="w-full bg-gray-50 border-transparent border focus:border-blue-500 focus:bg-white p-4 rounded-2xl outline-none transition-all resize-none"
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Tell buyers about your product's key features..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t px-8 py-6 flex justify-end space-x-4">
              <button 
                type="button" 
                onClick={handleCloseModal} 
                className="px-6 py-3 font-bold text-gray-500 hover:text-gray-700 transition-colors"
              >
                Discard changes
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                {editingProduct ? "Save Changes" : "Publish Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SellerDashboard;