/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MixprojectTestModule } from '../../../test.module';
import { ConsumersUpdateComponent } from 'app/entities/consumers/consumers-update.component';
import { ConsumersService } from 'app/entities/consumers/consumers.service';
import { Consumers } from 'app/shared/model/consumers.model';

describe('Component Tests', () => {
    describe('Consumers Management Update Component', () => {
        let comp: ConsumersUpdateComponent;
        let fixture: ComponentFixture<ConsumersUpdateComponent>;
        let service: ConsumersService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MixprojectTestModule],
                declarations: [ConsumersUpdateComponent]
            })
                .overrideTemplate(ConsumersUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsumersUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumersService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Consumers(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.consumers = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Consumers();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.consumers = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
