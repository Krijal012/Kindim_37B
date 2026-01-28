import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  "Kidim", // Database name
  "postgres", // User
  process.env.DB_PASSWORD || "12345", // Password
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
