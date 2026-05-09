import puppeteer from 'puppeteer'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'

const SCREENSHOTS_DIR = './temporary screenshots'
const PORT = 3005
const BASE_URL = `http://localhost:${PORT}`

const SECTIONS = [
  'hero',
  'skills',
  'automations',
  'editing',
  'arsenal',
  'testimonials',
  'about',
  'contact',
]

function nextIndex() {
  if (!existsSync(SCREENSHOTS_DIR)) mkdirSync(SCREENSHOTS_DIR, { recursive: true })
  const files = readdirSync(SCREENSHOTS_DIR).filter(f => f.match(/^screenshot-\d+/))
  if (files.length === 0) return 1
  const nums = files.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0'))
  return Math.max(...nums) + 1
}

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/mikus/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

// Bypass splash gate before page loads
await page.evaluateOnNewDocument(() => {
  sessionStorage.setItem('splash_seen', '1')
})

await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 })

// Wait for React to hydrate and first section to animate in
await new Promise(r => setTimeout(r, 2500))

let idx = nextIndex()

for (let i = 0; i < SECTIONS.length; i++) {
  const name = SECTIONS[i]
  const filename = join(SCREENSHOTS_DIR, `screenshot-${idx}-${name}.png`)

  // Wait for section animations to settle
  await new Promise(r => setTimeout(r, i === 0 ? 0 : 1800))

  await page.screenshot({ path: filename, fullPage: false })
  console.log(`Saved: screenshot-${idx}-${name}.png`)
  idx++

  // Navigate to next section (except after last)
  if (i < SECTIONS.length - 1) {
    await page.keyboard.press('ArrowDown')
    // Wait for debounce + transition
    await new Promise(r => setTimeout(r, 1200))
  }
}

await browser.close()
console.log('Done.')
