import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { AuthRoutingModule } from './auth-routing.module'
import { SignInComponent } from './sign-in/sign-in.component'

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
})
export class AuthModule {}
