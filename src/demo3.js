/**
 * This demo demonstrate advance usage of puppeteer, 
 * by generate resume from linkedIn in pdf format
 */

const puppeteer = require('puppeteer');

const FORM = {
    USERNAME_SELECTOR: '#username',
    PASSWORD_SELECTOR: '#password',
    BUTTON_SELECTOR: '.btn__primary--large.from__button--floating',
    PROFILE_SELECTOR: 'a[data-control-name="identity_profile_photo"]'
};

const CREDS = {
    USERNAME: '<USERNAME>',
    PASSWORD: '<PASSWORD>'
};

const LINKEDIN_URL = 'https://www.linkedin.com/login?trk=guest_homepage-basic_nav-header-signin';

(async () => {
  const browser = await puppeteer.launch(); 
  const page = await browser.newPage();
  await page.goto(LINKEDIN_URL, {waitUntil: 'networkidle0'});
  await page.click(FORM.USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.USERNAME);

  await page.click(FORM.PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.PASSWORD);

  await page.click(FORM.BUTTON_SELECTOR);

  await page.waitForNavigation();
  await page.click(FORM.PROFILE_SELECTOR);
  await page.waitForNavigation();

  // Start - Advanced filtering
  await autoScroll(page);
  await removeUnnecessaryDom(page);
  await handleShowSeeMore(page);
  await page.waitFor(3*1000);
  await handleShowSeeMore(page);
  await hideSeeLessAndIcon(page);
  await page.waitFor(5*1000);
  // End - Advanced filtering

  await page.pdf({path: 'resume/resume.pdf', format: 'A4'});
  await page.screenshot({path: 'resume/resume.png', fullPage: true});
  await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function handleShowSeeMore(page) {
    await page.evaluate(() => {
        const seeMoreSelectors = [
            '.pv-profile-section__see-more-inline.pv-profile-section__text-truncate-toggle.link',
            '.lt-line-clamp__more',
            '.pv-profile-section__card-action-bar.pv-skills-section__additional-skills'
        ];
        seeMoreSelectors.forEach(seeMoreSelector => {
            const seeMoreSelectorDoms = document.querySelectorAll(seeMoreSelector);
            seeMoreSelectorDoms.forEach(seeMoreSelectorDom => {
                if (!seeMoreSelectorDom.classList.contains('ember-view')) {
                    seeMoreSelectorDom.click();
                }
            });
        });
    })
}

async function hideSeeLessAndIcon (page) {
    await page.evaluate(() => {
        const seeLessAndIconSelectors = [
            '.lt-line-clamp__less',
            '.pv-profile-section__see-less-inline'
        ];
        seeLessAndIconSelectors.forEach(seeLessAndIconSelector => {
            const seeLessAndIconSelectorDoms = document.querySelectorAll(seeLessAndIconSelector);
            seeLessAndIconSelectorDoms.forEach(seeLessAndIconSelectorDom => {
                seeLessAndIconSelectorDom.style.display = 'none';
            });
        });
    })
}
async function removeUnnecessaryDom(page) {
    await page.evaluate(() => { 
        // Hide all unnecessary contents
        const selectors = [
            '.pv-content__right-rail',
            '.pv-profile-sticky-header',
            '.pv-dashboard-section',
            '.pv-recent-activity-section-v2',
            'footer',
            'header#extended-nav',
            '.pv-top-card-v2-section__actions',
            'li-icon',
            '.pv-skills-section__add-text',
            'button[data-control-name="view_hub"]',
            'a[data-control-name="view_interest_details"]',
            '.pv-profile-section__card-action-bar.pv-skills-section__additional-skills',
            '.ad-banner-container',
            '.pv-top-card-v2-section__link--contact-info',
            '.pv-top-card-v2-section__link--connections',
            'a[data-control-name="edit_position"]',
            'artdeco-tablist',
            '.pv-recommendations-section__pending-rec',
            '.pv-recommendations-section__rec-action-secondary',
            '#msg-overlay'
        ];
        selectors.forEach(selector => {
            let selectorDoms = document.querySelectorAll(selector);
            selectorDoms.forEach(selectorDom => {
                selectorDom.style.display = 'none';
                selectorDom.innerHTML = '';
                selectorDom.className = '';
                selectorDom.id = '';
                selectorDom.opacity = 0;
            })
        })

        // Make main content full width
        let mainContainer = document.querySelector('.core-rail');
        mainContainer.style.width = '100%';
      })
}