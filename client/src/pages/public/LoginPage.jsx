import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

import logoIcon from "../../assets/icons/logo-icon.png";
import emailIcon from "../../assets/icons/email.png";
import eyeIcon from "../../assets/icons/eye.png";
import eyeOffIcon from "../../assets/icons/eye-off.png";
import backgroundImage from "../../assets/background-image.jpeg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/login.schemas";
import { useApi } from "../../hooks/useAPI";
import { Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (loginData) => {
    try {
      setBackendError("");
      // Backend expects { email, password } directly in body, not wrapped in 'data'
      const res = await callApi("POST", "/auth/login", loginData);

      // Response structure: { message: "...", data: { access_token, role, ... } }
      const backendData = res.data;

      if (backendData && backendData.access_token) {

        // Clear previous session data
        localStorage.clear();

        // Store session data using standard keys
        localStorage.setItem("token", backendData.access_token);
        localStorage.setItem("userEmail", loginData.email);
        localStorage.setItem("userRole", backendData.role);

        if (onLogin) {
          // Use flushSync to ensure state updates before navigation if critical
          flushSync(() => {
            onLogin();
          });
        }

        console.log("Login Successful. Role:", backendData.role);
        console.log("Navigating to:", backendData.role === "admin" ? "/admin-dashboard" : "/");

        // Navigate based on role
        if (backendData.role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else if (backendData.role === "seller") {
          navigate("/seller-dashboard", { replace: true }); // Backend prevents login if not verified, so safe to redirect
        } else {
          navigate("/", { replace: true });
        }
      } else {
        setBackendError("Unexpected response format from server");
      }
    } catch (err) {
      // Backend returns 403 for unverified sellers with a specific message
      setBackendError(err.message || "Login failed");
    }
  };

  const handleSignupClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/signup");
    }, 600);
  };

  const inputWrapper =
    "flex items-center border rounded-md bg-gray-100 px-4 py-2 border-gray-300 focus-within:border-blue-500";
  const inputStyle = "flex-1 bg-transparent outline-none text-base";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden p-2 sm:p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`w-full max-w-[800px] min-h-[450px] sm:h-auto lg:h-[500px] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden bg-white transition-all duration-600 ${isAnimating ? "animate-slide-right" : "animate-slide-in-left"
          }`}
      >
        {/* Left Side - Blue Section */}
        <div className="w-full md:w-1/2 relative order-1 md:order-1">
          <div className="relative md:absolute inset-0 bg-gradient-to-b from-[#1A73E8] to-[#0F4EB3] md:rounded-tr-[70px] flex flex-col justify-center items-center text-white p-6 sm:p-8 min-h-[200px] md:min-h-0">
            <img src={logoIcon} className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mb-3 md:mb-6" alt="Logo" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-center">Hello,</h3>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center">
              Welcome to Kindim
            </h2>
            <p className="mb-2 md:mb-3 text-sm sm:text-base">Don't have an account?</p>
            <button
              className="px-6 sm:px-8 py-2 bg-black rounded-full hover:bg-gray-800 transition-all hover:scale-105 text-sm sm:text-base"
              onClick={handleSignupClick}
            >
              Signup
            </button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 order-2 md:order-2">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6">Login</h3>

          {backendError && (
            <p className="text-red-600 text-sm mb-2">{backendError}</p>
          )}

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full flex flex-col gap-3 sm:gap-4"
          >
            {/* Email */}
            <div>
              <div className={inputWrapper}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className={inputStyle}
                  maxLength={50}
                />
                <img
                  src={emailIcon}
                  className="w-5 h-5 ml-2"
                  alt="Email Icon"
                />
              </div>
              <p className="text-red-600 text-sm mt-1 text-left">
                {errors.email?.message}
              </p>
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
                  alt="Toggle Password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="text-right mt-1">
                <Link
                  to="/forgotpass"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <p className="text-red-600 text-sm mt-1 text-left">
                {errors.password?.message}
              </p>
            </div>

            {/* Login Button */}
            <button className="mt-3 sm:mt-4 bg-blue-500 text-white py-2 sm:py-2.5 rounded-md hover:bg-blue-600 transition-all hover:scale-105 text-sm sm:text-base">
              Login
            </button>
          </form>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-right {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-in-out;
        }

        .animate-slide-right {
          animation: slide-right 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;