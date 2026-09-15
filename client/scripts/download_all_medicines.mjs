import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const destDir = path.resolve('public/images/medicines');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(destDir, filename);
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => {
          const stats = fs.statSync(dest);
          if (stats.size < 1000) {
            fs.unlinkSync(dest);
            return reject(new Error(`File too small: ${stats.size} bytes`));
          }
          console.log(`Saved ${filename} (${stats.size} bytes)`);
          resolve(true);
        });
      });
    });
    req.on('error', (e) => reject(e));
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout on ${url}`));
    });
  });
}

// We map candidate URLs from high-reliability pharmaceutical CDNs / open medical repositories
const candidates = {
  'brufen.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/I05582/brufen-400mg-strip-of-15-tablets-2-1671740926.jpg',
    'https://assets.dvago.pk/product-images/1000300.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/b/r/bru0038.jpg',
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=0ca02f8b-4413-4e7c-a67b-8c67c53e1343&name=F1109C24LDL_R0.jpg'
  ],
  'zyrtec.jpg': [
    'https://images.apollo247.in/pub/media/catalog/product/z/y/zyr0002_1.jpg',
    'https://cdn01.pharmeasy.in/dam/products_otc/191225/zyrtec-10mg-tablet-10s-2-1671741123.jpg',
    'https://assets.dvago.pk/product-images/1001400.jpg',
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=e5fd935d-5b60-7270-e053-2995a90a7141&name=F1194A14LDL_R1.jpg'
  ],
  'surbex-z.jpg': [
    'https://assets.dvago.pk/product-images/1001280.jpg',
    'https://dawaai.pk/storage/products/1001280/1001280-1.jpg',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  ],
  'gaviscon.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/082725/gaviscon-double-action-liquid-peppermint-150ml-2-1671740789.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/g/a/gav0011.jpg',
    'https://assets.dvago.pk/product-images/1000550.jpg'
  ],
  'concor.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/047125/concor-5mg-tablet-10s-2-1671740801.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/c/o/con0005.jpg',
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=295532b5-65c8-40c3-8d27-cfd334d12802&name=10mg-30ct.jpg'
  ],
  'calpol.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/034225/calpol-120mg-pept-susp-60ml-2-1671740700.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/c/a/cal0008.jpg',
    'https://assets.dvago.pk/product-images/1000320.jpg'
  ],
  'betnovate-n.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/024725/betnovate-n-cream-20gm-2-1671740689.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/b/e/bet0025.jpg',
    'https://assets.dvago.pk/product-images/1000210.jpg'
  ],
  'accu-chek.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/I00620/accu-chek-guide-glucometer-kit-with-10-strips-free-2-1671741543.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/a/c/acc0021.jpg',
    'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&auto=format&fit=crop&q=80'
  ],
  'neurobion.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/123125/neurobion-forte-tablet-30s-2-1671740954.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/n/e/neu0008.jpg',
    'https://assets.dvago.pk/product-images/1000890.jpg'
  ],
  'voltarol.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/183125/voveran-emulgel-50gm-2-1671741098.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/v/o/vov0003.jpg',
    'https://assets.dvago.pk/product-images/1001350.jpg'
  ],
  'cozaar.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/048825/covance-50mg-tablet-10s-2-1671740810.jpg',
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=021cd76a-b093-4704-8410-5e7d01e20a54&name=550314c5-433f-4e48-e063-6394a90a920e-00.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/l/o/los0005.jpg'
  ],
  'sudocrem.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/I40410/sudocrem-antiseptic-healing-cream-125g-2-1671744111.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/s/u/sud0001.jpg',
    'https://assets.dvago.pk/product-images/1001250.jpg'
  ],
  'disprin.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/061225/disprin-regular-350mg-effervescent-tablet-10s-2-1671740845.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/d/i/dis0002.jpg',
    'https://assets.dvago.pk/product-images/1000410.jpg'
  ],
  'flagyl.jpg': [
    'https://cdn01.pharmeasy.in/dam/products_otc/073325/flagyl-400mg-tablet-15s-2-1671740878.jpg',
    'https://images.apollo247.in/pub/media/catalog/product/f/l/fla0004.jpg',
    'https://assets.dvago.pk/product-images/1000500.jpg'
  ]
};

async function run() {
  for (const [filename, urls] of Object.entries(candidates)) {
    let success = false;
    for (const url of urls) {
      try {
        console.log(`Trying ${filename} from ${url}...`);
        await downloadImage(url, filename);
        success = true;
        break;
      } catch (err) {
        console.warn(`Failed ${url}: ${err.message}`);
      }
    }
    if (!success) {
      console.error(`Could not download ${filename}`);
    }
  }
}

run();
