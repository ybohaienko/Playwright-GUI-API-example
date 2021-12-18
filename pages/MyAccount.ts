import {Locator, Page} from '@playwright/test';

export class MyAccountPage {
    readonly page: Page;
    readonly buttonSignOut: Locator;

    readonly url: string = 'index.php?controller=my-account';
    readonly urlSighOut: string = 'index.php?mylogout=';

    constructor(page: Page) {
        this.page = page;
        this.buttonSignOut = page.locator('.logout');
    }

    async goTo() {
        await this.page.goto(this.url);
    }

    async signOutViaGui() {
        await this.buttonSignOut.click();
    }

    async signOutViaUrl() {
        await this.page.goto(this.urlSighOut, {waitUntil: 'domcontentloaded'});
    }
}
