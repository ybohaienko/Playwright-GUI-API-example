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
        let includesWhiskey: boolean = false;
        let includesBourbon: boolean = false;

        drinks.forEach(drink => {
            const strDrink = drink.strDrink.toLowerCase();
            if (strDrink.includes("whiskey")) {
                includesWhiskey = true;
                return;
            }
            if (strDrink.includes("bourbon")) {
                includesBourbon = true;
                return;
            }
        });

        expect(includesBourbon).toBeFalsy();
        expect(includesWhiskey).toBeFalsy();
    })

    test('check "vodka" presents in all cocktails in response body', async () => {
        let includesVodka: boolean = true;

        drinks.forEach(drink => {
            if (!drink.strDrink.toLowerCase().includes("vodka")) {
                includesVodka = false;
                return;
            }
        });

        expect(includesVodka).toBeTruthy();
    })

    test('check IT instruction presents in all cocktails in response body', async () => {
        let existsItInstruction: boolean = true;

        drinks.forEach(drink => {
            if (drink.strInstructionsIT === null) {
                existsItInstruction = false;
                return;
            }
        });

        expect(existsItInstruction).toBeTruthy();
    })

    test('check amount of cocktails is the same in multiple calls response body', async ({request}) => {
        const numCocktails = drinks.length;
        let sameNum: boolean = true;

        for (let i = 0; i < 10; i++) {
            const response = await request.get(url);
            const body = JSON.parse(await response.text());
            sameNum = numCocktails == body.drinks.length;
        }

        expect(sameNum).toBeTruthy();
    })
});
