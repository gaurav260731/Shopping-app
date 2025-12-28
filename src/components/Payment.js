import React, { useState } from "react";
import { CreditCard, ArrowLeft, CheckCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "../CartContext";

const Payment = ({ setView, setAppliedDiscount, handleRazorpayPayment, handleUPIPayment }) => {
  const { cartTotal } = useCart();
  const [userUpiId, setUserUpiId] = useState("");
  const ownerUpiId = "shanygaurav@okaxis";
  const name = "Stationery Shop";
  const upiUrl = `upi://pay?pa=${ownerUpiId}&pn=${name}&am=${cartTotal}&cu=INR`;
  return (
    <div className="container">
      <header className="header">
        <button className="buy-button" style={{ width: 'auto', marginBottom: '1rem' }} onClick={() => setView("cart")}>
          <ArrowLeft size={18} /> Back to Cart
        </button>
        <h1>Secure Checkout</h1>
        <p>Choose your preferred payment method</p>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ color: '#64748b' }}>Amount to Pay</span>
              <h1 style={{ margin: '0.5rem 0', fontSize: '3rem' }}>₹{cartTotal}</h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard size={20} /> Cards & Netbanking</h4>
                  <button className="buy-button" onClick={handleRazorpayPayment}>Pay with Razorpay</button>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} /> UPI Payment</h4>
                  <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
                        Your UPI ID (for payment confirmation)
                      </label>
                      <input
                        type="text"
                        value={userUpiId}
                        onChange={(e) => setUserUpiId(e.target.value)}
                        placeholder="Enter your UPI ID (e.g., user@upi)"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                      <p style={{ margin: '0', fontSize: '0.9rem', color: '#64748b' }}>Paying to: <strong>{ownerUpiId}</strong></p>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#64748b' }}>Alternative: Scan QR Code to Pay</p>
                      <QRCodeSVG value={upiUrl} size={128} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <button
                        className="buy-button upi-button"
                        onClick={() => handleUPIPayment("Google Pay", ownerUpiId, userUpiId)}
                        disabled={!userUpiId.trim()}
                      >
                        Google Pay
                      </button>
                      <button
                        className="buy-button upi-button"
                        style={{ background: '#673ab7' }}
                        onClick={() => handleUPIPayment("PhonePe", ownerUpiId, userUpiId)}
                        disabled={!userUpiId.trim()}
                      >
                        PhonePe
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Payment;
