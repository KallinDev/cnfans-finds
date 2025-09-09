import fs from 'fs';

const products = JSON.parse(fs.readFileSync('public/products.json', 'utf8'));

const seenUrls = new Set();
const deduped = products.filter(p => {
  const url = (p["__2"] || "").trim();
  if (seenUrls.has(url)) {
    console.log('Duplicate URL:', url);
    return false;
  }
  seenUrls.add(url);
  return true;
});

fs.writeFileSync('public/products.json', JSON.stringify(deduped, null, 2));
console.log('✅ URL deduplication complete!');