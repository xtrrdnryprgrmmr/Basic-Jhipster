/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PostsComponentsPage, PostsDeleteDialog, PostsUpdatePage } from './posts.page-object';

const expect = chai.expect;

describe('Posts e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let postsUpdatePage: PostsUpdatePage;
    let postsComponentsPage: PostsComponentsPage;
    let postsDeleteDialog: PostsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Posts', async () => {
        await navBarPage.goToEntity('posts');
        postsComponentsPage = new PostsComponentsPage();
        expect(await postsComponentsPage.getTitle()).to.eq('mixprojectApp.posts.home.title');
    });

    it('should load create Posts page', async () => {
        await postsComponentsPage.clickOnCreateButton();
        postsUpdatePage = new PostsUpdatePage();
        expect(await postsUpdatePage.getPageTitle()).to.eq('mixprojectApp.posts.home.createOrEditLabel');
        await postsUpdatePage.cancel();
    });

    it('should create and save Posts', async () => {
        const nbButtonsBeforeCreate = await postsComponentsPage.countDeleteButtons();

        await postsComponentsPage.clickOnCreateButton();
        await promise.all([
            postsUpdatePage.setTitleInput('title'),
            postsUpdatePage.setBodyInput('body'),
            postsUpdatePage.setUserInput('5')
        ]);
        expect(await postsUpdatePage.getTitleInput()).to.eq('title');
        expect(await postsUpdatePage.getBodyInput()).to.eq('body');
        expect(await postsUpdatePage.getUserInput()).to.eq('5');
        await postsUpdatePage.save();
        expect(await postsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await postsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Posts', async () => {
        const nbButtonsBeforeDelete = await postsComponentsPage.countDeleteButtons();
        await postsComponentsPage.clickOnLastDeleteButton();

        postsDeleteDialog = new PostsDeleteDialog();
        expect(await postsDeleteDialog.getDialogTitle()).to.eq('mixprojectApp.posts.delete.question');
        await postsDeleteDialog.clickOnConfirmButton();

        expect(await postsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
