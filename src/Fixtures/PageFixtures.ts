import { test as base } from '@playwright/test';
import { LoginPage } from '../Pagess/Loginpage';


 
/**
 * Extends Playwright's base `test` with our Page Objects so every spec
 * file can simply destructure { loginPage, inventoryPage, ... } from the
 * test args instead of manually instantiating classes.
 */
type Pages = {
  loginPage: LoginPage;
  
};
 
export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
