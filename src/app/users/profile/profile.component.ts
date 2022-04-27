import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Title } from '@angular/platform-browser'
import { Apollo } from 'apollo-angular'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { ToastService } from '@shared/services/toast.service'
import { AuthService } from '@shared/services/auth.service'

import { IAccount, initialAccount } from '@/common/models/account'
import { GET_PROFILE } from '@common/schemes/query/getProfile'

@Component({
  selector: 'vanne-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  animations: [inOutComponentAnimation],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profile$$: BehaviorSubject<IAccount>
  public isMe: boolean = false

  private sub: Subscription | null = null

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
          })

          let profile = this.profile$$.value

          this.titleService.setTitle(profile.login ? profile.login : 'Профиль')
        },
      })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
