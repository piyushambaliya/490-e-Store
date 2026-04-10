import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <h3>490 E-Shop</h3>
          <p>Your one-stop shop for all your needs. Quality products at affordable prices with a premium shopping experience.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3>Categories</h3>
          <ul>
            <li><Link to="/shop?category=Electronics">Electronics</Link></li>
            <li><Link to="/shop?category=Fashion">Fashion</Link></li>
            <li><Link to="/shop?category=Shoes">Shoes</Link></li>
            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
            <li><Link to="/shop?category=Home Decor">Home Decor</Link></li>
            <li><Link to="/shop?category=Beauty">Beauty</Link></li>
          </ul>
        </div>
        
        <div>
          <h3>Contact Info</h3>
          <p>Email: info@490eshop.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 E-Commerce St, Shop City, SC 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2024 490 E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;