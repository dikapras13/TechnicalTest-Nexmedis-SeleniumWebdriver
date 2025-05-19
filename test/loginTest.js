const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/loginPage.js");
const testData = require("../fixtures/testData.json");
const fs = require("fs");
const path = require("path");
const screenshotDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

describe("nexmedis login test", function () {
  let driver;
  let blank = "";
  let browserName = "chrome";
  let loginPage;
  let options = new chrome.Options();
  options.addArguments("--incognito");
  this.timeout(20000);

  beforeEach(async function () {
    driver = await new Builder()
      .forBrowser(browserName)
      .setChromeOptions(options)
      .build();
    loginPage = new LoginPage(driver);

    await loginPage.open(testData.baseUrl);
  });

  it("TC001 - Login dengan Credentials  yang valid", async function () {
    await loginPage.inputCompanyId(testData.validUser.companyId);
    await driver.sleep(3000);
    await loginPage.login(
      testData.validUser.email,
      testData.validUser.password
    );
  });

  it("TC002 - Login dengan field ID Perusahaan kosong", async function () {
    await loginPage.inputCompanyId(blank);
    await loginPage.assertEmptyId(
      "Please fill your channel id",
      "Error massage not displayed properly"
    );
  });

  it("TC003 - Login dengan ID Perusahaan tidak valid", async function () {
    await loginPage.inputCompanyId(testData.invalidCompanyId);
    await driver.sleep(3000);
    await loginPage.assertWrongId(
      "ID Organisasi/Perusahaan tidak valid. Silahkan ulangi kembali.",
      "Error massage not displayed properly"
    );
  });

  it("TC004 - Login dengan field Email dan/atau Password kosong", async function () {
    await loginPage.inputCompanyId(testData.validUser.companyId);
    await driver.sleep(5000);
    await loginPage.login(blank, blank);
    await loginPage.assertEmptyLogin(
      "Semua input field wajib diisi",
      "Error massage not displayed properly"
    );
  });

  it("TC005 - Login dengan Password tidak valid", async function () {
    await loginPage.inputCompanyId(testData.validUser.companyId);
    await driver.sleep(5000);
    await loginPage.login(
      testData.invalidPassword.email,
      testData.invalidPassword.password
    );
    await driver.sleep(2000);
    await loginPage.assertWrongPassword(
      "Invalid password.",
      "Error massage not displayed properly"
    );
  });

  it("TC006 - Login dengan Email tidak valid", async function () {
    await loginPage.inputCompanyId(testData.validUser.companyId);
    await driver.sleep(5000);
    await loginPage.login(
      testData.invalidEmail.email,
      testData.invalidEmail.password
    );
    await driver.sleep(2000);
    await loginPage.assertWrongEmail(
      "Login Failed - The username or password you entered is incorrect.",
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
