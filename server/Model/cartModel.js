import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import Users from "./userModel.js";
import Product from "./productModel.js";

const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    selectedColor: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    selectedSize: {
        type: DataTypes.STRING(50),
        allowNull: true,
    }
}, {
    tableName: "cart",
    timestamps: true,
});

// Associations
Cart.belongsTo(Users, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

export default Cart;