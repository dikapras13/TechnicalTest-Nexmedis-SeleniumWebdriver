const { By } = require("selenium-webdriver"); // Mengimpor modul By dari Selenium WebDriver
const assert = require("assert"); // Mengimpor modul assert untuk melakukan validasi dalam pengujian

class ForgotPasswordPage {
  constructor(driver) {
    this.driver = driver;
    this.fieldEmail = By.xpath('//input[1]');
    this.btnForgotPassword = By.xpath('//a[.="Lupa Password?"]');
    this.btnReset = By.css(".btn");
    this.errorWrongEmail = By.css('.dialog-content');
  }

  async resetPassword(dataEmail) {
    await this.driver.findElement(this.btnForgotPassword).click();
    await this.driver.findElement(this.fieldEmail).sendKeys(dataEmail);
    await this.driver.findElement(this.btnReset).click();
  }

  async assertResetPassword(expectedErrorMessage, assertMessage) {
    const errorMassage = await this.driver.findElement(this.errorWrongEmail).getText();
    let assertResetPassword = await this.driver.findElement(this.errorWrongEmail);

    assert.strictEqual(await assertResetPassword.isDisplayed(), true, assertMessage);
    assert.strictEqual(errorMassage.includes(expectedErrorMessage),true,assertMessage);
  }
  async assertEmailFormat(dataEmail, assertMessage) {
    await this.driver.findElement(this.btnForgotPassword).click();
    await this.driver.findElement(this.fieldEmail).sendKeys(dataEmail);

    const buttonReset = await this.driver.findElement(this.btnReset);
    const isDisabled = await buttonReset.getAttribute('disabled');

    assert.ok(isDisabled !== null, assertMessage);
  }
  
}
module.exports = ForgotPasswordPage;
