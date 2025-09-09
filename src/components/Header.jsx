import React, { useState, useEffect, useRef } from "react";
// --- DROPDOWN SUGGESTIONS LOGIC ---
export default function Header({
  showCategoriesDropdown,
  setShowCategoriesDropdown,
  categories,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);

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
    <header className="sticky top-0 z-50 bg-[#232946]/60 backdrop-blur border-b border-white/10 py-5">
      <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
        <a
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-[#ff2a68] to-[#ff5a8a] bg-clip-text text-transparent"
        >
          CNFans Finds
        </a>
        <nav>
          <ul className="flex gap-8 items-center">
            <li>
              <a
                href="/"
                className="text-[#cbd5e0] px-4 py-2 rounded-lg transition hover:text-[#ff2a68] hover:bg-[#ff2a68]/10"
              >
                Home
              </a>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setShowCategoriesDropdown(true)}
              onMouseLeave={() => setShowCategoriesDropdown(false)}
            >
              <a
                href="/shop"
                className={`text-[#cbd5e0] px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                  showCategoriesDropdown ? "bg-[#ff2a68]/10 text-[#ff2a68]" : ""
                }`}
              >
                Categories <span className="text-xs">▼</span>
              </a>
              {showCategoriesDropdown && categories && (
                <div className="absolute left-0 top-full bg-[#1a1a2e]/95 backdrop-blur border border-white/10 rounded-xl min-w-[200px] py-2 shadow-xl z-50">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={`/shop/categories/${category.name
                        .toLowerCase()
                        .replace(/\//g, "-")
                        .replace(/ /g, "-")}`}
                      className="flex items-center gap-3 px-5 py-3 text-[#cbd5e0] rounded-lg transition hover:bg-[#ff2a68]/10 hover:text-[#ff2a68]"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </a>
                  ))}
                </div>
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
        </nav>
      </div>
    </header>
  );
}
