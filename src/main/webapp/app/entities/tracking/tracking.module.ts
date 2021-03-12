import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectTrackingSystemSharedModule } from 'app/shared/shared.module';
import { TrackingComponent } from './tracking.component';
import { TrackingDetailComponent } from './tracking-detail.component';
import { TrackingUpdateComponent } from './tracking-update.component';
import { TrackingDeleteDialogComponent } from './tracking-delete-dialog.component';
import { trackingRoute } from './tracking.route';

@NgModule({
  imports: [ProjectTrackingSystemSharedModule, RouterModule.forChild(trackingRoute)],
  declarations: [TrackingComponent, TrackingDetailComponent, TrackingUpdateComponent, TrackingDeleteDialogComponent],
  entryComponents: [TrackingDeleteDialogComponent],
})
export class ProjectTrackingSystemTrackingModule {}
