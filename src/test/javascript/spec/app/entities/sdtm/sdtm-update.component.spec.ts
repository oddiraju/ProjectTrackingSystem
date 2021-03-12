import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjectTrackingSystemTestModule } from '../../../test.module';
import { SDTMUpdateComponent } from 'app/entities/sdtm/sdtm-update.component';
import { SDTMService } from 'app/entities/sdtm/sdtm.service';
import { SDTM } from 'app/shared/model/sdtm.model';

describe('Component Tests', () => {
  describe('SDTM Management Update Component', () => {
    let comp: SDTMUpdateComponent;
    let fixture: ComponentFixture<SDTMUpdateComponent>;
    let service: SDTMService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjectTrackingSystemTestModule],
        declarations: [SDTMUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SDTMUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SDTMUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SDTMService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SDTM(123);
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
        const entity = new SDTM();
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
