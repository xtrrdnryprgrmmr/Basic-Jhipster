import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MixprojectAddressModule } from './address/address.module';
import { MixprojectConsumersModule } from './consumers/consumers.module';
import { MixprojectPostsModule } from './posts/posts.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        MixprojectAddressModule,
        MixprojectConsumersModule,
        MixprojectPostsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MixprojectEntityModule {}
