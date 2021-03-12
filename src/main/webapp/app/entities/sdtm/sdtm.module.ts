import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectTrackingSystemSharedModule } from 'app/shared/shared.module';
import { SDTMComponent } from './sdtm.component';
import { SDTMDetailComponent } from './sdtm-detail.component';
import { SDTMUpdateComponent } from './sdtm-update.component';
import { SDTMDeleteDialogComponent } from './sdtm-delete-dialog.component';
import { sDTMRoute } from './sdtm.route';

@NgModule({
  imports: [ProjectTrackingSystemSharedModule, RouterModule.forChild(sDTMRoute)],
  declarations: [SDTMComponent, SDTMDetailComponent, SDTMUpdateComponent, SDTMDeleteDialogComponent],
  entryComponents: [SDTMDeleteDialogComponent],
})
export class ProjectTrackingSystemSDTMModule {}
