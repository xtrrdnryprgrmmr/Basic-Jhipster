import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPosts } from 'app/shared/model/posts.model';
import { Principal } from 'app/core';
import { PostsService } from './posts.service';

@Component({
    selector: 'jhi-posts',
    templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit, OnDestroy {
    posts: IPosts[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private postsService: PostsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.postsService.query().subscribe(
            (res: HttpResponse<IPosts[]>) => {
                this.posts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPosts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPosts) {
        return item.id;
    }

    registerChangeInPosts() {
        this.eventSubscriber = this.eventManager.subscribe('postsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
