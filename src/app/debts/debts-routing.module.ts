import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { DebtsComponent } from './debts.component'

import { Routes } from '@/common/interfaces'

const routes: Routes = [
  {
    path: '',
    component: DebtsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtsRoutingModule {}
