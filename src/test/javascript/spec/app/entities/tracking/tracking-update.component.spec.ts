import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjectTrackingSystemTestModule } from '../../../test.module';
import { TrackingUpdateComponent } from 'app/entities/tracking/tracking-update.component';
import { TrackingService } from 'app/entities/tracking/tracking.service';
import { Tracking } from 'app/shared/model/tracking.model';

describe('Component Tests', () => {
  describe('Tracking Management Update Component', () => {
    let comp: TrackingUpdateComponent;
    let fixture: ComponentFixture<TrackingUpdateComponent>;
    let service: TrackingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjectTrackingSystemTestModule],
        declarations: [TrackingUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TrackingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tracking(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tracking();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
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
