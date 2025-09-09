import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] py-10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#ff2a68] to-[#ff5a8a] bg-clip-text text-transparent">
          CNFans Finds
        </div>
        <p className="text-[#a0aec0] mb-6">
          Your gateway to premium products from trusted brands
        </p>
        <div className="flex justify-center gap-8 flex-wrap mb-6">
          {/* Removed footer links as requested */}
        </div>
        <div className="border-t border-white/10 pt-6 mt-6 text-[#718096] text-sm">
          © 2025 CNFans Finds. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
