import React, { useEffect, useState } from "react";

export default function ProductDetails({ product }) {
  const [suggested, setSuggested] = useState([]);
  // Debug: Log the product object to console
  console.log("Product object:", product);

  useEffect(() => {
    if (!product) return;
    fetch("/products_with_images.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter out current product
        const currentLink = product["__2"] || product.link || "";
        const filtered = data.filter(
          (p) => (p["__2"] || p.link || "") !== currentLink
        );
        // Shuffle and pick 4
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        setSuggested(filtered.slice(0, 4));
      });
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20 text-[#a0aec0]">Product not found.</div>
    );
  }

  // Handle both data formats - JSON structure and the current structure
  const name = product[""] || product.name || "Product name not available";
  const price_usd =
    product["__1"] || product.price_usd || "Price not available";
  const link = product["__2"] || product.link || "#";
  const image = product.image || "";
  const category = product.category || "Other";

  // Debug: Log individual properties
  console.log("Name:", name);
  console.log("Price:", price_usd);
  console.log("Link:", link);
  console.log("Image:", image);
  console.log("Category:", category);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1a2f] to-black text-[#e2e8f0]">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto py-24 px-6 gap-y-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt={name || "Product"}
                className="rounded-2xl shadow-xl w-full max-w-lg object-cover min-h-[320px] min-w-[320px]"
                style={{ height: "auto", width: "100%" }}
                onError={(e) => {
                  console.log("Image failed to load:", image);
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full max-w-lg h-80 bg-gray-700 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-6">
              {name || "Untitled Product"}
            </h1>
            <div className="flex items-center mb-8">
              <span className="text-[#ff2a68] text-3xl font-bold mr-3">$</span>
              <span className="text-[#ff2a68] text-3xl font-bold">
                {price_usd
                  ? price_usd.replace(/\$/g, "")
                  : "Price not available"}
              </span>
            </div>
            <p className="mb-8 text-xl">Category: {category}</p>
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full bg-[#ff2a68] text-white font-semibold shadow-lg text-lg transition hover:bg-[#ff5a8a] hover:scale-105"
              >
                View on CNFans
              </a>
            ) : (
              <button
                disabled
                className="inline-block px-8 py-4 rounded-full bg-gray-600 text-gray-300 font-semibold cursor-not-allowed text-lg"
              >
                Link not available
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Suggested Items Section */}
      <section className="max-w-4xl w-full mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#ff2a68]">
          Suggested Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center items-center place-items-center mx-auto">
          {suggested.map((item, idx) => {
            const name = item[""] || item.name || "Product name not available";
            const price = item["__1"] || item.price_usd || "N/A";
            const image = item.image || "";
            const link = item["__2"] || item.link || "#";
            return (
              <div
                key={link + idx}
                className="rounded-2xl shadow-xl p-5 bg-gradient-to-br from-[#232946] to-[#121629] border border-white/10 flex flex-col items-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl w-full max-w-xs min-h-[320px]"
                style={{ textDecoration: "none" }}
              >
                <a
                  href={`/product/${encodeURIComponent(link)}`}
                  style={{ width: "100%" }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="rounded-xl mb-4 w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  <div
                    className="text-lg font-semibold text-white mb-2 text-center"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      whiteSpace: "normal",
                      minHeight: "3em",
                    }}
                  >
                    {name}
                  </div>
                </a>
                <div className="text-[#ff2a68] text-xl font-bold mb-2">
                  {price}
                </div>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-full bg-[#ff2a68] text-white font-semibold shadow text-base transition hover:bg-[#ff5a8a] hover:scale-105 mt-2"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  CNFans Link
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
