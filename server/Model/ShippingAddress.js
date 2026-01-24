import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const ShippingAddress = sequelize.define("ShippingAddress", {
  fullname: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  phonenumber: { type: DataTypes.STRING, allowNull: false },
});
