import { element, by, ElementFinder } from 'protractor';

export class ConsumersComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-consumers div table .btn-danger'));
    title = element.all(by.css('jhi-consumers div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ConsumersUpdatePage {
    pageTitle = element(by.id('jhi-consumers-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    emailInput = element(by.id('field_email'));
    phoneInput = element(by.id('field_phone'));
    websitesInput = element(by.id('field_websites'));
    adressSelect = element(by.id('field_adress'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async setWebsitesInput(websites) {
        await this.websitesInput.sendKeys(websites);
    }

    async getWebsitesInput() {
        return this.websitesInput.getAttribute('value');
    }

    async adressSelectLastOption() {
        await this.adressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async adressSelectOption(option) {
        await this.adressSelect.sendKeys(option);
    }

    getAdressSelect(): ElementFinder {
        return this.adressSelect;
    }

    async getAdressSelectedOption() {
        return this.adressSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ConsumersDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-consumers-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-consumers'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
