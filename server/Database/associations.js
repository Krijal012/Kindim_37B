import { Order } from "../Model/Order.js";
import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";


Order.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Order, { foreignKey: "productId" });


Order.belongsTo(User, { as: "buyer", foreignKey: "buyerId" });
User.hasMany(Order, { as: "buyerOrders", foreignKey: "buyerId" });

Order.belongsTo(User, { as: "seller", foreignKey: "sellerId" });
User.hasMany(Order, { as: "sellerOrders", foreignKey: "sellerId" });
