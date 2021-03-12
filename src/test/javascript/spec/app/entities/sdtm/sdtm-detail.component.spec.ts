import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectTrackingSystemTestModule } from '../../../test.module';
import { SDTMDetailComponent } from 'app/entities/sdtm/sdtm-detail.component';
import { SDTM } from 'app/shared/model/sdtm.model';

describe('Component Tests', () => {
  describe('SDTM Management Detail Component', () => {
    let comp: SDTMDetailComponent;
    let fixture: ComponentFixture<SDTMDetailComponent>;
    const route = ({ data: of({ sDTM: new SDTM(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjectTrackingSystemTestModule],
        declarations: [SDTMDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SDTMDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SDTMDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sDTM on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sDTM).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
