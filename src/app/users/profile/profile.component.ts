import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Title } from '@angular/platform-browser'
import { Apollo } from 'apollo-angular'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { ToastService } from '@shared/services/toast.service'
import { AuthService } from '@shared/services/auth.service'
import { formatDateFromISO } from '@shared/utils/funcs'

import { IAccount, initialAccount } from '@/common/models/account'
import { GET_PROFILE } from '@common/schemes/query/getProfile'

/**
 * Компонент профиля пользователя
 */
@Component({
  selector: 'vanne-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  animations: [inOutComponentAnimation],
})
export class ProfileComponent implements OnInit, OnDestroy {
  /**
   * Текущие данные профиля
   */
  public profile$$: BehaviorSubject<IAccount>

  /**
   * Флаг онлайна пользователя
   */
  public isOnline: boolean = true

  /**
   * Флаг владения этим аккаунтом
   */
  public isMe: boolean = false

  /**
   * Подписка на изменение данных аккаунта
   */
  private sub: Subscription | null = null

  /**
   * Конструктор компонента аккаунта
   * @param {AuthService} authService Сервис авторизации
   * @param {ToastService} toastService Сервис уведомлений
   * @param {Apollo} apolloService Сервис Apollo
   * @param {Title} titleService Сервис заголовка страницы
   * @param {Router} routerService Сервис роутинга
   * @param {ActivatedRoute} route Текущий маршрут приложения
   */
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private apolloService: Apollo,
    private titleService: Title,
    private routerService: Router,
    private route: ActivatedRoute,
  ) {
    // Инициализация пустого аккаунта
    let initial = initialAccount

    // Логин нужного аккаунта
    let target = this.route.snapshot.params['login']

    // Текущий пользователь ИС
    let currentUser = this.authService.currentUser

    // Проверка на свою страницу
    if (target && currentUser && currentUser.login === target) {
      this.isMe = true
    }

    // Установка параметры запроса аккаунта
    if (currentUser && this.isMe) {
      initial = { ...initial, ...this.authService.currentUser }
    } else if (currentUser) {
      initial = { ...initial, login: target }
    }

    this.profile$$ = new BehaviorSubject(initial)
  }

  /**
   * Метод получения аккаунта при инициализации компонента
   */
  ngOnInit(): void {
    this.sub = this.apolloService
      .watchQuery({
        query: GET_PROFILE,
        variables: {
          login: this.profile$$.value.login,
        },
        errorPolicy: 'ignore',
      })
      .valueChanges.subscribe({
        next: ({ data }) => {
          if (!data) {
            this.toastService.show('Пользователь не найден')
            this.routerService.navigate(['/'])

            return
          }

          this.profile$$.next({
            ...this.profile$$.value,
            ...data.account,
            birthday: data.account.birthday
              ? formatDateFromISO(data.account.birthday, false)
              : null,
          })

          let profile = this.profile$$.value

          this.titleService.setTitle(profile.login ? profile.login : 'Профиль')
        },
      })
  }

  /**
   * Отмена подписки на изменение аккаунта при размонтировании компонента
   */
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
