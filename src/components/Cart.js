import React, { useState } from "react";
import { ArrowLeft, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../CartContext";

const Cart = ({ setView, appliedDiscount, setAppliedDiscount, onProceedToPayment }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (code === "SAVE10") {
      setAppliedDiscount(0.1); // 10% discount
      alert("Coupon applied! 10% discount added.");
    } else if (code === "SAVE20") {
      setAppliedDiscount(0.2); // 20% discount
      alert("Coupon applied! 20% discount added.");
    } else if (code === "WELCOME") {
      setAppliedDiscount(0.15); // 15% discount
      alert("Welcome coupon applied! 15% discount added.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  const finalTotal = cartTotal * (1 - appliedDiscount);
  return (
    <div className="container">
      <header className="header">
        <button className="buy-button" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setView("shop")}>
          <ArrowLeft size={18} /> Back to Shop
        </button>
        <h1>Your Shopping Cart</h1>
      </header>

      {cart.length === 0 ? (
        <div className="no-results">
          <ShoppingCart size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
          <h3>Your cart is empty</h3>
          <button className="buy-button" style={{ width: 'auto', marginTop: '1rem' }} onClick={() => setView("shop")}>Start Shopping</button>
        </div>
      ) : (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#666' }}>₹{item.price} each</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '6px' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.2rem 0.6rem', border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
                  <span style={{ padding: '0 0.5rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.2rem 0.6rem', border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}

          {/* Coupon Section */}
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Apply Coupon Code</h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                placeholder="Enter coupon code (e.g., SAVE10, WELCOME)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
              <button
                onClick={applyCoupon}
                style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Apply
              </button>
            </div>
            {appliedDiscount > 0 && (
              <p style={{ color: '#16a34a', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                Coupon applied: {appliedDiscount * 100}% discount
              </p>
            )}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ margin: '0', color: '#6b7280' }}>Subtotal: ₹{cartTotal}</p>
              {appliedDiscount > 0 && (
                <p style={{ margin: '0.5rem 0', color: '#16a34a' }}>
                  Discount ({appliedDiscount * 100}%): -₹{(cartTotal * appliedDiscount).toFixed(2)}
                </p>
              )}
            </div>
            <h2 style={{ marginBottom: '1.5rem' }}>Total: ₹{finalTotal.toFixed(2)}</h2>
            <button className="buy-button" style={{ fontSize: '1.1rem' }} onClick={onProceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
