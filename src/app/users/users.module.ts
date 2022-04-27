import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'

import { UsersRoutingModule } from './users-routing.module'

import { ProfileComponent } from './profile/profile.component'
import { UsersComponent } from './users/users.component'

@NgModule({
  declarations: [UsersComponent, ProfileComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule],
})
export class UsersModule {}
