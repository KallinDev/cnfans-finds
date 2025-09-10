import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import { useProducts } from "./hooks/useProduct";
import { useEffect } from "react";

function App() {
  // Wiggle Register button every 10 seconds (no glow)
  useEffect(() => {
    const btn = document.querySelector(".register-wiggle-glow");
    if (!btn) return;
    let delay = 10000; // 10 seconds between wiggles
    let duration = 2000; // wiggle duration
    let timer;
    function wiggle() {
      btn.style.animation = `wiggleOnly ${duration}ms cubic-bezier(.4,0,.2,1)`;
      setTimeout(() => {
        btn.style.animation = "";
        timer = setTimeout(wiggle, delay);
      }, duration);
    }
    timer = setTimeout(wiggle, delay);
    return () => clearTimeout(timer);
  }, []);

  // Wiggle Discord button every 10 seconds (no glow)
  useEffect(() => {
    const btn = document.querySelector(".discord-wiggle-glow");
    if (!btn) return;
    let delay = 10000; // 10 seconds between wiggles
    let duration = 2000; // wiggle duration
    let timer;
    function wiggle() {
      btn.style.animation = `wiggleOnly ${duration}ms cubic-bezier(.4,0,.2,1)`;
      setTimeout(() => {
        btn.style.animation = "";
        timer = setTimeout(wiggle, delay);
      }, duration);
    }
    timer = setTimeout(wiggle, delay);
    return () => clearTimeout(timer);
  }, []);

  // Wiggle Discord button every 10 seconds (no glow)
  useEffect(() => {
    const btn = document.querySelector(".discord-wiggle-glow");
    if (!btn) return;
    let delay = 10000; // 10 seconds between wiggles
    let duration = 2000; // wiggle duration
    let timer;
    function wiggle() {
      btn.style.animation = `wiggleOnly ${duration}ms cubic-bezier(.4,0,.2,1)`;
      setTimeout(() => {
        btn.style.animation = "";
        timer = setTimeout(wiggle, delay);
      }, duration);
    }
    timer = setTimeout(wiggle, delay);
    return () => clearTimeout(timer);
  }, []);
  // Make sure your CSV is in the public folder, e.g., public/products.csv
  const products = useProducts("/products.csv");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] to-black text-[#e2e8f0]">
      {/* Fixed Register Button for all pages */}
      {/* Custom animation for Register button */}
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
      <Router>
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/shop" element={<Shop products={products} />} />
          <Route
            path="/shop/categories/:category"
            element={<Shop products={products} />}
          />
          {/* Add more routes here as you build more pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
