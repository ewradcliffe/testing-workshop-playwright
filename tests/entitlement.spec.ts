import {expect, test} from "@playwright/test";

test(`Entitlement page test`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/2025-03-03/37.5');

    // Ensure Header is visible
    await expect(page.locator(`.govuk-caption-xl`))
        .toBeVisible();  

    // Ensure Header has text
    await expect(page.locator(`.govuk-caption-xl`))
        .toHaveText(`Calculate holiday entitlement:`);
});