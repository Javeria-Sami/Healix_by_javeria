const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\moham\\.gemini\\antigravity-ide\\brain\\e6330042-99cd-4c2e-9328-1b645a014876\\.system_generated\\steps\\3558\\content.md', 'utf8');

// Find all occurrences of image or text
const imgRegex = /https:\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp)/gi;
const imgs = html.match(imgRegex) || [];
console.log('Images found:', [...new Set(imgs)]);

// Let's search for prompt or user text or dall-e prompts
const jsonBlocks = html.match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
for (let j of jsonBlocks) {
  console.log('JSON block:', j.slice(0, 300));
}

// Let's check text around "Healix Healthcare Hero Banner"
let idx = html.indexOf('Healix Healthcare Hero Banner');
while (idx !== -1) {
  console.log('Context around title:', html.slice(Math.max(0, idx - 100), Math.min(html.length, idx + 500)));
  idx = html.indexOf('Healix Healthcare Hero Banner', idx + 1);
}
