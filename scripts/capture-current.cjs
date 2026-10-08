const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'tablet', width: 768, height: 1024, deviceScaleFactor: 2 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 3 },
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'leistungen', path: '/leistungen' },
  { name: 'fahrplaene', path: '/fahrplaene' },
  { name: 'ladungen', path: '/ladungen' },
  { name: 'news', path: '/news' },
  { name: 'news-detail', path: '/news/warum-ich-als-neue-hier-schreibe' },
  { name: 'team', path: '/team' },
  { name: 'kontakt', path: '/kontakt' },
  { name: 'ueberblick', path: '/ueberblick' },
];

const OUTPUT_DIR = path.resolve(__dirname, '../screenshots/current');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Capturing Next.js viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.deviceScaleFactor,
    });

    for (const route of ROUTES) {
      console.log(`  Capturing route: ${route.name} (${route.path})`);
      await page.goto(`http://localhost:3002${route.path}`, { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 400));

      const filename = path.join(OUTPUT_DIR, `${route.name}-${vp.name}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`    Saved: ${filename}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('\nAll current Next.js screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error capturing Next.js screenshots:', err);
  process.exit(1);
});
