import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { UsersComponent } from './users.component'

import { Routes } from '@/common/interfaces'

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
