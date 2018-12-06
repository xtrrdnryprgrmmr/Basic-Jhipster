/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MixprojectTestModule } from '../../../test.module';
import { PostsComponent } from 'app/entities/posts/posts.component';
import { PostsService } from 'app/entities/posts/posts.service';
import { Posts } from 'app/shared/model/posts.model';

describe('Component Tests', () => {
    describe('Posts Management Component', () => {
        let comp: PostsComponent;
        let fixture: ComponentFixture<PostsComponent>;
        let service: PostsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MixprojectTestModule],
                declarations: [PostsComponent],
                providers: []
            })
                .overrideTemplate(PostsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PostsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Posts(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.posts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
