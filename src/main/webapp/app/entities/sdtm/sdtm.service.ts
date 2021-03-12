import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISDTM } from 'app/shared/model/sdtm.model';

type EntityResponseType = HttpResponse<ISDTM>;
type EntityArrayResponseType = HttpResponse<ISDTM[]>;

@Injectable({ providedIn: 'root' })
export class SDTMService {
  public resourceUrl = SERVER_API_URL + 'api/sdtms';

  constructor(protected http: HttpClient) {}

  create(sDTM: ISDTM): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sDTM);
    return this.http
      .post<ISDTM>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sDTM: ISDTM): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sDTM);
    return this.http
      .put<ISDTM>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISDTM>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISDTM[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sDTM: ISDTM): ISDTM {
    const copy: ISDTM = Object.assign({}, sDTM, {
      completionDate: sDTM.completionDate && sDTM.completionDate.isValid() ? sDTM.completionDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.completionDate = res.body.completionDate ? moment(res.body.completionDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sDTM: ISDTM) => {
        sDTM.completionDate = sDTM.completionDate ? moment(sDTM.completionDate) : undefined;
      });
    }
    return res;
  }
}
