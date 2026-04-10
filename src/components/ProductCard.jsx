import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const price = useMemo(() => product.price.toFixed(2), [product.price]);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart.`, { type: 'success' });
  };

  const renderStars = (rating) => {
    const full = Math.round(rating);
    return (
      <span className="stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{ color: i < full ? '#f59e0b' : '#e5e7eb' }}>★</span>
        ))}
      </span>
    );
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product._id || product.id}`} className="product-image">
        {product.badge && (
          <span className={`badge ${product.badge === 'Sale' ? 'badge-sale' : ''}`}>
            {product.badge}
          </span>
        )}
        <button
          className="wishlist-btn"
          onClick={(e) => { e.preventDefault(); showToast('Added to wishlist!', { type: 'success' }); }}
          aria-label="Add to wishlist"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className="content">
        <h3>{product.name}</h3>
        <div className="rating">
          {renderStars(product.rating)}
          <span style={{ marginLeft: '4px' }}>{product.rating}</span>
        </div>
        <div className="price">
          <span>${price}</span>
          {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
        </div>
        <button className="btn btn-primary" type="button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
