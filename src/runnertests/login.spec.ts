import { test, expect } from '../Fixtures/PageFixtures';
import { users } from '../utils/testData';

test.describe('Login functionality', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should login successfully with a valid standard user @smoke', async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show an error for a locked out user @regression', async ({
    loginPage,
  }) => {
    await loginPage.login(
      users.locked.username,
      users.locked.password
    );

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('should show an error for invalid credentials @regression', async ({
    loginPage,
  }) => {
    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('do not match');
  });

  test('should show an error when fields are left empty @regression', async ({
    loginPage,
  }) => {
    await loginPage.login('', '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

});