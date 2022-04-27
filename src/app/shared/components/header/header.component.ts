import { Component, Input } from '@angular/core'

import { AuthService } from '@shared/services/auth.service'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент хедера страницы
 */
@Component({
  selector: 'vanne-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  animations: [inOutComponentAnimation],
})
export class HeaderComponent {
  /**
   * Компания пользователя
   */
  public company = ''

  /**
   * Аватар пользователя
   */
  public avatar = ''

  /**
   * Имя пользователя
   */
  public user = ''

  /**
   * Логин пользователя
   */
  public login = ''

  /**
   * Статус отображения хедера
   */
  @Input('status') status: boolean = false

  /**
   * Конструктор компонента
   * @description Устанавливает данные пользователя при входе в систему
   * @param {AuthService} authService Сервис авторизации
   */
  constructor(public authService: AuthService) {
    this.authService.user$$.subscribe((user) => {
      this.login = user?.login || ''
      this.user = user?.username || this.login
      this.company = user?.team.name || ''
      this.avatar = user?.avatar || '/assets/media/ava-default.webp'
    })
  }
}
