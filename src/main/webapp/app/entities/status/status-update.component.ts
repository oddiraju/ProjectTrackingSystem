import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStatus, Status } from 'app/shared/model/status.model';
import { StatusService } from './status.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project/project.service';
import { ISDTM } from 'app/shared/model/sdtm.model';
import { SDTMService } from 'app/entities/sdtm/sdtm.service';

type SelectableEntity = IProject | ISDTM;

@Component({
  selector: 'jhi-status-update',
  templateUrl: './status-update.component.html',
})
export class StatusUpdateComponent implements OnInit {
  isSaving = false;
  projects: IProject[] = [];
  sdtms: ISDTM[] = [];

  editForm = this.fb.group({
    id: [],
    deliverable: [null, [Validators.required]],
    status: [],
    project: [],
    sdtm: [],
  });

  constructor(
    protected statusService: StatusService,
    protected projectService: ProjectService,
    protected sDTMService: SDTMService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ status }) => {
      this.updateForm(status);

      this.projectService
        .query({ filter: 'status-is-null' })
        .pipe(
          map((res: HttpResponse<IProject[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProject[]) => {
          if (!status.project || !status.project.id) {
            this.projects = resBody;
          } else {
            this.projectService
              .find(status.project.id)
              .pipe(
                map((subRes: HttpResponse<IProject>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProject[]) => (this.projects = concatRes));
          }
        });

      this.sDTMService
        .query({ filter: 'status-is-null' })
        .pipe(
          map((res: HttpResponse<ISDTM[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISDTM[]) => {
          if (!status.sdtm || !status.sdtm.id) {
            this.sdtms = resBody;
          } else {
            this.sDTMService
              .find(status.sdtm.id)
              .pipe(
                map((subRes: HttpResponse<ISDTM>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISDTM[]) => (this.sdtms = concatRes));
          }
        });
    });
  }

  updateForm(status: IStatus): void {
    this.editForm.patchValue({
      id: status.id,
      deliverable: status.deliverable,
      status: status.status,
      project: status.project,
      sdtm: status.sdtm,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const status = this.createFromForm();
    if (status.id !== undefined) {
      this.subscribeToSaveResponse(this.statusService.update(status));
    } else {
      this.subscribeToSaveResponse(this.statusService.create(status));
    }
  }

  private createFromForm(): IStatus {
    return {
      ...new Status(),
      id: this.editForm.get(['id'])!.value,
      deliverable: this.editForm.get(['deliverable'])!.value,
      status: this.editForm.get(['status'])!.value,
      project: this.editForm.get(['project'])!.value,
      sdtm: this.editForm.get(['sdtm'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
