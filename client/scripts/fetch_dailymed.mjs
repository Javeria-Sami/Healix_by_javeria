import fs from 'fs';
import path from 'path';
import https from 'https';

async function queryDailyMed(drugName) {
  const url = `https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=${encodeURIComponent(drugName)}&page=1&pagesize=5`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'HealixApp/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const spls = json.data || [];
          resolve(spls.map(s => s.setid));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function getDailyMedImages(setid) {
  const url = `https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${setid}/media.json`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'HealixApp/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const media = json.data?.media || [];
          resolve(media.map(m => m.url));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  console.log("Testing DailyMed NLM API...");
  const drugs = ['ibuprofen', 'cetirizine', 'losartan', 'metronidazole', 'bisoprolol'];
  for (const d of drugs) {
    const setids = await queryDailyMed(d);
    console.log(`Drug ${d}: found setids ${setids.length}`);
    if (setids[0]) {
      const media = await getDailyMedImages(setids[0]);
      console.log(`Media for ${d}:`, media.slice(0, 3));
    }
  }
}

main();
