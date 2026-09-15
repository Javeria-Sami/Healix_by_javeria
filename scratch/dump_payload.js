const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\moham\\.gemini\\antigravity-ide\\brain\\e6330042-99cd-4c2e-9328-1b645a014876\\.system_generated\\steps\\3558\\content.md', 'utf8');

const target = 'm_6aa4e3e9cb188191a31e961ea46ab76d';
let pos = 0;
while ((pos = html.indexOf(target, pos)) !== -1) {
  console.log(`Found at ${pos}:`);
  console.log(html.slice(pos - 200, pos + 1000));
  pos += target.length;
}
