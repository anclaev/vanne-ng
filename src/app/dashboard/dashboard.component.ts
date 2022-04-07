import { Component } from '@angular/core'
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'vanne-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  public welcome: string = ''

  constructor(public authService: AuthService) {
    this.welcome = `Hi, ${this.authService.currentUser?.login}!`
  }
}
