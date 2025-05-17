const {
    By
} = require("selenium-webdriver"); // Mengimpor modul By dari Selenium WebDriver
const assert = require('assert'); // Mengimpor modul assert untuk melakukan validasi dalam pengujian

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.fieldId = By.id('id');  // Locator untuk input id perusahaan    
        this.btnLanjut = By.css('.btn'); 
        this.fieldId = By.id('id');   
        this.fieldPassword = By.id('password');
        this.notifDanger =  By.css('.nex-notification__body');
        this.errorWrongId = By.css('.dialog-content');
        this.btnForgotPassword = By.xpath('//a[.="Lupa Password?"]');
    }

    // Membuka halaman dengan URL yang diberikan
    async open(url) {
        await this.driver.get(url);
    }

    async inputCompanyId(companyId) {
        await this.driver.findElement(this.fieldId).sendKeys(companyId);
        await this.driver.findElement(this.btnLanjut).click();
    }

    async login(dataEmail,dataPassword){
        await this.driver.findElement(this.fieldId).sendKeys(dataEmail);
        await this.driver.findElement(this.fieldPassword).sendKeys(dataPassword);
        await this.driver.sleep(5000);
        await this.driver.findElement(this.btnLanjut).click();
    }

    async forgotPassword(){
        await this.driver.findElement(this.btnForgotPassword).click();
    }

    async assertEmptyId(expectedErrorMessage,assertMessage){
        const errorMassage = await this.driver.findElement(this.notifDanger).getText();
        let notifEmptyId = await this.driver.findElement(this.notifDanger);

        assert.strictEqual(await notifEmptyId.isDisplayed(),true,assertMessage);
        assert.strictEqual( errorMassage.includes(expectedErrorMessage), true, assertMessage);
    }

    async assertWrongId(expectedErrorMessage,assertMessage){
        const errorMassage = await this.driver.findElement(this.errorWrongId).getText();
        let notifWrongId = await this.driver.findElement(this.errorWrongId);

        assert.strictEqual(await notifWrongId.isDisplayed(),true,assertMessage);
        assert.strictEqual( errorMassage.includes(expectedErrorMessage), true, assertMessage);
    }

    async assertEmptyLogin(expectedErrorMessage,assertMessage){
        const errorMassage = await this.driver.findElement(this.notifDanger).getText();
        let assertEmptyLogin = await this.driver.findElement(this.notifDanger);

        assert.strictEqual(await assertEmptyLogin.isDisplayed(),true,assertMessage);
        assert.strictEqual( errorMassage.includes(expectedErrorMessage), true, assertMessage);
    }

    async assertWrongPassword(expectedErrorMessage,assertMessage){
        const errorMassage = await this.driver.findElement(this.notifDanger).getText();
        let assertWrongPassword = await this.driver.findElement(this.notifDanger);

        console.log(errorMassage);
        assert.strictEqual(await assertWrongPassword.isDisplayed(),true,assertMessage);
        assert.strictEqual( errorMassage.includes(expectedErrorMessage), true, assertMessage);
    }

    async assertWrongEmail(expectedErrorMessage,assertMessage){
        const errorMassage = await this.driver.findElement(this.notifDanger).getText();
        let assertWrongEmail = await this.driver.findElement(this.notifDanger);

        console.log(errorMassage);
        assert.strictEqual(await assertWrongEmail.isDisplayed(),true,assertMessage);
        assert.strictEqual( errorMassage.includes(expectedErrorMessage), true, assertMessage);
    }

}

// nex-notification nex-notification--danger nex-notification__body

module.exports = LoginPage;