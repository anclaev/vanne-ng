import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

// import { AuthService } from '@common/auth/auth.service'
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
    // private authService: AuthService,
    private router: Router,
  ) {}

  public logout() {
    // this.authService.logout()
    console.log('Click to logout!')
  }
}
