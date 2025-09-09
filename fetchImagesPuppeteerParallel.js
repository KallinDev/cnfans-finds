// Node.js script using Puppeteer to fetch product images in parallel batches
// Usage: npm install puppeteer
//        node fetchImagesPuppeteerParallel.js

import fs from 'fs';
import puppeteer from 'puppeteer';

const INPUT_FILE = 'public/products.json';
const OUTPUT_FILE = 'public/products_with_images.json';
const BATCH_SIZE = 10; // Number of parallel browsers (adjust for your system)
const SAVE_INTERVAL = 20; // Save every 20 products
const DELAY_MS = 500; // Delay between batches (ms)

const products = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
const total = products.length;

async function getImage(url) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('.product-main-image', { timeout: 15000 });
    const imageUrl = await page.$eval('.product-main-image', img => img.src);
    await browser.close();
    return imageUrl;
  } catch (e) {
    if (browser) await browser.close();
    return '';
  }
}

async function processBatch(batch, startIdx) {
  const results = await Promise.all(
    batch.map(async (product) => {
      product.image = await getImage(product['__2']);
      console.log(`Fetched image for: ${product['']}`);
      return product;
    })
  );
  // Save progress
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products.slice(0, startIdx + results.length), null, 2));
  console.log(`Progress saved: ${startIdx + results.length} products`);
}

async function main() {
  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    await processBatch(batch, i);
    if (i + BATCH_SIZE < total) {
      await new Promise(res => setTimeout(res, DELAY_MS));
    }
  }
  console.log('✅ Done! Saved to ' + OUTPUT_FILE);
}

main();