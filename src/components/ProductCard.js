import React from "react";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="product-price" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span style={{ textDecoration: 'line-through', color: '#6b7280' }}>₹{product.originalPrice}</span>
                    <span style={{ background: '#ef4444', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{product.discount}% OFF</span>
                  </>
                )}
              </div>
              <button className="buy-button" onClick={() => addToCart(product)}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
    </div>
  );
};

export default ProductCard;
