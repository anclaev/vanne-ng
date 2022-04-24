import { Title } from '@angular/platform-browser'
import { Component } from '@angular/core'

import { AuthService } from '../shared/services/auth.service'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент страницы профиля
 */
@Component({
  selector: 'vanne-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.sass'],
  animations: [inOutComponentAnimation],
})
export class MeComponent {
  /**
   * Конструктор компонента
   * @description Устанавливает в заголовок страницы имя текущего пользователя
   * @param {TitleService} titleService Сервис заголовка страницы
   * @param {authService} authService Сервис авторизации
   */
  constructor(private titleService: Title, private authService: AuthService) {
    this.authService.user$$.subscribe((user) => {
      if (user) {
        titleService.setTitle(user.username ? user.username : user.login)
        console.log(titleService.getTitle())
      }
    })
  }
}
