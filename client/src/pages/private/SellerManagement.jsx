import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useApi } from "../../hooks/useAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
      await callApi("PUT", `/auth/users/${id}`, { status: newStatus });
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
    <div className="p-4 sm:p-8">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">Seller Management</h2>
      <div className="bg-white rounded-2xl sm:rounded-[40px] p-4 sm:p-8 border border-gray-100 shadow-sm overflow-x-auto">
        <DataTable
          columns={columns}
          data={sellers}
          progressPending={loading}
          pagination
          highlightOnHover
          noDataComponent={<p className="p-10 text-gray-400 italic">No sellers found.</p>}
        />
      </div>
    </div>
  );
};

export default SellerManagement;