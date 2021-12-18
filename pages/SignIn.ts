import { Locator, Page } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly buttonSignIn: Locator;

    readonly url: string = 'index.php?controller=authentication&back=my-account';

    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.locator('#email');
        this.inputPassword = page.locator('#passwd');
        this.buttonSignIn = page.locator('#SubmitLogin');
    }

    async goTo() {
        await this.page.goto(this.url);
    }

    async signIn(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.buttonSignIn.click();
    }
}
