import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (delta) => {
    const nextQty = Math.max(1, item.quantity + delta);
    onUpdateQuantity(item.id, nextQty);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-title">
          <h3>{item.name}</h3>
          <span className="cart-item-category">{item.category}</span>
        </div>
        <div className="cart-item-price">
          <span className="price">${item.price.toFixed(2)}</span>
          <span className="subtotal">${(item.price * item.quantity).toFixed(2)}</span>
        </div>

        <div className="cart-item-actions">
          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(-1)} aria-label="Decrease quantity">-</button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.id, Math.max(1, Number(e.target.value) || 1))}
            />
            <button onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">+</button>
          </div>
          <button className="btn btn-danger" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
