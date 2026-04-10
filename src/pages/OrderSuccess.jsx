import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'ORD-' + Math.random().toString(36).substring(7).toUpperCase();

  return (
    <main className="section" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ marginBottom: '16px' }}>Order Placed Successfully!</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
          Thank you for your purchase. Your order <strong>#{orderId}</strong> has been received and is being processed.
          A confirmation email will be sent to your inbox shortly.
        </p>
        
        <div className="form-card" style={{ padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
          <h3>Order Details</h3>
          <p style={{ margin: '8px 0' }}><strong>Status:</strong> <span style={{ color: 'var(--accent)' }}>Paid & Processing</span></p>
          <p style={{ margin: '8px 0' }}><strong>Delivery:</strong> Expected in 3-5 business days</p>
          <p style={{ margin: '8px 0' }}><strong>Order ID:</strong> {orderId}</p>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link to="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
