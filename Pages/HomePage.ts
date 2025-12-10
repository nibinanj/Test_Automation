import{Locator, Page } from '@playwright/test'

export class HomePage {
    page: Page;


    //Locator varible
    private readonly product:Locator;
    private readonly cart:Locator;

    async homepagevalidation(){
      await this.navigateToProduct();
      await this.navigateToCartPage();
    }


    //Constructor - will assign locators to varibles
    constructor(page: Page) {             
       this.page = page;
       this.product=page.locator('a[href="/products"]');
       this.cart=page.getByRole('link', { name: 'Cart' });
    }

    //Action Method
    async navigateToProduct(){
      try{
         await this.product.click();
         console.log('Navigated to Product Page:', this.page.url());
      }catch(error){
         console.error('Error navigating to Product Page:', error);
      }
    }
    async navigateToCartPage(){
        try{
            await this.cart.click();
            console.log('Navigated to Cart Page:', this.page.url());
        }catch(error){
            console.log("Error navigating to Cart Page:", error);
        }
    }
}
