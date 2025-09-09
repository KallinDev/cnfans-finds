import "../index.css";

import { useRef, useEffect, useState } from "react";

export default function ProductCard({ name, link, price_usd, image, style }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // Trigger animation after mount
    setTimeout(
      () => setVisible(true),
      style?.animationDelay ? parseInt(style.animationDelay) : 0
    );
  }, [style]);
  const cardRef = useRef(null);
  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        ...style,
      }}
    >
      <div className="rounded-3xl shadow-xl p-7 bg-gradient-to-br from-[#232946] to-[#121629] border border-white/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col w-full max-w-[370px] min-h-[440px] min-w-[270px] h-[440px] justify-between">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover rounded-2xl mb-4"
          />
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
          {name}
        </h3>
        <p className="text-[#ff2a68] text-2xl font-bold mb-6 text-left">
          {price_usd.startsWith("$") ? price_usd : `$${price_usd}`}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#ff2a68] font-semibold shadow-sm border border-[#ff2a68]/30 transition-all duration-300 hover:bg-[#ff2a68] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ff2a68] focus:ring-offset-2 text-left"
        >
          CNFans Link
        </a>
      </div>
    </div>
  );
}
