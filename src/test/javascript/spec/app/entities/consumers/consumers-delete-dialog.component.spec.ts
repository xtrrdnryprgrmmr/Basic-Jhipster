/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MixprojectTestModule } from '../../../test.module';
import { ConsumersDeleteDialogComponent } from 'app/entities/consumers/consumers-delete-dialog.component';
import { ConsumersService } from 'app/entities/consumers/consumers.service';

describe('Component Tests', () => {
    describe('Consumers Management Delete Component', () => {
        let comp: ConsumersDeleteDialogComponent;
        let fixture: ComponentFixture<ConsumersDeleteDialogComponent>;
        let service: ConsumersService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MixprojectTestModule],
                declarations: [ConsumersDeleteDialogComponent]
            })
                .overrideTemplate(ConsumersDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsumersDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumersService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
