import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MixprojectSharedModule } from 'app/shared';
import {
    PostsComponent,
    PostsDetailComponent,
    PostsUpdateComponent,
    PostsDeletePopupComponent,
    PostsDeleteDialogComponent,
    postsRoute,
    postsPopupRoute
} from './';

const ENTITY_STATES = [...postsRoute, ...postsPopupRoute];

@NgModule({
    imports: [MixprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PostsComponent, PostsDetailComponent, PostsUpdateComponent, PostsDeleteDialogComponent, PostsDeletePopupComponent],
    entryComponents: [PostsComponent, PostsUpdateComponent, PostsDeleteDialogComponent, PostsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MixprojectPostsModule {}
