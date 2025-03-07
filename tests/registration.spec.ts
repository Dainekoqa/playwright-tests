import { test } from '@playwright/test';
import { RegistrationPage } from '../pageObjects/RegistrationPage';

test('User can register successfully', async ({ page }) => {
    const registration = new RegistrationPage(page);
    
    await registration.navigate();
    await registration.openRegistrationForm();
    
    const email = `aqa-iryna+${Date.now()}@gmail.com`;
    await registration.fillRegistrationForm('Iryna', 'Test', email, 'Test1234', 'Test1234');
    
    await registration.submit();
    await registration.checkRegistrationSuccess();
});

test('Registration fails with empty fields', async ({ page }) => {
    const registration = new RegistrationPage(page);

    await registration.navigate();
    await registration.openRegistrationForm();

    await registration.checkRegisterButtonDisabled();

    await registration.checkFieldInvalid('input[name="name"]');
    await registration.checkFieldInvalid('input[name="lastName"]');
    await registration.checkFieldInvalid('input[name="email"]');
    await registration.checkFieldInvalid('input[name="password"]');
    await registration.checkFieldInvalid('input[name="repeatPassword"]');
});

test('Registration fails with invalid email', async ({ page }) => {
    const registration = new RegistrationPage(page);

    await registration.navigate();
    await registration.openRegistrationForm();
    
    await registration.fillRegistrationForm('Iryna', 'Test', 'invalid-email', 'Test1234', 'Test1234');
    
    await registration.checkRegisterButtonDisabled();
    await registration.checkFieldInvalid('input[name="email"]');
});

test('Registration fails with short password', async ({ page }) => {
    const registration = new RegistrationPage(page);

    await registration.navigate();
    await registration.openRegistrationForm();
    
    const email = `aqa-iryna+${Date.now()}@gmail.com`;
    await registration.fillRegistrationForm('Iryna', 'Test', email, 'T1', 'T1');

    await registration.checkRegisterButtonDisabled();
    await registration.checkFieldInvalid('input[name="password"]');
});

test('Registration fails when passwords do not match', async ({ page }) => {
    const registration = new RegistrationPage(page);

    await registration.navigate();
    await registration.openRegistrationForm();
    
    const email = `aqa-iryna+${Date.now()}@gmail.com`;
    await registration.fillRegistrationForm('Iryna', 'Test', email, 'Test1234', 'Qwerty123');

    await registration.checkRegisterButtonDisabled();
});

test('Registration fails with short name', async ({ page }) => {
    const registration = new RegistrationPage(page);

    await registration.navigate();
    await registration.openRegistrationForm();
    
    const email = `aqa-iryna+${Date.now()}@gmail.com`;
    await registration.fillRegistrationForm('I', 'RA', email, 'Qwerty123', 'Qwerty123');

    await registration.checkRegisterButtonDisabled();
    await registration.checkFieldInvalid('input[name="name"]');
});
