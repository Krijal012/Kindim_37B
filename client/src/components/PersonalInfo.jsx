import { useState } from "react";
import userImg from "../../assets/icons/user.png";
import editIcon from "../../assets/icons/edit.png"; 
import { useForm } from "react-hook-form";
import { profileSchema } from "../schema/profile.schemas";


const PersonalInfo=() =>{
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

  return (
    
    <div className="flex-1 bg-gray-100 rounded p-6">
      <div className="flex justify-between items-center border-b pb-3 mb-6">
        <h2 className="font-semibold">Personal Information</h2>
        <button className="text-sm flex items-center gap-1 text-gray-600">
          <img src={editIcon} alt="Edit" className="w-4 h-4" />
          Change Profile Information
        </button>
      </div>

  
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              border: "2px solid #0033FF",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
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
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: "#D9D9D9",
              border: "2px solid #0033FF",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img src={editIcon} alt="Edit" className="w-3 h-3" />
          </div>
        </div>
      </div>

    <form >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full mt-1 p-2 rounded border bg-white"
            placeholder="Max 50 characters"
            maxLength={50}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            className="w-full mt-1 p-2 rounded border bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Gender</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-1 text-sm">
              <input type="radio" name="gender" defaultChecked />
              Male
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="radio" name="gender" />
              Female
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            className="w-full mt-1 p-2 rounded border bg-white"
            placeholder="Max 50 characters"
            maxLength={50}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full mt-1 p-2 rounded border bg-white"
            placeholder="Max 50 characters"
            maxLength={50}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button className="px-6 py-2 bg-gray-300 rounded text-sm">
          Save Changes
        </button>
        <button className="px-6 py-2 bg-black text-white rounded-full text-sm">
          Delete Account
        </button>
      </div>
    </form>
    </div>
  );
}
export default PersonalInfo;