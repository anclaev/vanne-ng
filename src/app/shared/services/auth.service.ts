import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { Credentials, User } from '@/common/interfaces'
import { API } from '@/common/enums'

import { ENV } from '@/environments/env'

/**
 * Сервис авторизации
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Объект пользователя
   */
  public user$$: BehaviorSubject<User>

  /**
   * Наблюдаемый пользователь
   */
  private user$: Observable<User>

  /**
   * Хост API
   */
  private api: string = ENV.API_HOST

  /**
   * Конструктор сервиса
   * @description Инициализирует объект пользователя
   * @param {HttpClient} httpClient HTTP-клиент
   * @param {Router} router Сервис роутинга
   */
  constructor(private httpClient: HttpClient, private router: Router) {
    this.user$$ = new BehaviorSubject<User>(null)
    this.user$ = this.user$$.asObservable()
  }

  /**
   * Геттер текущего пользователя
   */
  public get currentUser(): User {
    return this.user$$.value
  }

  /**
   * Метод авторизации
   * @description Осуществляет вход в систему
   * @param {Credentials} credentials Авторизационные данные
   * @returns {Observable<User>} Наблюдаемый пользователь
   */
  public login(credentials: Credentials): Observable<User> {
    return this.httpClient
      .post<User>(this.api + API.AUTH_SIGN_IN, credentials, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          this.user$$.next(user)

          return user
        }),
      )
  }

  /**
   * Метод обновления токена авторизации
   * @returns {Observable<User>} Наблюдаемый пользователь
   */
  private refresh(): Observable<User> {
    return this.httpClient
      .get<User>(this.api + API.AUTH_REFRESH, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          return user
        }),
      )
  }

  /**
   * Метод получения данных текущего пользователя
   * @returns {Observable<User>} Наблюдаемый текущий пользователь
   */
  public me(): Observable<User> {
    return this.httpClient
      .get<User>(this.api + API.AUTH_DATA, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          this.user$$.next(user)

          return user
        }),
        catchError(() => {
          const refresh$ = this.refresh().pipe(
            map((user) => {
              this.user$$.next(user)

              return user
            }),
          )

          return refresh$
        }),
      )
  }

  /**
   * Проверка авторизации пользователя
   * @param {strung} returnUrl Callback url
   * @returns {Observable<boolean>} Статус авторизации
   */
  public check(
    returnUrl: string,
    redirect?: boolean,
    testing: boolean = false,
  ): Observable<boolean> {
    return this.me().pipe(
      map((data) => !!data),
      catchError((err) => {
        if (!testing) {
          this.router.navigate(['/auth'], {
            queryParams: { returnUrl, redirect },
          })
        }

        return of(err !== 'Unauthorized')
      }),
    )
  }

  /**
   * Метод выхода из системы
   * @returns {Subscription} Подписка на выход из системы
   */
  public logout(redirect: boolean = true): Subscription {
    return this.httpClient
      .post(
        this.api + API.AUTH_SIGN_OUT,
        {},
        {
          withCredentials: true,
          responseType: 'text',
        },
      )
      .pipe(catchError(() => of(console.log('Unauthorized'))))
      .subscribe({
        next: () => {
          this.user$$.next(null)

          if (redirect) {
            this.router.navigate(['/auth'])
          }
        },
      })
  }
}
