import fs from 'fs';
import puppeteer from 'puppeteer';

const INPUT_FILE = 'products_with_images_new.json';
const OUTPUT_FILE = 'products_with_images_scraped.json';
const MAX_PARALLEL = 10; // concurrency

// universal sleep helper
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function extractGeiliImageFromPage(page) {
  const url = await page.evaluate(() => {
    const re = /(?:https?:)?\/\/si\.geilicdn\.com[^"'\s>]+/i;
    const attrNames = [
      'src',
      'srcset',
      'data-src',
      'data-original',
      'data-lazy',
      'data-srcset',
      'data-ks-lazyload',
      'data-echo'
    ];
    const nodes = Array.from(
      document.querySelectorAll(
        'img, source, [style], [data-src], [data-original], [picture], a'
      )
    );

    for (const el of nodes) {
      for (const a of attrNames) {
        try {
          const val = el.getAttribute && el.getAttribute(a);
          if (val) {
            const m = val.match(re);
            if (m) return m[0].startsWith('//') ? 'https:' + m[0] : m[0];
          }
        } catch (e) {}
      }
      try {
        const style = el.getAttribute && el.getAttribute('style');
        if (style) {
          const urlMatch = style.match(/url\((['"]?)(.*?)\1\)/i);
          if (urlMatch && /si\.geilicdn\.com/i.test(urlMatch[2])) {
            return urlMatch[2].startsWith('//') ? 'https:' + urlMatch[2] : urlMatch[2];
          }
        }
      } catch (e) {}
    }

    const html = document.documentElement.innerHTML;
    const m = html.match(re);
    if (m) return m[0].startsWith('//') ? 'https:' + m[0] : m[0];

    return '';
  });

  return url || '';
}

async function scrapeImageWithPage(browser, product, index, total) {
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    );
    await page.setViewport({ width: 1200, height: 800 });
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    await page.goto(product.link, { waitUntil: 'networkidle2', timeout: 45000 });
    await sleep(3000 + Math.random() * 3000);

    const imageUrl = await extractGeiliImageFromPage(page);

    console.log(`[${index + 1}/${total}] Scraped: ${product.link} → ${imageUrl ? '✅ Found image' : '❌ No image'}`);

    await page.close();
    return { ...product, image: imageUrl || '' };
  } catch (err) {
    console.error(`[${index + 1}/${total}] Error scraping ${product.link}:`, err.message || err);
    try { await page.close(); } catch {}
    return { ...product, image: '' };
  }
}

async function main() {
  const products = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));

  const seen = new Set();
  let dedup = products.filter(
    (p) => p.link && !seen.has(p.link) && (seen.add(p.link), true)
  );

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const results = [];

  // write initial empty array to file
  fs.writeFileSync(OUTPUT_FILE, '[]', 'utf-8');

  for (let i = 0; i < dedup.length; i += MAX_PARALLEL) {
    const batch = dedup.slice(i, i + MAX_PARALLEL);
    const scraped = await Promise.all(
      batch.map((p, idx) => scrapeImageWithPage(browser, p, i + idx, dedup.length))
    );
    results.push(...scraped);

    // update file after each batch
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
  }

  await browser.close();
  console.log('✅ Done, wrote', OUTPUT_FILE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
