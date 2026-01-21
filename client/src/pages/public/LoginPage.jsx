import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const res = await callApi("POST", "/auth/login", { data: loginData });

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("userEmail", loginData.email);
    localStorage.setItem("userRole", res.data.role);

    if (onLogin) onLogin();

    // ✅ Always go to dashboard
    navigate("/dashboard", { replace: true });

  } catch (err) {
    setBackendError(err.message || "Login failed");
  }
};

  const inputWrapper =
    "flex items-center border rounded-md bg-gray-100 px-4 py-2 border-gray-300 focus-within:border-blue-500";
  const inputStyle = "flex-1 bg-transparent outline-none text-base";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[800px] h-[500px] rounded-lg shadow-2xl flex overflow-hidden bg-white">
        {/* Left Side - Blue Section */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A73E8] to-[#0F4EB3] rounded-tr-[70px] flex flex-col justify-center items-center text-white p-6">
            <img src={logoIcon} className="w-20 h-20 mb-6" alt="Logo" />
            <h3 className="text-3xl font-bold mb-2 text-center">Hello,</h3>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Welcome to Kindim
            </h2>
            <p className="mb-3">Don't have an account?</p>
            <button
              className="px-8 py-2 bg-black rounded-full hover:bg-gray-800"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <h3 className="text-3xl font-bold mb-6">Login</h3>

          {backendError && (
            <p className="text-red-600 text-sm mb-2">{backendError}</p>
          )}

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full flex flex-col gap-4"
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
            <button className="mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;