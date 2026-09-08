import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve(
  'C:/Users/gaura/.cursor/projects/c-Users-gaura-Downloads-morin-propertys-main/assets',
);
const OUT_DIR = path.resolve('public/images/landings');

const IMAGE_MAP = [
  { out: 'rama-size-100.jpg', match: 'images_rama-size-100-' },
  { out: 'rama-size-125.jpg', match: 'images_rama-size-125-' },
  { out: 'rama-size-shop-56.jpg', match: 'images_rama-size-shop-56-' },
  { out: 'rama-olympic-park.jpg', match: 'images_rama-olympic-park-' },
  { out: 'lalita-price-now.jpg', match: 'images_lalita-price-now-' },
  { out: 'lalita-price-later.jpg', match: 'images_lalita-price-later-' },
  { out: 'lalita-amen-roads.jpg', match: 'images_lalita-amen-roads-' },
  { out: 'lalita-amen-parks.jpg', match: 'images_lalita-amen-parks-' },
  { out: 'lalita-amen-school.jpg', match: 'images_lalita-amen-school-' },
  { out: 'lalita-amen-shops.jpg', match: 'images_lalita-amen-shops-' },
  { out: 'lalita-amen-utilities.jpg', match: 'images_lalita-amen-utilities-' },
  { out: 'lalita-amen-rera.jpg', match: 'images_lalita-amen-rera-' },
  { out: 'vrinda-drive-delhi.jpg', match: 'images_vrinda-drive-delhi-' },
  { out: 'vrinda-drive-gurugram.jpg', match: 'images_vrinda-drive-gurugram-' },
];

function findSource(match) {
  const files = fs.readdirSync(ASSETS_DIR);
  const hit = files.find((name) => name.includes(match));
  if (!hit) throw new Error(`Missing source for ${match}`);
  return path.join(ASSETS_DIR, hit);
}

async function removeWatermark(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  const cropRight = Math.min(175, Math.round(width * 0.145));
  const cropBottom = Math.min(62, Math.round(height * 0.065));

  await sharp(inputPath)
    .extract({ left: 0, top: 0, width: width - cropRight, height: height - cropBottom })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPath);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const { out, match } of IMAGE_MAP) {
  const src = findSource(match);
  const dest = path.join(OUT_DIR, out);
  await removeWatermark(src, dest);
  console.log(`OK ${out} <- ${path.basename(src)}`);
}
