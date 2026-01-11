import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
     "postgres",
    "postgres",
    "Ronaldo12345--",
    {
        "host": "localhost",
        "dialect": "postgres",
    }
);
 

export const connection = () => {
    try {
        sequelize.sync(); 
        console.log("Database connected");
    } catch (e) {
        console.log("Database connection failed", e);        
    }
 }
