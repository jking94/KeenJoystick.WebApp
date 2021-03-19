import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule } from '@angular/router';
import { dashboardPageRoutes } from '../dashboard-page/dashboard-page.routing';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(dashboardPageRoutes)
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }
