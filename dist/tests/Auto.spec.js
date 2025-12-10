import { test } from '@playwright/test';
import { LoginPage } from '../Pages/Login';
import { config } from '../Utils/environment';
import { environment } from '../Utils/config';
let login;
test.beforeEach(async ({ page }) => {
    const env = environment;
    const { baseUrl } = config[env];
    console.log('Opening app...');
    await page.goto(baseUrl);
    login = new LoginPage(page);
});
test('Open login page', async () => {
    await login.goToLoginPage();
});
