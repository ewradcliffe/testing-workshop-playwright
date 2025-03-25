import {expect, test} from "@playwright/test";

test(`Radio Buttons Are Visible`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');

    // Ensure buttons are visible
    await expect(page.locator(`div.govuk-radios`))
        .toBeVisible(); 
});

test(`Header Is Visible`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');

    // Ensure header is visible
    await expect(page.locator(`h1.govuk-fieldset__heading`))
        .toBeVisible(); 
});

test(`Continue Button Is Visible`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');

    // Ensure button is visible
    await expect(page.getByRole('button', {name: 'Continue'}))
        .toBeVisible();
});

test(`Radio Buttons Start Unchecked`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');

    // Ensure both buttons start unchecked
    await Promise.all([
        expect(page.getByLabel('Yes'))
            .not.toBeChecked(),
        expect(page.getByLabel('No'))
            .not.toBeChecked(),
    ]);
});

test(`Radio Buttons Check When Clicked`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');

    // Check No leaves Yes unchecked
    await Promise.all([
        // Tick "No" Button
        page.getByLabel('No').check(),
        // Ensure No button is checked
        expect(page.getByLabel('No'))
            .toBeChecked(),
        // Ensure while No checked, Yes unchecked
        expect(page.getByLabel('Yes')).not
            .toBeChecked(),      
    ]);
    
    // Check the Yes leaves No unchecked
    await Promise.all([
        // Check Button
        page.getByLabel('Yes').check(),
        // Ensure Yes button is checked
        expect(page.getByLabel('Yes'))
            .toBeChecked(),
        // Ensure while Yes checked, No uncheked
        expect(page.getByLabel('No'))
            .not.toBeChecked(),
    ]);
});

test(`Radio Button Unchecks Other Button`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');

    // Check Yes box
    await page.getByLabel('Yes').check();
    // Assert No is unchecked
    await expect(page.getByLabel('No'))
        .not.toBeChecked();
    // Now check No box
    await page.getByLabel('No').check();
    // And assert Yes is now unchkecked
    await expect(page.getByLabel('Yes'))
        .not.toBeChecked();
});

test(`Irregular Hours Route`, async ({ page }) => {
    await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y");

    // Check Yes box
    await page.getByLabel('Yes').check();
    await Promise.all([
        page.waitForURL("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year"),
        // Click Continue button
        page.getByRole('button', {name: 'Continue'}).click(),
    ]);
});

test(`Regular Hours Route`, async ({ page }) => {
    await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y");

    // Check No box
    await page.getByLabel('No').check();
    await Promise.all([
        page.waitForURL("https://www.gov.uk/calculate-your-holiday-entitlement/y/regular"),
        // Click Continue button
        page.getByRole('button', {name: 'Continue'}).click(),
    ]);
});