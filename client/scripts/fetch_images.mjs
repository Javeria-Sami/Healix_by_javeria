import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const destDir = path.resolve('public/images/medicines');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed with status code: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HealixApp/1.0 (healthcare@healix.org)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed?.query?.pages || {};
          const results = Object.values(pages).map(p => p.imageinfo?.[0]?.url).filter(Boolean);
          resolve(results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  console.log("Searching Wikimedia Commons for medicine images...");
  const queries = [
    { name: 'brufen', q: 'Ibuprofen box packaging' },
    { name: 'zyrtec', q: 'Cetirizine packaging' },
    { name: 'surbex-z', q: 'Vitamin B complex bottle' },
    { name: 'gaviscon', q: 'Antacid liquid suspension bottle' },
    { name: 'concor', q: 'Bisoprolol box' },
    { name: 'calpol', q: 'Paracetamol syrup bottle' },
    { name: 'betnovate-n', q: 'Betamethasone cream tube' },
    { name: 'accu-chek', q: 'Blood glucose meter kit' },
    { name: 'neurobion', q: 'Neurobion Vitamin B box' },
    { name: 'voltarol', q: 'Diclofenac gel tube' },
    { name: 'cozaar', q: 'Losartan potassium box' },
    { name: 'sudocrem', q: 'Sudocrem tub' },
    { name: 'disprin', q: 'Aspirin soluble tablets box' },
    { name: 'flagyl', q: 'Metronidazole tablets box' }
  ];

  for (const item of queries) {
    const urls = await searchWikimedia(item.q);
    console.log(`Query "${item.q}": found ${urls.length} images -> ${urls[0] || 'none'}`);
  }
}

main();
