'use strict';
const { chromium } = require('playwright');
const { mkdir, readFile, writeFile } = require('node:fs/promises');
const { createHash } = require('node:crypto');
const path = require('node:path');
(async () => {
  const output = process.env.CAPTURE_OUTPUT || '/tmp/heirs-captures';
  await mkdir(output, { recursive: true });
  const inputs = {};
  for (const f of ['index.html', 'style.css', 'game/main.js', 'game/core.js'])
    inputs[f] = createHash('sha256').update(await readFile(f)).digest('hex');
  const browser = await chromium.launch({ headless: true, ...(process.env.LOCAL_CHROME ? { executablePath: process.env.LOCAL_CHROME } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1, locale: 'en-US', reducedMotion: 'reduce' });
    await page.addInitScript(() => { let s = 1234; Math.random = () => ((s = Math.imul(s, 1664525) + 1013904223 >>> 0) / 4294967296); });
    await page.goto('http://127.0.0.1:4302/', { waitUntil: 'domcontentloaded' });
    await page.locator('#heirs button').first().click();
    await page.keyboard.down('d'); await page.waitForTimeout(8000); await page.keyboard.up('d');
    await page.keyboard.press('e'); await page.waitForTimeout(500);
    await page.keyboard.down('d'); await page.keyboard.down('j'); await page.waitForTimeout(1100); await page.keyboard.up('d');
    await page.locator('#game').screenshot({ path: path.join(output, 'heirs-01.png'), animations: 'disabled', timeout: 120000 });
    await page.waitForTimeout(900); await page.keyboard.up('j'); await page.keyboard.press('l'); await page.waitForTimeout(200);
    await page.locator('#game').screenshot({ path: path.join(output, 'heirs-02.png'), animations: 'disabled', timeout: 120000 });
    await writeFile(path.join(output, 'capture.json'), JSON.stringify({ schemaVersion: 1, workflowCommit: process.env.GITHUB_SHA || null, sourceCommit: process.env.GAME_SOURCE_COMMIT || null, runId: process.env.GITHUB_RUN_ID || null, url: 'http://127.0.0.1:4302/', inputs, browser: browser.version(), viewport: { width: 1280, height: 1000 }, seed: 1234, screenshots: ['heirs-01.png', 'heirs-02.png'] }, null, 2) + '\n');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
