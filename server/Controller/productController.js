import Product from "../Model/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.findAll({
      where: { category },
      order: [['id', 'ASC']],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    // 1. Get text fields from req.body
    const { name, price, category, rating,description } = req.body;

    // 2. Get the filename from req.file (NOT req.body.image)
    const imageName = req.file ? req.file.filename : null;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }

    const newProduct = await Product.create({
      name,
      price,
      category,
      description,
      rating: rating || 0,
      image: imageName, 
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, rating, description } = req.body;
    
    // Check if a new file was uploaded via Multer
    const newImage = req.file ? req.file.filename : undefined;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (rating !== undefined) product.rating = rating;
    if (description !== undefined) product.description = description;
    
   
    if (newImage !== undefined) product.image = newImage;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};