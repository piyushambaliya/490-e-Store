import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Thank you! We received your message and will be in touch soon.', { type: 'success' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Have a question? We’re here to help.</p>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="container">

        <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: '1.1fr 1fr' }}>
          <div className="form-card">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: '18px' }}>
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="What is this about?" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us what you need..."
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>

          <div className="form-card" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <h3>Contact Info</h3>
            <div style={{ marginTop: '22px', display: 'grid', gap: '18px' }}>
              <div>
                <strong>Email</strong>
                <p style={{ margin: '8px 0 0' }}>info@490eshop.com</p>
              </div>
              <div>
                <strong>Phone</strong>
                <p style={{ margin: '8px 0 0' }}>+1 (555) 123-4567</p>
              </div>
              <div>
                <strong>Address</strong>
                <p style={{ margin: '8px 0 0' }}>123 E-Commerce Street<br />Shop City, SC 12345</p>
              </div>
              <div>
                <strong>Business Hours</strong>
                <p style={{ margin: '8px 0 0' }}>Mon–Fri: 9am - 6pm<br />Sat: 10am - 4pm<br />Sun: Closed</p>
              </div>
            </div>

            <div style={{ marginTop: '26px' }}>
              <h4>Our Location</h4>
              <div
                style={{
                  marginTop: '12px',
                  height: '220px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, rgba(42,142,247,0.08), rgba(32,201,151,0.08))',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--muted)',
                  border: '1px solid rgba(31,37,50,0.08)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 8px', display: 'block' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Interactive Map Integration
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Contact;
