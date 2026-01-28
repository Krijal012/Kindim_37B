import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.DECIMAL(2, 1), defaultValue: 0 },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.TEXT },
    sellerId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
