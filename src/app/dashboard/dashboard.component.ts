import { Component } from '@angular/core'

import { AuthService } from '@shared/services/auth.service'

@Component({
  selector: 'vanne-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout()
  }
}
