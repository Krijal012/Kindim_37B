
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  brand: { type: DataTypes.STRING },
  screen_size: { type: DataTypes.STRING },
  ram: { type: DataTypes.STRING },
  storage: { type: DataTypes.STRING },
  battery_life: { type: DataTypes.STRING },
  operating_system: { type: DataTypes.STRING },
  water_resistance: { type: DataTypes.STRING },
  wireless_charging: { type: DataTypes.STRING },
  warranty: { type: DataTypes.STRING },
  included_accessories: { type: DataTypes.STRING },
}, {
  tableName: "products",
  timestamps: true
});

export default Product;
