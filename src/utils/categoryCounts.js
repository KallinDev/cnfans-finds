// Utility to count products per category from products_with_images.json
// Usage: import and use getCategoryCounts()

export async function getCategoryCounts() {
  const response = await fetch('/products_with_images.json');
  const products = await response.json();
  const counts = {};
  for (const product of products) {
    const cat = product.category || 'Other';
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts;
}
