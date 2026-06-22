import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/'): Promise<void> {
    try {
      await this.page.goto(path);
    } catch (error) {
      throw new Error(`Failed to navigate to ${path}: ${error}`);
    }
  }

  async click(locator: Locator): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    } catch (error) {
      throw new Error(`Failed to click element: ${error}`);
    }
  }

  async fill(locator: Locator, value: string): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.fill(value);
    } catch (error) {
      throw new Error(`Failed to fill value '${value}': ${error}`);
    }
  }

  async type(locator: Locator, value: string): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.pressSequentially(value, { delay: 50 });
    } catch (error) {
      throw new Error(`Failed to type '${value}': ${error}`);
    }
  }

  async getText(locator: Locator): Promise<string> {
    try {
      await locator.waitFor({ state: 'visible' });
      return (await locator.textContent())?.trim() ?? '';
    } catch (error) {
      throw new Error(`Failed to get text: ${error}`);
    }
  }

  async getAllTexts(locator: Locator): Promise<string[]> {
    try {
      return await locator.allTextContents();
    } catch (error) {
      throw new Error(`Failed to get all texts: ${error}`);
    }
  }

  async isVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch (error) {
      throw new Error(`Failed to check visibility: ${error}`);
    }
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.selectOption(value);
    } catch (error) {
      throw new Error(`Failed to select option '${value}': ${error}`);
    }
  }

  async waitForUrl(urlPart: string | RegExp): Promise<void> {
    try {
      await this.page.waitForURL(urlPart);
    } catch (error) {
      throw new Error(`URL did not match expected value: ${error}`);
    }
  }

  async expectVisible(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeVisible();
    } catch (error) {
      throw new Error(`Element is not visible: ${error}`);
    }
  }

  async expectHidden(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeHidden();
    } catch (error) {
      throw new Error(`Element is not hidden: ${error}`);
    }
  }

  async expectText(locator: Locator, text: string | RegExp): Promise<void> {
    try {
      await expect(locator).toHaveText(text);
    } catch (error) {
      throw new Error(`Text validation failed. Expected: ${text}. Error: ${error}`);
    }
  }

  async expectCount(locator: Locator, count: number): Promise<void> {
    try {
      await expect(locator).toHaveCount(count);
    } catch (error) {
      throw new Error(`Count validation failed. Expected: ${count}. Error: ${error}`);
    }
  }

  async title(): Promise<string> {
    try {
      return await this.page.title();
    } catch (error) {
      throw new Error(`Failed to get page title: ${error}`);
    }
  }

  async takeScreenshot(name: string): Promise<void> {
    try {
      await this.page.screenshot({
        path: `test-results/screenshots/${name}.png`,
        fullPage: true,
      });
    } catch (error) {
      throw new Error(`Failed to capture screenshot '${name}': ${error}`);
    }
  }
}