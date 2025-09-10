import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./ProductCard";

const categories = [
  { name: "All", icon: "🌐" },
  { name: "Shoes", icon: "👞" },
  { name: "Jackets", icon: "🥼" },
  { name: "Hoodies/Sweaters", icon: "🧥" },
  { name: "T-shirts", icon: "👕" },
  { name: "Pants", icon: "👖" },
  { name: "Hats", icon: "🎩" },
  { name: "Accessories", icon: "👜" },
  { name: "Other", icon: "✨" },
];

const Shop = () => {
  // Read search term from URL if present
  function getSearchFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  }
  const [searchTerm, setSearchTerm] = useState(getSearchFromUrl());
  const [sortOption, setSortOption] = useState("default");
  // Read category from URL if present
  function getCategoryFromUrl() {
    const match = window.location.pathname.match(
      /\/shop\/categories\/([\w-]+)/
    );
    if (match && match[1]) {
      // Convert dashes to spaces and capitalize first letter of each word
      const cat = match[1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return cat;
    }
    return "All";
  }
  const [selectedCategory, setSelectedCategory] = useState(
    getCategoryFromUrl()
  );

  // Update selectedCategory if URL changes
  useEffect(() => {
    const handlePopState = () => {
      setSelectedCategory(getCategoryFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const INITIAL_COUNT = 20;
  const LOAD_MORE_COUNT = 40;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    fetch("/products_with_images.json")
      .then((res) => res.json())
      .then((data) => {
        // Map JSON keys to ProductCard props
        const mapped = data.map((item) => ({
          name: item[""] || "",
          price_usd: item["__1"] || "",
          link: item["__2"] || "",
          image: item.image || "",
          category: item.category || "",
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Update searchTerm if URL changes (for header search)
  useEffect(() => {
    const handlePopState = () => {
      setSearchTerm(getSearchFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        visibleCount < products.length &&
        !loading
      ) {
        setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, products.length));
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, products.length, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] to-black text-[#e2e8f0]">
      {/* Header */}
      <Header
        showCategoriesDropdown={showCategoriesDropdown}
        setShowCategoriesDropdown={setShowCategoriesDropdown}
        categories={categories}
      />
      {/* Hero Section */}
      <section className="py-20 text-center max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#ff2a68] to-[#ff5a8a] bg-clip-text text-transparent">
          CNFans Spreadsheet, Product Links & Finds – Shop All CNFans Products
        </h1>
        <p className="text-lg md:text-m text-[#a0aec0] mb-10 max-w-xl mx-auto leading-relaxed">
          Discover the most comprehensive CNFans spreadsheet, curated CNFans
          product links, and trending CNFans finds. Shop exclusive CNFans deals,
          explore categories, and access the latest CNFans spreadsheets and
          links for premium products.
        </p>
        {/* Category Buttons */}
        <div
          className="flex flex-wrap justify-center items-center gap-2 mb-4 px-2 md:px-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((category) => {
            const normalize = (str) =>
              str.toLowerCase().replace(/\//g, "-").replace(/ /g, "-");
            const normalized = normalize(category.name);
            const isSelected =
              selectedCategory && normalized === normalize(selectedCategory);
            return (
              <button
                key={category.name}
                onClick={() => {
                  const path = `/shop/categories/${category.name
                    .toLowerCase()
                    .replace(/\//g, "-")
                    .replace(/ /g, "-")}`;
                  window.history.pushState({}, "", path);
                  setSelectedCategory(category.name);
                }}
                className={`px-3 py-1 rounded-lg font-medium transition flex items-center gap-1 border border-white/10 ${
                  isSelected
                    ? "bg-[#ff2a68]/20 text-[#ff2a68] border-[#ff2a68]"
                    : "bg-[#1a1a2e] text-[#cbd5e0] hover:bg-[#ff2a68]/10 hover:text-[#ff2a68]"
                } text-base`}
                style={{ cursor: "pointer" }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
        {/* Search and Sorting */}
        <div className="max-w-2xl mx-auto px-2 pt-2 pb-6 flex flex-col md:flex-row gap-3 justify-center items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="bg-[#1a1a2e] text-[#cbd5e0] px-4 py-2 rounded-lg border border-white/10 w-full md:w-1/2"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-[#1a1a2e] text-[#cbd5e0] px-4 py-2 rounded-lg border border-white/10 w-full md:w-1/3"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </section>
      {/* Product Grid from products.json */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-center items-center place-items-center mx-auto">
          {loading ? (
            <div className="col-span-full text-center text-[#a0aec0]">
              Loading...
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center text-[#a0aec0]">
              No products found.
            </div>
          ) : (
            products
              .filter((product) => {
                if (
                  !selectedCategory ||
                  selectedCategory.toLowerCase() === "all"
                )
                  return true;
                // Normalize category names: lowercase, replace slashes/dashes/spaces with dash, trim
                const normalize = (str) =>
                  (str || "Other")
                    .toLowerCase()
                    // eslint-disable-next-line no-useless-escape
                    .replace(/[\/]/g, "-")
                    .replace(/\s+/g, "-")
                    .trim();
                const productCat = normalize(product.category);
                const navCat = normalize(selectedCategory);
                if (navCat === "other") {
                  const knownCats = categories.map((c) => normalize(c.name));
                  return (
                    !knownCats.includes(productCat) || productCat === "other"
                  );
                }
                return productCat === navCat;
              })
              .filter((product) => {
                if (!searchTerm) return true;
                const term = searchTerm.toLowerCase();
                return (
                  product.name.toLowerCase().includes(term) ||
                  (product.category &&
                    product.category.toLowerCase().includes(term)) ||
                  (product.price_usd &&
                    product.price_usd.toLowerCase().includes(term))
                );
              })
              .sort((a, b) => {
                if (sortOption === "price-asc") {
                  return (
                    (parseFloat(a.price_usd.replace(/[^\d.]/g, "")) || 0) -
                    (parseFloat(b.price_usd.replace(/[^\d.]/g, "")) || 0)
                  );
                }
                if (sortOption === "price-desc") {
                  return (
                    (parseFloat(b.price_usd.replace(/[^\d.]/g, "")) || 0) -
                    (parseFloat(a.price_usd.replace(/[^\d.]/g, "")) || 0)
                  );
                }
                if (sortOption === "name-asc") {
                  return a.name.localeCompare(b.name);
                }
                if (sortOption === "name-desc") {
                  return b.name.localeCompare(a.name);
                }
                return 0;
              })
              .slice(0, visibleCount)
              .map((product, idx) => (
                <ProductCard
                  key={`${selectedCategory}-${searchTerm}-${
                    product.link || product.name || idx
                  }`}
                  name={product.name}
                  price_usd={product.price_usd}
                  link={product.link}
                  image={product.image}
                  style={{
                    animationDelay: `${idx < INITIAL_COUNT ? idx * 20 : 0}ms`,
                  }}
                />
              ))
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
