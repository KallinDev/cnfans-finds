import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import { useProducts } from "./hooks/useProduct";

function App() {
  // Make sure your CSV is in the public folder, e.g., public/products.csv
  const products = useProducts("/products.csv");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] to-black text-[#e2e8f0]">
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
