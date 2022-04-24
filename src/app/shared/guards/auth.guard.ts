import { CanActivate, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'

import { AuthService } from '@shared/services/auth.service'

/**
 * Guard авторизации
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   * Конструктор guard
   * @param {AuthService} authService Сервис авторизации
   */
  constructor(private authService: AuthService) {}

  /**
   * Метод обработки guard
   * @description Проверяет авторизован ли пользователь в системе
   * @param {any} _ Нечто
   * @param {RouterStateSnapshot} state Текущее состояние роутера
   * @returns {void}
   */
  canActivate(_: any, state: RouterStateSnapshot) {
    const user = this.authService.currentUser
    if (user) {
      return true
    }

    return this.authService.check(state.url)
  }
}
