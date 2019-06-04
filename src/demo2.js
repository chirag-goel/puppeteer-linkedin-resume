/**
 * This demo demonstrate registration form submission using puppeteer
 */
const puppeteer = require('puppeteer');

const FORM = {
    URL: 'https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_register_form',
    PASSWORD_SELECTOR: 'input[name="psw"]',
    REPEAT_PASSWORD_SELECTOR: 'input[name="psw-repeat"]',
    BUTTON_SELECTOR: '.registerbtn',
    EMAIL_SELECTOR: 'input[name="email"]',
};
const CREDENTIALS = {
    USERNAME: 'dummy@dummy.com',
    PASSWORD: 'dummy'
};

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(FORM.URL, {waitUntil: 'networkidle0'});

  /* This form is inside iframe, so we will using iframe reference. 
  You can use page reference if your form in not inside iframe.
  Example given in demo3.js */

  const frames = await page.frames();
  let iframe = frames.find(f => f.name() === 'iframeResult');

  const email = await iframe.$(FORM.EMAIL_SELECTOR);
  await email.click();
  await page.keyboard.type(CREDENTIALS.USERNAME);

  const password = await iframe.$(FORM.PASSWORD_SELECTOR);
  await password.click();
  await page.keyboard.type(CREDENTIALS.PASSWORD);

  const rPassword = await iframe.$(FORM.REPEAT_PASSWORD_SELECTOR);
  await rPassword.click();
  await page.keyboard.type(CREDENTIALS.PASSWORD);

  const button = await iframe.$(FORM.BUTTON_SELECTOR);
  await button.click();
  
  await page.waitFor(5*1000);
  await browser.close();
  
})();