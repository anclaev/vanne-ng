import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { BgVideoComponent } from './components/bg-video/bg-video.component'
import { HeaderComponent } from './components/header/header.component'
import { LogoComponent } from './components/logo/logo.component'
import { NavComponent } from './components/nav/nav.component'

@NgModule({
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  declarations: [
    BgVideoComponent,
    LogoComponent,
    NavComponent,
    HeaderComponent,
  ],
  exports: [BgVideoComponent, LogoComponent, NavComponent, HeaderComponent],
})
export class SharedModule {}
