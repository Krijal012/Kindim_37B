import Product from "../Model/productModel.js";
import { Op } from "sequelize";

export const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const where = search
      ? { name: { [Op.iLike]: `%${search}%` } }
      : {};

    const products = await Product.findAll({
      where,
      order: [["id", "ASC"]],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const getProductsByCategory = async (req, res) => {
  const products = await Product.findAll({
    where: { category: req.params.category },
  });
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, price, category, rating, description } = req.body;

  const product = await Product.create({
    name,
    price,
    category,
    rating: rating || 0,
    description,
    image: req.file?.filename || null,
  });

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  Object.assign(product, req.body);
  if (req.file) product.image = req.file.filename;

  await product.save();
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await product.destroy();
  res.json({ message: "Product deleted successfully" });
};
