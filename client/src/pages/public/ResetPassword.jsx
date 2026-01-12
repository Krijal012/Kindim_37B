import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import backgroundImage from "../../assets/background-image.jpeg";

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log("New Password:", data.password);

    setMessage("Password reset successfully!");
    reset();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-2xl mb-6 text-center font-semibold">
          Reset Password
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* New Password */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword")}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-3 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-800 transition"
          >
            Set Password
          </button>

          {message && (
            <p className="text-green-600 text-center mt-3">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
