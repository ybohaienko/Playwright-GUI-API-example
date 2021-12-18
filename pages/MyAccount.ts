import {expect, Locator, Page} from '@playwright/test';

export class MyAccountPage {
    readonly page: Page;
    readonly btnSignOut: Locator;

    public url: string = 'index.php?controller=my-account';
    public urlSighOut: string = 'index.php?mylogout=';

    constructor(page: Page) {
        this.page = page;
        this.btnSignOut = page.locator('.logout');
    }

    async goTo() {
        await this.page.goto(this.url);
    }

    async signOutViaGui() {
        await this.btnSignOut.click();
    }

    async signOutViaUrl() {
        await this.page.goto(this.urlSighOut);
    }
}