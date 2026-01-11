import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "Kindim",
    "postgres",
    "admin123",
    {
        "host": "localhost",
        "dialect": "postgres",
    }
);
 

export const connection = async () => {
    try {
        await sequelize.sync(); 
        console.log("Database connected");
    } catch (e) {
        console.log("Database connection failed", e);        
    }
 }
