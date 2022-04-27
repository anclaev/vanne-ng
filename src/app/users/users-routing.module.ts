import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { ProfileComponent } from './profile/profile.component'
import { UsersComponent } from './users/users.component'

import { Routes } from '@/common/interfaces'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent,
  },
  {
    path: ':login',
    component: ProfileComponent,
    data: {
      title: 'Профиль',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
