import {test, expect} from '@playwright/test';

test.describe('REST API test', () => {
    const url: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka';
    let drinks: any;

    test.beforeAll(async ({request}) => {
        const response = await request.get(url);
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        drinks = body.drinks;
    });

    test('check no "whiskey" and "bourbon" in cocktails in response body', async () => {
        const includedWhiskeys = drinks.filter(drink =>
            drink
                .strDrink
                .toLowerCase()
                .includes('whiskey'));
        const includedBourbons = drinks.filter(drink =>
            drink
                .strDrink
                .toLowerCase()
                .includes('bourbon'));
        expect(!!includedWhiskeys.length).toBeFalsy();
        expect(!!includedBourbons.length).toBeFalsy();
    })

    test('check "vodka" presents in all cocktails in response body', async () => {
        const includedVodkas = drinks.filter(drink =>
            !drink
                .strDrink
                .toLowerCase()
                .includes('vodka'));
        expect(!!includedVodkas.length).toBeFalsy();
    })

    test('check IT instruction presents in all cocktails in response body', async () => {
        const existedItInstructions = drinks.filter(drink =>
            drink.strInstructionsIT === null);
        expect(!!existedItInstructions.length).toBeFalsy();
    })

    test('check amount of cocktails is the same in multiple calls response body', async ({request}) => {
        const numCocktails = drinks.length;
        const numOfTries = 3;
        let sameNum: boolean = true;

        for (let i = 0; i < numOfTries; i++) {
            const response = await request.get(url);
            const body = JSON.parse(await response.text());
            sameNum = numCocktails == body.drinks.length;
        }
        expect(sameNum).toBeTruthy();
    })
});
