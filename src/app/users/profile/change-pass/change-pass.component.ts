import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { Component, OnDestroy } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Subscription } from 'rxjs'

import { CHANGE_YOURSELF_PASSWORD } from '@/common/schemes/mutation/changeYourselfPassword'

import { ToastService } from '@/app/shared/services/toast.service'

import { ProfileComponent } from '../profile.component'

/**
 * Компонент смены своего пароля
 */
@Component({
  selector: 'vanne-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.sass'],
})
export class ChangePassComponent implements OnDestroy {
  /**
   * Форма смены своегго пароля
   */
  public changePassForm = new FormGroup({
    oldPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  })

  /**
   * Подписка на запрос на смену пароля
   */
  private changePassSub: Subscription | null = null

  /**
   * Конструктор компонента
   * @param {MatDialogRef<ProfileComponent>} dialogRef Ссылка на родительский компонент
   * @param {ToastService} toastService Сервис уведомлений
   * @param {Apollo} apolloService Сервис Apollo GraphQL
   */
  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    private toastService: ToastService,
    private apolloService: Apollo,
  ) {}

  /**
   * Обработчик смены пароля
   * @returns {void}
   */
  public handleChangePass(): void {
    if (!this.changePassForm.controls['oldPassword'].valid) {
      this.toastService.show('Текущий пароль обязателен')
      return
    }

    if (!this.changePassForm.controls['newPassword'].valid) {
      this.toastService.show('Пароль должен быть больше 8 символов')
      return
    }

    this.changePassSub = this.apolloService
      .mutate<
        { changeYourselfPassword: boolean },
        { oldPassword: string; newPassword: string }
      >({
        mutation: CHANGE_YOURSELF_PASSWORD,
        variables: {
          oldPassword: this.changePassForm.controls['oldPassword'].value.trim(),
          newPassword: this.changePassForm.controls['newPassword'].value.trim(),
        },
      })
      .subscribe({
        next: () => {
          this.toastService.show('Пароль успешно изменён')
          this.dialogRef.close()
        },
        error: (err) => {
          this.toastService.show(err.message)

          this.changePassForm.controls['oldPassword'].setValue('')
          this.changePassForm.controls['newPassword'].setValue('')
        },
      })
  }

  /**
   * Обработчик выхода из диалога
   * @returns {void}
   */
  public onNoClick(): void {
    this.dialogRef.close()
  }

  /**
   * Отписка от смены пароля
   */
  ngOnDestroy(): void {
    this.changePassSub?.unsubscribe()
  }
}
