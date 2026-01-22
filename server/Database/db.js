import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "Kindim",
    "postgres",
    "iamsubi10@",
    {
        "host": "localhost",
        "dialect": "postgres",
    }
);
 
export const connection = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log("Database connected");
    } catch (e) {
        console.log("Database connection failed", e);        
    }
 }
