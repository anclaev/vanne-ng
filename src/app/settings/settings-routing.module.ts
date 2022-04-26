import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { SettingsComponent } from './settings.component'

import { Routes } from '@/common/interfaces'

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
