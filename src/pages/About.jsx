import React from 'react';

const stats = [
  { number: '10K+', label: 'Happy Customers' },
  { number: '2K+', label: 'Products' },
  { number: '50+', label: 'Categories' },
  { number: '99%', label: 'Satisfaction' },
];

const values = [
  {
    icon: '✨',
    title: 'Curated Collections',
    desc: 'Each product is handpicked to ensure quality, style, and value. We partner directly with trusted brands.',
  },
  {
    icon: '🔒',
    title: 'Fast & Secure Checkout',
    desc: 'Your data is protected with enterprise-grade encryption. Shop with complete peace of mind.',
  },
  {
    icon: '💬',
    title: 'Responsive Support',
    desc: 'Our team is available around the clock to help you with any order or product questions.',
  },
  {
    icon: '🚀',
    title: 'Continuous Innovation',
    desc: "We're constantly improving the experience with new features, faster shipping, and better products.",
  },
];

const About = () => {
  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h2>About 490 E-Shop</h2>
          <p>Designed for people who appreciate quality, simplicity, and a curated shopping experience.</p>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="container">

        {/* Stats Bar */}
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="about-sections">
          <div className="about-block">
            <h3>Our Mission</h3>
            <p>
              To deliver an intuitive shopping experience wrapped in a premium UI. We combine thoughtful design
              with a curated selection of products so every visit feels like discovering something new.
            </p>
          </div>
          <div className="about-block">
            <h3>Our Vision</h3>
            <p>
              To redefine how people perceive online shopping by blending luxury aesthetics with performance and
              customer-first service. We believe every click should spark joy.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <section style={{ marginTop: '80px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.5rem', fontWeight: 700 }}>Why Choose Us</h3>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
    </main>
  );
};

export default About;
