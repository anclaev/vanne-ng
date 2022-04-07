import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { NavService } from '@shared/services/nav.service'

import { BgVideoComponent } from './components/bg-video/bg-video.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { LogoComponent } from './components/logo/logo.component'
import { NavComponent } from './components/nav/nav.component'

@NgModule({
  providers: [NavService],
  imports: [CommonModule, RouterModule],
  declarations: [
    BgVideoComponent,
    LogoComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    BgVideoComponent,
    LogoComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
