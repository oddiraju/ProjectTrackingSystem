import { IProject } from 'app/shared/model/project.model';
import { ISDTM } from 'app/shared/model/sdtm.model';

export interface IStatus {
  id?: number;
  deliverable?: string;
  status?: string;
  project?: IProject;
  sdtm?: ISDTM;
}

export class Status implements IStatus {
  constructor(public id?: number, public deliverable?: string, public status?: string, public project?: IProject, public sdtm?: ISDTM) {}
}
