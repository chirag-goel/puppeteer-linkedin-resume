/**
 * Launch puppeteer and open a new window. Set viewport to 1000px*700px, 
 * go to my website and wait for 5seconds before closing it.
 */

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 1366,
    height: 700
  });
  await page.goto('http://www.chirag-goel.in');
  setTimeout(async () => {
    await browser.close();
  }, 10000);
})();