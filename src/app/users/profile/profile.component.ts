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
import { imageMimeTypes } from '@/common'

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
   * Флаг просмотра администратором
   */
  public supervisedByAdmin: boolean = false

  /**
   * Разрешённые типы файла
   */
  public avatarTypes: string = imageMimeTypes.join(',')

  /**
   * Прогресс загрузки файла
   */
  public uploadProgress: number | null = null

  /**
   * Подписка на изменение данных аккаунта
   */
  private changeDataSub: Subscription | null = null

  /**
   * Подписка на загрузку аватара
   */
  public uploadSub: Subscription | null = null

  /**
   * Подписка на подтверждение загрузки аватара
   */
  public acceptUploadSub: Subscription | null = null

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

    // Установка параметров запроса аккаунта
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
    this.changeDataSub = this.apolloService
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
            avatar: data.account.avatar.url || '/assets/media/ava-default.webp',
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
   * Обработчик клика для смены аватара
   */
  public onClickFile(event: Event): void {
    if (!!this.uploadProgress) {
      this.cancelUpload()

      event.preventDefault()
      return
    }
  }

  /**
   * Обработчик выбора файла для загрузки
   * @param {any} event Событие выбора
   */
  public onSelectFile(event: any): void {
    if (!(this.isMe || this.supervisedByAdmin)) {
      return
    }

    let file: File = event.target.files[0]

    // Проверка на выбор файла
    if (!file) return

    // Проверка на валидность типа файла
    if (!imageMimeTypes.find((item) => item === file.type)) {
      this.toastService.show('Неверный тип файла')
      return
    }

    // Проверка на текущее подтверждение загрузки
    if (this.acceptUploadSub) this.acceptUploadSub.unsubscribe()

    // Подтверждение загрузки аватара
    this.acceptUploadSub = this.toastService
      .show(
        `Обновить аватар на ${file.name.slice(0, file.name.lastIndexOf('.'))}?`,
        'OK',
        10,
      )
      .onAction()
      .subscribe(() => this.uploadAvatar(file))
  }

  /**
   * Метод загрузки аватара
   * @param {File} file Выбранный файл
   */
  private uploadAvatar(file: File): void {
    console.log(file)
  }

  /**
   * Метод отмены загрузки аватара
   */
  private cancelUpload(): void {
    this.uploadProgress = null
  }

  /**
   * Отмена подписки на изменение аккаунта при размонтировании компонента
   */
  ngOnDestroy(): void {
    this.changeDataSub?.unsubscribe()
    this.uploadSub?.unsubscribe()
    this.acceptUploadSub?.unsubscribe()
  }
}
