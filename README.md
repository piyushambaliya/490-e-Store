# 490 E-Shop

A modern, premium e-commerce website built with React.js, featuring an Amazon-inspired design and comprehensive shopping functionality.

## ✨ Features

- **Premium UI/UX**: Modern design with gradients, animations, and smooth transitions
- **Rotating Offer Banner**: Eye-catching animated banner with special offers
- **Product Catalog**: Advanced filtering, sorting, and search functionality
- **Amazon-Style Cart**: Detailed cart with shipping calculations and recommendations
- **Admin Dashboard**: Complete admin panel for product and order management
- **Enhanced Authentication**: Modern login/signup forms with social options
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **High Contrast**: Fixed visibility issues with proper color schemes

## 🛠️ Tech Stack

- **Frontend**: React.js with functional components and hooks
- **Routing**: React Router DOM
- **State Management**: Context API for cart management
- **Styling**: Advanced CSS with animations and gradients
- **Build Tool**: Vite
- **Icons**: Unicode emojis and custom styling

## 📁 Project Structure

```
src/
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ProductCard.jsx
├── pages/
│   ├── About.jsx
│   ├── Admin.jsx          # New admin dashboard
│   ├── Cart.jsx           # Enhanced Amazon-style cart
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx          # Enhanced modern login
│   ├── ProductDetails.jsx
│   ├── Shop.jsx
│   └── Signup.jsx
├── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── styles/
│   └── main.css           # Enhanced with animations
├── assets/
│   └── images/
├── App.jsx
└── main.jsx
```

## 🚀 Installation & Setup

1. **Navigate to the project directory**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** and visit `http://localhost:5173`

## 🎨 Design Highlights

### Modern UI Elements
- Gradient backgrounds and buttons
- Smooth hover animations
- Floating elements and shadows
- Rotating color offer banner
- Glassmorphism navbar with backdrop blur

### Amazon-Inspired Cart
- Detailed product information
- Quantity dropdown selector
- Shipping cost calculations
- Order summary with tax
- "Frequently bought together" section
- Save for later functionality

### Admin Dashboard
- Dashboard overview with statistics
- Product management table
- Order management interface
- Customer analytics (UI ready)
- Sidebar navigation

## 📱 Pages & Features

### Home Page
- Animated hero section with floating background
- Rotating offer banner
- Category showcase with hover effects
- Featured products with premium cards
- Customer testimonials
- Newsletter signup

### Shop Page
- Advanced filtering sidebar
- Sort options (price, rating, newest)
- Responsive product grid
- Search functionality in navbar

### Product Details Page
- Large product images with zoom effect
- Detailed specifications
- Customer reviews section
- Related products carousel
- Quantity selector and add to cart

### Cart Page (Amazon-Style)
- Product thumbnails and details
- Quantity dropdown
- Price calculations with shipping
- "Eligible for FREE Shipping" indicators
- Recommended products section
- Empty cart state with helpful links

### Admin Dashboard
- Statistics cards (revenue, orders, customers, products)
- Recent orders table
- Product management with edit/delete actions
- Order status management
- Analytics placeholders

### Authentication Pages
- Modern card-based design
- Social login buttons
- Password visibility toggle
- Form validation
- Admin login link

## 🎯 Key Improvements

1. **Performance**: Optimized CSS and React components
2. **Visibility**: Fixed white text contrast issues
3. **Animations**: Added smooth transitions and hover effects
4. **Offer Banner**: Rotating gradient banner for promotions
5. **Cart Experience**: Amazon-like detailed cart interface
6. **Admin Panel**: Complete management dashboard
7. **Responsive Design**: Enhanced mobile experience

## 🔧 Customization

### Colors and Themes
Modify gradients and colors in `src/styles/main.css`

### Adding Products
Update `src/data/products.js` with new product data

### Admin Features
Extend `src/pages/Admin.jsx` with additional management features

### Animations
Customize animations in the CSS file

## 📊 Sample Data

12 products across 6 categories with realistic pricing and high-quality images.

## 🌟 Premium Features

- Backdrop blur navbar
- Gradient animations
- Floating background elements
- Advanced shadows and depth
- Smooth micro-interactions
- Professional typography

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎓 Academic Project

This enhanced version is perfect for college submissions, demonstrating advanced React concepts, modern CSS techniques, and professional UI/UX design principles.

## 📄 License

Educational purposes only.

## Installation & Setup

1. **Clone or download the project**
2. **Navigate to the project directory**
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Pages & Features

### Home Page
- Hero banner with call-to-action
- Category showcase
- Featured products
- Special offers
- Customer testimonials
- Newsletter signup

### Shop Page
- Product grid with pagination-ready structure
- Filter sidebar (category, price, rating)
- Sort options (price, rating, newest)
- Responsive product cards

### Product Details Page
- Large product images
- Detailed descriptions
- Pricing with discounts
- Rating system
- Quantity selector
- Add to cart functionality
- Related products

### Cart Page
- Cart items display
- Quantity updates
- Item removal
- Total calculation
- Checkout button (UI ready)

### Authentication Pages
- Login form with validation
- Signup form with password confirmation
- Social login buttons (UI only)

### About & Contact Pages
- Company information
- Contact form
- Contact details
- Map placeholder

## Sample Data

The application includes 12 sample products across 6 categories:
- Electronics (Headphones, Smart Watch, Bluetooth Speaker, Laptop Stand)
- Fashion (Men's Shirt)
- Shoes (Running Shoes)
- Accessories (Backpack, Handbag, Sunglasses)
- Home Decor (Decorative Lamp)
- Beauty (Skin Care Kit, Perfume)

## Customization

### Adding New Products
Edit `src/data/products.js` to add more products following the existing structure.

### Styling
Modify `src/styles/main.css` to customize colors, fonts, and layout.

### Functionality
- Cart state is managed via Context API
- Add backend integration for authentication, payments, and data persistence
- Implement search functionality
- Add product image uploads
- Integrate with payment gateways

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a student project for demonstration purposes. Feel free to fork and modify for your own use.

## License

This project is for educational purposes only.
