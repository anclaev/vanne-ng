import { MatSnackBar } from '@angular/material/snack-bar'
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
   * @returns {any}
   */
  public show(message: string, action?: string): any {
    return this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'toast',
    })
  }
}
