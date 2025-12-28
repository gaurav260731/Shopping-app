import React, { useState } from "react";
import { User, ArrowLeft } from "lucide-react";

const Profile = ({ onSave, onBack, user, requireAddress = false }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: user?.address || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile) {
      alert("Please fill all required fields");
      return;
    }

    if (requireAddress && !formData.address.trim()) {
      alert("Address is required for payment");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginRight: '1rem',
                color: '#6b7280'
              }}
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <User size={48} style={{ color: '#2563eb', marginBottom: '1rem' }} />
            <h2>{user ? 'Update Profile' : 'Create Account'}</h2>
            <p>Please fill in your details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
              Mobile Number *
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
              Address {requireAddress ? '*' : '(Optional)'}
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              required={requireAddress}
            />
          </div>

          <button
            type="submit"
            className="buy-button"
            style={{ width: '100%' }}
          >
            {user ? 'Update Profile' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
