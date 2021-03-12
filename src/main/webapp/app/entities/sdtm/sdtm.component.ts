import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISDTM } from 'app/shared/model/sdtm.model';
import { SDTMService } from './sdtm.service';
import { SDTMDeleteDialogComponent } from './sdtm-delete-dialog.component';

@Component({
  selector: 'jhi-sdtm',
  templateUrl: './sdtm.component.html',
})
export class SDTMComponent implements OnInit, OnDestroy {
  sDTMS?: ISDTM[];
  eventSubscriber?: Subscription;

  constructor(protected sDTMService: SDTMService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.sDTMService.query().subscribe((res: HttpResponse<ISDTM[]>) => (this.sDTMS = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSDTMS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISDTM): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSDTMS(): void {
    this.eventSubscriber = this.eventManager.subscribe('sDTMListModification', () => this.loadAll());
  }

  delete(sDTM: ISDTM): void {
    const modalRef = this.modalService.open(SDTMDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sDTM = sDTM;
  }
}
