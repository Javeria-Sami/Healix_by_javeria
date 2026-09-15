import fs from 'fs';
import path from 'path';
import https from 'https';

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HealixHealthcare/1.0 (info@healix.org)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  const titles = [
    'Ibuprofen',
    'Cetirizine',
    'Diclofenac',
    'Paracetamol',
    'Sudocrem',
    'Aspirin',
    'Bisoprolol',
    'Glucose_meter',
    'Betamethasone',
    'Gaviscon'
  ];

  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=pageimages&piprop=original|thumbnail&pithumbsize=800&format=json`;
  const data = await fetchJson(url);
  console.log("Wikipedia images response:", JSON.stringify(data.query.pages, null, 2));
}

run();
