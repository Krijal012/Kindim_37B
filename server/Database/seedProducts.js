import { sequelize } from "./db.js";
import Product from "../Model/productModel.js";

const seedProducts = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    
    const products = [
      { name: "Gentle Face Wash", price: 450, category: "Beauty Products", rating: 4.5, image: "facewash.jpg" },
      { name: "Moisturizing Lotion", price: 650, category: "Beauty Products", rating: 4.5, image: "lotion.jpeg" },
      { name: "Luxury Perfume", price: 2500, category: "Beauty Products", rating: 4.8, image: "Perfume.jpg" },
      { name: "Herbal Shampoo", price: 550, category: "Beauty Products", rating: 4.3, image: "shampoo.jpg" },
      
      { name: "Comfortable Hoodie", price: 2200, category: "Clothing", rating: 4.6, image: "Hoodies.jpg" },
      { name: "Leather Jacket", price: 4500, category: "Clothing", rating: 4.8, image: "Jacket.jpg" },
      { name: "Running Sneakers", price: 3200, category: "Clothing", rating: 4.7, image: "Sneaker.jpg" },
      
      { name: "Modern Table Lamp", price: 1800, category: "Decorations", rating: 4.7, image: "table-lamp.jpg" },
      { name: "Abstract Wall Painting", price: 2800, category: "Decorations", rating: 4.8, image: "wall-painting.jpg" },
      
      { name: "Wireless Headphones", price: 5500, category: "Electronics", rating: 4.9, image: "headphone.jpg" },
      { name: "iPhone 15 Pro", price: 125000, category: "Electronics", rating: 4.8, image: "iphone.png" },
      { name: "Gaming Laptop", price: 85000, category: "Electronics", rating: 4.7, image: "laptop.jpg" },
      
      { name: "DJ Controller", price: 25000, category: "Music", rating: 4.7, image: "dj.jpeg" },
      { name: "Acoustic Guitar", price: 12000, category: "Music", rating: 4.8, image: "guitar.jpeg" },
      { name: "Digital Piano", price: 45000, category: "Music", rating: 4.9, image: "piano.jpeg" },
    ];

    await Product.bulkCreate(products);
    console.log("Products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();