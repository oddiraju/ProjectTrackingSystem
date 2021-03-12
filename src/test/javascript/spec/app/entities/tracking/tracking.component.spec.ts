import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjectTrackingSystemTestModule } from '../../../test.module';
import { TrackingComponent } from 'app/entities/tracking/tracking.component';
import { TrackingService } from 'app/entities/tracking/tracking.service';
import { Tracking } from 'app/shared/model/tracking.model';

describe('Component Tests', () => {
  describe('Tracking Management Component', () => {
    let comp: TrackingComponent;
    let fixture: ComponentFixture<TrackingComponent>;
    let service: TrackingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjectTrackingSystemTestModule],
        declarations: [TrackingComponent],
      })
        .overrideTemplate(TrackingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tracking(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.trackings && comp.trackings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
