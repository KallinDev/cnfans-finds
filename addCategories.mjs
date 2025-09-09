import fs from 'fs';

const categories = [
  { name: 'Shoes', keywords: ['shoe', 'sneaker', 'trainer', 'yeezy', 'air force', 'jordan', 'dunk', 'asics', 'adidas', 'puma', 'balenciaga', 'mcqueen', 'new balance', 'golden goose', 'nike'] },
  { name: 'Jackets', keywords: ['jacket', 'coat', 'parka', 'windbreaker'] },
  { name: 'Hoodies/Sweaters', keywords: ['hoodie', 'sweater', 'crewneck', 'pullover'] },
  { name: 'T-shirts', keywords: ['t-shirt', 'tee', 'shirt'] },
  { name: 'Pants', keywords: ['pant', 'jean', 'trouser', 'cargo', 'track pant', 'short'] },
  { name: 'Hats', keywords: ['hat', 'cap', 'beanie', 'bucket'] },
  { name: 'Accessories', keywords: ['bag', 'belt', 'bracelet', 'watch', 'wallet', 'ring', 'necklace', 'sunglass', 'accessory'] },
  { name: 'Sportswear', keywords: ['sport', 'jersey', 'gym', 'athletic', 'tracksuit'] }
];

const products = JSON.parse(fs.readFileSync('public/products_with_images.json', 'utf8'));

function getCategory(title) {
  const lower = title.toLowerCase();
  for (const cat of categories) {
    if (cat.keywords.some(k => lower.includes(k))) {
      return cat.name;
    }
  }
  return 'Other';
}

const updated = products.map(p => ({
  ...p,
  category: getCategory(p[""] || "")
}));

fs.writeFileSync('public/products_with_images.json', JSON.stringify(updated, null, 2));
console.log('✅ Categories added!');