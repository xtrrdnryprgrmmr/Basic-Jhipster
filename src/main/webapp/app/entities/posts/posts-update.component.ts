import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPosts } from 'app/shared/model/posts.model';
import { PostsService } from './posts.service';
import { ConsumersService } from 'app/entities/consumers';

@Component({
    selector: 'jhi-posts-update',
    templateUrl: './posts-update.component.html'
})
export class PostsUpdateComponent implements OnInit {
    posts: IPosts;
    isSaving: boolean;
    isvalid: boolean;
    constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute, private consumersService: ConsumersService) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ posts }) => {
            this.posts = posts;
        });
    }

    previousState() {
        window.history.back();
    }
    save() {
        this.isSaving = true;
        if (this.posts.id !== undefined) {
            this.subscribeToSaveResponse(this.postsService.update(this.posts));
        } else {
            this.consumersService
                .find(this.posts.user)
                .toPromise()
                .then(res => {
                    if (this.posts.user === res.body.id) {
                        console.log(res.body.id + ' this is valid userid');
                        this.isvalid = true;
                        this.subscribeToSaveResponse(this.postsService.create(this.posts));
                    } else {
                        this.isvalid = false;
                        console.log('error happened invalid');
                    }
                });
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPosts>>) {
        result.subscribe((res: HttpResponse<IPosts>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        //  console.log('this is invalid user!!!');
    }
}
