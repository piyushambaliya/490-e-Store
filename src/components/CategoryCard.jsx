import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, image, description }) => {
  return (
    <Link to={`/shop?category=${encodeURIComponent(title)}`} className="category-card">
      <div className="category-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="category-content">
        <h3>{title}</h3>
        <span className="category-cta">
          Explore →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
