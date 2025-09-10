import "../index.css";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, style, id }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  useEffect(() => {
    setTimeout(
      () => setVisible(true),
      style?.animationDelay ? parseInt(style.animationDelay) : 0
    );
  }, [style]);
  if (!product) {
    return (
      <div className="rounded-3xl shadow-xl p-7 bg-gradient-to-br from-[#232946] to-[#121629] border border-white/10">
        Product data missing
      </div>
    );
  }
  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        ...style,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="rounded-3xl shadow-xl p-7 bg-gradient-to-br from-[#232946] to-[#121629] border border-white/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col w-full max-w-[370px] min-h-[440px] min-w-[270px] h-[440px] justify-between w-[90vw] sm:w-full">
        {product.image && (
          <div className="w-full aspect-[4/3] mb-4 flex items-center justify-center bg-[#181a20] rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product[""]}
              className="w-full h-full object-cover"
              style={{
                minWidth: "100%",
                minHeight: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <h3
          className="text-lg font-semibold text-white mb-2 max-w-full text-left"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            whiteSpace: "normal",
          }}
        >
          {product[""]}
        </h3>
        <p className="text-[#ff2a68] text-2xl font-bold mb-6 text-left">
          {product["__1"] && product["__1"].startsWith("$")
            ? product["__1"]
            : `$${product["__1"]}`}
        </p>
        <a
          href={product["__2"]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ff2a68] font-semibold shadow-sm border border-[#ff2a68]/30 transition-all duration-300 hover:bg-[#ff2a68] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ff2a68] focus:ring-offset-2 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          CNFans Link
        </a>
      </div>
    </div>
  );
}
