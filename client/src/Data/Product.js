// Beauty Products
import facewash from "../assets/BeautyProducts/facewash.jpg";
import lotion from "../assets/BeautyProducts/lotion.jpeg";
import perfume from "../assets/BeautyProducts/Perfume.jpg";
import shampoo from "../assets/BeautyProducts/shampoo.jpg";

// Clothing
import hoodies from "../assets/Clothing/Hoodies.jpg";
import jacket from "../assets/Clothing/Jacket.jpg";
import sneaker from "../assets/Clothing/Sneaker.jpg";

// Decorations
import tableLamp from "../assets/Decorations/table-lamp.jpg";
import wallPainting from "../assets/Decorations/wall-painting.jpg";

// Electronics
import headphone from "../assets/Electronics/headphone.jpg";
import iphone from "../assets/Electronics/iphone.png";
import laptop from "../assets/Electronics/laptop.jpg";
import ps5 from "../assets/Electronics/PS5.jpeg";

// Music
import dj from "../assets/Music/dj.jpeg";
import guitar from "../assets/Music/guitar.jpeg";
import piano from "../assets/Music/piano.jpeg";

const Products = [
    // Beauty Products (4 items)
    {
        id: 1,
        name: "Gentle Face Wash",
        price: 450,
        category: "Beauty Products",
        rating: 3.5,
        image: facewash,
    },
    {
        id: 2,
        name: "Moisturizing Lotion",
        price: 650,
        category: "Beauty Products",
        rating: 2.8,
        image: lotion,
    },
    {
        id: 3,
        name: "Luxury Perfume",
        price: 2500,
        category: "Beauty Products",
        rating: 4.8,
        image: perfume,
    },
    {
        id: 4,
        name: "Herbal Shampoo",
        price: 550,
        category: "Beauty Products",
        rating: 1.9,
        image: shampoo,
    },

    // Clothing (3 items)
    {
        id: 5,
        name: "Comfortable Hoodie",
        price: 2200,
        category: "Clothing",
        rating: 4.6,
        image: hoodies,
    },
    {
        id: 6,
        name: "Leather Jacket",
        price: 4500,
        category: "Clothing",
        rating: 3.2,
        image: jacket,
    },
    {
        id: 7,
        name: "Running Sneakers",
        price: 3200,
        category: "Clothing",
        rating: 4.7,
        image: sneaker,
    },

    // Decorations (2 items)
    {
        id: 8,
        name: "Modern Table Lamp",
        price: 1800,
        category: "Decorations",
        rating: 2.5,
        image: tableLamp,
    },
    {
        id: 9,
        name: "Abstract Wall Painting",
        price: 2800,
        category: "Decorations",
        rating: 4.8,
        image: wallPainting,
    },

    // Electronics (3 items)
    {
        id: 10,
        name: "Wireless Headphones",
        price: 5500,
        category: "Electronics",
        rating: 4.9,
        image: headphone,
    },
    {
        id: 11,
        name: "iPhone 15 Pro",
        price: 125000,
        category: "Electronics",
        rating: 4.8,
        image: iphone,
    },
    {
        id: 12,
        name: "Gaming Laptop",
        price: 85000,
        category: "Electronics",
        rating: 3.8,
        image: laptop,
    },

    // Music (3 items)
    {
        id: 13,
        name: "DJ Controller",
        price: 25000,
        category: "Music",
        rating: 2.3,
        image: dj,
    },
    {
        id: 14,
        name: "Acoustic Guitar",
        price: 12000,
        category: "Music",
        rating: 4.8,
        image: guitar,
    },
    {
        id: 15,
        name: "Digital Piano",
        price: 45000,
        category: "Music",
        rating: 4.9,
        image: piano,
    },
];

export default Products;