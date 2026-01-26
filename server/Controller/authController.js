import bcrypt from "bcrypt";
import Users from "../Model/userModel.js";
import { generateToken } from "../Security/jwt-utils.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Op } from "sequelize";

dotenv.config();

/* ===================== REGISTER ===================== */
export const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, role } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (username.length < 3 || username.length > 20) {
            return res
                .status(400)
                .json({ message: "Username must be between 3 and 20 characters" });
        }

        if (!email.includes("@") || !email.includes(".")) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const validRoles = ["customer", "seller", "admin"];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const existingEmail = await Users.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ message: "User already exists" });
        }

        const existingUsername = await Users.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
            role: role || "customer",
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // DEBUG: Log the secret being used
        console.log("JWT_SECRET in login:", process.env.JWT_SECRET);
        
        const access_token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        console.log("Generated token:", access_token.substring(0, 50) + "...");

        res.status(200).json({
            message: "Login successful",
            data: {
                access_token,
                role: user.role,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ===================== USERS ===================== */
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

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id, {
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

export const updateUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = await Users.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

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
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ===================== FORGOT PASSWORD ===================== */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset",
            html: `<p>Reset your password:</p><a href="${resetURL}">${resetURL}</a>`,
        });

        res.status(200).json({ message: "Reset link sent to email" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ===================== RESET PASSWORD ===================== */
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await Users.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};