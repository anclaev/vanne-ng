import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { ToastService } from './services/toast.service'
import { TitleService } from './services/title.service'
import { AuthService } from './services/auth.service'

import { BgVideoComponent } from './components/bg-video/bg-video.component'
import { HeaderComponent } from './components/header/header.component'
import { LogoComponent } from './components/logo/logo.component'
import { NavComponent } from './components/nav/nav.component'

@NgModule({
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  providers: [AuthService, ToastService, TitleService],
  declarations: [
    BgVideoComponent,
    LogoComponent,
    NavComponent,
    HeaderComponent,
  ],
  exports: [BgVideoComponent, LogoComponent, NavComponent, HeaderComponent],
})
export class SharedModule {}
