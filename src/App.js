import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { products } from "./data";
import { useCart } from "./CartContext";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Login from "./components/Login";
import Profile from "./components/Profile";

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const navigate = useNavigate();
  const { clearCart, cartTotal } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initial render
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);



  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const finalTotal = cartTotal * (1 - appliedDiscount);

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "",
      amount: Math.round(finalTotal * 100),
      currency: "INR",
      name: "Stationery Shop",
      description: "Checkout Payment",
      handler: function (response) {
        alert(`Payment successful via Razorpay! ID: ${response.razorpay_payment_id}`);
        clearCart();
        setAppliedDiscount(0);
        navigate("/shop");
      },
      prefill: { name: "Gaurav Yadav", email: "shany.gaurav@gmail.com" },
      theme: { color: "#2563eb" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleUPIPayment = (method, ownerUpiId, userUpiId) => {
    if (!userUpiId || !userUpiId.trim()) {
      alert("Please enter your UPI ID first");
      return;
    }

    const name = "Stationery Shop";

    // Create UPI deep link that should open the specific UPI app
    let upiUrl;
    if (method === 'Google Pay') {
      // Google Pay deep link
      upiUrl = `tez://upi/pay?pa=${ownerUpiId}&pn=${name}&am=${finalTotal}&cu=INR&tn=Payment%20to%20Stationery%20Shop`;
    } else if (method === 'PhonePe') {
      // PhonePe deep link
      upiUrl = `phonepe://pay?pa=${ownerUpiId}&pn=${name}&am=${finalTotal}&cu=INR&tn=Payment%20to%20Stationery%20Shop`;
    } else {
      // Generic UPI URL
      upiUrl = `upi://pay?pa=${ownerUpiId}&pn=${name}&am=${finalTotal}&cu=INR`;
    }

    // Show payment initiation message
    const initMsg = document.createElement('div');
    initMsg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      color: #374151;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);
      z-index: 1001;
      text-align: center;
      font-size: 1rem;
      max-width: 400px;
    `;
    initMsg.innerHTML = `
      <div style="margin-bottom: 1rem;">📱 Opening ${method}</div>
      <div style="font-size: 1.2rem; font-weight: bold; color: #2563eb; margin-bottom: 0.5rem;">₹${finalTotal.toFixed(2)}</div>
      <div style="font-size: 0.9rem; color: #6b7280; margin-bottom: 1rem;">
        From: ${userUpiId}<br>
        To: ${ownerUpiId}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af;">Please complete the payment in the ${method} app</div>
    `;
    document.body.appendChild(initMsg);

    // Try to open the UPI app
    setTimeout(() => {
      try {
        window.location.href = upiUrl;

        // If the app doesn't open, show fallback message
        setTimeout(() => {
          if (document.body.contains(initMsg)) {
            document.body.removeChild(initMsg);
            const fallbackMsg = document.createElement('div');
            fallbackMsg.style.cssText = `
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: #fef3c7;
              color: #92400e;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);
              z-index: 1001;
              text-align: center;
              font-size: 1rem;
              max-width: 400px;
              border: 1px solid #f59e0b;
            `;
            fallbackMsg.innerHTML = `
              <div style="margin-bottom: 1rem;">⚠️ ${method} App Not Found</div>
              <div style="font-size: 0.9rem; margin-bottom: 1rem;">
                Please install ${method} or use the QR code to complete payment
              </div>
              <button id="useQR" style="background: #f59e0b; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">Use QR Code</button>
            `;
            document.body.appendChild(fallbackMsg);

            document.getElementById('useQR').onclick = () => {
              document.body.removeChild(fallbackMsg);
              alert("Please scan the QR code on the payment page to complete your payment.");
            };

            setTimeout(() => {
              if (document.body.contains(fallbackMsg)) {
                document.body.removeChild(fallbackMsg);
              }
            }, 10000);
          }
        }, 2000);

      } catch (e) {
        document.body.removeChild(initMsg);
        alert(`${method} app could not be opened. Please use the QR code for payment.`);
        return;
      }
    }, 500);

    // Simulate checking for payment completion
    setTimeout(() => {
      if (document.body.contains(initMsg)) {
        document.body.removeChild(initMsg);
      }

      // Show completion check
      if(window.confirm(`Did you complete the ₹${finalTotal.toFixed(2)} payment in ${method}?\n\nFrom: ${userUpiId}\nTo: ${ownerUpiId}`)) {
        clearCart();
        setAppliedDiscount(0);
        navigate("/shop");
        alert("Payment successful! Thank you for your purchase.");
      } else {
        alert("Payment not completed. Please try again or use a different payment method.");
      }
    }, 8000);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.address) {
      navigate("/shop");
    } else {
      navigate("/profile");
    }
  };

  const handleShowSignup = () => {
    navigate("/profile");
  };

  const handleSaveProfile = (profileData) => {
    setUser({ ...user, ...profileData });
    navigate("/shop");
  };

  const handleProceedToPayment = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!user.address) {
      alert("Please update your profile with delivery address before proceeding to payment");
      navigate("/profile");
      return;
    }
    navigate("/payment");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} onShowSignup={handleShowSignup} />} />
      <Route path="/profile" element={
        user ? <Profile onSave={handleSaveProfile} onBack={() => navigate("/shop")} user={user} requireAddress={false} /> :
        <Profile onSave={handleSaveProfile} user={null} requireAddress={false} />
      } />
      <Route path="/shop" element={
        <ProtectedRoute user={user}>
          <Dashboard filteredProducts={filteredProducts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setView={() => navigate("/cart")} onProfileClick={() => navigate("/profile")} onLogout={handleLogout} user={user} />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute user={user}>
          <Cart setView={() => navigate("/shop")} appliedDiscount={appliedDiscount} setAppliedDiscount={setAppliedDiscount} onProceedToPayment={handleProceedToPayment} />
        </ProtectedRoute>
      } />
      <Route path="/payment" element={
        <ProtectedRoute user={user}>
          {user && user.address ? (
            <Payment cartTotal={finalTotal} setView={() => navigate("/shop")} setAppliedDiscount={setAppliedDiscount} handleRazorpayPayment={handleRazorpayPayment} handleUPIPayment={handleUPIPayment} />
          ) : (
            <Profile onSave={handleSaveProfile} onBack={() => navigate("/cart")} user={user} requireAddress={true} />
          )}
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
