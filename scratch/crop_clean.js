const sharp = require('sharp');
const path = require('path');

async function cropClean() {
  const inputPath = path.resolve(__dirname, '../client/public/images/hero-banner.png');
  const metadata = await sharp(inputPath).metadata();

  // Extract woman with background, leaving out the outer right arrow
  const woman = await sharp(inputPath)
    .extract({
      left: Math.floor(metadata.width * 0.48),
      top: 170,
      width: Math.floor(metadata.width * 0.52) - 35,
      height: metadata.height - 180,
    })
    .toFile(path.resolve(__dirname, '../client/public/images/hero_woman_clean.png'));

  console.log('Cropped hero_woman_clean.png:', woman);
}

cropClean().catch(console.error);
