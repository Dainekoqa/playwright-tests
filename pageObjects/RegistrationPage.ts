import { Page, expect } from '@playwright/test';

export class RegistrationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('/');
    }

    async openRegistrationForm() {
        await this.page.getByRole('button', { name: 'Sign up' }).click();
    }

    async fillRegistrationForm(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
        await this.page.locator('input[name="name"]').fill(name);
        await this.page.locator('input[name="lastName"]').fill(lastName);
        await this.page.locator('input[name="email"]').fill(email);
        await this.page.locator('input[name="password"]').fill(password);
        await this.page.locator('input[name="repeatPassword"]').fill(repeatPassword);
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }

    async checkRegistrationSuccess() {
        await expect(this.page).toHaveURL(/panel\/garage/);
    }

    async checkRegisterButtonDisabled() {
        await expect(this.page.getByRole('button', { name: 'Register' })).toBeDisabled();
    }

    async checkFieldInvalid(selector: string) {
        await expect(this.page.locator(selector)).toHaveClass(/ng-invalid/);
    }
}
