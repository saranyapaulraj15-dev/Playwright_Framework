# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login functionality
- Location: src\runnertests\login.spec.ts:4:5

# Error details

```
Error: Playwright Test did not expect test.beforeEach() to be called here.
Most common reasons include:
- You are calling test.beforeEach() in a configuration file.
- You are calling test.beforeEach() in a file that is imported by the configuration file.
- You have two different versions of @playwright/test. This usually happens
  when one of the dependencies in your package.json depends on @playwright/test.
- You are calling test.beforeEach() from an async test.describe() block. Only sync ones are supported.
```

# Test source

```ts
  1  | import { test, expect } from '../Fixtures/PageFixtures';
  2  | import { users } from '../utils/testData';
  3  | 
  4  | test('Login functionality', () => {
  5  | 
> 6  |   test.beforeEach(async ({ loginPage }) => {
     |        ^ Error: Playwright Test did not expect test.beforeEach() to be called here.
  7  |     await loginPage.open();
  8  |   });
  9  | 
  10 |   test('should login successfully with a valid standard user @smoke', async ({
  11 |     loginPage,
  12 |     page,
  13 |   }) => {
  14 |     await loginPage.login(
  15 |       users.standard.username,
  16 |       users.standard.password
  17 |     );
  18 | 
  19 |     await expect(page).toHaveURL(/inventory.html/);
  20 |   });
  21 | 
  22 |   test('should show an error for a locked out user @regression', async ({
  23 |     loginPage,
  24 |   }) => {
  25 |     await loginPage.login(
  26 |       users.locked.username,
  27 |       users.locked.password
  28 |     );
  29 | 
  30 |     const error = await loginPage.getErrorMessage();
  31 |     expect(error).toContain('locked out');
  32 |   });
  33 | 
  34 |   test('should show an error for invalid credentials @regression', async ({
  35 |     loginPage,
  36 |   }) => {
  37 |     await loginPage.login(
  38 |       users.invalid.username,
  39 |       users.invalid.password
  40 |     );
  41 | 
  42 |     const error = await loginPage.getErrorMessage();
  43 |     expect(error).toContain('do not match');
  44 |   });
  45 | 
  46 |   test('should show an error when fields are left empty @regression', async ({
  47 |     loginPage,
  48 |   }) => {
  49 |     await loginPage.login('', '');
  50 | 
  51 |     const error = await loginPage.getErrorMessage();
  52 |     expect(error).toContain('Username is required');
  53 |   });
  54 | 
  55 | });
```