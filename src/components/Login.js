import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

const Login = ({ onLogin, onShowSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simple mock authentication
      onLogin({ email, name: email.split('@')[0] });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <User size={48} style={{ color: '#2563eb', marginBottom: '1rem' }} />
          <h2>Welcome to Stationery Shop</h2>
          <p>Please {isLogin ? 'login' : 'sign up'} to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '90%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '90%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="buy-button"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                if (!isLogin) onShowSignup();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '0.5rem'
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
