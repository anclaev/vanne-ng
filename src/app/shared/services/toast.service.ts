import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar'

import { Injectable } from '@angular/core'

/**
 * Сервис уведомлений
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  /**
   * Сервис уведомлений
   * @param {MatSnackBar} snackBar Сервис уведомлений Material
   */
  constructor(private readonly snackBar: MatSnackBar) {}

  /**
   * Метод показа уведомления
   * @param {string} message Текст сообщения
   * @param {string} action Текст лейбла кнопки
   * @param {number} duration Длительность уведомления в секундах
   * @returns {MatSnackBarRef<TextOnlySnackBar>} Ссылка на уведомление
   */
  public show(
    message: string,
    action?: string,
    duration: number = 4,
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, {
      duration: duration * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'toast',
    })
  }
}
