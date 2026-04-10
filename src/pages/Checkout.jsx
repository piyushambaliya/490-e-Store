import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API_BASE_URL from '../api.config';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const subtotal = getTotalPrice();
  const shippingPrice = subtotal > 1000 ? 0 : 100;
  const taxPrice = Number((0.15 * subtotal).toFixed(2));
  const totalPrice = subtotal + shippingPrice + taxPrice;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please login to place an order.', { type: 'error' });
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      showToast('Your cart is empty.', { type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        user: user._id,
        orderItems: items,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${user.token}`, // Standard auth (optional if private logic is on backend)
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast('Order placed successfully!', { type: 'success' });
        clearCart();
        navigate('/order-success', { state: { orderId: data._id } });
      } else {
        showToast(data.message || 'Failed to place order.', { type: 'error' });
      }
    } catch (err) {
      showToast('Network error while placing order.', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="section">
        <div className="container" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <h2>Your Cart is Empty</h2>
          <p>You haven't added any products to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section" style={{ background: 'var(--gray-50)', minHeight: 'calc(100vh - 80px)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <h1 style={{ marginBottom: '32px' }}>Checkout</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', alignItems: 'start' }}>
          {/* Main Form */}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
            
            {/* Shipping Section */}
            <div className="form-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 600 }}>1</span>
                <h3>Shipping Address</h3>
              </div>
              
              <div style={{ display: 'grid', gap: '18px' }}>
                <div className="form-group">
                  <label>Full Address</label>
                  <input name="address" value={shippingAddress.address} onChange={handleInputChange} required placeholder="123 Street Name" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div className="form-group">
                    <label>City</label>
                    <input name="city" value={shippingAddress.city} onChange={handleInputChange} required placeholder="Mumbai" />
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} required placeholder="400001" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input name="country" value={shippingAddress.country} onChange={handleInputChange} required placeholder="India" />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="form-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 600 }}>2</span>
                <h3>Payment Details (Simulated)</h3>
              </div>
              <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Enter dummy details to complete your purchase.</p>
              
              <div style={{ display: 'grid', gap: '18px' }}>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input placeholder="Full Name on Card" required />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input placeholder="0000 0000 0000 0000" type="text" maxLength="19" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input placeholder="MM/YY" maxLength="5" required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input placeholder="123" maxLength="3" type="password" required />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ height: '60px', fontSize: '1.1rem', fontWeight: 600 }} disabled={loading}>
              {loading ? 'Processing Order...' : `Place Order • $${totalPrice.toFixed(2)}`}
            </button>
          </form>

          {/* Checkout Summary Card */}
          <aside className="product-card" style={{ padding: '24px', position: 'sticky', top: '100px', background: 'white', borderRadius: '24px', border: '1px solid var(--gray-200)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
            <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
            <div style={{ display: 'grid', gap: '16px', maxHeight: '300px', overflowY: 'auto', marginBottom: '24px', paddingRight: '4px' }}>
              {items.map((item) => (
                <div key={item.id || item._id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 50, height: 50, borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{item.quantity} x ${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '20px', display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Shipping</span>
                <span>{shippingPrice === 0 ? <span style={{ color: 'var(--success)', fontWeight: 600 }}>Free</span> : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Tax (GST 15%)</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
