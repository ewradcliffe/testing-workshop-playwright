import {expect, test} from "@playwright/test";

test(`Radio Buttons Visible`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');
    // Ensure buttons are visible
    await expect(page.locator(`div.govuk-radios`))
        .toBeVisible(); 
});

test(`Header Visible`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');
    // Ensure header is visible
    await expect(page.locator(`h1.govuk-fieldset__heading`))
        .toBeVisible(); 
});

test(`Continue Button Visible`, async ({ page }) => {
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
    
    // Check the Yes funtionality
    await Promise.all([
        // Check Button
        page.getByLabel('Yes').check(),
        // Ensure Yes button is checked
        expect(page.getByLabel('Yes'))
            .toBeChecked(),
        // Ensure while yes checked, no uncheked
        expect(page.getByLabel('No'))
            .not.toBeChecked(),
    ]);
});

test(`Radio Button Unchecks Other Button`, async ({ page }) => {
    await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement/y');
    await page.getByLabel('Yes').check();
    await expect(page.getByLabel('No'))
        .not.toBeChecked();
    await page.getByLabel('No').check();
    await expect(page.getByLabel('Yes'))
        .not.toBeChecked();
});

test(`Irregular Hours Route`, async ({ page }) => {
    await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y");
    await page.getByLabel('Yes').check();

    await Promise.all([
        // Call waitForNavigation before clicking, to set up waiting.
        page.waitForURL("https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year"),
        // Click button
        page.getByRole('button', {name: 'Continue'}).click(),
    ]);
});

test(`Regular Hours Route`, async ({ page }) => {
    await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement/y");
    await page.getByLabel('No').check();
    
    await Promise.all([
        // Call waitForNavigation before clicking, to set up waiting.
        page.waitForURL("https://www.gov.uk/calculate-your-holiday-entitlement/y/regular"),
        
        // Click button
        page.getByRole('button', {name: 'Continue'}).click(),
    ]);
});