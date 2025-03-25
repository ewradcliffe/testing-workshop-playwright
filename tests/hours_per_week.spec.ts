import {expect, test} from "@playwright/test";

test(`Hours per week page renders`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2025-03-03');

    // Ensure Header is visible
    await expect(page.locator(`.govuk-label-wrapper`))
        .toBeVisible();  

    // Ensure Header has text
    await expect(page.locator(`.govuk-label-wrapper`))
        .toHaveText(`How many hours has the employee worked in the pay period?`);

    // Ensure date input form is visible.
    await expect(page.locator(`.govuk-input`))
        .toBeVisible();
});


test('Hors per week can be entered', async ({ page }) => {
    // Get and populate page
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2025-03-03');
    await page.locator(".govuk-input").fill("37.5");


    await Promise.all([
        // Call waitForURL before clicking, to set up waiting.
        page.waitForURL("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2025-03-03/37.5"),

        // Click Continue button
        page.getByRole('button', {name: 'Continue'}).click(),
    ]);
});