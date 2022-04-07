import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
