import { Component, Input } from '@angular/core'
// import { Router } from '@angular/router'

import { ToastService } from '@shared/services/toast.service'
import { AuthService } from '@shared/services/auth.service'
import { NavService } from '@shared/services/nav.service'

import { ComponentType } from '@/common/interfaces'

@Component({
  selector: 'vanne-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Input() type: ComponentType = 'public'

  constructor(
    public navService: NavService,
    public authService: AuthService,
    public toastService: ToastService,
  ) {}

  public logout() {
    this.authService.logout()
    this.toastService.show('You are logged out')
  }
}
