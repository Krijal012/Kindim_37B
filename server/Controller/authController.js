import bcrypt from "bcrypt";
import Users from "../Model/userModel.js";
import { generateToken } from "../Security/jwt-utils.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Op } from "sequelize";

dotenv.config();

// REGISTER WITH ROLE
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate username length
    if (username.length < 3 || username.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 20 characters" });
    }

    // Validate email format
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Validate role (if provided)
    const validRoles = ["customer", "seller", "admin"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be customer, seller, or admin" });
    }

    // Check if email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Check if username already exists
    const existingUsername = await Users.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role (defaults to 'customer' if not provided)
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
      role: role || "customer", // Default to customer
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role 
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN WITH ROLE
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user by email
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate token with role
    const access_token = generateToken({ 
      id: user.id, 
      email: user.email,
      role: user.role 
    });

    // Send response with role
    res.status(200).json({
      message: "Login successful",
      access_token,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "username", "email", "role", "createdAt", "updatedAt"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id, {
      attributes: ["id", "username", "email", "role", "createdAt", "updatedAt"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    
    // Update role if provided and valid
    if (role) {
      const validRoles = ["customer", "seller", "admin"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      user.role = role;
    }

    await user.save();
    res.status(200).json({ 
      message: "User updated successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    console.log("ENV EMAIL_USER:", process.env.EMAIL_USER);
    console.log("Sending email to:", user.email);

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p>
             <p>Click this link to reset your password: <a href="${resetURL}">${resetURL}</a></p>
             <p>This link will expire in 1 hour.</p>`,
    });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: error.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    console.log("Reset token received:", token);
    console.log("Password data:", { password, confirmPassword });

    // Validate input
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user with valid token
    const user = await Users.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    console.log("Password updated successfully for user:", user.email);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: error.message });
  }
};
