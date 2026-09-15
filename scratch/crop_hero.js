const sharp = require('sharp');
const path = require('path');

async function processHero() {
  const inputPath = path.resolve(__dirname, '../client/public/images/hero-banner.png');
  const metadata = await sharp(inputPath).metadata();
  console.log('Original image metadata:', metadata);

  // In hero-banner.png (2017x780), the top navbar was approx 0-160px and the hero banner was approx 160-780px.
  // Let's crop the hero banner card cleanly:
  const banner = await sharp(inputPath)
    .extract({
      left: 30,
      top: 170,
      width: metadata.width - 60,
      height: metadata.height - 180,
    })
    .toFile(path.resolve(__dirname, '../client/public/images/hero_exact_banner.png'));

  console.log('Cropped hero_exact_banner.png:', banner);

  // Also crop the right side visual (woman with box and mint aura) for flexible responsive composition:
  const womanVisual = await sharp(inputPath)
    .extract({
      left: Math.floor(metadata.width * 0.52),
      top: 170,
      width: Math.floor(metadata.width * 0.48) - 30,
      height: metadata.height - 180,
    })
    .toFile(path.resolve(__dirname, '../client/public/images/hero_woman_visual.png'));

  console.log('Cropped hero_woman_visual.png:', womanVisual);
}

processHero().catch(console.error);
