import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Consumers } from 'app/shared/model/consumers.model';
import { ConsumersService } from './consumers.service';
import { ConsumersComponent } from './consumers.component';
import { ConsumersDetailComponent } from './consumers-detail.component';
import { ConsumersUpdateComponent } from './consumers-update.component';
import { ConsumersDeletePopupComponent } from './consumers-delete-dialog.component';
import { IConsumers } from 'app/shared/model/consumers.model';

@Injectable({ providedIn: 'root' })
export class ConsumersResolve implements Resolve<IConsumers> {
    constructor(private service: ConsumersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Consumers> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Consumers>) => response.ok),
                map((consumers: HttpResponse<Consumers>) => consumers.body)
            );
        }
        return of(new Consumers());
    }
}

export const consumersRoute: Routes = [
    {
        path: 'consumers',
        component: ConsumersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mixprojectApp.consumers.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consumers/:id/view',
        component: ConsumersDetailComponent,
        resolve: {
            consumers: ConsumersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mixprojectApp.consumers.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consumers/new',
        component: ConsumersUpdateComponent,
        resolve: {
            consumers: ConsumersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mixprojectApp.consumers.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consumers/:id/edit',
        component: ConsumersUpdateComponent,
        resolve: {
            consumers: ConsumersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mixprojectApp.consumers.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consumersPopupRoute: Routes = [
    {
        path: 'consumers/:id/delete',
        component: ConsumersDeletePopupComponent,
        resolve: {
            consumers: ConsumersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mixprojectApp.consumers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
