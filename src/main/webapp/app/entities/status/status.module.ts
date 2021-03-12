import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectTrackingSystemSharedModule } from 'app/shared/shared.module';
import { StatusComponent } from './status.component';
import { StatusDetailComponent } from './status-detail.component';
import { StatusUpdateComponent } from './status-update.component';
import { StatusDeleteDialogComponent } from './status-delete-dialog.component';
import { statusRoute } from './status.route';

@NgModule({
  imports: [ProjectTrackingSystemSharedModule, RouterModule.forChild(statusRoute)],
  declarations: [StatusComponent, StatusDetailComponent, StatusUpdateComponent, StatusDeleteDialogComponent],
  entryComponents: [StatusDeleteDialogComponent],
})
export class ProjectTrackingSystemStatusModule {}
