import { useEffect, useState } from "react";

export function useProductsJson(jsonUrl) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(jsonUrl);
        const data = await res.json();
        // Normalize keys for compatibility
        const normalized = data.map((row, idx) => ({
          id: idx,
          name: row["name"] || row[""] || "No name",
          price_usd: row["price_usd"] || row["__1"] || "0.00",
          link: row["link"] || row["__2"] || "#",
          image: row["image"] || "",
          category: row["category"] || "Other",
        }));
        setProducts(normalized);
      } catch (err) {
        console.error("Failed to fetch products JSON", err);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [jsonUrl]);

  return { products, loading };
}
