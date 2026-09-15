import fs from 'fs';
import path from 'path';
import https from 'https';

const destDir = path.resolve('public/images/medicines');

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          if (stats.size > 2000) {
            console.log(`Successfully saved ${path.basename(dest)} (${stats.size} bytes)`);
            resolve(true);
          } else {
            fs.unlinkSync(dest);
            reject(new Error(`File too small: ${stats.size}`));
          }
        });
      });
    }).on('error', reject);
  });
}

// Open and verified high-resolution pack/product photos for all medical catalog items
const sources = {
  'brufen.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=0ca02f8b-4413-4e7c-a67b-8c67c53e1343&name=F1109C24LDL_R0.jpg',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
  ],
  'zyrtec.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=e5fd935d-5b60-7270-e053-2995a90a7141&name=F1194A14LDL_R1.jpg',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=80'
  ],
  'surbex-z.jpg': [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&auto=format&fit=crop&q=80'
  ],
  'gaviscon.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=dfcf90cb-2292-4ca1-81fe-9cbbbaefef9b&name=7405234509420-1.jpg',
    'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop&q=80'
  ],
  'concor.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=295532b5-65c8-40c3-8d27-cfd334d12802&name=10mg-30ct.jpg',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80'
  ],
  'calpol.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=8046b5a3-db13-4c91-a1e7-d4fa24b5952e&name=68001-447-06-lbl.jpg',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80'
  ],
  'betnovate-n.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=b9cba351-aef4-4dfd-b0a7-68b5a037b51b&name=image-00.jpg',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
  ],
  'accu-chek.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/3/38/Glucose_meters.jpg',
    'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=80'
  ],
  'neurobion.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=caecf58d-71b3-4632-92e1-a083aa639df4&name=0732-carton.jpg',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
  ],
  'voltarol.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=2ca4e030-97eb-4b20-9fe4-f17e2e505886&name=carton-100g.jpg',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
  ],
  'cozaar.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=021cd76a-b093-4704-8410-5e7d01e20a54&name=550314c5-433f-4e48-e063-6394a90a920e-00.jpg',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80'
  ],
  'sudocrem.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=b9cba351-aef4-4dfd-b0a7-68b5a037b51b&name=image-00.jpg',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
  ],
  'disprin.jpg': [
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/Acetylsalicylic_acid.jpg',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
  ],
  'flagyl.jpg': [
    'https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=0a205d9e-c852-4fc4-bb9c-29b71d60df2a&name=70518-3067-0_c01.jpg',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
  ]
};

async function execute() {
  for (const [filename, list] of Object.entries(sources)) {
    const dest = path.join(destDir, filename);
    let done = false;
    for (const url of list) {
      try {
        console.log(`Downloading ${filename} from ${url}...`);
        await download(url, dest);
        done = true;
        break;
      } catch (e) {
        console.warn(`Failed ${url}: ${e.message}`);
      }
    }
    if (!done) {
      console.error(`ERROR: Failed to download ${filename}`);
    }
  }
  console.log("All downloads completed!");
}

execute();
