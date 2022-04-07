import { Component } from '@angular/core'

import { AuthService } from '@shared/services/auth.service'

@Component({
  selector: 'vanne-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.sass'],
})
export class MeComponent {
  public person: string

  constructor(public readonly authService: AuthService) {
    const user = authService.currentUser

    this.person = user?.login || 'Profile'
  }
}
