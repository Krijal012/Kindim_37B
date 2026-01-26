import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const ShippingAddress = sequelize.define("ShippingAddress", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fullname: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  phonenumber: { type: DataTypes.STRING, allowNull: false },
});
