import bcrypt from "bcrypt";
import { sequelize } from "./db.js";
import Users from "../Model/userModel.js";

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        const adminEmail = "admin@kindim.com";
        const existingAdmin = await Users.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log("Admin user already exists.");
            console.log("Email: " + adminEmail);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await Users.create({
            username: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            status: "Verified"
        });

        console.log("Admin user created successfully!");
        console.log("Email: " + adminEmail);
        console.log("Password: admin123");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
