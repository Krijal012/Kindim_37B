import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import { Order } from "./Order.js";
import Product from "./productModel.js";

export const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Optional for existing rows; new orders will set it.
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// Product association (for images/details in order history)
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });
