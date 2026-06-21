import mongoose from "mongoose";
import dotenv from "dotenv";
 
dotenv.config();
 
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    discountPrice: Number,
    category: String,
    brand: String,
    images: [{ public_id: String, url: String }],
    stock: Number,
    ratings: Number,
    numReviews: Number,
    featured: Boolean,
    tags: [String],
  },
  { timestamps: true }
);
 
const Product = mongoose.model("Product", productSchema);
 
const products = [
  // Electronics (15)
  {
    name: "iPhone 15 Pro 256GB",
    description: "Apple iPhone 15 Pro with A17 Pro chip, titanium design, 48MP main camera, USB-C, and Action Button. The most powerful iPhone ever made.",
    price: 134900, discountPrice: 129999, category: "Electronics", brand: "Apple",
    stock: 50, ratings: 4.8, numReviews: 1240, featured: true,
    images: [{ public_id: "iphone15", url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800" }],
    tags: ["iphone", "apple", "smartphone"]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 200MP camera, built-in S Pen, and 5000mAh battery. The ultimate Android flagship.",
    price: 129999, discountPrice: 119999, category: "Electronics", brand: "Samsung",
    stock: 40, ratings: 4.7, numReviews: 980, featured: true,
    images: [{ public_id: "s24ultra", url: "https://images.unsplash.com/photo-1706525086742-6b4a6c4f789c?w=800" }],
    tags: ["samsung", "android", "smartphone"]
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancelling headphones with 30-hour battery, multipoint connection, and crystal clear hands-free calling.",
    price: 29990, discountPrice: 24999, category: "Electronics", brand: "Sony",
    stock: 75, ratings: 4.9, numReviews: 2100, featured: true,
    images: [{ public_id: "sony_xm5", url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800" }],
    tags: ["headphones", "sony", "wireless"]
  },
  {
    name: "boAt Airdopes 141 TWS",
    description: "True wireless earbuds with 42 hours total playback, ENx noise cancellation technology and IPX4 water resistance. Best budget TWS in India.",
    price: 2990, discountPrice: 1299, category: "Electronics", brand: "boAt",
    stock: 300, ratings: 4.2, numReviews: 45000, featured: true,
    images: [{ public_id: "boat_airdopes", url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800" }],
    tags: ["earbuds", "boat", "tws"]
  },
  {
    name: "Samsung 65 inch 4K Smart TV",
    description: "65 inch Crystal 4K UHD Smart TV with AirSlim design, Motion Xcelerator, HDR10+, and built-in Alexa voice assistant.",
    price: 89990, discountPrice: 74999, category: "Electronics", brand: "Samsung",
    stock: 20, ratings: 4.5, numReviews: 760, featured: true,
    images: [{ public_id: "samsung_tv", url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800" }],
    tags: ["tv", "samsung", "4k"]
  },
  {
    name: "MacBook Air M2 13 inch",
    description: "Apple MacBook Air with M2 chip, 8GB RAM, 256GB SSD, 13.6-inch Liquid Retina display, 18-hour battery life and MagSafe charging.",
    price: 114900, discountPrice: 109900, category: "Electronics", brand: "Apple",
    stock: 30, ratings: 4.9, numReviews: 3200, featured: true,
    images: [{ public_id: "macbook_air", url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800" }],
    tags: ["macbook", "apple", "laptop"]
  },
  {
    name: "iPad Pro 11 inch M4",
    description: "Apple iPad Pro with M4 chip, Ultra Retina XDR display, Apple Pencil Pro support, and all-day battery life in a thin and light design.",
    price: 99900, discountPrice: 94900, category: "Electronics", brand: "Apple",
    stock: 35, ratings: 4.8, numReviews: 870, featured: false,
    images: [{ public_id: "ipad_pro", url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800" }],
    tags: ["ipad", "apple", "tablet"]
  },
  {
    name: "Canon EOS R50 Mirrorless Camera",
    description: "24.2MP APS-C mirrorless camera with Dual Pixel CMOS AF II, 4K video, Wi-Fi connectivity and compact body. Perfect for beginners and vloggers.",
    price: 64995, discountPrice: 54999, category: "Electronics", brand: "Canon",
    stock: 15, ratings: 4.6, numReviews: 430, featured: false,
    images: [{ public_id: "canon_r50", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800" }],
    tags: ["camera", "canon", "mirrorless"]
  },
  {
    name: "Logitech MX Master 3S Mouse",
    description: "Advanced wireless mouse with 8000 DPI MagSpeed scroll wheel, ergonomic design, USB-C charging, and works on any surface including glass.",
    price: 9995, discountPrice: 7499, category: "Electronics", brand: "Logitech",
    stock: 120, ratings: 4.8, numReviews: 5600, featured: false,
    images: [{ public_id: "mx_master", url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800" }],
    tags: ["mouse", "logitech", "wireless"]
  },
  {
    name: "Mi 43 inch Full HD Smart TV",
    description: "Xiaomi 43 inch Full HD Smart Android TV with Dolby Audio, DTS-HD, 20W speaker, Vivid Picture Engine and 60Hz refresh rate.",
    price: 26999, discountPrice: 21999, category: "Electronics", brand: "Xiaomi",
    stock: 45, ratings: 4.3, numReviews: 12000, featured: false,
    images: [{ public_id: "mi_tv", url: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800" }],
    tags: ["tv", "xiaomi", "smart tv"]
  },
  {
    name: "OnePlus Nord CE 3 Lite 5G",
    description: "108MP triple camera, 5000mAh battery, 67W SUPERVOOC charging, 6.72 inch 120Hz display and Snapdragon 695 5G processor.",
    price: 19999, discountPrice: 16999, category: "Electronics", brand: "OnePlus",
    stock: 100, ratings: 4.1, numReviews: 8700, featured: false,
    images: [{ public_id: "oneplus_nord", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800" }],
    tags: ["oneplus", "5g", "smartphone"]
  },
  {
    name: "JBL Flip 6 Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker with powerful sound, PartyBoost for stereo pairing, 12 hours playback and IP67 dust and waterproof rating.",
    price: 11999, discountPrice: 8499, category: "Electronics", brand: "JBL",
    stock: 150, ratings: 4.6, numReviews: 23000, featured: false,
    images: [{ public_id: "jbl_flip6", url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800" }],
    tags: ["speaker", "jbl", "bluetooth"]
  },
  {
    name: "Kindle Paperwhite 16GB",
    description: "6.8 inch display with adjustable warm light, waterproof design, 16GB storage, weeks of battery life and USB-C charging.",
    price: 14999, discountPrice: 12999, category: "Electronics", brand: "Amazon",
    stock: 80, ratings: 4.7, numReviews: 34000, featured: false,
    images: [{ public_id: "kindle", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800" }],
    tags: ["kindle", "ebook", "amazon"]
  },
  {
    name: "Dell 27 inch IPS Monitor",
    description: "27 inch FHD IPS monitor with 75Hz refresh rate, AMD FreeSync, HDMI and VGA ports, thin bezels and flicker-free screen for comfortable viewing.",
    price: 18990, discountPrice: 14999, category: "Electronics", brand: "Dell",
    stock: 60, ratings: 4.4, numReviews: 4500, featured: false,
    images: [{ public_id: "dell_monitor", url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800" }],
    tags: ["monitor", "dell", "display"]
  },
  {
    name: "Realme Watch 3 Pro",
    description: "1.83 inch HD display smartwatch with GPS, Bluetooth calling, SpO2 and heart rate monitoring, 100+ sports modes and 10-day battery life.",
    price: 5999, discountPrice: 3999, category: "Electronics", brand: "Realme",
    stock: 200, ratings: 4.0, numReviews: 6700, featured: false,
    images: [{ public_id: "realme_watch", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" }],
    tags: ["smartwatch", "realme", "wearable"]
  },
 
  // Clothing (10)
  {
    name: "Nike Air Max 270",
    description: "Nike Air Max 270 running shoes with Max Air unit in the heel for all-day comfort. Breathable mesh upper and foam midsole for a smooth ride.",
    price: 12995, discountPrice: 8999, category: "Clothing", brand: "Nike",
    stock: 80, ratings: 4.5, numReviews: 9800, featured: true,
    images: [{ public_id: "nike_airmax", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" }],
    tags: ["nike", "shoes", "running"]
  },
  {
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit jeans in stretch denim fabric. Sits below waist, slim through hip and thigh, with a narrow leg opening. Timeless style.",
    price: 3999, discountPrice: 2499, category: "Clothing", brand: "Levi's",
    stock: 150, ratings: 4.4, numReviews: 15000, featured: false,
    images: [{ public_id: "levis_jeans", url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800" }],
    tags: ["jeans", "levis", "denim"]
  },
  {
    name: "H&M Oversized Cotton T-Shirt",
    description: "Relaxed fit oversized t-shirt in soft cotton jersey. Round neckline, dropped shoulders and short sleeves. Available in multiple colors.",
    price: 799, discountPrice: 499, category: "Clothing", brand: "H&M",
    stock: 400, ratings: 4.1, numReviews: 22000, featured: false,
    images: [{ public_id: "hm_tshirt", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" }],
    tags: ["tshirt", "cotton", "casual"]
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with Boost midsole for energy return, Primeknit upper for a sock-like fit, and Continental rubber outsole for grip.",
    price: 17999, discountPrice: 13999, category: "Clothing", brand: "Adidas",
    stock: 60, ratings: 4.6, numReviews: 7600, featured: false,
    images: [{ public_id: "adidas_ultra", url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800" }],
    tags: ["adidas", "shoes", "running"]
  },
  {
    name: "Zara Trench Coat",
    description: "Classic double-breasted trench coat with belt, lapel collar, and front pockets. Water-repellent fabric for light rain protection. Timeless outerwear.",
    price: 8999, discountPrice: 6499, category: "Clothing", brand: "Zara",
    stock: 40, ratings: 4.3, numReviews: 3400, featured: false,
    images: [{ public_id: "zara_coat", url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800" }],
    tags: ["coat", "zara", "winter"]
  },
  {
    name: "Puma RS-X Sneakers",
    description: "Chunky retro-inspired sneakers with leather and mesh upper, RS cushioning system in the sole, and bold color-blocking design.",
    price: 9999, discountPrice: 6999, category: "Clothing", brand: "Puma",
    stock: 90, ratings: 4.2, numReviews: 5400, featured: false,
    images: [{ public_id: "puma_rsx", url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800" }],
    tags: ["puma", "sneakers", "shoes"]
  },
  {
    name: "Allen Solly Formal Shirt",
    description: "Regular fit formal shirt in premium cotton blend fabric. Spread collar, full sleeves with button cuffs. Perfect for office and formal occasions.",
    price: 1799, discountPrice: 1199, category: "Clothing", brand: "Allen Solly",
    stock: 200, ratings: 4.3, numReviews: 11000, featured: false,
    images: [{ public_id: "allen_shirt", url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800" }],
    tags: ["shirt", "formal", "office"]
  },
  {
    name: "Campus Activewear Running Shoes",
    description: "Lightweight mesh upper running shoes with EVA midsole for cushioning, rubber outsole for grip, and breathable design for all-day wear.",
    price: 1999, discountPrice: 999, category: "Clothing", brand: "Campus",
    stock: 350, ratings: 4.0, numReviews: 32000, featured: false,
    images: [{ public_id: "campus_shoes", url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800" }],
    tags: ["shoes", "campus", "running"]
  },
  {
    name: "Woodland Casual Leather Boots",
    description: "Genuine leather ankle boots with rubber outsole, lace-up closure, and padded collar. Ideal for casual and outdoor wear in all weather conditions.",
    price: 4995, discountPrice: 3499, category: "Clothing", brand: "Woodland",
    stock: 70, ratings: 4.4, numReviews: 8900, featured: false,
    images: [{ public_id: "woodland_boots", url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800" }],
    tags: ["boots", "woodland", "leather"]
  },
  {
    name: "Van Heusen Chino Trousers",
    description: "Slim fit chino trousers in stretch cotton fabric. Mid-rise waist with belt loops, side and back pockets. Versatile for office and casual wear.",
    price: 2499, discountPrice: 1699, category: "Clothing", brand: "Van Heusen",
    stock: 180, ratings: 4.2, numReviews: 7200, featured: false,
    images: [{ public_id: "vanheusen_chino", url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800" }],
    tags: ["trousers", "chino", "formal"]
  },
  // Books (8)
  {
    name: "Clean Code by Robert C. Martin",
    description: "A handbook of agile software craftsmanship. Learn to write code that is readable, maintainable, and elegant. A must-read for every developer.",
    price: 2499, discountPrice: 1599, category: "Books", brand: "Pearson",
    stock: 200, ratings: 4.8, numReviews: 45000, featured: true,
    images: [{ public_id: "clean_code", url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800" }],
    tags: ["programming", "coding", "software"]
  },
  {
    name: "Atomic Habits by James Clear",
    description: "An easy and proven way to build good habits and break bad ones. Learn the four laws of behavior change to transform your life one tiny habit at a time.",
    price: 799, discountPrice: 499, category: "Books", brand: "Penguin",
    stock: 500, ratings: 4.9, numReviews: 120000, featured: true,
    images: [{ public_id: "atomic_habits", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800" }],
    tags: ["self-help", "habits", "productivity"]
  },
  {
    name: "The Alchemist by Paulo Coelho",
    description: "A magical story about following your dreams and listening to your heart. One of the best-selling books of all time translated into 80+ languages.",
    price: 299, discountPrice: 199, category: "Books", brand: "HarperCollins",
    stock: 600, ratings: 4.7, numReviews: 280000, featured: false,
    images: [{ public_id: "alchemist", url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" }],
    tags: ["fiction", "motivation", "classic"]
  },
  {
    name: "System Design Interview",
    description: "An insider's guide to system design interviews. Covers scalable system design concepts with real-world examples from top tech companies.",
    price: 2999, discountPrice: 1999, category: "Books", brand: "ByteByteGo",
    stock: 150, ratings: 4.8, numReviews: 18000, featured: false,
    images: [{ public_id: "system_design", url: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800" }],
    tags: ["programming", "interview", "system design"]
  },
  {
    name: "Rich Dad Poor Dad",
    description: "What the rich teach their kids about money that the poor and middle class do not. The #1 personal finance book of all time by Robert Kiyosaki.",
    price: 399, discountPrice: 249, category: "Books", brand: "Plata Publishing",
    stock: 400, ratings: 4.6, numReviews: 190000, featured: false,
    images: [{ public_id: "rich_dad", url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800" }],
    tags: ["finance", "money", "self-help"]
  },
  {
    name: "Zero to One by Peter Thiel",
    description: "Notes on startups and how to build the future. Essential reading for entrepreneurs and innovators on creating monopolies and building great companies.",
    price: 599, discountPrice: 399, category: "Books", brand: "Crown Business",
    stock: 250, ratings: 4.5, numReviews: 34000, featured: false,
    images: [{ public_id: "zero_to_one", url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800" }],
    tags: ["startup", "entrepreneurship", "business"]
  },
  {
    name: "JavaScript: The Good Parts",
    description: "Douglas Crockford distills JavaScript to its essential goodness. Learn the elegant, lightweight and highly expressive language within the language.",
    price: 1799, discountPrice: 1199, category: "Books", brand: "O'Reilly",
    stock: 180, ratings: 4.5, numReviews: 22000, featured: false,
    images: [{ public_id: "js_good_parts", url: "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800" }],
    tags: ["javascript", "programming", "web"]
  },
  {
    name: "Deep Work by Cal Newport",
    description: "Rules for focused success in a distracted world. Learn how to cultivate deep focus and produce better work in less time in our age of distraction.",
    price: 599, discountPrice: 399, category: "Books", brand: "Grand Central",
    stock: 300, ratings: 4.7, numReviews: 67000, featured: false,
    images: [{ public_id: "deep_work", url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800" }],
    tags: ["productivity", "focus", "self-help"]
  },
   // Home (7)
  {
    name: "Dyson V12 Cordless Vacuum",
    description: "Lightweight cordless vacuum with laser dust detection, 60-minute runtime, HEPA filtration and LCD screen showing live performance data.",
    price: 52900, discountPrice: 44900, category: "Home", brand: "Dyson",
    stock: 25, ratings: 4.8, numReviews: 3400, featured: false,
    images: [{ public_id: "dyson_v12", url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800" }],
    tags: ["vacuum", "dyson", "cleaning"]
  },
  {
    name: "Philips Air Fryer HD9200",
    description: "1400W digital air fryer with Rapid Air technology, 4.1L capacity, 7 presets, and up to 90% less fat than traditional frying. Healthy cooking made easy.",
    price: 8995, discountPrice: 6499, category: "Home", brand: "Philips",
    stock: 80, ratings: 4.5, numReviews: 28000, featured: true,
    images: [{ public_id: "philips_airfryer", url: "https://images.unsplash.com/photo-1648170645659-31b4b19f0b3f?w=800" }],
    tags: ["airfryer", "kitchen", "cooking"]
  },
  {
    name: "Prestige Induction Cooktop",
    description: "2000W induction cooktop with 8 power levels, 7 preset menus, feather touch controls, automatic voltage regulation, and child lock safety feature.",
    price: 3995, discountPrice: 2799, category: "Home", brand: "Prestige",
    stock: 120, ratings: 4.3, numReviews: 41000, featured: false,
    images: [{ public_id: "prestige_induction", url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800" }],
    tags: ["induction", "kitchen", "cooking"]
  },
  {
    name: "Amazon Echo Dot 5th Gen",
    description: "Smart speaker with Alexa, improved audio with deeper bass, built-in temperature sensor, motion detection and eero Built-in Wi-Fi support.",
    price: 4499, discountPrice: 2999, category: "Home", brand: "Amazon",
    stock: 200, ratings: 4.4, numReviews: 56000, featured: false,
    images: [{ public_id: "echo_dot", url: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800" }],
    tags: ["alexa", "smart home", "speaker"]
  },
  {
    name: "IKEA KALLAX Shelf Unit",
    description: "Versatile shelf unit that can be used as a room divider or against a wall. 8 compartments for books, plants and decorative boxes.",
    price: 8999, discountPrice: 7499, category: "Home", brand: "IKEA",
    stock: 35, ratings: 4.6, numReviews: 12000, featured: false,
    images: [{ public_id: "ikea_kallax", url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800" }],
    tags: ["furniture", "shelf", "storage"]
  },
  {