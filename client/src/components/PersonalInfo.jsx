import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userImg from "../assets/icons/user.png";
import editIcon from "../assets/icons/edit.png";
import { profileSchema } from "../schema/profile.schemas";

const PersonalInfo = () => {
  const [profileImage, setProfileImage] = useState(userImg);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log("Profile data:", data);
    // Add API call here to update profile
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-6">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <button className="text-sm flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <img src={editIcon} alt="Edit" className="w-4 h-4" />
          Change Profile Information
        </button>
      </div>

      {/* Profile Image */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full border-2 border-blue-600 flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-300 border-2 border-blue-600 flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img src={editIcon} alt="Edit" className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              {...register("name")}
              className="w-full mt-1 p-2 rounded border bg-white"
              placeholder="Max 50 characters"
              maxLength={50}
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium">Date of Birth</label>
            <input
              {...register("dob")}
              type="date"
              className="w-full mt-1 p-2 rounded border bg-white"
            />
            {errors.dob && (
              <p className="text-red-600 text-xs mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-1 text-sm">
                <input
                  {...register("gender")}
                  type="radio"
                  value="male"
                />
                Male
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  {...register("gender")}
                  type="radio"
                  value="female"
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-600 text-xs mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              {...register("phone")}
              className="w-full mt-1 p-2 rounded border bg-white"
              placeholder="Max 50 characters"
              maxLength={50}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email")}
              className="w-full mt-1 p-2 rounded border bg-white"
              placeholder="Max 50 characters"
              maxLength={50}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;