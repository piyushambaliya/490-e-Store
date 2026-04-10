import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { showToast } = useToast();

  const handleRemove = (id) => {
    removeFromCart(id);
    showToast('Item removed from cart', { type: 'error' });
  };

  const handleUpdateQuantity = (id, qty) => {
    updateQuantity(id, qty);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Your cart is empty</h2>
          <p>Browse the shop and add something special to your cart.</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h2>Shopping Cart</h2>
        <p className="section-subtitle">Review your selected items and checkout when you're ready.</p>

        <div className="cart-page">
          <div className="cart-details">
            <div>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>

            <aside className="cart-summary">
              <h3>Summary</h3>
              <p>Total items: <strong>{totalItems}</strong></p>
              <div className="total">${getTotalPrice().toFixed(2)}</div>
              <button className="btn btn-primary" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <Link to="/shop" className="btn btn-secondary" style={{ width: '100%', marginTop: '12px' }}>
                Continue Shopping
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
