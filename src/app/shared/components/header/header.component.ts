import { Component, Input } from '@angular/core'

import { AuthService } from '@shared/services/auth.service'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  animations: [inOutComponentAnimation],
})
export class HeaderComponent {
  public user = ''
  public company = ''

  @Input('status') status: boolean = false

  constructor(public authService: AuthService) {
    this.authService.user$$.subscribe((user) => {
      this.user = (user?.username ? user.username : user?.login) || ''

      this.company = user?.team.name || ''
    })
  }
}
