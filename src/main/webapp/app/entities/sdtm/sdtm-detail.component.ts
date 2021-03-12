import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISDTM } from 'app/shared/model/sdtm.model';

@Component({
  selector: 'jhi-sdtm-detail',
  templateUrl: './sdtm-detail.component.html',
})
export class SDTMDetailComponent implements OnInit {
  sDTM: ISDTM | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sDTM }) => (this.sDTM = sDTM));
  }

  previousState(): void {
    window.history.back();
  }
}
