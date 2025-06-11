const { expect } = require('@playwright/test');


export class LoginActions {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage(url) {
    await this.page.goto(url); // Navega para o baseURL
  }

}
