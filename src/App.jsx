import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import ProductDetails from "./components/ProductDetails";
import { useLocation } from "react-router-dom";

// Wrapper to use useLocation inside Router
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-MQDB9RN454", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

function ProductDetailsWrapper() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch("/products_with_images.json")
      .then((res) => res.json())
      .then((data) => {
        const decodedId = decodeURIComponent(id);
        const found = data.find(
          (p) => (p["__2"] || p.link || "") === decodedId
        );
        setProduct(found);
      });
  }, [id]);
  return <ProductDetails product={product} />;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1a2f] to-black text-[#e2e8f0]">
      <style>{`
        @keyframes wiggleOnly {
          0%, 100% { transform: rotate(0deg) scale(1); }
          7% { transform: rotate(-3deg) scale(1.03); }
          14% { transform: rotate(3deg) scale(1.04); }
          21% { transform: rotate(-3deg) scale(1.03); }
          28% { transform: rotate(0deg) scale(1); }
        }
        .register-wiggle-glow {
          /* No infinite animation, controlled by JS */
        }
      `}</style>

      <a
        href="https://discord.gg/7xAwVqGwpc"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 bg-gradient-to-br from-[#5865F2] to-[#404EED] text-white px-3 py-2 rounded-lg shadow-lg font-bold text-base transition-all hover:scale-110 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 discord-wiggle-glow"
        style={{ boxShadow: "0 8px 32px rgba(88,101,242,0.25)" }}
      >
        <div style={{ lineHeight: 1.1 }}>Join Discord 💬</div>
      </a>
      <a
        href="https://cnfans.com/register?ref=2042152"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-br from-[#ff2a68] to-[#ff5a8a] text-white px-3 py-2 rounded-2xl shadow-lg font-bold text-base transition-all hover:scale-110 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff2a68] focus:ring-offset-2 register-wiggle-glow text-center"
        style={{ boxShadow: "0 8px 32px rgba(255,42,104,0.25)" }}
      >
        <div style={{ lineHeight: 1.2 }}>
          Register on CNFans 🚀
          <br />
          <span
            style={{
              fontSize: "0.95em",
              fontWeight: "normal",
              color: "#ffe6f2",
            }}
          >
            Get <span style={{ fontWeight: "bold" }}>$125</span> in shipping
            discount!
          </span>
        </div>
      </a>
      <div className="flex flex-col min-h-screen">
        <Router>
          <Header
            categories={[
              { name: "All", icon: "🌐" },
              { name: "Shoes", icon: "👞" },
              { name: "Jackets", icon: "🥼" },
              { name: "Hoodies/Sweaters", icon: "🧥" },
              { name: "T-shirts", icon: "👕" },
              { name: "Pants", icon: "👖" },
              { name: "Hats", icon: "🎩" },
              { name: "Accessories", icon: "👜" },
              { name: "Other", icon: "✨" },
            ]}
          />
          <AnalyticsTracker />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/categories/:category" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetailsWrapper />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </div>
  );
}
export default App;
