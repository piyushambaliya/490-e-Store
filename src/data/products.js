const products = [
  // ——— ELECTRONICS ———
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.5,
    description: "High-quality wireless headphones with active noise cancellation and premium sound. 30-hour battery life with ultra-comfortable ear cushions.",
    badge: "Sale"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.7,
    description: "Feature-packed smartwatch with health tracking, GPS, and notifications. Track your fitness goals and stay connected on the go.",
    badge: "Hot"
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    category: "Electronics",
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.4,
    description: "Portable Bluetooth speaker with 360° surround sound. Waterproof design with 12-hour playtime for outdoor adventures.",
    badge: "Sale"
  },
  {
    id: 11,
    name: "Laptop Stand",
    category: "Electronics",
    image: "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600",
    price: 34.99,
    oldPrice: 44.99,
    rating: 4.6,
    description: "Adjustable aluminum laptop stand for better ergonomics. Anti-slip pads with built-in cable management.",
    badge: "New"
  },
  {
    id: 13,
    name: "Mechanical Keyboard",
    category: "Electronics",
    image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.6,
    description: "Compact TKL mechanical keyboard with RGB backlight. Tactile switches for a satisfying typing experience, perfect for gaming and work.",
    badge: "Hot"
  },
  {
    id: 14,
    name: "Wireless Earbuds",
    category: "Electronics",
    image: "https://images.pexels.com/photos/8533264/pexels-photo-8533264.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.5,
    description: "True wireless earbuds with active noise cancellation and transparency mode. Up to 28 hours total battery with the charging case.",
    badge: "New"
  },
  {
    id: 15,
    name: "4K Webcam",
    category: "Electronics",
    image: "https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 74.99,
    oldPrice: 99.99,
    rating: 4.3,
    description: "Ultra HD 4K webcam with built-in microphone and auto-focus. Perfect for video calls, streaming, and remote work.",
    badge: "Sale"
  },
  {
    id: 16,
    name: "Gaming Mouse",
    category: "Electronics",
    image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 44.99,
    oldPrice: 59.99,
    rating: 4.7,
    description: "Precision gaming mouse with 16000 DPI sensor, 7 programmable buttons, and customizable RGB lighting.",
    badge: "Hot"
  },

  // ——— FASHION ———
  {
    id: 5,
    name: "Men's Casual Shirt",
    category: "Fashion",
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 39.99,
    oldPrice: 49.99,
    rating: 4.2,
    description: "Comfortable cotton shirt for everyday wear. Breathable fabric with a modern slim fit that pairs well with anything.",
    badge: "New"
  },
  {
    id: 17,
    name: "Women's Summer Dress",
    category: "Fashion",
    image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 54.99,
    oldPrice: 74.99,
    rating: 4.5,
    description: "Elegant floral summer dress with a flattering A-line silhouette. Lightweight breathable fabric, perfect for warm days.",
    badge: "New"
  },
  {
    id: 18,
    name: "Men's Chino Pants",
    category: "Fashion",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 49.99,
    oldPrice: 64.99,
    rating: 4.3,
    description: "Classic slim-fit chino pants made from stretch cotton. Versatile style that works from office to weekend.",
    badge: "Sale"
  },
  {
    id: 19,
    name: "Hoodie Sweatshirt",
    category: "Fashion",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 44.99,
    oldPrice: 59.99,
    rating: 4.4,
    description: "Ultra-soft fleece hoodie with kangaroo pocket. Perfect for layering in any season, available in multiple colors.",
    badge: "Hot"
  },

  // ——— SHOES ———
  {
    id: 3,
    name: "Running Shoes",
    category: "Shoes",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.3,
    description: "Comfortable running shoes with advanced cushioning technology. Lightweight design for maximum performance on any terrain.",
    badge: "New"
  },
  {
    id: 20,
    name: "Classic Sneakers",
    category: "Shoes",
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 64.99,
    oldPrice: 84.99,
    rating: 4.6,
    description: "Timeless low-top sneakers with cushioned insole and vulcanized sole. A wardrobe staple that goes with everything.",
    badge: "Hot"
  },
  {
    id: 21,
    name: "Leather Boots",
    category: "Shoes",
    image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 119.99,
    oldPrice: 149.99,
    rating: 4.7,
    description: "Premium full-grain leather boots with a durable rubber sole. Water-resistant and built to last for years.",
    badge: "Sale"
  },

  // ——— ACCESSORIES ———
  {
    id: 4,
    name: "Leather Backpack",
    category: "Accessories",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.6,
    description: "Stylish leather backpack perfect for work or travel. Premium craftsmanship with padded laptop sleeve.",
    badge: "Sale"
  },
  {
    id: 6,
    name: "Women's Handbag",
    category: "Accessories",
    image: "https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 129.99,
    oldPrice: 159.99,
    rating: 4.8,
    description: "Elegant leather handbag with multiple compartments. Timeless design with gold-tone hardware and adjustable strap.",
    badge: "Hot"
  },
  {
    id: 10,
    name: "Sunglasses",
    category: "Accessories",
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.3,
    description: "Stylish sunglasses with polarized UV400 lenses. Lightweight frame for all-day comfort and style.",
    badge: "Sale"
  },
  {
    id: 22,
    name: "Minimalist Watch",
    category: "Accessories",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 84.99,
    oldPrice: 109.99,
    rating: 4.5,
    description: "Elegant minimalist watch with genuine leather strap and sapphire crystal glass. Slim profile that suits any occasion.",
    badge: "New"
  },
  {
    id: 23,
    name: "Canvas Tote Bag",
    category: "Accessories",
    image: "https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 24.99,
    oldPrice: 34.99,
    rating: 4.2,
    description: "Eco-friendly canvas tote with reinforced handles and inner pocket. Perfect for groceries, beach, or everyday errands.",
    badge: "New"
  },

  // ——— HOME DECOR ———
  {
    id: 9,
    name: "Decorative Lamp",
    category: "Home Decor",
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.1,
    description: "Modern decorative lamp with warm ambient lighting and sleek minimalist design. Sets the perfect mood for any room.",
    badge: "Hot"
  },
  {
    id: 24,
    name: "Scented Candle Set",
    category: "Home Decor",
    image: "https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 34.99,
    oldPrice: 44.99,
    rating: 4.6,
    description: "Set of 3 hand-poured soy wax candles in calming lavender, vanilla, and sandalwood scents. Up to 50 hours burn time each.",
    badge: "New"
  },
  {
    id: 25,
    name: "Throw Pillow Set",
    category: "Home Decor",
    image: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 39.99,
    oldPrice: 54.99,
    rating: 4.4,
    description: "Set of 2 premium velvet throw pillows with removable covers. Adds an instant touch of luxury to any sofa or bed.",
    badge: "Sale"
  },

  // ——— BEAUTY ———
  {
    id: 8,
    name: "Skin Care Kit",
    category: "Beauty",
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.5,
    description: "Complete skincare kit with natural cleanser, toner, serum, and moisturizer for healthy glowing skin.",
    badge: "New"
  },
  {
    id: 12,
    name: "Perfume",
    category: "Beauty",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 69.99,
    oldPrice: 89.99,
    rating: 4.7,
    description: "Luxurious eau de parfum with notes of jasmine, sandalwood, and vanilla. Long-lasting fragrance for a lasting impression.",
    badge: "Hot"
  },
];

export default products;
