import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('file.html', 'utf8');
const $ = cheerio.load(html);

let allText = $('body').text().trim();
let allImages = [];
$('img').each((i, img) => {
  const src = $(img).attr('src');
  if (src) allImages.push(src);
});

const output = {
  text: allText,
  images: allImages
};

fs.writeFileSync('everything.json', JSON.stringify(output, null, 2));
console.log('✅ Done! Everything extracted to everything.json');