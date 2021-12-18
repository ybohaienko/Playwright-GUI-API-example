import { expect, Locator, Page } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly nptEmail: Locator;
    readonly nptPassword: Locator;
    readonly btnSignIn: Locator;

    readonly url: string = 'index.php?controller=authentication&back=my-account';

    constructor(page: Page) {
        this.page = page;
        this.nptEmail = page.locator('#email');
        this.nptPassword = page.locator('#passwd');
        this.btnSignIn = page.locator('#SubmitLogin');
    }

    async goTo() {
        await this.page.goto(this.url);
    }

    async signIn(email: string, password: string) {
        await this.nptEmail.fill(email);
        await this.nptPassword.fill(password);
        await this.btnSignIn.click();
    }
}