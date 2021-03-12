import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TrackingService } from 'app/entities/tracking/tracking.service';
import { ITracking, Tracking } from 'app/shared/model/tracking.model';

describe('Service Tests', () => {
  describe('Tracking Service', () => {
    let injector: TestBed;
    let service: TrackingService;
    let httpMock: HttpTestingController;
    let elemDefault: ITracking;
    let expectedResult: ITracking | ITracking[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TrackingService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Tracking(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateStarted: currentDate.format(DATE_TIME_FORMAT),
            extractDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Tracking', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateStarted: currentDate.format(DATE_TIME_FORMAT),
            extractDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateStarted: currentDate,
            extractDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Tracking()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tracking', () => {
        const returnedFromService = Object.assign(
          {
            teamMember: 'BBBBBB',
            dateStarted: currentDate.format(DATE_TIME_FORMAT),
            role: 'BBBBBB',
            dataSources: 'BBBBBB',
            dataVersion: 'BBBBBB',
            extractDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateStarted: currentDate,
            extractDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Tracking', () => {
        const returnedFromService = Object.assign(
          {
            teamMember: 'BBBBBB',
            dateStarted: currentDate.format(DATE_TIME_FORMAT),
            role: 'BBBBBB',
            dataSources: 'BBBBBB',
            dataVersion: 'BBBBBB',
            extractDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateStarted: currentDate,
            extractDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Tracking', () => {
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
