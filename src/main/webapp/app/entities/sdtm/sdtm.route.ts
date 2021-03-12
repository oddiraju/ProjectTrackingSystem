import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISDTM, SDTM } from 'app/shared/model/sdtm.model';
import { SDTMService } from './sdtm.service';
import { SDTMComponent } from './sdtm.component';
import { SDTMDetailComponent } from './sdtm-detail.component';
import { SDTMUpdateComponent } from './sdtm-update.component';

@Injectable({ providedIn: 'root' })
export class SDTMResolve implements Resolve<ISDTM> {
  constructor(private service: SDTMService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISDTM> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sDTM: HttpResponse<SDTM>) => {
          if (sDTM.body) {
            return of(sDTM.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SDTM());
  }
}

export const sDTMRoute: Routes = [
  {
    path: '',
    component: SDTMComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.sDTM.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SDTMDetailComponent,
    resolve: {
      sDTM: SDTMResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.sDTM.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SDTMUpdateComponent,
    resolve: {
      sDTM: SDTMResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.sDTM.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SDTMUpdateComponent,
    resolve: {
      sDTM: SDTMResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.sDTM.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
