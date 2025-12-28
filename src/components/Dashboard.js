import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import ProductCard from "./ProductCard";
import { useCart } from "../CartContext";

const Dashboard = ({ filteredProducts, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, setView, onProfileClick, onLogout, user }) => {
  const { addToCart, cart } = useCart();
  return (
    <div className="container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ textAlign: 'left' }}>
            <h1>Stationery Shop</h1>
            <p>Premium quality tools for your creativity</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user && (
            <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
              <p style={{ margin: '0', fontWeight: 'bold' }}>Welcome, {user.name}!</p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={onProfileClick}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.8rem'
                  }}
                >
                  Update Profile
                </button>
                <button
                  onClick={onLogout}
                  style={{
                    background: '#dc2626',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          <button onClick={() => setView("cart")} style={{ position: 'relative', background: 'var(--white)', border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
              <ShoppingCart size={24} />
              {cart.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{cart.reduce((a,b)=>a+b.quantity, 0)}</span>}
          </button>
        </div>
      </header>

      <div className="controls">
        <div className="search-container">
          <Search size={20} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
          <input type="text" placeholder="Search products..." className="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
          <option value="all">All Categories</option>
          <option value="book">Books</option>
          <option value="pen">Pens</option>
          <option value="pencil">Pencils</option>
          <option value="scale">Scales</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
