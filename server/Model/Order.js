import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const Order = sequelize.define("Order", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  shippingAddressId: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "Pending" }, 
  paymentMethod: {
  type: DataTypes.STRING,
  allowNull: false,
},

});
