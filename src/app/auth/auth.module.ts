import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthComponent } from './auth.component'
import { AuthService } from './auth.service'

@NgModule({
  imports: [CommonModule],
  providers: [AuthService],
  declarations: [AuthComponent],
})
export class AuthModule {}
