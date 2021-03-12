import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SDTMService } from 'app/entities/sdtm/sdtm.service';
import { ISDTM, SDTM } from 'app/shared/model/sdtm.model';

describe('Service Tests', () => {
  describe('SDTM Service', () => {
    let injector: TestBed;
    let service: SDTMService;
    let httpMock: HttpTestingController;
    let elemDefault: ISDTM;
    let expectedResult: ISDTM | ISDTM[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SDTMService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SDTM(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            completionDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SDTM', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            completionDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            completionDate: currentDate,
          },
          returnedFromService
        );

        service.create(new SDTM()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SDTM', () => {
        const returnedFromService = Object.assign(
          {
            datasetName: 'BBBBBB',
            title: 'BBBBBB',
            programName: 'BBBBBB',
            programmer: 'BBBBBB',
            completionDate: currentDate.format(DATE_TIME_FORMAT),
            validationMethod: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            completionDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SDTM', () => {
        const returnedFromService = Object.assign(
          {
            datasetName: 'BBBBBB',
            title: 'BBBBBB',
            programName: 'BBBBBB',
            programmer: 'BBBBBB',
            completionDate: currentDate.format(DATE_TIME_FORMAT),
            validationMethod: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            completionDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SDTM', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
