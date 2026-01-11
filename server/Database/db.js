import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "Kidim_db",
    "postgres",
    "2062/9/22",
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
