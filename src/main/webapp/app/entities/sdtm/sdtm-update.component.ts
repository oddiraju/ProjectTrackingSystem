import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISDTM, SDTM } from 'app/shared/model/sdtm.model';
import { SDTMService } from './sdtm.service';

@Component({
  selector: 'jhi-sdtm-update',
  templateUrl: './sdtm-update.component.html',
})
export class SDTMUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    datasetName: [null, [Validators.required]],
    title: [],
    programName: [],
    programmer: [],
    completionDate: [],
    validationMethod: [],
  });

  constructor(protected sDTMService: SDTMService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sDTM }) => {
      if (!sDTM.id) {
        const today = moment().startOf('day');
        sDTM.completionDate = today;
      }

      this.updateForm(sDTM);
    });
  }

  updateForm(sDTM: ISDTM): void {
    this.editForm.patchValue({
      id: sDTM.id,
      datasetName: sDTM.datasetName,
      title: sDTM.title,
      programName: sDTM.programName,
      programmer: sDTM.programmer,
      completionDate: sDTM.completionDate ? sDTM.completionDate.format(DATE_TIME_FORMAT) : null,
      validationMethod: sDTM.validationMethod,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sDTM = this.createFromForm();
    if (sDTM.id !== undefined) {
      this.subscribeToSaveResponse(this.sDTMService.update(sDTM));
    } else {
      this.subscribeToSaveResponse(this.sDTMService.create(sDTM));
    }
  }

  private createFromForm(): ISDTM {
    return {
      ...new SDTM(),
      id: this.editForm.get(['id'])!.value,
      datasetName: this.editForm.get(['datasetName'])!.value,
      title: this.editForm.get(['title'])!.value,
      programName: this.editForm.get(['programName'])!.value,
      programmer: this.editForm.get(['programmer'])!.value,
      completionDate: this.editForm.get(['completionDate'])!.value
        ? moment(this.editForm.get(['completionDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      validationMethod: this.editForm.get(['validationMethod'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISDTM>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
