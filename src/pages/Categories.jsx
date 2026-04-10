import React from 'react';
import CategoryCard from '../components/CategoryCard';

const categories = [
  {
    title: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Smart devices, accessories and modern gadgets for your home and office.',
  },
  {
    title: 'Fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stylish outfits and accessories for every season.',
  },
  {
    title: 'Shoes',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Comfortable and trendy footwear for all occasions.',
  },
  {
    title: 'Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Chic accessories to elevate your everyday look.',
  },
  {
    title: 'Home Decor',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium decor pieces to make your space feel like home.',
  },
  {
    title: 'Beauty',
    image: 'https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Luxury beauty and self-care essentials.',
  },
];

const Categories = () => {
  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h2>Explore Categories</h2>
          <p>Discover curated collections across our store. Tap a category to start browsing.</p>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.title} title={cat.title} image={cat.image} description={cat.description} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Categories;
