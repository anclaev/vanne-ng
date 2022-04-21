import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { AuthService } from '../shared/services/auth.service'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
@Component({
  selector: 'vanne-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.sass'],
  animations: [inOutComponentAnimation],
})
export class MeComponent implements OnInit {
  constructor(private titleService: Title, private authService: AuthService) {
    this.authService.user$$.subscribe((user) => {
      if (user) {
        titleService.setTitle(user.username ? user.username : user.login)
        console.log(titleService.getTitle())
      }
    })
  }

  ngOnInit(): void {}
}
