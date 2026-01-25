import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../assets/icons/logo-icon.png";
import emailIcon from "../../assets/icons/email.png";
import backgroundImage from "../../assets/background-image.jpeg";
import { ForgotPasswordSchema } from "../../schema/forgot.schema";
import { useApi } from "../../hooks/useAPI";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { loading, error, callApi } = useApi();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const res = await callApi("POST", "/auth/forgotpass", data);
      setMessage(res.data.message || "Check your email for a reset link!");
    } catch (err) {
      setMessage(err.message);
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
            <p className="mb-3">Remember your password?</p>
            <button
              className="px-8 py-2 bg-black rounded-full hover:bg-gray-800"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <h3 className="text-3xl font-bold mb-4">Forgot Password?</h3>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter your email to receive a reset link
          </p>

          {message && (
            <p
              className={`text-sm mb-3 ${
                error ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* Email Input */}
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
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;