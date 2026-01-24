
import Product from "../Model/productModel.js";
import { Op } from "sequelize";


export const getProducts = async (req, res) => {
  try {
    const { search } = req.query; 
    let whereClause = {};

    if (search) {
      whereClause = {
        name: { [Op.iLike]: `%${search}%` } 
       
      };
    }

    const products = await Product.findAll({ where: whereClause });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
