import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "Kindim",
  "postgres",
  "iamsubi10@",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export const connection = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database connected and synced");
  } catch (e) {
    console.error("Database connection failed:", e);
  }
};
