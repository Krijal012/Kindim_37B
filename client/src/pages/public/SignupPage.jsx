import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import logoIcon from "../../assets/image/logo-icon.png";
import profileIcon from "../../assets/icons/profile.png";
import emailIcon from "../../assets/icons/email.png";
import eyeIcon from "../../assets/icons/eye.png";
import eyeOffIcon from "../../assets/icons/eye-off.png";
import backgroundImage from "../../assets/background-image.jpeg";

import { RegisterSchema } from "../../schema/register.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "../../hooks/useAPI";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [backendSuccess, setBackendSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const { loading, error, callApi } = useApi();

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

  const inputWrapper =
    "flex items-center border rounded-md bg-gray-100 px-4 py-2.5 border-gray-300 focus-within:border-blue-500";
  const inputStyle = "flex-1 bg-transparent outline-none text-base";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[900px] h-[550px] rounded-lg shadow-2xl flex overflow-hidden bg-white">
        {/* Left Side - Form */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10 py-8 bg-white">
          <h3 className="text-4xl font-bold mb-8">Signup</h3>

          {error && (
            <p className="text-red-600 text-sm mb-2 w-full text-center">
              {error}
            </p>
          )}
          {backendSuccess && (
            <p className="text-green-600 text-sm mb-2 w-full text-center">
              {backendSuccess}
            </p>
          )}

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full flex flex-col gap-3"
          >
            {/* Username */}
            <div>
              <div className={inputWrapper}>
                <input
                  {...register("username")}
                  placeholder="Enter username"
                  className={inputStyle}
                  maxLength={20}
                />
                <img
                  src={profileIcon}
                  className="w-5 h-5 ml-2"
                  alt="Profile"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-xs mt-1 text-left">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className={inputWrapper}>
                <input
                  {...register("email")}
                  placeholder="Enter your email"
                  className={inputStyle}
                  maxLength={50}
                />
                <img src={emailIcon} className="w-5 h-5 ml-2" alt="Email" />
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className={inputWrapper}>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={inputStyle}
                  maxLength={50}
                />
                <img
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  className="w-5 h-5 ml-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  alt="Toggle password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1 text-left">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className={inputWrapper}>
                <input
                  {...register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  className={inputStyle}
                  maxLength={50}
                />
                <img
                  src={showConfirm ? eyeIcon : eyeOffIcon}
                  className="w-5 h-5 ml-2 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                  alt="Toggle confirm password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1 text-left">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>

        {/* Right Side - Blue Gradient */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A73E8] to-[#0F4EB3] rounded-tl-[70px] flex flex-col justify-center items-center text-white p-8">
            <img src={logoIcon} className="w-24 h-24 mb-6" alt="Kindim Logo" />
            <h2 className="text-3xl font-bold text-center mb-2">Hello,</h2>
            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome to Kindim
            </h2>
            <p className="mb-4 text-lg">Already have an account?</p>
            <button
              className="px-10 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;