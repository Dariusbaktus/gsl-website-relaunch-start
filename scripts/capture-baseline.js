const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'tablet', width: 768, height: 1024, deviceScaleFactor: 2 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 3 },
];

const PAGES = [
  'home',
  'leistungen',
  'fahrplaene',
  'ladungen',
  'news',
  'team',
  'kontakt',
  'ueberblick',
];

const OUTPUT_DIR = path.resolve(__dirname, '../screenshots/baseline');
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
    console.log(`\n=== Capturing viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.deviceScaleFactor,
    });

    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

    for (const pageId of PAGES) {
      console.log(`  Capturing page: ${pageId}`);
      await page.evaluate((id) => {
        if (typeof window.go === 'function') {
          window.go(id);
        }
      }, pageId);

      // Give a moment for layout/animations
      await new Promise((r) => setTimeout(r, 200));

      const filename = path.join(OUTPUT_DIR, `${pageId}-${vp.name}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`    Saved: ${filename}`);
    }

    // Also capture a news detail article
    console.log(`  Capturing page: news-detail`);
    await page.evaluate(() => {
      const firstPost = document.querySelector('[data-beitrag="0"]');
      if (firstPost) {
        firstPost.click();
      }
    });
    await new Promise((r) => setTimeout(r, 200));
    const articleFilename = path.join(OUTPUT_DIR, `news-detail-${vp.name}.png`);
    await page.screenshot({ path: articleFilename, fullPage: true });
    console.log(`    Saved: ${articleFilename}`);

    await page.close();
  }

  await browser.close();
  console.log('\nAll baseline screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
