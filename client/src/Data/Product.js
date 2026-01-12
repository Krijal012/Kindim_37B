// Beauty Products
import facewash from "../assets/BeautyProducts/facewash.jpg";
import facewash2 from "../assets/BeautyProducts/facewash2.jpg";
import lotion from "../assets/BeautyProducts/lotion.jpeg";
import lotion2 from "../assets/BeautyProducts/lotion2.png";
import perfume from "../assets/BeautyProducts/Perfume.jpg";
import perfume2 from "../assets/BeautyProducts/Perfume2.jpg";
import shampoo from "../assets/BeautyProducts/shampoo.jpg";
import shampoo2 from "../assets/BeautyProducts/shampoo2.jpeg";

// Clothing
import combo from "../assets/Clothing/Combo.jpg";
import hat from "../assets/Clothing/Hat.png";
import hoodies from "../assets/Clothing/Hoodies.jpg";
import jacket from "../assets/Clothing/Jacket.jpg";
import jeans from "../assets/Clothing/Jeans.jpg";
import sneaker from "../assets/Clothing/Sneaker.jpg";
import tshirt from "../assets/Clothing/T-Shirt.png";

// Decorations
import candle from "../assets/Decorations/candle.jpeg";
import decorativeLight from "../assets/Decorations/decorative-light.jpg";
import plant from "../assets/Decorations/plant.jpg";
import tableLamp from "../assets/Decorations/table-lamp.jpg";
import vase from "../assets/Decorations/vase.jpeg";
import wallClock from "../assets/Decorations/wall-clock.jpg";
import wallPainting from "../assets/Decorations/wall-painting.jpg";

// Electronics
import headphone from "../assets/Electronics/headphone.jpg";
import iphone from "../assets/Electronics/iphone.png";
import laptop from "../assets/Electronics/laptop.jpg";
import ps5 from "../assets/Electronics/PS5.jpeg";
import smartwatch from "../assets/Electronics/smartwatch.jpg";
import speaker from "../assets/Electronics/speaker.png";
import tv from "../assets/Electronics/TV.jpg";

// Music
import dj from "../assets/Music/dj.jpeg";
import drumpad from "../assets/Music/drumpad.jpeg";
import flute from "../assets/Music/flute.jpeg";
import guitar from "../assets/Music/guitar.jpeg";
import mike from "../assets/Music/mike.jpeg";
import piano from "../assets/Music/piano.jpeg";
import ukulele from "../assets/Music/ukulele.jpeg";

