import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { profileSchema } from "../schema/profile.schemas";
import { toast } from "react-toastify";

export default function PersonalInfo({ user, setUser }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const [preview, setPreview] = useState(user?.profileImage ? `http://localhost:5000${user.profileImage}` : null);
  const { callApi, loading, error } = useApi();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("dob", user.dob);
      setValue("gender", user.gender);
      setValue("phone", user.phone);
    }
  }, [user]);


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "profileImage") formData.append(key, value);
      });
      if (data.profileImage?.[0]) formData.append("profileImage", data.profileImage[0]);

      const res = await callApi("POST", "/api/profile", formData);

      const updatedUser = res?.data?.user ?? res?.user ?? res?.data ?? res;
      if (updatedUser) {
        setUser(updatedUser);
        setPreview(
          updatedUser.profileImage ? `http://localhost:5000${updatedUser.profileImage}` : null
        );
      }
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to update profile");
    }
  };


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await callApi("DELETE", "/api/profile");
      setUser(null);
      setPreview(null);
      toast.success("Account deleted successfully!");

      // Log out locally + redirect
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to delete account");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 bg-white p-6 rounded shadow space-y-4">
      {preview && <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover mb-2" />}
      <input
        type="file"
        {...register("profileImage")}
        onChange={(e) => e.target.files[0] && setPreview(URL.createObjectURL(e.target.files[0]))}
      />

      <div>
        <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register("phone")} placeholder="Phone" className="w-full p-2 border rounded" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <select {...register("gender")} className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
      </div>

      <div>
        <input {...register("dob")} type="date" className="w-full p-2 border rounded" />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" disabled={loading} className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600"}`}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={handleDelete} disabled={loading} className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700">
          Delete Account
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
