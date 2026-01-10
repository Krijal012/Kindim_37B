import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import logoIcon from "../../assets/image/logo-icon.png";
import profileIcon from "../../assets/icons/profile.png";
import emailIcon from "../../assets/icons/email.png";
import eyeIcon from "../../assets/icons/eye.png";
import eyeOffIcon from "../../assets/icons/eye-off.png";

import { RegisterSchema } from "../../schema/register.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "../../hooks/useAPi";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [backendSuccess, setBackendSuccess] = useState("");


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const { loading, error, callApi } = useApi();

console.log(errors);
  const handleRegister = async (data) => {
    try {
      setBackendSuccess("");
      const res = await callApi("POST", "/auth/register", { data });
      setBackendSuccess(res.message || "Registered successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.log(err.message);
    }
  };

  const inputWrapper = "flex items-center border rounded-md bg-gray-100 px-4 py-2 border-gray-300 focus-within:border-blue-500";
  const inputStyle = "flex-1 bg-transparent outline-none text-base";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[800px] h-[500px] rounded-lg shadow-2xl flex overflow-hidden">

        
        <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
          <h3 className="text-3xl font-bold mb-6">Signup</h3>

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          {backendSuccess && <p className="text-green-600 text-sm mb-2">{backendSuccess}</p>}

          <form onSubmit={handleSubmit(handleRegister)} className="w-full flex flex-col gap-4">

            
            <div>
              <div className={inputWrapper}>
                <input {...register("username")} placeholder="Enter username" className={inputStyle}  maxLength={10}/>
                <img src={profileIcon} className="w-5 h-5 ml-2" />
              </div>
              <p className="text-red-600 text-sm mt-1 text-left">{errors.username?.message}</p>
            </div>

            
            <div>
              <div className={inputWrapper}>
                <input {...register("email")} placeholder="Enter your email" className={inputStyle} maxLength={30} />
                <img src={emailIcon} className="w-5 h-5 ml-2" />
              </div>
              <p className="text-red-600 text-sm mt-1 text-left">{errors.email?.message}</p>
            </div>

           
            <div>
              <div className={inputWrapper}>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={inputStyle}
                  maxLength={10}
                />
                <img
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  className="w-5 h-5 ml-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <p className="text-red-600 text-sm mt-1 text-left">{errors.password?.message}</p>
            </div>

           
            <div>
              <div className={inputWrapper}>
                <input
                  {...register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  className={inputStyle}
                  maxLength={10}
                />
                <img
                  src={showConfirm ? eyeIcon : eyeOffIcon}
                  className="w-5 h-5 ml-2 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </div>
              <p className="text-red-600 text-sm mt-1 text-left">{errors.confirmPassword?.message}</p>
            </div>

           <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded-md">
            Signup
        </button>

          </form>
        </div>

       
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A73E8] to-[#0F4EB3] rounded-tl-[70px] flex flex-col justify-center items-center text-white">
            <img src={logoIcon} className="w-20 h-20 mb-6" />
            <h2 className="text-3xl font-bold text-center mb-4">
              Hello,<br />Welcome to Kindim
            </h2>
            <p className="mb-3">Already have an account?</p>
            <button className="px-8 py-2 bg-black rounded-full" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
