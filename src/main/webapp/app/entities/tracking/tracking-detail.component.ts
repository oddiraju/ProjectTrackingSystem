import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITracking } from 'app/shared/model/tracking.model';

@Component({
  selector: 'jhi-tracking-detail',
  templateUrl: './tracking-detail.component.html',
})
export class TrackingDetailComponent implements OnInit {
  tracking: ITracking | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tracking }) => (this.tracking = tracking));
  }

  previousState(): void {
    window.history.back();
  }
}
