import React, { useState, useEffect } from "react";
import { getCategoryCounts } from "../utils/categoryCounts";
import "../index.css";
// import { Link } from 'react-router-dom'; // Add this when using in your project

const Home = () => {
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    getCategoryCounts().then(setCategoryCounts);
  }, []);

  const categories = [
    { name: "All", icon: "🌐" },
    {
      name: "Shoes",
      icon: "👞",
      subcategories: ["Old Money", "Streetwear", "Minimal", "Luxury", "Retro"],
    },
    {
      name: "Jackets",
      icon: "🥼",
      subcategories: ["Old Money", "Streetwear", "Minimal", "Luxury", "Retro"],
    },
    {
      name: "Hoodies/Sweaters",
      icon: "🧥",
      subcategories: ["Old Money", "Streetwear", "Minimal", "Luxury", "Retro"],
    },
    {
      name: "T-shirts",
      icon: "👕",
      subcategories: ["Old Money", "Streetwear", "Minimal", "Luxury", "Retro"],
    },
    {
      name: "Pants",
      icon: "👖",
      subcategories: ["Old Money", "Streetwear", "Minimal", "Luxury", "Retro"],
    },
    { name: "Hats", icon: "🎩" },
    {
      name: "Accessories",
      icon: "👜",
      subcategories: ["Old Money", "Streetwear", "Minimal", "Luxury", "Retro"],
    },
    { name: "Other", icon: "✨" },
  ];

  return (
    <div>
      {/* Removed Header */}

      {/* Hero Section */}
      <section className="py-20 text-center max-w-6xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 bg-gradient-to-br from-[#ff2a68] to-[#ff5a8a] bg-clip-text text-transparent">
          CNFans Spreadsheet, Finds & Links – Discover Trending CNFans Products
        </h1>
        <p className="text-lg sm:text-s mb-10 text-[#a0aec0] max-w-3xl mx-auto leading-relaxed">
          Welcome to CNFans Finds! Your #1 source for the latest CNFans
          spreadsheet, curated product links, and trending CNFans deals. Explore
          our exclusive CNFans categories, shop smarter, and access the most
          up-to-date CNFans finds and spreadsheets online.
        </p>
        <a
          href="/shop"
          className="inline-block bg-gradient-to-br from-[#ff2a68] to-[#ff5a8a] text-white py-4 px-8 rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff2a68] focus:ring-offset-2"
        >
          Explore CNFans Spreadsheet & Product Categories
        </a>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
          Browse CNFans Categories, Links & Spreadsheets
        </h2>
        {/* 3-column grid for categories */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 px-2 md:px-0">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => {
                const path = `/shop/categories/${category.name
                  .toLowerCase()
                  .replace(/\//g, "-")
                  .replace(/ /g, "-")}`;
                window.location.href = path;
              }}
              className="bg-[#2d3748]/60 backdrop-blur border border-white/10 rounded-2xl p-6 text-center text-[#e2e8f0] transition-all hover:shadow-lg hover:bg-[#232946]/80 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff2a68] focus:ring-offset-2 w-full cursor-pointer"
            >
              <div className="text-4xl mb-4 pointer-events-none">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 pointer-events-none">
                {category.name}
              </h3>
              <p className="text-[#a0aec0] text-sm pointer-events-none">
                {category.name === "All"
                  ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
                  : categoryCounts[category.name] || 0}{" "}
                products
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
