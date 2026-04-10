import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Signup = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', { type: 'error' });
      return;
    }

    const { success, message } = await register(formData.name, formData.email, formData.password);
    
    if (success) {
      showToast(message, { type: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 850);
    } else {
      showToast(message, { type: 'error' });
    }
  };

  return (
    <main className="section" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="form-card">
          <div className="auth-hero">
            <img
              src="https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Join our community"
            />
          </div>
          <h1 style={{ marginBottom: '10px' }}>Create Account</h1>
          <p style={{ color: 'var(--gray-500)', marginBottom: '26px' }}>
            Start your journey with 490 E-Shop and unlock exclusive deals.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="hello@domain.com" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Sign Up
            </button>

            <div style={{ textAlign: 'center', marginTop: '22px', color: 'var(--gray-500)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                Sign in
              </Link>
            </div>

            <div style={{ marginTop: '26px', textAlign: 'center' }}>
              <button type="button" className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px' }}>
                Sign up with Google
              </button>
              <button type="button" className="btn btn-secondary" style={{ width: '100%' }}>
                Sign up with Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
