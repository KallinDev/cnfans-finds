import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Header({ categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Use categories prop if provided, else fallback to default
  const categoriesList = categories
    ? categories
    : [
        { name: "Keyboards", icon: "" },
        { name: "Switches", icon: "" },
        { name: "Keycaps", icon: "" },
        { name: "Accessories", icon: "" },
        { name: "Deskmats", icon: "" },
      ];

  useEffect(() => {
    fetch("/products_with_images.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((item) => ({
            name: item[""] || "",
            price_usd: item["__1"] || "",
            link: item["__2"] || "",
            image: item.image || "",
            category: item.category || "",
          }))
        );
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSuggestions([]);
      setDropdownOpen(false);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = products
      .filter((p) => p.name.toLowerCase().includes(term))
      .slice(0, 6);
    setSuggestions(filtered);
    setDropdownOpen(filtered.length > 0);
  }, [searchTerm, products]);

  useEffect(() => {
    function handleClick(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#232946]/60 backdrop-blur border-b border-white/10 py-3 md:py-5">
        <div className="max-w-6xl mx-auto px-2 md:px-5 flex items-center justify-between md:justify-between relative">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-[#ff2a68] focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* Centered logo/title */}
          <div className="flex-1 flex justify-center md:justify-start">
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#ff2a68] to-[#ff5a8a] bg-clip-text text-transparent"
              title="CNFans Spreadsheet, Finds & Links Home"
            >
              CNFans Spreadsheet & Finds
            </a>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-4 md:gap-8 items-center flex-nowrap md:flex-wrap">
              <li>
                <a
                  href="/"
                  className="text-[#cbd5e0] px-4 py-2 rounded-lg transition hover:text-[#ff2a68] hover:bg-[#ff2a68]/10"
                  title="CNFans Spreadsheet, Finds & Links Home"
                >
                  Home
                </a>
              </li>
              <li className="relative group" style={{ zIndex: 100 }}>
                <button
                  type="button"
                  className="text-[#cbd5e0] px-4 py-2 rounded-lg transition flex items-center gap-2 hover:text-[#ff2a68] hover:bg-[#ff2a68]/10 cursor-pointer"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setCategoriesDropdownOpen(!categoriesDropdownOpen);
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={categoriesDropdownOpen}
                >
                  Categories <span className="text-xs">▼</span>
                </button>
                {/* Desktop dropdown - CSS hover controlled */}
                <ul className="hidden md:block absolute left-0 top-full w-64 bg-[#232946] border border-white/10 rounded-xl shadow-xl z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                  {categoriesList.map((cat) => (
                    <li key={cat.name}>
                      <a
                        href={`/shop/categories/${cat.name
                          .toLowerCase()
                          .replace(/\//g, "-")
                          .replace(/ /g, "-")}`}
                        className="flex items-center gap-3 px-4 py-3 text-[#cbd5e0] hover:bg-[#ff2a68]/10 hover:text-[#ff2a68] rounded-lg transition cursor-pointer"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Mobile dropdown - JavaScript controlled */}
                {categoriesDropdownOpen && (
                  <ul className="md:hidden absolute left-0 top-full w-64 bg-[#232946] border border-white/10 rounded-xl shadow-xl z-50">
                    {categoriesList.map((cat) => (
                      <li key={cat.name}>
                        <a
                          href={`/shop/categories/${cat.name
                            .toLowerCase()
                            .replace(/\//g, "-")
                            .replace(/ /g, "-")}`}
                          className="flex items-center gap-3 px-4 py-3 text-[#cbd5e0] hover:bg-[#ff2a68]/10 hover:text-[#ff2a68] rounded-lg transition cursor-pointer"
                          onClick={() => setCategoriesDropdownOpen(false)}
                        >
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="font-medium">{cat.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="relative" ref={inputRef}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchTerm) {
                      window.location.href = `/shop?search=${encodeURIComponent(
                        searchTerm
                      )}`;
                    }
                  }}
                  autoComplete="off"
                  className="flex items-center gap-2"
                >
                  <div className="relative flex items-center w-64">
                    <input
                      type="text"
                      name="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-[#232946] text-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#ff2a68] w-full"
                      autoComplete="off"
                      onFocus={() => setDropdownOpen(suggestions.length > 0)}
                    />
                    <button
                      type="submit"
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-0 bg-transparent text-[#ff2a68] focus:outline-none"
                      aria-label="Search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="7"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="16.5"
                          y1="16.5"
                          x2="21"
                          y2="21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    {/* Suggestions Dropdown */}
                    {dropdownOpen && suggestions.length > 0 && (
                      <div className="absolute left-0 top-full mt-2 w-full bg-[#232946] border border-white/10 rounded-xl shadow-xl z-50">
                        {suggestions.map((item) => {
                          const productId = encodeURIComponent(
                            (item.link || item.name || "")
                              .replace(/\s+/g, "-")
                              .toLowerCase()
                          );
                          return (
                            <div
                              key={item.link}
                              className="flex items-center gap-3 px-4 py-3 text-[#cbd5e0] hover:bg-[#ff2a68]/10 hover:text-[#ff2a68] rounded-lg transition cursor-pointer"
                              onMouseDown={() => {
                                setDropdownOpen(false);
                                navigate(`/product/${productId}`);
                              }}
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded-lg"
                                />
                              )}
                              <span className="font-medium truncate max-w-[180px]">
                                {item.name}
                              </span>
                              <span className="ml-auto text-sm text-[#ff2a68] font-bold">
                                {item.price_usd}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Mobile nav drawer outside header for full overlay */}
      <nav
        className={`fixed inset-0 bg-[#232946]/95 z-[9999] flex flex-col items-center justify-start pt-20 px-6 transition-opacity duration-200 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ display: "block" }}
      >
        <div className="w-full relative">
          <button
            className="absolute top-4 right-4 text-[#ff2a68] text-3xl focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
          <div className="w-full">
            <ul className="flex flex-col gap-6 w-full">
              <li>
                <a
                  href="/"
                  className="text-[#cbd5e0] text-xl px-4 py-2 rounded-lg transition hover:text-[#ff2a68] hover:bg-[#ff2a68]/10 text-center"
                  title="CNFans Spreadsheet, Finds & Links Home"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li className="relative w-full">
                <button
                  type="button"
                  className="text-[#cbd5e0] text-xl px-4 py-2 rounded-lg transition flex items-center gap-2 text-center hover:text-[#ff2a68] hover:bg-[#ff2a68]/10 cursor-pointer w-full"
                  onClick={() => setCategoriesDropdownOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={categoriesDropdownOpen}
                >
                  Categories <span className="text-xs">▼</span>
                </button>
                <ul
                  className={`absolute left-0 top-full mt-2 w-full bg-[#232946] border border-white/10 rounded-xl shadow-xl z-50 transition-opacity duration-200 overflow-hidden ${
                    categoriesDropdownOpen
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                  style={{ display: "block" }}
                >
                  {categoriesList.map((cat) => (
                    <li key={cat.name}>
                      <a
                        href={`/shop/categories/${cat.name
                          .toLowerCase()
                          .replace(/\//g, "-")
                          .replace(/ /g, "-")}`}
                        className="flex items-center gap-3 px-4 py-3 text-[#cbd5e0] hover:bg-[#ff2a68]/10 hover:text-[#ff2a68] rounded-lg transition cursor-pointer"
                        onClick={() => {
                          setCategoriesDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="relative w-full" ref={inputRef}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchTerm) {
                      window.location.href = `/shop?search=${encodeURIComponent(
                        searchTerm
                      )}`;
                      setMobileMenuOpen(false);
                    }
                  }}
                  autoComplete="off"
                  className="flex items-center gap-2 w-full"
                >
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      name="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-[#232946] text-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#ff2a68] w-full"
                      autoComplete="off"
                      onFocus={() => setDropdownOpen(suggestions.length > 0)}
                    />
                    <button
                      type="submit"
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-0 bg-transparent text-[#ff2a68] focus:outline-none"
                      aria-label="Search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="7"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="16.5"
                          y1="16.5"
                          x2="21"
                          y2="21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    {/* Suggestions Dropdown */}
                    {dropdownOpen && suggestions.length > 0 && (
                      <div className="absolute left-0 top-full mt-2 w-full bg-[#232946] border border-white/10 rounded-xl shadow-xl z-50">
                        {suggestions.map((item) => (
                          <a
                            key={item.link}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 text-[#cbd5e0] hover:bg-[#ff2a68]/10 hover:text-[#ff2a68] rounded-lg transition cursor-pointer"
                            onMouseDown={() => setDropdownOpen(false)}
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                            )}
                            <span className="font-medium truncate max-w-[180px]">
                              {item.name}
                            </span>
                            <span className="ml-auto text-sm text-[#ff2a68] font-bold">
                              {item.price_usd}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
