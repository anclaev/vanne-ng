import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { AlertsComponent } from './alerts.component'

const routes: Routes = [{ path: '', component: AlertsComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRoutingModule {}
