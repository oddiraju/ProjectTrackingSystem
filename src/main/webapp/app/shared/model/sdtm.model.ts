import { Moment } from 'moment';

export interface ISDTM {
  id?: number;
  datasetName?: string;
  title?: string;
  programName?: string;
  programmer?: string;
  completionDate?: Moment;
  validationMethod?: string;
}

export class SDTM implements ISDTM {
  constructor(
    public id?: number,
    public datasetName?: string,
    public title?: string,
    public programName?: string,
    public programmer?: string,
    public completionDate?: Moment,
    public validationMethod?: string
  ) {}
}
