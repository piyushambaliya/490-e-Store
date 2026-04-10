import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import API_BASE_URL from '../api.config';

const Admin = () => {
  const { user, adminAccess, logout } = useAuth();
  const { items } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProductsList(data);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    load();
  }, [refreshKey]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    badge: '',
  });

  const totalRevenue = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const totalOrders = useMemo(() => Math.floor(Math.random() * 120) + 20, []);
  const totalCustomers = useMemo(() => Math.floor(Math.random() * 420) + 150, []);

  const categories = useMemo(() => {
    if (!Array.isArray(productsList)) return [];
    const cats = new Set(productsList.map((p) => p.category).filter(Boolean));
    return ['Electronics', 'Fashion', 'Shoes', 'Accessories', 'Home Decor', 'Beauty', ...Array.from(cats)].filter((v, i, a) => a.indexOf(v) === i);
  }, [productsList]);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(productsList)) return [];
    return productsList.filter((product) => {
      const productName = (product.name || '').toLowerCase();
      const productCategory = (product.category || '').toLowerCase();
      const st = searchTerm.toLowerCase();

      const matchesSearch = productName.includes(st) || productCategory.includes(st);
      const matchesCategory = activeCategory ? product.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [productsList, searchTerm, activeCategory]);

  const handleNewProductChange = (e) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, category, price, image } = newProduct;
    if (!name || !category || !price || !image) {
      showToast('Please fill in all required fields to add a product.', { type: 'error' });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          image,
          description: `Premium ${name} in ${category} category.`,
          countInStock: 10,
        }),
      });

      if (res.ok) {
        showToast(`${name} has been added to the catalog.`, { type: 'success' });
        setNewProduct({ name: '', category: '', price: '', image: '', badge: '' });
        setShowAddProduct(false);
        setRefreshKey(k => k + 1);
      } else {
        showToast('Failed to add product. Please try again.', { type: 'error' });
      }
    } catch (err) {
      showToast('Network error while adding product.', { type: 'error' });
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('Product removed from catalog.', { type: 'success' });
        setRefreshKey(k => k + 1);
      } else {
        showToast('Failed to delete product.', { type: 'error' });
      }
    } catch (err) {
      showToast('Network error while deleting product.', { type: 'error' });
    }
  };

  if (!adminAccess) {
    return (
      <main className="section" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Restricted Access</h2>
          <p>You need admin credentials to access this page.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1>Admin Panel</h1>
            <p style={{ color: 'var(--muted)' }}>Welcome back, {user?.email}</p>
            <p style={{ color: 'var(--muted)', maxWidth: 450, marginTop: 10 }}>
              Use the tools below to manage inventory, view quick store stats, and keep the shop running smoothly.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('dashboard');
                setShowAddProduct(false);
              }}
            >
              Dashboard
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('products');
                setShowAddProduct(false);
              }}
            >
              Products
            </button>
            <button className="btn btn-danger" onClick={() => { logout(); navigate('/'); }}>
              Logout
            </button>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          {activeTab === 'dashboard' && (
            <>
              <div className="admin-stats">
                <div className="stat-card">
                  <h4>Total Revenue</h4>
                  <div className="number">${totalRevenue.toFixed(2)}</div>
                </div>
                <div className="stat-card">
                  <h4>Total Orders</h4>
                  <div className="number">{totalOrders}</div>
                </div>
                <div className="stat-card">
                  <h4>Total Customers</h4>
                  <div className="number">{totalCustomers}</div>
                </div>
                <div className="stat-card">
                  <h4>Total Products</h4>
                  <div className="number">{loading ? '...' : productsList.length}</div>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <h3>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginTop: '18px' }}>
                  <div className="product-card" style={{ padding: '18px' }}>
                    <h4>Manage Orders</h4>
                    <p style={{ color: 'var(--muted)' }}>View and update recent orders. This is a placeholder for your future order management tools.</p>
                    <button className="btn btn-primary" type="button" onClick={() => showToast('Order management coming soon!', { type: 'success' })}>
                      View Orders
                    </button>
                  </div>
                  <div className="product-card" style={{ padding: '18px' }}>
                    <h4>Customer Insights</h4>
                    <p style={{ color: 'var(--muted)' }}>Track customer behavior, trends, and top-reviewed products.</p>
                    <button className="btn btn-primary" type="button" onClick={() => showToast('Analytics coming soon!', { type: 'success' })}>
                      View Insights
                    </button>
                  </div>
                  <div className="product-card" style={{ padding: '18px' }}>
                    <h4>Quick Links</h4>
                    <p style={{ color: 'var(--muted)' }}>Jump directly to the product catalog or the site storefront.</p>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate('/shop')}>
                      Go to Store
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '18px' }}>
                <div>
                  <h2>Product Catalog</h2>
                  <p style={{ color: 'var(--muted)', maxWidth: 520 }}>
                    Add new items to the store, update pricing, and remove products as needed.
                  </p>
                </div>
                <button className="btn btn-primary" type="button" onClick={() => setShowAddProduct(true)}>
                  Add New Product
                </button>
              </div>

              {!showAddProduct && (
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <input
                      type="text"
                      placeholder="Search by name or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ width: '200px' }}>
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {showAddProduct ? (
                <div className="form-card" style={{ padding: '24px', maxWidth: '720px' }}>
                  <h3>Add New Product</h3>
                  <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: '16px' }}>
                    <div className="form-group">
                      <label>Name</label>
                      <input name="name" value={newProduct.name} onChange={handleNewProductChange} placeholder="Product name" required />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <input name="category" value={newProduct.category} onChange={handleNewProductChange} placeholder="Category" required />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input name="price" type="number" min="0" step="0.01" value={newProduct.price} onChange={handleNewProductChange} placeholder="0.00" required />
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input name="image" value={newProduct.image} onChange={handleNewProductChange} placeholder="https://..." required />
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button className="btn btn-primary" type="submit">
                        Save Product
                      </button>
                      <button className="btn btn-secondary" type="button" onClick={() => setShowAddProduct(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '18px' }}>
                  {loading ? (
                    <div className="empty-state" style={{ padding: '40px' }}>
                      <p>Loading catalog...</p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="empty-state" style={{ padding: '40px' }}>
                      <p>No products match your search/filter criteria.</p>
                    </div>
                  ) : (
                    filteredProducts.map((product) => (
                    <div key={product._id || product.id} className="product-card" style={{ padding: '18px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover', boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}
                        />
                        <div>
                          <h4 style={{ marginBottom: '6px' }}>{product.name}</h4>
                          <p style={{ marginBottom: '6px', color: 'var(--muted)' }}>Category: {product.category}</p>
                          <p style={{ marginBottom: '0' }}>${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button className="btn btn-secondary" type="button" onClick={() => showToast('Product editing is not yet available.', { type: 'info' })}>
                          Edit
                        </button>
                        <button className="btn btn-danger" type="button" onClick={() => handleDeleteProduct(product._id || product.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Admin;
