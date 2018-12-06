import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MixprojectSharedModule } from 'app/shared';
import {
    ConsumersComponent,
    ConsumersDetailComponent,
    ConsumersUpdateComponent,
    ConsumersDeletePopupComponent,
    ConsumersDeleteDialogComponent,
    consumersRoute,
    consumersPopupRoute
} from './';

const ENTITY_STATES = [...consumersRoute, ...consumersPopupRoute];

@NgModule({
    imports: [MixprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsumersComponent,
        ConsumersDetailComponent,
        ConsumersUpdateComponent,
        ConsumersDeleteDialogComponent,
        ConsumersDeletePopupComponent
    ],
    entryComponents: [ConsumersComponent, ConsumersUpdateComponent, ConsumersDeleteDialogComponent, ConsumersDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MixprojectConsumersModule {}
