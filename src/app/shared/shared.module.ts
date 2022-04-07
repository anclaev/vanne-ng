import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { BreadcrumbsService } from './services/breadcrumbs.service'
import { ToastService } from './services/toast.service'
import { TitleService } from './services/title.service'
import { AuthService } from './services/auth.service'
import { NavService } from './services/nav.service'

import { NonExistentComponent } from './components/non-existent/non-existent.component'
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component'
import { BgVideoComponent } from './components/bg-video/bg-video.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { LogoComponent } from './components/logo/logo.component'
import { NavComponent } from './components/nav/nav.component'
import { TitleComponent } from './components/title/title.component'

@NgModule({
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  providers: [
    NavService,
    AuthService,
    ToastService,
    BreadcrumbsService,
    TitleService,
  ],
  declarations: [
    BgVideoComponent,
    LogoComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    NonExistentComponent,
    BreadcrumbsComponent,
    TitleComponent,
  ],
  exports: [
    BgVideoComponent,
    LogoComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    NonExistentComponent,
    BreadcrumbsComponent,
    TitleComponent,
  ],
})
export class SharedModule {}
