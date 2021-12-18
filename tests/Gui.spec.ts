import {test, expect} from '@playwright/test';
import {SignInPage} from '../pages/SignIn';
import {MyAccountPage} from '../pages/MyAccount';

const testUserEmail = 'valeriw384@wolfpat.com';
const testUserPassword = 'testpass';

test.describe.parallel('GUI test', () => {
    let signInPage: any;
    let myAccountPage: any;

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        signInPage = new SignInPage(page);
        myAccountPage = new MyAccountPage(page);
    });

    test.beforeEach(async ({page}) => {
        await signInPage.goTo();
        await signInPage.signIn(testUserEmail, testUserPassword);
        await expect(page).toHaveURL(myAccountPage.url);
    });

    test('Sign out via GUI success', async ({page}) => {
        await myAccountPage.signOutViaGui();
        await expect(page).toHaveURL(signInPage.url);
    });

    test('Sign out via URL success', async ({page}) => {
        await myAccountPage.signOutViaUrl();
        await expect(page).not.toHaveURL(signInPage.url);

        await myAccountPage.goTo();
        await expect(page).not.toHaveURL(myAccountPage.url);
    });
})

