const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const ForgotPasswordPage = require("../pages/forgotpasswordPage.js");
const LoginPage = require("../pages/loginPage.js");
const testData = require("../fixtures/testData.json");
const fs = require("fs");
const path = require("path");
const screenshotDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

describe("nexmedis reset password test", function () {
  let driver;
  let browserName = "chrome";
  let forgotpasswordPage;
  let options = new chrome.Options();
  options.addArguments("--incognito");
  this.timeout(20000);

  beforeEach(async function () {
    driver = await new Builder()
      .forBrowser(browserName)
      .setChromeOptions(options)
      .build();
    loginPage = new LoginPage(driver);
    forgotpasswordPage = new ForgotPasswordPage(driver);

    await loginPage.open(testData.baseUrl);
  });

  it("TC008 - Reset password dengan format penulisan Email tidak valid", async function () {
    await loginPage.inputCompanyId(testData.validUser.companyId);
    await driver.sleep(2000);
    await forgotpasswordPage.assertEmailFormat(
      testData.invalidEmailFormat,
      "The button should be disabled"
    );
  });

  it("TC009 - Reset password Email yang tidak valid", async function () {
    await loginPage.inputCompanyId(testData.validUser.companyId);
    await driver.sleep(2000);
    await forgotpasswordPage.resetPassword(testData.invalidEmail.email);
    await driver.sleep(2000);
    await forgotpasswordPage.assertResetPassword(
      "user (wrong_email@test.com) not found",
      "Error massage not displayed properly"
    );
  });

  afterEach(async function () {
    const image = await driver.takeScreenshot();
    fs.writeFileSync(
      path.join(
        screenshotDir,
        `${this.test.title.replace(/[^a-zA-Z0-9-_]/g, "_")}.png`
      ),
      image,
      "base64"
    );
    await driver.quit();
  });
});
