import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingSchema } from "../schema/shipping.schemas";
import { useApi } from "../hooks/useAPI";
import { toast } from "react-toastify";

const ShippingSection = ({ selectedAddress, setSelectedAddress }) => {
  const { callApi } = useApi();
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(ShippingSchema),
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await callApi("GET", "/api/shipping");
      const addressList = res.data || res;
      setAddresses(addressList);

      if (addressList.length > 0 && !selectedAddress) {
        setSelectedAddress(addressList[0]);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      toast.error("Failed to load addresses");
    }
  };

  const onSubmit = async (data) => {
    try {
      let newOrUpdatedAddress;

      if (editingId) {
        const res = await callApi("PUT", `/api/shipping/${editingId}`, data);
        newOrUpdatedAddress = res.data;
        setAddresses(prev => prev.map(a => a.id === editingId ? newOrUpdatedAddress : a));
        setEditingId(null);
        toast.success("Address updated successfully");
      } else {
        const res = await callApi("POST", "/api/shipping", data);
        newOrUpdatedAddress = res.data;
        setAddresses(prev => [...prev, newOrUpdatedAddress]);
        toast.success("Address added successfully");
      }

      setSelectedAddress(newOrUpdatedAddress);
      reset();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save address:", err);
      toast.error("Failed to save address");
    }
  };

  const handleEdit = (e, addr) => {
    e.stopPropagation();
    reset(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this address?")) return;

    try {
      await callApi("DELETE", `/api/shipping/${id}`);
      setAddresses(prev => prev.filter(a => a.id !== id));
      if (selectedAddress?.id === id) {
        setSelectedAddress(null);
      }
      toast.success("Address deleted");
    } catch (err) {
      console.error("Failed to delete address:", err);
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Shipping Address</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            reset({ fullname: "", address: "", phonenumber: "" });
          }}
          className="w-full sm:w-auto text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base"
        >
          {showForm ? "Cancel" : "+ Add New"}
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-3 mb-4">
        {addresses.length === 0 && !showForm && (
          <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No saved addresses. Please add one.</p>
        )}

        {addresses.map(addr => (
          <div
            key={addr.id}
            onClick={() => setSelectedAddress(addr)}
            className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition ${selectedAddress?.id === addr.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
              }`}
          >
            <p className="font-semibold text-sm sm:text-base">{addr.fullname}</p>
            <p className="text-gray-600 text-xs sm:text-sm">{addr.address}</p>
            <p className="text-gray-600 text-xs sm:text-sm">{addr.phonenumber}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={(e) => handleEdit(e, addr)}
                className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-semibold"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleDelete(e, addr.id)}
                className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="border-2 border-blue-300 bg-blue-50 p-4 rounded-lg space-y-3">
          <h3 className="font-semibold mb-2 text-sm sm:text-base">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>

          <div>
            <input
              {...register("fullname")}
              placeholder="Full Name"
              className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullname.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("address")}
              placeholder="Full Address"
              className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
            />
            {errors.address && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("phonenumber")}
              placeholder="Phone Number"
              className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
            />
            {errors.phonenumber && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phonenumber.message}</p>
            )}
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
          >
            {editingId ? "Update Address" : "Save Address"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingSection;