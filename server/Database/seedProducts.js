import { sequelize } from "./db.js";
import Product from "../Model/productModel.js";

const seedProducts = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    
    const products = [
      { name: "Gentle Face Wash", price: 450, category: "Beauty Products", rating: 4.5, image: "facewash.jpg" },
      { name: "Deep Clean Face Wash", price: 500, category: "Beauty Products", rating: 4.0, image: "facewash2.jpg" },
      { name: "Moisturizing Lotion", price: 650, category: "Beauty Products", rating: 4.5, image: "lotion.jpeg" },
      { name: "Hydrating Body Lotion", price: 700, category: "Beauty Products", rating: 4.0, image: "lotion2.png" },
      { name: "Luxury Perfume", price: 2500, category: "Beauty Products", rating: 4.8, image: "Perfume.jpg" },
      { name: "Designer Fragrance", price: 3200, category: "Beauty Products", rating: 4.9, image: "Perfume2.jpg" },
      { name: "Herbal Shampoo", price: 550, category: "Beauty Products", rating: 4.3, image: "shampoo.jpg" },
      { name: "Anti-Dandruff Shampoo", price: 600, category: "Beauty Products", rating: 4.2, image: "shampoo2.jpeg" },
      
      { name: "Casual Combo Set", price: 1800, category: "Clothing", rating: 4.4, image: "Combo.jpg" },
      { name: "Stylish Baseball Cap", price: 450, category: "Clothing", rating: 4.1, image: "Hat.png" },
      { name: "Comfortable Hoodie", price: 2200, category: "Clothing", rating: 4.6, image: "Hoodies.jpg" },
      { name: "Leather Jacket", price: 4500, category: "Clothing", rating: 4.8, image: "Jacket.jpg" },
      { name: "Slim Fit Jeans", price: 1800, category: "Clothing", rating: 4.3, image: "Jeans.jpg" },
      { name: "Running Sneakers", price: 3200, category: "Clothing", rating: 4.7, image: "Sneaker.jpg" },
      { name: "Cotton T-Shirt", price: 650, category: "Clothing", rating: 4.2, image: "T-Shirt.png" },
      
      { name: "Aromatic Candle", price: 350, category: "Decorations", rating: 4.4, image: "candle.jpeg" },
      { name: "Decorative Light", price: 1200, category: "Decorations", rating: 4.6, image: "decorative-light.jpg" },
      { name: "Indoor Plant", price: 800, category: "Decorations", rating: 4.5, image: "plant.jpg" },
      { name: "Modern Table Lamp", price: 1800, category: "Decorations", rating: 4.7, image: "table-lamp.jpg" },
      { name: "Ceramic Vase", price: 950, category: "Decorations", rating: 4.3, image: "vase.jpeg" },
      { name: "Wall Clock", price: 1200, category: "Decorations", rating: 4.4, image: "wall-clock.jpg" },
      { name: "Abstract Wall Painting", price: 2800, category: "Decorations", rating: 4.8, image: "wall-painting.jpg" },
      
      { name: "Wireless Headphones", price: 5500, category: "Electronics", rating: 4.9, image: "headphone.jpg" },
      { name: "iPhone 15 Pro", price: 125000, category: "Electronics", rating: 4.8, image: "iphone.png" },
      { name: "Gaming Laptop", price: 85000, category: "Electronics", rating: 4.7, image: "laptop.jpg" },
      { name: "PlayStation 5", price: 55000, category: "Electronics", rating: 4.9, image: "PS5.jpeg" },
      { name: "Smart Watch", price: 15000, category: "Electronics", rating: 4.6, image: "smartwatch.jpg" },
      { name: "Bluetooth Speaker", price: 3200, category: "Electronics", rating: 4.5, image: "speaker.png" },
      { name: "4K Smart TV", price: 65000, category: "Electronics", rating: 4.8, image: "TV.jpg" },
      
      { name: "DJ Controller", price: 25000, category: "Music", rating: 4.7, image: "dj.jpeg" },
      { name: "Electronic Drum Pad", price: 18000, category: "Music", rating: 4.5, image: "drumpad.jpeg" },
      { name: "Bamboo Flute", price: 1200, category: "Music", rating: 4.3, image: "flute.jpeg" },
      { name: "Acoustic Guitar", price: 12000, category: "Music", rating: 4.8, image: "guitar.jpeg" },
      { name: "Professional Microphone", price: 8500, category: "Music", rating: 4.6, image: "mike.jpeg" },
      { name: "Digital Piano", price: 45000, category: "Music", rating: 4.9, image: "piano.jpeg" },
      { name: "Ukulele", price: 3500, category: "Music", rating: 4.4, image: "ukulele.jpeg" },
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