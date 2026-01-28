import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import logoIcon from "../../assets/icons/logo-icon.png"; // Changed from assets/image/logo-icon.png to assets/icons/logo-icon.png to match Login
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
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isAnimating, setIsAnimating] = useState(false);

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

      const res = await callApi("POST", "/auth/register", { ...data, role: selectedRole });

      setBackendSuccess(res.message || "Registered successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };


  const handleLoginClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/login");
    }, 600);
  };

  const inputWrapper =
    "flex items-center border rounded-md bg-gray-100 px-4 py-2.5 border-gray-300 focus-within:border-blue-500";
  const inputStyle = "flex-1 bg-transparent outline-none text-base";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-2 sm:p-4 overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`w-full max-w-[900px] min-h-[500px] sm:h-auto lg:h-[650px] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden bg-white transition-all duration-600 ${isAnimating ? "animate-slide-left" : "animate-slide-in-right"
          }`}
      >
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 py-6 md:py-8 bg-white order-2 md:order-1">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Signup</h3>

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
            className="w-full flex flex-col gap-2 sm:gap-3"
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

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Register as:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={selectedRole === "customer"}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">Customer</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={selectedRole === "seller"}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">Seller</span>
                </label>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 sm:mt-3 bg-blue-500 text-white py-2.5 sm:py-3 rounded-md font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 text-sm sm:text-base"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>

        {/* Right Side - Blue Gradient */}
        <div className="w-full md:w-1/2 relative order-1 md:order-2">
          <div className="relative md:absolute inset-0 bg-gradient-to-b from-[#1A73E8] to-[#0F4EB3] md:rounded-tl-[70px] flex flex-col justify-center items-center text-white p-6 sm:p-8 min-h-[200px] md:min-h-0">
            <img src={logoIcon} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 md:mb-6" alt="Kindim Logo" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-1 md:mb-2">Hello,</h2>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 md:mb-6">
              Welcome to Kindim
            </h2>
            <p className="mb-2 md:mb-4 text-sm sm:text-base md:text-lg">Already have an account?</p>
            <button
              className="px-6 sm:px-8 md:px-10 py-2 md:py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all hover:scale-105 text-sm sm:text-base"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes slide-in-right {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-left {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-in-out;
        }

        .animate-slide-left {
          animation: slide-left 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;