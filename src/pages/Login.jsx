import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { login, user, adminAccess } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const { success, message, isAdmin } = await login(email.trim(), password);
    
    if (!success && message.includes('register')) {
      showToast('Account not found. Please register first.', { type: 'warning' });
    } else {
      showToast(message, { type: success ? 'success' : 'error' });
    }

    if (success) {
      setTimeout(() => {
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/shop');
        }
      }, 850);
    }
  };

  return (
    <main className="section" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="form-card" style={{ padding: '48px' }}>
          <div className="auth-hero">
            <img
              src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Secure login"
            />
          </div>
          <h1 style={{ marginBottom: '12px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--gray-500)', marginBottom: '24px' }}>
            Use your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="hello@domain.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: 'var(--gray-500)',
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="#" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '18px' }}>
              Sign In
            </button>

            <div style={{ textAlign: 'center', color: 'var(--gray-500)', marginBottom: '18px' }}>
              or continue with
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              <button type="button" className="btn btn-secondary">
                Google
              </button>
              <button type="button" className="btn btn-secondary">
                Facebook
              </button>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--gray-500)' }}>
              Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign up</Link>
            </div>

            {adminAccess && (
              <div style={{ marginTop: '24px', padding: '18px', borderRadius: '16px', background: 'rgba(32, 201, 151, 0.08)' }}>
                <strong>Admin Panel Access Granted</strong>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
