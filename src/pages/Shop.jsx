import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import API_BASE_URL from '../api.config';

const categoryOptions = ['Electronics', 'Fashion', 'Shoes', 'Accessories', 'Home Decor', 'Beauty'];

const buildQuery = ({ search, category, minPrice, maxPrice, rating, sort }) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  if (minPrice !== undefined && minPrice !== null) params.set('minPrice', String(minPrice));
  if (maxPrice !== undefined && maxPrice !== null) params.set('maxPrice', String(maxPrice));
  if (rating) params.set('rating', String(rating));
  if (sort) params.set('sort', sort);
  return params.toString();
};

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getQuery = useCallback((search) => {
    const p = new URLSearchParams(search);
    return {
      search: p.get('search') || '',
      category: p.get('category') || '',
      minPrice: Number(p.get('minPrice') || 0),
      maxPrice: Number(p.get('maxPrice') || 5000),
      rating: Number(p.get('rating') || 0),
      sort: p.get('sort') || 'default',
    };
  }, []);

  const [filters, setFilters] = useState(() => getQuery(location.search));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.minPrice > 0) count++;
    if (filters.maxPrice < 5000) count++;
    if (filters.rating > 0) count++;
    return count;
  }, [filters]);

  useEffect(() => {
    setFilters(getQuery(location.search));
  }, [location.search, getQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [refreshKey]);

  const filteredProducts = useMemo(() => {
    const term = filters.search.toLowerCase().trim();

    let items = Array.isArray(products) ? products.filter((product) => {
      const productName = (product.name || '').toLowerCase();
      const productCategory = (product.category || '').toLowerCase();
      const productDesc = (product.description || '').toLowerCase();

      const matchesSearch = term
        ? productName.includes(term) ||
          productCategory.includes(term) ||
          productDesc.includes(term)
        : true;

      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesPrice = (product.price || 0) >= filters.minPrice && (product.price || 0) <= filters.maxPrice;
      const matchesRating = filters.rating ? (product.rating || 0) >= filters.rating : true;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    }) : [];

    switch (filters.sort) {
      case 'price-low':
        items.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        items.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        break;
    }

    return items;
  }, [products, filters]);

  const updateFilters = (next) => {
    setFilters((prev) => {
      const updated = { ...prev, ...next };
      const queryString = buildQuery(updated);
      navigate(`/shop?${queryString}`);
      return updated;
    });
  };

  const resetFilters = () => {
    setFilters({ search: '', category: '', minPrice: 0, maxPrice: 5000, rating: 0, sort: 'default' });
    setRefreshKey(k => k + 1);
    navigate('/shop');
  };

  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h2>Shop</h2>
          <p>Browse our full catalog, filter what you love, and discover new favorites.</p>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="container">

        <div className={`shop-layout ${isFilterOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
            <div className="filter-header">
              <h3>Filters</h3>
              <button className="btn btn-secondary" onClick={resetFilters} type="button">
                Reset
              </button>
            </div>

            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search products"
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select value={filters.category} onChange={(e) => updateFilters({ category: e.target.value })}>
                <option value="">All Categories</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-range">
                <input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
                />
                <span>—</span>
                <input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Rating</label>
              <select value={filters.rating} onChange={(e) => updateFilters({ rating: Number(e.target.value) })}>
                <option value={0}>All Ratings</option>
                <option value={4}>4+ Stars</option>
                <option value={3}>3+ Stars</option>
                <option value={2}>2+ Stars</option>
                <option value={1}>1+ Star</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort</label>
              <select value={filters.sort} onChange={(e) => updateFilters({ sort: e.target.value })}>
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </aside>

          <section className="shop-content">
            <div className="shop-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  className={`btn ${isFilterOpen ? 'btn-primary' : 'btn-secondary'} filter-toggle-btn`}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  type="button"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                  {activeFiltersCount > 0 && <span className="filter-count-badge">{activeFiltersCount}</span>}
                </button>
                <p className="shop-count">
                  {loading ? 'Loading...' : `${filteredProducts.length} products found`}
                </p>
              </div>
              <p className="shop-summary">Showing products based on your filters.</p>
            </div>

            {activeFiltersCount > 0 && (
              <div className="active-filters-bar">
                {filters.search && (
                  <div className="filter-chip">
                    Search: {filters.search}
                    <button type="button" onClick={() => updateFilters({ search: '' })}>×</button>
                  </div>
                )}
                {filters.category && (
                  <div className="filter-chip">
                    Category: {filters.category}
                    <button type="button" onClick={() => updateFilters({ category: '' })}>×</button>
                  </div>
                )}
                {(filters.minPrice > 0 || filters.maxPrice < 5000) && (
                  <div className="filter-chip">
                    Price: ${filters.minPrice} - ${filters.maxPrice}
                    <button type="button" onClick={() => updateFilters({ minPrice: 0, maxPrice: 5000 })}>×</button>
                  </div>
                )}
                {filters.rating > 0 && (
                  <div className="filter-chip">
                    Rating: {filters.rating}+ Stars
                    <button type="button" onClick={() => updateFilters({ rating: 0 })}>×</button>
                  </div>
                )}
                <button className="clear-all-link" onClick={resetFilters}>Clear All</button>
              </div>
            )}

            {loading ? (
              <div className="empty-state">
                <h3>Loading Products...</h3>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <h3>No products match your filters.</h3>
                <p>Try adjusting the search or filter options above.</p>
                <button className="btn btn-primary" onClick={resetFilters} type="button">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      </div>
    </main>
  );
};

export default Shop;
