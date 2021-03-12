import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISDTM } from 'app/shared/model/sdtm.model';
import { SDTMService } from './sdtm.service';

@Component({
  templateUrl: './sdtm-delete-dialog.component.html',
})
export class SDTMDeleteDialogComponent {
  sDTM?: ISDTM;

  constructor(protected sDTMService: SDTMService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sDTMService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sDTMListModification');
      this.activeModal.close();
    });
  }
}
