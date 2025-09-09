import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] py-6 md:py-10">
      <div className="max-w-6xl mx-auto text-center px-2 md:px-0">
        <div className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#ff2a68] to-[#ff5a8a] bg-clip-text text-transparent">
          CNFans Spreadsheet & Finds
        </div>
        <p className="text-[#a0aec0] mb-4 md:mb-6 text-sm md:text-base">
          Your trusted source for CNFans spreadsheets, product links, trending
          finds, and exclusive deals. Discover, shop, and access the latest
          CNFans resources and curated lists.
        </p>
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-4 md:mb-6">
          {/* Removed footer links as requested */}
        </div>
        <div className="border-t border-white/10 pt-4 md:pt-6 mt-4 md:mt-6 text-[#718096] text-xs md:text-sm">
          © 2025 CNFans Spreadsheet, Finds & Links. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
