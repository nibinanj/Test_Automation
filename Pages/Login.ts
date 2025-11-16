import { Page } from "@playwright/test";
import { environment } from "../Utils/config"; 
import { config } from "../Utils/environment";

export class LoginPage {
    page: Page;
    baseUrl: string;
    
    constructor(page: Page) {
    this.page = page;
    const env = environment;
    this.baseUrl = config[env].baseUrl;
    }

    async goToLoginPage(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
    console.log('Login page loaded:', this.page.url());
  }
}