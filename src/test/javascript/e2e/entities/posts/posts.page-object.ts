import { element, by, ElementFinder } from 'protractor';

export class PostsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-posts div table .btn-danger'));
    title = element.all(by.css('jhi-posts div h2#page-heading span')).first();

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

export class PostsUpdatePage {
    pageTitle = element(by.id('jhi-posts-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    bodyInput = element(by.id('field_body'));
    userInput = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setBodyInput(body) {
        await this.bodyInput.sendKeys(body);
    }

    async getBodyInput() {
        return this.bodyInput.getAttribute('value');
    }

    async setUserInput(user) {
        await this.userInput.sendKeys(user);
    }

    async getUserInput() {
        return this.userInput.getAttribute('value');
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

export class PostsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-posts-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-posts'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
