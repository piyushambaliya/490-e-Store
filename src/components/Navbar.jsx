import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, logout, adminAccess } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    navigate(`/shop?${params.toString()}`);
    setMobileOpen(false);
  };

  const toggleMobile = () => setMobileOpen((open) => !open);

  const navLinks = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/shop', label: 'Shop' },
      { to: '/categories', label: 'Categories' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
    []
  );

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          490 E-Shop<span className="logo-dot">.</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={toggleMobile}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <div className={`nav-inner ${mobileOpen ? 'open' : ''}`}>
          <form className="search-bar" onSubmit={handleSearchSubmit} role="search">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            {adminAccess && (
              <li>
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="admin-link">
                  Admin
                </Link>
              </li>
            )}
          </ul>

          <div className="nav-actions">
            {/* Wishlist */}
            <Link to="/shop" className="nav-icon-btn" title="Wishlist" onClick={() => setMobileOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="nav-icon-btn" title="Cart" onClick={() => setMobileOpen(false)} style={{ position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {getTotalItems() > 0 && <span className="count">{getTotalItems()}</span>}
            </Link>

            {/* Profile / Auth */}
            {user ? (
              <button className="btn btn-primary" type="button" onClick={logout} style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary" onClick={() => setMobileOpen(false)} style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-accent" onClick={() => setMobileOpen(false)} style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
