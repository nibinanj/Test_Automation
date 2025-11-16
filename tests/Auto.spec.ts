import { test, Page } from '@playwright/test';
import { LoginPage } from '../Pages/Login';
import { config } from '../Utils/environment';
import { environment } from '../Utils/config';

let page: Page;
let login: LoginPage;

test.beforeAll(async ({ browser }) => {
  const env = environment;
  const { baseUrl } = config[env];

  page = await browser.newPage();
  login = new LoginPage(page);

  console.log('Opening app...');
  await page.goto(baseUrl);
});

test('Open login page', async () => {
  await login.goToLoginPage();
});
