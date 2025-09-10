// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import Papa from "papaparse";


export function useProducts(csvUrl, visibleCount = 20) {
  const [products, setProducts] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchInitialProducts() {
      setLoading(true);
      try {
        const res = await fetch(csvUrl);
        if (csvUrl.endsWith('.json')) {
          const json = await res.json();
          setAllRows(json);
        } else {
          const text = await res.text();
          const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
          setAllRows(parsed.data);
        }
      } catch (err) {
        console.error("Failed to fetch products file", err);
      }
      setLoading(false);
    }
    fetchInitialProducts();
  }, [csvUrl]);

  useEffect(() => {
    async function fetchVisibleProducts() {
      setLoading(true);
      const visibleRows = allRows.slice(0, visibleCount);
      const productsWithImages = await Promise.all(
        visibleRows.map(async (row, idx) => {
          return {
            id: idx,
            name: row.name || "No name",
            price_usd: row.price_usd || "0.00",
            link: row.link || "#",
            image: row.image || "",
          };
        })
      );
      setProducts(productsWithImages);
      setLoading(false);
    }
    if (allRows.length > 0) {
      fetchVisibleProducts();
    }
  }, [allRows, visibleCount]);

  return { products, loading, hasMore: visibleCount < allRows.length };
}
