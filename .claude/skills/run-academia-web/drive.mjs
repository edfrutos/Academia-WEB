// Driver for Academia Web: launches headless Chromium and exercises the live search.
// Usage: serve the repo first (python3 -m http.server 8765), then `node drive.mjs`.
// Playwright lives in /tmp/node_modules in this environment and is CommonJS,
// so it must be imported via the default export (named `{ chromium }` fails).
import pkg from '/tmp/node_modules/playwright/index.js';
const { chromium } = pkg;

const URL = process.env.URL || 'http://localhost:8765/academiaWeb.html';
const OUT = process.env.OUT || '/tmp';

function visibleLis(page, sectionId) {
  return page.$$eval(`#${sectionId} li`, lis =>
    lis.filter(li => li.offsetParent !== null).map(li => li.textContent));
}
const sectionVisible = (page, id) =>
  page.$eval(`#${id}`, el => getComputedStyle(el).display !== 'none');
const marks = page => page.$$eval('mark', ms => ms.map(m => m.textContent));

const errors = [];
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));

await page.goto(URL, { waitUntil: 'load' });
await page.waitForSelector('text=Bienvenidos a la Academia Web');

const report = {};
report.inicial = {
  courses: await sectionVisible(page, 'courses'),
  tutorials: await sectionVisible(page, 'tutorials'),
  manuals: await sectionVisible(page, 'manuals'),
};
await page.screenshot({ path: `${OUT}/01-inicial.png`, fullPage: true });

const box = page.locator('input[type="text"]');
const buscar = async t => { await box.fill(t); await page.waitForTimeout(80); };

await buscar('html');
report.html = {
  courses: await visibleLis(page, 'courses'),
  tutorials: await visibleLis(page, 'tutorials'),
  manuals: await visibleLis(page, 'manuals'),
  marks: await marks(page),
};
await page.screenshot({ path: `${OUT}/02-html.png`, fullPage: true });

// Accent-insensitive: "basico" should match "JavaScript básico" and highlight the accented text.
await buscar('basico');
report.basico = {
  coursesVisibles: await visibleLis(page, 'courses'),
  marks: await marks(page),
  tutorialsVisible: await sectionVisible(page, 'tutorials'),
  manualsVisible: await sectionVisible(page, 'manuals'),
};
await page.screenshot({ path: `${OUT}/03-basico.png`, fullPage: true });

await buscar('zzz-no-existe');
report.sinResultados = {
  coursesVisible: await sectionVisible(page, 'courses'),
  tutorialsVisible: await sectionVisible(page, 'tutorials'),
  manualsVisible: await sectionVisible(page, 'manuals'),
};
await page.screenshot({ path: `${OUT}/04-vacio.png`, fullPage: true });

await buscar('');
report.limpio = { courses: await visibleLis(page, 'courses'), marks: await marks(page) };

report.consoleErrors = errors.length ? errors : 'none';
console.log(JSON.stringify(report, null, 2));
await browser.close();
