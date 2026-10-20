import sharp from 'sharp';
const src = 'public/products/testers-banner.jpg';
const bottles = { icone: [385, 130], desire: [515, 130], her: [645, 130], 'soft-smoke': [775, 130], 'white-rose': [925, 240] };
for (const [name, [left, width]] of Object.entries(bottles)) {
  const piece = await sharp(src).extract({ left, top: 600, width, height: 510 }).resize({ height: 680 }).toBuffer();
  await sharp({ create: { width: 800, height: 800, channels: 3, background: '#ece5de' } })
    .composite([{ input: piece, gravity: 'center' }])
    .jpeg({ quality: 88 }).toFile(`public/products/${name}.jpg`);
}
