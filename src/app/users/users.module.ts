import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'

import { UsersRoutingModule } from './users-routing.module'

import { ChangePassComponent } from './profile/change-pass/change-pass.component'
import { ProfileComponent } from './profile/profile.component'
import { UsersComponent } from './users/users.component'
import { AddUserComponent } from './users/add-user/add-user.component'

@NgModule({
  declarations: [
    UsersComponent,
    ChangePassComponent,
    ProfileComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatDividerModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
