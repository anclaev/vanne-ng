import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatStepperModule } from '@angular/material/stepper'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
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
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatStepperModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddUserComponent,
    UsersComponent,
    ChangePassComponent,
    ProfileComponent,
  ],
})
export class UsersModule {}
