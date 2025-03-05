import { test, expect } from '@playwright/test';

test('User can register successfully', async ({ page }) => {
    // Navigate to the website
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Fill in the registration form
    await page.locator('input[name="name"]').fill('Iryna');
    await page.locator('input[name="lastName"]').fill('Test');
    
    // Generate a unique email
    const email = `aqa-iryna+${Date.now()}@gmail.com`;
    await page.locator('input[name="email"]').fill(email);
    
    // Fill in the password fields
    await page.locator('input[name="password"]').fill('Test1234');
    await page.locator('input[name="repeatPassword"]').fill('Test1234');
    
    // Click the Register button
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Verify successful registration by checking the URL
    await expect(page).toHaveURL(/panel\/garage/);
});

test('Registration fails with empty fields', async ({ page }) => {
    // Navigate to the website and open the registration form
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();

    // Ensure the Register button is disabled
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    // Verify that all input fields are marked as invalid
    await expect(page.locator('input[name="name"]')).toHaveClass(/ng-invalid/);
    await expect(page.locator('input[name="lastName"]')).toHaveClass(/ng-invalid/);
    await expect(page.locator('input[name="email"]')).toHaveClass(/ng-invalid/);
    await expect(page.locator('input[name="password"]')).toHaveClass(/ng-invalid/);
    await expect(page.locator('input[name="repeatPassword"]')).toHaveClass(/ng-invalid/);
});

test('Registration fails with invalid email', async ({ page }) => {
    // Navigate to the website and open the registration form
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Fill in valid data except for the email
    await page.locator('input[name="name"]').fill('Iryna');
    await page.locator('input[name="lastName"]').fill('Test');
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.locator('input[name="password"]').fill('Test1234');
    await page.locator('input[name="repeatPassword"]').fill('Test1234');

    // Ensure the Register button is disabled
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    // Verify that the email field is marked as invalid
    await expect(page.locator('input[name="email"]')).toHaveClass(/ng-invalid/);
});

test('Registration fails with short password', async ({ page }) => {
    // Navigate to the website and open the registration form
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Fill in valid data except for the password (too short)
    await page.locator('input[name="name"]').fill('Iryna');
    await page.locator('input[name="lastName"]').fill('Test');
    await page.locator('input[name="email"]').fill(`aqa-iryna+${Date.now()}@gmail.com`);
    await page.locator('input[name="password"]').fill('T1');
    await page.locator('input[name="repeatPassword"]').fill('T1');

    // Ensure the Register button is disabled
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    // Verify that the password field is marked as invalid
    await expect(page.locator('input[name="password"]')).toHaveClass(/ng-invalid/);
});

test('Registration fails when passwords do not match', async ({ page }) => {
    // Navigate to the website and open the registration form
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Fill in valid data except for mismatched passwords
    await page.locator('input[name="name"]').fill('Iryna');
    await page.locator('input[name="lastName"]').fill('Test');
    await page.locator('input[name="email"]').fill(`aqa-iryna+${Date.now()}@gmail.com`);
    await page.locator('input[name="password"]').fill('Test1234');
    await page.locator('input[name="repeatPassword"]').fill('Qwerty123');

    // Ensure the Register button is disabled (fix for previous failure)
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
});

test('Registration fails with short name', async ({ page }) => {
    // Navigate to the website and open the registration form
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Fill in valid data except for a too short name
    await page.locator('input[name="name"]').fill('I');
    await page.locator('input[name="lastName"]').fill('RA');
    await page.locator('input[name="email"]').fill(`aqa-iryna+${Date.now()}@gmail.com`);
    await page.locator('input[name="password"]').fill('Qwerty123');
    await page.locator('input[name="repeatPassword"]').fill('Qwerty123');

    // Ensure the Register button is disabled
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    // Verify that the name field is marked as invalid
    await expect(page.locator('input[name="name"]')).toHaveClass(/ng-invalid/);
});
