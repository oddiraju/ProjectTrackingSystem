import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectTrackingSystemProjectModule),
      },
      {
        path: 'tracking',
        loadChildren: () => import('./tracking/tracking.module').then(m => m.ProjectTrackingSystemTrackingModule),
      },
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then(m => m.ProjectTrackingSystemStatusModule),
      },
      {
        path: 'sdtm',
        loadChildren: () => import('./sdtm/sdtm.module').then(m => m.ProjectTrackingSystemSDTMModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ProjectTrackingSystemEntityModule {}
