import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITracking } from 'app/shared/model/tracking.model';
import { TrackingService } from './tracking.service';
import { TrackingDeleteDialogComponent } from './tracking-delete-dialog.component';

@Component({
  selector: 'jhi-tracking',
  templateUrl: './tracking.component.html',
})
export class TrackingComponent implements OnInit, OnDestroy {
  trackings?: ITracking[];
  eventSubscriber?: Subscription;

  constructor(protected trackingService: TrackingService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.trackingService.query().subscribe((res: HttpResponse<ITracking[]>) => (this.trackings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTrackings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITracking): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTrackings(): void {
    this.eventSubscriber = this.eventManager.subscribe('trackingListModification', () => this.loadAll());
  }

  delete(tracking: ITracking): void {
    const modalRef = this.modalService.open(TrackingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tracking = tracking;
  }
}
