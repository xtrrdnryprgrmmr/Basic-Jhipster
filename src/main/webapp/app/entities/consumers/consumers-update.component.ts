import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConsumers } from 'app/shared/model/consumers.model';
import { ConsumersService } from './consumers.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address';

@Component({
    selector: 'jhi-consumers-update',
    templateUrl: './consumers-update.component.html'
})
export class ConsumersUpdateComponent implements OnInit {
    consumers: IConsumers;
    isSaving: boolean;

    addresses: IAddress[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private consumersService: ConsumersService,
        private addressService: AddressService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ consumers }) => {
            this.consumers = consumers;
        });
        this.addressService.query().subscribe(
            (res: HttpResponse<IAddress[]>) => {
                this.addresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.consumers.id !== undefined) {
            this.subscribeToSaveResponse(this.consumersService.update(this.consumers));
        } else {
            this.subscribeToSaveResponse(this.consumersService.create(this.consumers));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsumers>>) {
        result.subscribe((res: HttpResponse<IConsumers>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAddressById(index: number, item: IAddress) {
        return item.id;
    }
}
