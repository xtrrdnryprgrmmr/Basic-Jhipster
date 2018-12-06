/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsumersComponentsPage, ConsumersDeleteDialog, ConsumersUpdatePage } from './consumers.page-object';

const expect = chai.expect;

describe('Consumers e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let consumersUpdatePage: ConsumersUpdatePage;
    let consumersComponentsPage: ConsumersComponentsPage;
    let consumersDeleteDialog: ConsumersDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Consumers', async () => {
        await navBarPage.goToEntity('consumers');
        consumersComponentsPage = new ConsumersComponentsPage();
        expect(await consumersComponentsPage.getTitle()).to.eq('mixprojectApp.consumers.home.title');
    });

    it('should load create Consumers page', async () => {
        await consumersComponentsPage.clickOnCreateButton();
        consumersUpdatePage = new ConsumersUpdatePage();
        expect(await consumersUpdatePage.getPageTitle()).to.eq('mixprojectApp.consumers.home.createOrEditLabel');
        await consumersUpdatePage.cancel();
    });

    it('should create and save Consumers', async () => {
        const nbButtonsBeforeCreate = await consumersComponentsPage.countDeleteButtons();

        await consumersComponentsPage.clickOnCreateButton();
        await promise.all([
            consumersUpdatePage.setNameInput('name'),
            consumersUpdatePage.setEmailInput('email'),
            consumersUpdatePage.setPhoneInput('5'),
            consumersUpdatePage.setWebsitesInput('websites'),
            consumersUpdatePage.adressSelectLastOption()
        ]);
        expect(await consumersUpdatePage.getNameInput()).to.eq('name');
        expect(await consumersUpdatePage.getEmailInput()).to.eq('email');
        expect(await consumersUpdatePage.getPhoneInput()).to.eq('5');
        expect(await consumersUpdatePage.getWebsitesInput()).to.eq('websites');
        await consumersUpdatePage.save();
        expect(await consumersUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await consumersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Consumers', async () => {
        const nbButtonsBeforeDelete = await consumersComponentsPage.countDeleteButtons();
        await consumersComponentsPage.clickOnLastDeleteButton();

        consumersDeleteDialog = new ConsumersDeleteDialog();
        expect(await consumersDeleteDialog.getDialogTitle()).to.eq('mixprojectApp.consumers.delete.question');
        await consumersDeleteDialog.clickOnConfirmButton();

        expect(await consumersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
