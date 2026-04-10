import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import API_BASE_URL from '../api.config';
const categories = [
  {
    title: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Smart devices & modern gadgets.',
  },
  {
    title: 'Fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stylish outfits for every season.',
  },
  {
    title: 'Shoes',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Trendy footwear for all occasions.',
  },
  {
    title: 'Home Decor',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium pieces for your space.',
  },
  {
    title: 'Beauty',
    image: 'https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Luxury self-care essentials.',
  },
  {
    title: 'Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Chic extras for every outfit.',
  },
];

const testimonials = [
  {
    name: 'Aanya Patel',
    role: 'Verified Buyer',
    quote: "The design is so sleek — shopping feels like a luxury experience. I love how easy it is to find exactly what I need.",
    rating: 5,
  },
  {
    name: 'Liam Garcia',
    role: 'Verified Buyer',
    quote: "Fast delivery and great customer support. The quality of every product exceeded my expectations.",
    rating: 5,
  },
  {
    name: 'Sofia Nguyen',
    role: 'Verified Buyer',
    quote: "Product quality is top notch. I keep returning for new drops. The curated collections are amazing.",
    rating: 4,
  },
];

const trustFeatures = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $75' },
  { icon: '🔒', title: 'Secure Payment', desc: '100% protected' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day policy' },
  { icon: '💬', title: '24/7 Support', desc: 'Always here to help' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 8);
  const bestSellers = products.filter(p => p.rating >= 4.5).slice(0, 4);

  const offers = useMemo(
    () => [
      '🎉 Flash sale: 25% off sitewide — limited time only!',
      '🚚 Free shipping on orders $75+',
      '✨ New arrivals just dropped — shop the latest styles',
      '🔥 Buy 2 get 1 free on select items!',
    ],
    []
  );
  const [activeOffer, setActiveOffer] = useState(0);

  // Countdown timer (24 hours from now)
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffer((prev) => (prev + 1) % offers.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [offers.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) { seconds--; }
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < count ? '#f59e0b' : '#e5e7eb' }}>★</span>
    ));

  return (
    <main>
      {/* ——— HERO ——— */}
      <section className="hero">
        <div className="container">
          <div className="offer-rotator" aria-live="polite" key={activeOffer}>
            {offers[activeOffer]}
          </div>
          <h1>
            Discover Premium<br />
            <span>Products, Curated for You</span>
          </h1>
          <p>Shop the latest drops, hand-picked collections, and premium offers — all in one destination.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-accent cta">
              Shop Now →
            </Link>
            <Link to="/categories" className="btn btn-secondary cta">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ——— TRUST BAR ——— */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            {trustFeatures.map((f) => (
              <div className="trust-item" key={f.title}>
                <span className="trust-icon">{f.icon}</span>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CATEGORIES ——— */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Browse curated categories and jump straight to your next style upgrade.</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.title} title={cat.title} image={cat.image} description={cat.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— TRENDING PRODUCTS ——— */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Trending Now</h2>
            <p>Hand-picked products that our customers love right now.</p>
          </div>
          <div className="product-grid">
            {loading ? (
              <p>Loading curated products...</p>
            ) : featuredProducts.length === 0 ? (
              <p>Check back soon for new arrivals!</p>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/shop" className="btn btn-primary">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ——— FLASH SALE WITH COUNTDOWN ——— */}
      <section className="section">
        <div className="container">
          <div className="flash-sale">
            <div className="flash-sale-text">
              <h3>⚡ Flash Sale — Up to 50% Off</h3>
              <p>Grab the deals before they're gone. Time is ticking!</p>
            </div>
            <div className="countdown">
              <div className="countdown-item">
                <span className="number">{pad(countdown.hours)}</span>
                <span className="label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="number">{pad(countdown.minutes)}</span>
                <span className="label">Mins</span>
              </div>
              <div className="countdown-item">
                <span className="number">{pad(countdown.seconds)}</span>
                <span className="label">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— BEST SELLERS ——— */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Best Sellers</h2>
            <p>Our most loved products — tried, tested, and top-rated by customers.</p>
          </div>
          <div className="product-grid">
            {loading ? (
              <p>Searching for best sellers...</p>
            ) : bestSellers.length === 0 ? (
              <p>No reviews yet. Be the first to rate a product!</p>
            ) : (
              bestSellers.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ——— OFFER BANNER ——— */}
      <section className="section">
        <div className="container">
          <div className="offer-banner">
            <div className="offer-banner-content">
              <span className="offer-badge">Limited Time</span>
              <h2>Special Offer — 15% Off</h2>
              <p>Subscribe to our newsletter and enjoy an extra 15% off your next purchase. Don't miss out on exclusive deals.</p>
              <Link to="/contact" className="btn btn-accent" style={{ width: 'fit-content' }}>
                Claim Offer →
              </Link>
            </div>
            <div className="offer-banner-visual">
              <div className="offer-banner-badge-large">15%<br/><span style={{fontSize:'2rem', fontWeight:600}}>OFF</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— TESTIMONIALS ——— */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real feedback from real shoppers.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">{renderStars(t.rating)}</div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— NEWSLETTER ——— */}
      <section className="section">
        <div className="container">
          <div className="newsletter-card">
            <h2>Subscribe for Exclusive Drops</h2>
            <p>Join the list and be the first to know about new launches and limited editions.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-accent">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
