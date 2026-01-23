// Model/wishlistModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Wishlist = sequelize.define("Wishlist", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id'
  }
}, {
  tableName: 'wishlist',
  timestamps: true
});

export default Wishlist;