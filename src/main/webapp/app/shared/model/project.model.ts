export interface IProject {
  id?: number;
  projectName?: string;
  projectDetails?: string;
}

export class Project implements IProject {
  constructor(public id?: number, public projectName?: string, public projectDetails?: string) {}
}
