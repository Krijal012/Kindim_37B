import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const RecentlyViewed = sequelize.define("RecentlyViewed", {
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
    tableName: 'recently_viewed',
    timestamps: true
});

export default RecentlyViewed;
