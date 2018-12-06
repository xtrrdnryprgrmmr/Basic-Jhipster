/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MixprojectTestModule } from '../../../test.module';
import { ConsumersDetailComponent } from 'app/entities/consumers/consumers-detail.component';
import { Consumers } from 'app/shared/model/consumers.model';

describe('Component Tests', () => {
    describe('Consumers Management Detail Component', () => {
        let comp: ConsumersDetailComponent;
        let fixture: ComponentFixture<ConsumersDetailComponent>;
        const route = ({ data: of({ consumers: new Consumers(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MixprojectTestModule],
                declarations: [ConsumersDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConsumersDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsumersDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.consumers).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
