import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjectTrackingSystemTestModule } from '../../../test.module';
import { SDTMComponent } from 'app/entities/sdtm/sdtm.component';
import { SDTMService } from 'app/entities/sdtm/sdtm.service';
import { SDTM } from 'app/shared/model/sdtm.model';

describe('Component Tests', () => {
  describe('SDTM Management Component', () => {
    let comp: SDTMComponent;
    let fixture: ComponentFixture<SDTMComponent>;
    let service: SDTMService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjectTrackingSystemTestModule],
        declarations: [SDTMComponent],
      })
        .overrideTemplate(SDTMComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SDTMComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SDTMService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SDTM(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sDTMS && comp.sDTMS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
