import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsumers } from 'app/shared/model/consumers.model';
import { Principal } from 'app/core';
import { ConsumersService } from './consumers.service';
import { PostsService } from 'app/entities/posts';

@Component({
    selector: 'jhi-consumers',
    templateUrl: './consumers.component.html'
})
export class ConsumersComponent implements OnInit, OnDestroy {
    consumers: IConsumers[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private consumersService: ConsumersService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private ps: PostsService
    ) {}

    loadAll() {
        this.consumersService.query().subscribe(
            (res: HttpResponse<IConsumers[]>) => {
                this.consumers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    //    async load() { await this.ps.find().toPromise().then( res => { this.dto = res.body[0]; console.log(this.dto); }); }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConsumers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConsumers) {
        return item.id;
    }

    registerChangeInConsumers() {
        this.eventSubscriber = this.eventManager.subscribe('consumersListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
