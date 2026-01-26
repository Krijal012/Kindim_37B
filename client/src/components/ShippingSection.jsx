import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingSchema } from "../schema/shipping.schemas";
import { useApi } from "../hooks/useApi";
import editIcon from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";

const ShippingSection = ({ selectedAddress, setSelectedAddress }) => {
  const { callApi } = useApi();
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(ShippingSchema),
  });

  useEffect(() => {
    callApi("GET", "/api/shipping").then(res => setAddresses(res.data));
  }, []);

  const onSubmit = async (data) => {
    let newOrUpdatedAddress;
    if (editingId) {
      const res = await callApi("PUT", `/api/shipping/${editingId}`, data);
      newOrUpdatedAddress = res.data;
      setAddresses(prev => prev.map(a => a.id === editingId ? newOrUpdatedAddress : a));
      setEditingId(null);
    } else {
      const res = await callApi("POST", "/api/shipping", data);
      newOrUpdatedAddress = res.data;
      setAddresses(prev => [...prev, newOrUpdatedAddress]);
    }
    setSelectedAddress(newOrUpdatedAddress);
    reset();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

      {addresses.map(addr => (
        <div
          key={addr.id}
          onClick={() => setSelectedAddress(addr)}
          className={`p-4 rounded mb-3 cursor-pointer bg-gray-100
          ${selectedAddress?.id === addr.id ? "border-2 border-blue-600" : ""}`}
        >
          <p className="font-semibold">{addr.fullname}</p>
          <p>{addr.address}</p>
          <p>{addr.phonenumber}</p>

          <div className="flex gap-2 mt-2">
            <img src={editIcon} className="w-5 h-5" onClick={(e) => {
              e.stopPropagation();
              reset(addr);
              setEditingId(addr.id);
            }} />
            <img src={deleteIcon} className="w-5 h-5" />
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded space-y-3">
        <input {...register("fullname")} placeholder="Full Name" className="input" />
        {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}

        <input {...register("address")} placeholder="Address" className="input" />
        <input {...register("phonenumber")} placeholder="Phone" className="input" />

        <button className="border px-6 py-2 rounded-full">
          {editingId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default ShippingSection;
