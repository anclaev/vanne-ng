import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { SignInComponent } from './sign-in/sign-in.component'

import { Routes } from '@/common/interfaces'

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
