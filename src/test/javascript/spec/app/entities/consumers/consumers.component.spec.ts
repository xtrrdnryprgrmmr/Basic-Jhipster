/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MixprojectTestModule } from '../../../test.module';
import { ConsumersComponent } from 'app/entities/consumers/consumers.component';
import { ConsumersService } from 'app/entities/consumers/consumers.service';
import { Consumers } from 'app/shared/model/consumers.model';

describe('Component Tests', () => {
    describe('Consumers Management Component', () => {
        let comp: ConsumersComponent;
        let fixture: ComponentFixture<ConsumersComponent>;
        let service: ConsumersService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MixprojectTestModule],
                declarations: [ConsumersComponent],
                providers: []
            })
                .overrideTemplate(ConsumersComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsumersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumersService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Consumers(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.consumers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
