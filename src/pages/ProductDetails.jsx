import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import API_BASE_URL from '../api.config';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  React.useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        const productData = await res.json();
        
        if (productData.message === 'Product not found') {
          setProduct(null);
          setLoading(false);
          return;
        }
        
        setProduct(productData);

        const allRes = await fetch(`${API_BASE_URL}/products`);
        const allData = await allRes.json();
        
        const related = allData
          .filter((item) => item.category === productData.category && item._id !== productData._id)
          .slice(0, 4);

        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        setProduct(null);
        setLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  if (loading) {
    return (
      <main className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Product not found</h2>
          <p>We couldn't find the product you are looking for.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
    showToast(`${quantity} ${product.name} added to cart`, { type: 'success' });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const renderStars = (value) => {
    const gold = Math.round(value);
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} style={{ color: index < gold ? '#ffb703' : '#dee2e3' }}>
        ★
      </span>
    ));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="product-details">
          <div>
            <img src={product.image} alt={product.name} />
          </div>

          <div className="info">
            {product.badge && <span className="badge">{product.badge}</span>}
            <h1>{product.name}</h1>
            <div className="rating">
              {renderStars(product.rating)}
              <span style={{ marginLeft: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                {product.rating.toFixed(1)} / 5
              </span>
            </div>

            <div className="price">
              ${product.price.toFixed(2)}
              {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
            </div>

            <p className="description">{product.description}</p>

            <div className="quantity-control">
              <button type="button" onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}>
                –
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              />
              <button type="button" onClick={() => setQuantity((qty) => qty + 1)}>
                +
              </button>
            </div>

            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-secondary" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <section className="related-products">
          <h2>Related Products</h2>
          <p className="section-subtitle">More items you might like from this collection.</p>
          <div className="product-grid">
            {relatedProducts.slice(0, 4).map((related) => (
              <ProductCard key={related._id || related.id} product={related} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
