import { Page, Locator, expect } from '@playwright/test';
 
/**
 * BasePage centralizes common, reusable interactions so that individual
 * Page Objects stay thin and declarative. Every action waits for the
 * element to reach the required state before interacting with it, which
 * removes the need for manual/explicit waits scattered across tests.
 */
export abstract class BasePage {
  protected readonly page: Page;
 
  constructor(page: Page) {
    this.page = page;
  }
 
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }
 
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }
 
  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }
 
  async type(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.pressSequentially(value, { delay: 50 });
  }
 
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() ?? '';
  }
 
  async getAllTexts(locator: Locator): Promise<string[]> {
    return locator.allTextContents();
  }
 
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
 
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }
 
  async waitForUrl(urlPart: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPart);
  }
 
  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
 
  async expectHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }
 
  async expectText(locator: Locator, text: string | RegExp): Promise<void> {
    await expect(locator).toHaveText(text);
  }
 
  async expectCount(locator: Locator, count: number): Promise<void> {
    await expect(locator).toHaveCount(count);
  }
 
  async title(): Promise<string> {
    return this.page.title();
  }
 
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }
}
