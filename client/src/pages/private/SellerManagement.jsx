import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useApi } from "../../hooks/useAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; 
import "react-toastify/dist/ReactToastify.css";

const SellerManagement = () => {
  const { callApi } = useApi();
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH ONLY SELLERS ---
  const getSellers = async () => {
  try {
    setLoading(true);
    // This calls the general API that returns everyone
    const response = await callApi("GET", "/auth/users"); 
    
    // This extracts the user list from your backend response
    const allUsers = response.data.users || response.data;

    // This is the magic part: it creates a new list with ONLY sellers
    const onlySellers = allUsers.filter(user => user.role === "seller");
    
    setSellers(onlySellers);
  } catch (error) {
    toast.error("Failed to load sellers");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { getSellers(); }, []);

  // --- APPROVE / SUSPEND LOGIC ---
  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === "Verified" ? "Suspended" : "Verified";
    try {
      // We pass the data inside the 'data' key to match your useApi helper
      await callApi("PUT", `/auth/users/${id}`, { data: { status: newStatus } });
      toast.success(`Seller marked as ${newStatus}!`);
      getSellers(); // Refresh the list
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const columns = [
    { name: "ID", selector: (row, index) => index + 1, width: "80px" },
    { name: "Name", selector: (row) => row.username, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => <span className="capitalize">{row.role}</span> },
    { 
      name: "Status", 
      cell: (row) => (
        <span className={row.status === "Verified" ? "text-green-600 font-bold" : "text-orange-500 font-bold"}>
          {row.status || "Pending"}
        </span>
      ) 
    },
    {
      name: "Action",
      cell: (row) => (
        <button 
          onClick={() => handleStatusUpdate(row.id || row._id, row.status)}
          className="text-blue-600 font-bold hover:underline"
        >
          {row.status === "Verified" ? "Suspend" : "Approve"}
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* --- HEADER --- */}
      <header className="bg-[#1E74ED] p-4 flex items-center justify-between px-10 shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-lg text-2xl">🛒</div>
          <h1 className="text-white text-3xl font-bold">Kindim</h1>
        </Link>
        <div className="flex-1 max-w-xl mx-10">
          <input type="text" placeholder="Search Products..." className="w-full p-2 rounded-md outline-none" />
        </div>
        <div className="flex items-center gap-6 text-white text-2xl">
          <span>🌐</span><span>👤</span>
          <Link to="/admin/dashboard" title="Home">🏠</Link>
          <span>🛠️</span>
          <button className="bg-white/20 px-4 py-1 rounded text-sm font-bold">LogOut</button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 border-r bg-gray-50 p-6 flex flex-col gap-2">
          <h3 className="font-bold text-gray-400 mb-4 ml-2 uppercase text-xs tracking-widest">Admin Controls</h3>
          <Link to="/admin/dashboard" className="p-3 rounded-lg hover:bg-gray-200 font-medium text-gray-700">Dashboard</Link>
          <Link to="/admin/users" className="p-3 rounded-lg hover:bg-gray-200 font-medium text-gray-700">User Management</Link>
          <Link to="/admin/orders" className="p-3 rounded-lg hover:bg-gray-200 font-medium text-gray-700">Order Management</Link>
          <Link to="/admin/sellers" className="p-3 rounded-lg bg-[#1E74ED] text-white font-bold shadow-md">Seller Management</Link>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col items-center p-10 bg-white">
          <h2 className="text-4xl font-bold mb-10">Seller Management</h2>
          <div className="bg-[#E5E5E5] rounded-[50px] p-10 w-full max-w-5xl shadow-sm min-h-[400px]">
            <DataTable
              columns={columns}
              data={sellers}
              progressPending={loading}
              pagination
              highlightOnHover
              noDataComponent={<p className="p-10 text-gray-400 italic">No sellers found.</p>}
            />
          </div>
        </main>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1447A1] text-white p-10 flex justify-between px-20 mt-auto">
        <div>
          <h4 className="font-bold text-xl mb-2">Kindim</h4>
          <p className="text-sm opacity-80 max-w-xs">Your trusted online marketplace for quality products in Nepal.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold mb-1 text-sm">Quick Links</h4>
          <Link to="/" className="text-xs opacity-80 hover:opacity-100">Home</Link>
          <Link to="/products" className="text-xs opacity-80 hover:opacity-100">Products</Link>
          <Link to="/about" className="text-xs opacity-80 hover:opacity-100">About Us</Link>
          <Link to="/contact" className="text-xs opacity-80 hover:opacity-100">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default SellerManagement;