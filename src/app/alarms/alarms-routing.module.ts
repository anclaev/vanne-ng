import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { AlarmsComponent } from './alarms.component'

import { Routes } from '@/common/interfaces'

const routes: Routes = [
  {
    path: '',
    component: AlarmsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmsRoutingModule {}
