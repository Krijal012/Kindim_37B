import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const User = sequelize.define("UserDetails", {
  name: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  profileImage: { type: DataTypes.STRING, allowNull: true },
});