const Products = [
    // Beauty Products
    {
        id: 1,
        name: "Gentle Face Wash",
        price: 450,
        category: "Beauty Products",
        rating: 4.5,
        image: facewash,
    },
    {
        id: 2,
        name: "Deep Clean Face Wash",
        price: 500,
        category: "Beauty Products",
        rating: 4.0,
        image: facewash2,
    },
    {
        id: 3,
        name: "Moisturizing Lotion",
        price: 650,
        category: "Beauty Products",
        rating: 4.5,
        image: lotion,
    },
    {
        id: 4,
        name: "Hydrating Body Lotion",
        price: 700,
        category: "Beauty Products",
        rating: 4.0,
        image: lotion2,
    },
    {
        id: 5,
        name: "Luxury Perfume",
        price: 2500,
        category: "Beauty Products",
        rating: 4.8,
        image: perfume,
    },
    {
        id: 6,
        name: "Designer Fragrance",
        price: 3200,
        category: "Beauty Products",
        rating: 4.9,
        image: perfume2,
    },
    {
        id: 7,
        name: "Herbal Shampoo",
        price: 550,
        category: "Beauty Products",
        rating: 4.3,
        image: shampoo,
    },
    {
        id: 8,
        name: "Anti-Dandruff Shampoo",
        price: 600,
        category: "Beauty Products",
        rating: 4.2,
        image: shampoo2,
    },

    // Clothing
    {
        id: 9,
        name: "Casual Combo Set",
        price: 1800,
        category: "Clothing",
        rating: 4.4,
        image: combo,
    },
    {
        id: 10,
        name: "Stylish Baseball Cap",
        price: 450,
        category: "Clothing",
        rating: 4.1,
        image: hat,
    },
    {
        id: 11,
        name: "Comfortable Hoodie",
        price: 2200,
        category: "Clothing",
        rating: 4.6,
        image: hoodies,
    },
    {
        id: 12,
        name: "Leather Jacket",
        price: 4500,
        category: "Clothing",
        rating: 4.8,
        image: jacket,
    },
    {
        id: 13,
        name: "Slim Fit Jeans",
        price: 1800,
        category: "Clothing",
        rating: 4.3,
        image: jeans,
    },
    {
        id: 14,
        name: "Running Sneakers",
        price: 3200,
        category: "Clothing",
        rating: 4.7,
        image: sneaker,
    },
    {
        id: 15,
        name: "Cotton T-Shirt",
        price: 650,
        category: "Clothing",
        rating: 4.2,
        image: tshirt,
    },

    // Decorations
    {
        id: 16,
        name: "Aromatic Candle",
        price: 350,
        category: "Decorations",
        rating: 4.4,
        image: candle,
    },
    {
        id: 17,
        name: "Decorative Light",
        price: 1200,
        category: "Decorations",
        rating: 4.6,
        image: decorativeLight,
    },
    {
        id: 18,
        name: "Indoor Plant",
        price: 800,
        category: "Decorations",
        rating: 4.5,
        image: plant,
    },
    {
        id: 19,
        name: "Modern Table Lamp",
        price: 1800,
        category: "Decorations",
        rating: 4.7,
        image: tableLamp,
    },
    {
        id: 20,
        name: "Ceramic Vase",
        price: 950,
        category: "Decorations",
        rating: 4.3,
        image: vase,
    },
    {
        id: 21,
        name: "Wall Clock",
        price: 1200,
        category: "Decorations",
        rating: 4.4,
        image: wallClock,
    },
    {
        id: 22,
        name: "Abstract Wall Painting",
        price: 2800,
        category: "Decorations",
        rating: 4.8,
        image: wallPainting,
    },

    // Electronics
    {
        id: 23,
        name: "Wireless Headphones",
        price: 5500,
        category: "Electronics",
        rating: 4.9,
        image: headphone,
    },
    {
        id: 24,
        name: "iPhone 15 Pro",
        price: 125000,
        category: "Electronics",
        rating: 4.8,
        image: iphone,
    },
    {
        id: 25,
        name: "Gaming Laptop",
        price: 85000,
        category: "Electronics",
        rating: 4.7,
        image: laptop,
    },
    {
        id: 26,
        name: "PlayStation 5",
        price: 55000,
        category: "Electronics",
        rating: 4.9,
        image: ps5,
    },
    {
        id: 27,
        name: "Smart Watch",
        price: 15000,
        category: "Electronics",
        rating: 4.6,
        image: smartwatch,
    },
    {
        id: 28,
        name: "Bluetooth Speaker",
        price: 3200,
        category: "Electronics",
        rating: 4.5,
        image: speaker,
    },
    {
        id: 29,
        name: "4K Smart TV",
        price: 65000,
        category: "Electronics",
        rating: 4.8,
        image: tv,
    },

    // Music
    {
        id: 30,
        name: "DJ Controller",
        price: 25000,
        category: "Music",
        rating: 4.7,
        image: dj,
    },
    {
        id: 31,
        name: "Electronic Drum Pad",
        price: 18000,
        category: "Music",
        rating: 4.5,
        image: drumpad,
    },
    {
        id: 32,
        name: "Bamboo Flute",
        price: 1200,
        category: "Music",
        rating: 4.3,
        image: flute,
    },
    {
        id: 33,
        name: "Acoustic Guitar",
        price: 12000,
        category: "Music",
        rating: 4.8,
        image: guitar,
    },
    {
        id: 34,
        name: "Professional Microphone",
        price: 8500,
        category: "Music",
        rating: 4.6,
        image: mike,
    },
    {
        id: 35,
        name: "Digital Piano",
        price: 45000,
        category: "Music",
        rating: 4.9,
        image: piano,
    },
    {
        id: 36,
        name: "Ukulele",
        price: 3500,
        category: "Music",
        rating: 4.4,
        image: ukulele,
    },
];

export default Products;