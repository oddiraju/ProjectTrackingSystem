import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITracking } from 'app/shared/model/tracking.model';
import { TrackingService } from './tracking.service';

@Component({
  templateUrl: './tracking-delete-dialog.component.html',
})
export class TrackingDeleteDialogComponent {
  tracking?: ITracking;

  constructor(protected trackingService: TrackingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trackingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('trackingListModification');
      this.activeModal.close();
    });
  }
}
