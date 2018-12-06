import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsumers } from 'app/shared/model/consumers.model';

@Component({
    selector: 'jhi-consumers-detail',
    templateUrl: './consumers-detail.component.html'
})
export class ConsumersDetailComponent implements OnInit {
    consumers: IConsumers;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ consumers }) => {
            this.consumers = consumers;
        });
    }

    previousState() {
        window.history.back();
    }
}
