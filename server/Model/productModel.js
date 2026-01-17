import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    validate: {
      min: 0,
      max: 5,
    },
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "products",
  timestamps: true,
});

export default Product;