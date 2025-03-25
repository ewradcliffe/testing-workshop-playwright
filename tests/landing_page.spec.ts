import {expect, test} from "@playwright/test";

test(`First test`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');

    // Ensure Header is visible
    await expect(page.locator(`.govuk-heading-xl`))
        .toBeVisible();  

    // Ensure Header has text
    await expect(page.locator(`.govuk-heading-xl`))
        .toHaveText(`Calculate holiday entitlement`);

  

    // Ensure "Start Now" button is visible
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');
    await expect(page.getByRole('button', {name: 'Start Now'}))
        .toBeVisible();
});

test('Button Redirects', async ({ page }) => {
    //Await pause 
    // await page.pause();
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');

    await Promise.all([
        // Call waitForNavigation before clicking, to set up waiting.
        page.waitForURL("https://www.gov.uk/calculate-your-holiday-entitlement/y"),
        // Click button
        page.getByRole('button', {name: 'Start Now'}).click(),
    ]);
});