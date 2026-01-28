import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const SellerDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const { loading, error, callApi } = useApi();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answeringQuestionId, setAnsweringQuestionId] = useState(null);
  const [sellerAnswer, setSellerAnswer] = useState("");
  const [bargains, setBargains] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    rating: "",
    category: "Beauty Products",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    } else if (activeTab === "orders") {
      fetchOrders();
    } else if (activeTab === "questions") {
      fetchQuestions();
    } else if (activeTab === "bargains") {
      fetchBargains();
    } else if (activeTab === "dashboard") {
      fetchProducts();
      fetchOrders();
      fetchQuestions();
      fetchBargains();
    }
  }, [activeTab]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await callApi("GET", "/api/products?seller=true");
      setProducts(Array.isArray(res) ? res : (res?.data || []));
    } catch (err) {
      console.error("Fetch products failed:", err.message);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await callApi("GET", "/api/orders/all"); // Adjust endpoint if needed, e.g. /api/orders
      setOrders(res?.data || []); // Adjust based on actual API response structure
    } catch (err) {
      console.error("Fetch orders failed:", err.message);
      toast.error("Failed to fetch orders");
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await callApi("GET", "/api/questions/seller");
      setQuestions(Array.isArray(res) ? res : (res.data || []));
    } catch (err) {
      console.error("Fetch questions failed:", err.message);
    }
  };

  const fetchBargains = async () => {
    try {
      const res = await callApi("GET", "/api/bargains/seller");
      console.log("Seller bargains response:", res);
      const bargainData = Array.isArray(res) ? res : (res.data || []);
      setBargains(bargainData);
    } catch (err) {
      console.error("Fetch bargains failed:", err.message);
      toast.error("Failed to fetch bargains: " + err.message);
    }
  };

  const handleBargainStatus = async (bargainId, status) => {
    try {
      await callApi("PATCH", `/api/bargains/${bargainId}/status`, { status });
      toast.success(`Bargain offer successfully ${status}! ✅`, {
        position: "top-center",
        autoClose: 2000
      });
      setBargains(bargains.map(b => b.id === bargainId ? { ...b, status } : b));
    } catch (err) {
      console.error("Update bargain status failed:", err);
      toast.error("Failed to update bargain status: " + (err.response?.data?.error || err.message));
    }
  };

  const handleAnswerSubmit = async (e, questionId) => {
    e.preventDefault();
    if (!sellerAnswer.trim()) return;

    try {
      await callApi("PUT", `/api/questions/${questionId}/answer`, { answer: sellerAnswer });
      toast.success("Answered successfully! ✅");
      setSellerAnswer("");
      setAnsweringQuestionId(null);
      fetchQuestions();
    } catch (err) {
      console.error("Answer failed:", err);
      toast.error("Failed to submit answer");
    }
  };

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await callApi("PUT", `/api/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order ${newStatus.toLowerCase()} successfully!`);
      // Update local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Update status failed:", err);
      toast.error("Failed to update status");
    }
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("rating", newProduct.rating);
    formData.append("category", newProduct.category);
    formData.append("description", newProduct.description);
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
      setShowModal(false);
      setEditingProduct(null);
      setNewProduct({
        name: "",
        price: "",
        rating: "",
        category: "Beauty Products",
        description: "",
        image: null,
      });

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

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] bg-blue-600 text-white p-4 rounded-full shadow-2xl active:scale-95 transition-all"
      >
        {isSidebarOpen ? "✕ Close" : "☰ Menu"}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 shadow-xl border-r border-slate-800 transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:h-screen
      `}>
        <div className="p-6">
          <div className="text-2xl font-bold text-white mb-10 flex items-center">
            <span className="mr-2">🛒</span> Kindim
          </div>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'products', label: '📦 Product Management' },
              { id: 'orders', label: '🚚 Orders' },
              { id: 'questions', label: '❓ Questions' },
              { id: 'bargains', label: '🤝 Bargains' }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`p-3 cursor-pointer font-medium rounded-lg transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {activeTab === "products" ? "Product Management" : activeTab === "orders" ? "Order Management" : activeTab === "questions" ? "Product Questions" : activeTab === "bargains" ? "Bargain Offers" : "Dashboard Overview"}
          </h1>
          <div className="flex gap-3 sm:gap-4">
            {activeTab === "products" && (
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowModal(true);
                }}
                className="flex-1 sm:flex-none bg-blue-600 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all text-sm sm:text-base"
              >
                Add Product
              </button>
            )}
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-none bg-gray-600 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg hover:bg-gray-700 transition-all text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </header>

        {loading && <div className="text-blue-500 animate-pulse font-bold mb-4">Syncing...</div>}
        {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg border border-red-200 mb-4">{error}</div>}

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-400 text-sm font-bold uppercase mb-2">Total Revenue</div>
              <div className="text-3xl font-black text-gray-800">
                Rs. {orders.reduce((acc, order) => acc + (parseFloat(order.totalPrice) || 0), 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-400 text-sm font-bold uppercase mb-2">Total Orders</div>
              <div className="text-3xl font-black text-gray-800">{orders.length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-400 text-sm font-bold uppercase mb-2">Total Products</div>
              <div className="text-3xl font-black text-gray-800">{products.length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-400 text-sm font-bold uppercase mb-2">New Questions</div>
              <div className="text-3xl font-black text-blue-600">{questions.filter(q => !q.answer).length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-400 text-sm font-bold uppercase mb-2">Pending Bargains</div>
              <div className="text-3xl font-black text-orange-600">{bargains.filter(b => b.status === 'pending').length}</div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          {activeTab === "products" ? (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                <tr>
                  <th className="p-5">Image</th>
                  <th className="p-5">Name</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Price</th>
                  <th className="p-5">Rating</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!products || products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-10 text-center text-gray-400">
                      No products yet. Click "Add New Product" to get started!
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/30 transition">
                      <td className="p-5">
                        <img
                          src={`http://localhost:5000/uploads/${p.image}`}
                          className="w-14 h-14 rounded-lg object-cover border shadow-sm"
                          onError={(e) => e.target.src = "https://placehold.co/100x100?text=No+Image"}
                          alt={p.name}
                        />
                      </td>
                      <td className="p-5 font-semibold text-gray-700">{p.name}</td>
                      <td className="p-5 text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{p.category}</span>
                      </td>
                      <td className="p-5 text-blue-600 font-black">Rs. {p.price}</td>
                      <td className="p-5 text-yellow-500 font-bold">⭐ {p.rating}</td>
                      <td className="p-5">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-blue-500 hover:text-blue-700 font-bold text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-red-400 hover:text-red-600 font-bold text-sm transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : activeTab === 'orders' ? (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                <tr>
                  <th className="p-5">Order ID</th>
                  <th className="p-5">Items</th>
                  <th className="p-5">Total</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!orders || orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-blue-50/30 transition">
                      <td className="p-5 text-sm text-gray-500 font-mono">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td className="p-5">
                        <div className="space-y-1">
                          {order.OrderItems?.map((item, idx) => (
                            <div key={idx} className="text-sm text-gray-700">
                              <span className="font-bold">{item.quantity}x</span> {item.productName || item.Product?.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-5 font-black text-gray-700">
                        Rs. {order.totalPrice}
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          order.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-5">
                        {order.status === 'Pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateStatus(order.id, "Approved")}
                              className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, "Rejected")}
                              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {order.status === 'Approved' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "Shipped")}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-600"
                          >
                            Ship Order
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : activeTab === 'questions' ? (
            <div className="p-6">
              {!questions || questions.length === 0 ? (
                <div className="p-10 text-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed">
                  No questions yet for your products.
                </div>
              ) : (
                <div className="space-y-6">
                  {questions.map((q) => (
                    <div key={q.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 transition-all hover:border-blue-300">
                      <div className="flex gap-4 items-start">
                        <img
                          src={q.Product?.image ? `http://localhost:5000/uploads/${q.Product.image}` : "https://placehold.co/100x100?text=No+Image"}
                          className="w-16 h-16 rounded-xl object-cover border"
                          alt={q.Product?.name}
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{q.Product?.name}</h4>
                          <p className="text-xs text-gray-400 mb-2">Asked by {q.User?.username} • {new Date(q.createdAt).toLocaleDateString()}</p>
                          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-gray-700 font-medium">Q: {q.question}</p>
                          </div>

                          <div className="mt-4">
                            {q.answer ? (
                              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                <p className="text-blue-800 flex gap-2">
                                  <span className="font-black">A:</span> {q.answer}
                                </p>
                                <button
                                  onClick={() => {
                                    setAnsweringQuestionId(q.id);
                                    setSellerAnswer(q.answer);
                                  }}
                                  className="text-xs text-blue-500 hover:text-blue-700 mt-2 font-bold uppercase underline"
                                >
                                  Edit Answer
                                </button>
                              </div>
                            ) : (
                              answeringQuestionId === q.id ? (
                                <form onSubmit={(e) => handleAnswerSubmit(e, q.id)} className="space-y-3">
                                  <textarea
                                    className="w-full bg-white p-4 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                                    placeholder="Type your answer here..."
                                    rows="2"
                                    value={sellerAnswer}
                                    onChange={(e) => setSellerAnswer(e.target.value)}
                                    autoFocus
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      type="submit"
                                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                                    >
                                      Submit Answer
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setAnsweringQuestionId(null)}
                                      className="text-gray-500 px-4 py-2 hover:text-gray-700 font-bold"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              ) : (
                                <button
                                  onClick={() => {
                                    setAnsweringQuestionId(q.id);
                                    setSellerAnswer("");
                                  }}
                                  className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95"
                                >
                                  Reply to Customer
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'bargains' ? (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                <tr>
                  <th className="p-5">Product</th>
                  <th className="p-5">Original</th>
                  <th className="p-5">Proposed</th>
                  <th className="p-5">Reason</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!bargains || bargains.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-400">
                      No bargain offers yet.
                    </td>
                  </tr>
                ) : (
                  bargains.map((b) => (
                    <tr key={b.id} className="hover:bg-blue-50/30 transition">
                      <td className="p-5">
                        <div className="font-semibold text-gray-700">{b.productName}</div>
                        <div className="text-xs text-gray-400">ID: {b.productId}</div>
                      </td>
                      <td className="p-5 text-gray-400 line-through">Rs. {b.originalPrice}</td>
                      <td className="p-5 text-blue-600 font-black text-lg">Rs. {b.proposedPrice}</td>
                      <td className="p-5 text-gray-600 max-w-xs truncate" title={b.reason}>
                        {b.reason || '-'}
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-5">
                        {b.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleBargainStatus(b.id, 'accepted')}
                              className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 shadow-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleBargainStatus(b.id, 'rejected')}
                              className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 shadow-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {b.status !== 'pending' && (
                          <span className="text-gray-400 text-xs italic">
                            Processed on {new Date(b.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                  <tr>
                    <th className="p-5">Order ID</th>
                    <th className="p-5">Total</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-blue-50/30 transition">
                      <td className="p-5 text-sm text-gray-500 font-mono">{order.id.slice(0, 8)}...</td>
                      <td className="p-5 font-black text-gray-700">Rs. {order.totalPrice}</td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          order.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-10 text-center text-gray-400">No recent orders.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
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
                onClick={() => { setShowModal(false); setEditingProduct(null); }}
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
                onClick={() => { setShowModal(false); setEditingProduct(null); }}
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