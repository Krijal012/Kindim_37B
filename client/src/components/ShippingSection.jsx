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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ShippingSchema),
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await callApi("GET", "/api/shipping");
      setAddresses(res.data);
    };
    fetchAddresses();
  }, []);

  const handleShipping = async (data) => {
    let res;

    if (editingId) {
      res = await callApi("PUT", `/api/shipping/${editingId}`, { data });
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? res.data : a))
      );
      setEditingId(null);
    } else {
      res = await callApi("POST", "/api/shipping", { data });
      setAddresses((prev) => [...prev, res.data]);
    }

    reset();
  };

  const handleDelete = async (id) => {
    await callApi("DELETE", `/api/shipping/${id}`);
    setAddresses((prev) => prev.filter((a) => a.id !== id));

    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  };

  const handleEdit = (addr) => {
    reset({
      fullname: addr.fullname,
      address: addr.address,
      phonenumber: addr.phonenumber,
    });
    setEditingId(addr.id);
  };

  return (
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

      {addresses.map((addr) => (
        <div
          key={addr.id}
          onClick={() => setSelectedAddress(addr)}
          className={`bg-[#E5E5E5] p-4 rounded relative mb-4 cursor-pointer
            ${
              selectedAddress?.id === addr.id
                ? "border-2 border-blue-600"
                : "border border-transparent"
            }`}
        >
          <p className="font-semibold">{addr.fullname}</p>
          <p>{addr.address}</p>
          <p>{addr.phonenumber}</p>

          <div className="absolute top-4 right-4 flex gap-2">
            <img
              src={editIcon}
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(addr);
              }}
            />
            <img
              src={deleteIcon}
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(addr.id);
              }}
            />
          </div>
        </div>
      ))}

      <form
        onSubmit={handleSubmit(handleShipping)}
        className="border-2 border-black p-6 rounded-md space-y-4"
      >
        <input
          {...register("fullname")}
          placeholder="Full Name"
          className="border-2 border-black px-4 py-2 rounded w-full"
        />
        {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}

        <input
          {...register("address")}
          placeholder="Address"
          className="border-2 border-black px-4 py-2 rounded w-full"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

        <input
          {...register("phonenumber")}
          placeholder="Phone Number"
          className="border-2 border-black px-4 py-2 rounded w-full"
        />
        {errors.phonenumber && (
          <p className="text-red-500">{errors.phonenumber.message}</p>
        )}

        <button className="border border-black rounded-full px-10 py-2">
          {editingId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default ShippingSection;
