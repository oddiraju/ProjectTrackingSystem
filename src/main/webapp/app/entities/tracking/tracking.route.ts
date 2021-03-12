import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITracking, Tracking } from 'app/shared/model/tracking.model';
import { TrackingService } from './tracking.service';
import { TrackingComponent } from './tracking.component';
import { TrackingDetailComponent } from './tracking-detail.component';
import { TrackingUpdateComponent } from './tracking-update.component';

@Injectable({ providedIn: 'root' })
export class TrackingResolve implements Resolve<ITracking> {
  constructor(private service: TrackingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITracking> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tracking: HttpResponse<Tracking>) => {
          if (tracking.body) {
            return of(tracking.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tracking());
  }
}

export const trackingRoute: Routes = [
  {
    path: '',
    component: TrackingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.tracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrackingDetailComponent,
    resolve: {
      tracking: TrackingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.tracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrackingUpdateComponent,
    resolve: {
      tracking: TrackingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.tracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrackingUpdateComponent,
    resolve: {
      tracking: TrackingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projectTrackingSystemApp.tracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
