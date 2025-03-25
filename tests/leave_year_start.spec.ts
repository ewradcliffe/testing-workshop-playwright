import {expect, test} from "@playwright/test";

test(`test when does the leave year start page renders`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year');

    // Ensure Header is visible
    await expect(page.locator(`.govuk-fieldset__heading`))
        .toBeVisible();  

    // Ensure Header has text
    await expect(page.locator(`.govuk-fieldset__heading`))
        .toHaveText(`When does the leave year start?`);

    // Ensure date input form is visible.
    await expect(page.locator(`.govuk-date-input`))
        .toBeVisible(); 
});


test('Date can be entered', async ({ page }) => {
    // Get and populate page
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year');
    await page.getByLabel("Day").fill("03"),
    await page.getByLabel("Month").fill("03"),
    await page.getByLabel("Year").fill("2025"),

    await Promise.all([
        // Call waitForNavigation before clicking, to set up waiting.
        page.waitForURL("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2025-03-03"),

        // Click Continue button
        page.getByRole('button', {name: 'Continue'}).click(),
    ]);
});