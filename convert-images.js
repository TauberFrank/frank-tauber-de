const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'img');

fs.readdirSync(imgDir)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  .forEach(async (file) => {
    const input = path.join(imgDir, file);
    const output = path.join(imgDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    try {
      await sharp(input)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output);
      console.log(`OK: ${file} -> ${path.basename(output)}`);
    } catch (err) {
      console.error(`FAIL: ${file} — ${err.message}`);
    }
  });
