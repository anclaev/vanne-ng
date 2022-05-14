import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'

import { UsersRoutingModule } from './users-routing.module'

import { ChangePassComponent } from './profile/change-pass/change-pass.component'
import { ProfileComponent } from './profile/profile.component'
import { UsersComponent } from './users/users.component'

@NgModule({
  declarations: [UsersComponent, ChangePassComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
