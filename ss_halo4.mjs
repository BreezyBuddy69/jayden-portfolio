import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const dir = 'temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-'));
const indices = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
const next = indices.length ? Math.max(...indices) + 1 : 1;

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/mikus/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Skip splash via sessionStorage injection
await page.goto('http://localhost:8002', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.evaluate(() => sessionStorage.setItem('splash_seen', '1'));
await page.evaluate(() => location.reload());
await new Promise(r => setTimeout(r, 6000));
await page.screenshot({ path: path.join(dir, `screenshot-${next}-halo4-hero.png`) });
console.log(`Saved: screenshot-${next}-halo4-hero.png`);

// Second screenshot: intro animation in progress
await page.evaluate(() => location.reload());
await new Promise(r => setTimeout(r, 2200));
await page.screenshot({ path: path.join(dir, `screenshot-${next+1}-halo4-hero-early.png`) });
console.log(`Saved: screenshot-${next+1}-halo4-hero-early.png`);

await browser.close();
