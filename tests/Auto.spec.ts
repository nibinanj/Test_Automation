import { test, Page } from '@playwright/test';
import { LoginPage } from '../Pages/Login';
import { config } from '../Utils/environment';
import { environment } from '../Utils/config';
import { HomePage } from '../Pages/HomePage';

let login: LoginPage;

test.beforeEach(async ({ page }) => {
  const env = environment;
  const { baseUrl } = config[env];

  console.log('Open login page...');
  await page.goto(baseUrl);

  login = new LoginPage(page);
});

test('verify user is able to navigate to pages', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.homepagevalidation();
});
