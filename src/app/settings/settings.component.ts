import { Component, OnDestroy, OnInit } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Apollo, QueryRef } from 'apollo-angular'

import { ToastService } from '@shared/services/toast.service'
import { AuthService } from '@shared/services/auth.service'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { GET_SESSIONS } from '@/common/schemes/query/getSessions'
import { ISession } from '@/common/interfaces/session.interface'

/**
 * Компонент страницы настройки профиля
 */
@Component({
  selector: 'vanne-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
  animations: [inOutComponentAnimation],
})
export class SettingsComponent implements OnInit, OnDestroy {
  /**
   * Сессии пользователя
   */
  public sessions$$: BehaviorSubject<ISession[]>

  /**
   * Запрос на получение сессий
   */
  private sessionQuery: QueryRef<
    { account: { sessions: ISession[] } },
    { login: string }
  > | null = null

  /**
   * Подписка на получение сессий
   */
  private sessionSub: Subscription | null = null

  /**
   * Подписка на подтверждение удаления сессии
   */
  private acceptRemoveSessionSub: Subscription | null = null

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private apolloService: Apollo,
  ) {
    this.sessions$$ = new BehaviorSubject<ISession[]>([])
  }

  /**
   * Метод получения сессий при инициализации компонента
   */
  ngOnInit(): void {
    this.sessionQuery = this.apolloService.watchQuery({
      query: GET_SESSIONS,
      variables: {
        login: this.authService.currentUser?.login || '',
      },
      errorPolicy: 'ignore',
    })

    this.sessionSub = this.sessionQuery.valueChanges.subscribe({
      next: ({ data }) => {
        this.sessions$$.next(
          data.account.sessions
            .map((item) => ({
              browser:
                item.browser.toLowerCase() === 'other'
                  ? 'Неизвестный браузер'
                  : item.browser,
              device:
                item.device.toLowerCase() === 'other'
                  ? 'Неизвестное устройство'
                  : item.device,
              os:
                item.os.toLowerCase() === 'other' ? 'Неизвестная ОС' : item.os,
              expiration: item.expiration,
              fingerprint: item.fingerprint,
              refreshToken: item.refreshToken,
            }))
            .sort(),
        )
      },
    })
  }

  /**
   * Метод обработки клика на кнопку удаления сессии
   * @param {any} event Событие нажатия
   * @param {string} fingerprint Отпечаток сессии
   */
  onRemoveSessionClick(event: any, fingerprint: string) {
    this.acceptRemoveSessionSub = this.toastService
      .show('Подтвердите удаление сессии...', 'OK', 5)
      .onAction()
      .subscribe(() => {
        console.log(`Remove ${fingerprint}!`)
      })
  }

  /**
   * Метод отписки от всех подписок при размонтировании компонента
   */
  ngOnDestroy(): void {
    this.acceptRemoveSessionSub?.unsubscribe()
    this.sessionSub?.unsubscribe()
  }
}
