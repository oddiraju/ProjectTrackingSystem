import { Moment } from 'moment';
import { IProject } from 'app/shared/model/project.model';

export interface ITracking {
  id?: number;
  teamMember?: string;
  dateStarted?: Moment;
  role?: string;
  dataSources?: string;
  dataVersion?: string;
  extractDate?: Moment;
  project?: IProject;
}

export class Tracking implements ITracking {
  constructor(
    public id?: number,
    public teamMember?: string,
    public dateStarted?: Moment,
    public role?: string,
    public dataSources?: string,
    public dataVersion?: string,
    public extractDate?: Moment,
    public project?: IProject
  ) {}
}
