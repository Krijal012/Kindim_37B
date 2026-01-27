import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useApi } from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const { callApi } = useApi();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // New State
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ username: "", email: "", role: "" });

  // --- REPLACED WINDOW.CONFIRM WITH CLEAN LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toast.info("Logged out successfully");
    navigate("/login"); 
  };

  const getUsers = async () => {
    try {
      const response = await callApi("GET", "/auth/users");
      setUsers(response.data.users || response.data); 
    } catch (error) {
      toast.error("Failed to load users from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    // Keep window.confirm for dangerous deletes, or replace with another modal if you want
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await callApi("DELETE", `/auth/users/${id}`);
        setUsers(users.filter((user) => (user.id || user._id) !== id));
        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error("Delete failed.");
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({ username: user.username, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userId = selectedUser.id || selectedUser._id;
      await callApi("PUT", `/auth/users/${userId}`, { data: editFormData });
      toast.success("User updated successfully!");
      setShowEditModal(false);
      getUsers();
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  const columns = [
    { name: "ID", selector: (row, index) => index + 1, width: "80px" },
    { name: "Name", selector: (row) => row.username || row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, cell: (row) => <span className="capitalize">{row.role}</span> },
    { name: "Status", cell: () => <span className="text-green-600 font-bold">Active</span> },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-4">
          <button className="text-blue-600 font-semibold hover:underline" onClick={() => openEditModal(row)}>Edit</button>
          <button className="text-red-500 font-semibold hover:underline" onClick={() => handleDelete(row.id || row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-10 flex flex-col items-center min-h-screen bg-white relative font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* --- NEW LOGOUT CONFIRMATION UI --- */}
      <div className="w-full max-w-6xl flex justify-end mb-6 h-12">
        {!showLogoutConfirm ? (
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-red-500 text-white px-8 py-2.5 rounded-full font-bold hover:bg-red-600 transition-all shadow-lg active:scale-95"
          >
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-red-50 px-6 py-2 rounded-full border border-red-200 shadow-sm animate-in slide-in-from-right-4 duration-300">
            <span className="text-red-700 font-bold text-sm">Are you sure?</span>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Yes, Exit
            </button>
            <button 
              onClick={() => setShowLogoutConfirm(false)}
              className="text-gray-500 hover:text-gray-800 text-xs font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 tracking-tight">
        User Management
      </h2>

      <div className="bg-[#F3F4F6] rounded-[40px] p-8 w-full max-w-6xl shadow-inner border border-gray-200">
        <DataTable
          columns={columns}
          data={users}
          progressPending={loading}
          pagination
          highlightOnHover
        />
      </div>

      {/* Edit Modal Logic (remains same) */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
           <div className="bg-white p-10 rounded-[30px] w-full max-w-md shadow-2xl relative border border-gray-100">
            <button onClick={() => setShowEditModal(false)} className="absolute top-6 right-8 text-gray-400 hover:text-red-500 text-3xl">&times;</button>
            <h3 className="text-3xl font-bold mb-8">Update Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-5">
              <input 
                className="w-full bg-gray-50 border p-3.5 rounded-2xl" 
                value={editFormData.username} 
                onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })} 
                placeholder="Username"
              />
              <input 
                className="w-full bg-gray-50 border p-3.5 rounded-2xl" 
                value={editFormData.email} 
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} 
                placeholder="Email"
              />
              <select 
                className="w-full bg-gray-50 border p-3.5 rounded-2xl"
                value={editFormData.role}
                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-6 py-3 font-bold text-gray-500">Cancel</button>
                <button type="submit" className="px-8 py-3 rounded-2xl font-bold bg-blue-600 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;