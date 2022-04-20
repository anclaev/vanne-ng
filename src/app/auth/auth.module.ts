import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { SignInComponent } from './sign-in/sign-in.component'

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, MatSnackBarModule],
})
export class AuthModule {}
