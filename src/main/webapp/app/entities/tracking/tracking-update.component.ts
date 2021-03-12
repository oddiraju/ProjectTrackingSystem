import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITracking, Tracking } from 'app/shared/model/tracking.model';
import { TrackingService } from './tracking.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project/project.service';

@Component({
  selector: 'jhi-tracking-update',
  templateUrl: './tracking-update.component.html',
})
export class TrackingUpdateComponent implements OnInit {
  isSaving = false;
  projects: IProject[] = [];

  editForm = this.fb.group({
    id: [],
    teamMember: [null, [Validators.required]],
    dateStarted: [null, [Validators.required]],
    role: [],
    dataSources: [],
    dataVersion: [],
    extractDate: [],
    project: [],
  });

  constructor(
    protected trackingService: TrackingService,
    protected projectService: ProjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tracking }) => {
      if (!tracking.id) {
        const today = moment().startOf('day');
        tracking.dateStarted = today;
        tracking.extractDate = today;
      }

      this.updateForm(tracking);

      this.projectService
        .query({ filter: 'tracking-is-null' })
        .pipe(
          map((res: HttpResponse<IProject[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProject[]) => {
          if (!tracking.project || !tracking.project.id) {
            this.projects = resBody;
          } else {
            this.projectService
              .find(tracking.project.id)
              .pipe(
                map((subRes: HttpResponse<IProject>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProject[]) => (this.projects = concatRes));
          }
        });
    });
  }

  updateForm(tracking: ITracking): void {
    this.editForm.patchValue({
      id: tracking.id,
      teamMember: tracking.teamMember,
      dateStarted: tracking.dateStarted ? tracking.dateStarted.format(DATE_TIME_FORMAT) : null,
      role: tracking.role,
      dataSources: tracking.dataSources,
      dataVersion: tracking.dataVersion,
      extractDate: tracking.extractDate ? tracking.extractDate.format(DATE_TIME_FORMAT) : null,
      project: tracking.project,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tracking = this.createFromForm();
    if (tracking.id !== undefined) {
      this.subscribeToSaveResponse(this.trackingService.update(tracking));
    } else {
      this.subscribeToSaveResponse(this.trackingService.create(tracking));
    }
  }

  private createFromForm(): ITracking {
    return {
      ...new Tracking(),
      id: this.editForm.get(['id'])!.value,
      teamMember: this.editForm.get(['teamMember'])!.value,
      dateStarted: this.editForm.get(['dateStarted'])!.value
        ? moment(this.editForm.get(['dateStarted'])!.value, DATE_TIME_FORMAT)
        : undefined,
      role: this.editForm.get(['role'])!.value,
      dataSources: this.editForm.get(['dataSources'])!.value,
      dataVersion: this.editForm.get(['dataVersion'])!.value,
      extractDate: this.editForm.get(['extractDate'])!.value
        ? moment(this.editForm.get(['extractDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      project: this.editForm.get(['project'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITracking>>): void {
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

  trackById(index: number, item: IProject): any {
    return item.id;
  }
}
