import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shippingAddressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
    validate: {
      isIn: [["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Approved", "Rejected"]],
    },
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Added from Incoming for seller filtering
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional for now as order might contain items from multiple sellers
  },
});
