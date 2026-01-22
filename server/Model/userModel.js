import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 20],
        },
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('customer', 'seller', 'admin'),
        allowNull: false,
        defaultValue: 'customer',
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    tableName: "users",
    timestamps: true,
});

export default User;