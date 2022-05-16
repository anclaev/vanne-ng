import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core'

import { MatDialog } from '@angular/material/dialog'

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter'

import {
  BehaviorSubject,
  catchError,
  debounceTime,
  finalize,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs'

import { FormControl, FormGroup, Validators } from '@angular/forms'

import { HttpClient, HttpEventType } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

import {
  Apollo,
  MutationResult,
  QueryRef,
  TypedDocumentNode,
} from 'apollo-angular'

import moment, { Moment } from 'moment'

import { ToastService } from '@shared/services/toast.service'
import { AuthService } from '@shared/services/auth.service'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { IAccount, initialAccount } from '@/common/models/account'
import { IUpload } from '@/common/interfaces/upload.interface'
import { GET_PROFILE } from '@common/schemes/query/getProfile'
import { imageMimeTypes, IntlRole } from '@/common'
import { API, ROLE } from '@/common/enums'

import {
  CHANGE_YOURSELF_PHONE,
  CHANGE_YOURSELF_BIRTHDAY,
  CHANGE_YOURSELF_EMAIL,
} from '@/common/schemes/mutation/changeYourself'

import {
  CHANGE_LOGIN,
  CHANGE_USERNAME,
  CHANGE_BIRTHDAY,
  CHANGE_EMAIL,
  CHANGE_PHONE,
} from '@/common/schemes/mutation/changeAccount'

import { ENV } from '@/environments/env'

import { ChangePassComponent } from './change-pass/change-pass.component'

/**
 * Параметры форматирования даты
 */
const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD MMMM, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

/**
 * Задержка изменения поля в милисекундах
 */
const CHANGE_TIMEOUT = 2000

/**
 * Компонент профиля пользователя
 */
@Component({
  selector: 'vanne-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  animations: [inOutComponentAnimation],
})
export class ProfileComponent implements OnInit, OnDestroy {
  /**
   * Текущие данные профиля
   */
  public profile$$: BehaviorSubject<IAccount>

  /**
   * Запрос на получение профиля
   */
  private profileQuery: QueryRef<
    { account: IAccount & { avatar: { url: string } } },
    { login: string | null }
  > | null = null

  /**
   * Флаг онлайна пользователя
   */
  public isOnline: boolean = false

  /**
   * Флаг владения этим аккаунтом
   */
  public isMe: boolean = false

  /**
   * Форма профиля
   */
  public profileForm = new FormGroup({
    username: new FormControl(
      { value: '', disabled: true },
      {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(
            /^[A-Z, А-Я][a-z, а-я, ё]+\s[A-Z, А-Я][a-z, а-я, ё]+$/,
          ),
        ],
      },
    ),
    login: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[A-Z, a-z, 0-9]+\S$/),
    ]),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
    ]),
    phone: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\d{1,1}\s\d{3,3}\s\d{3,3}\s\d{2,2}\s\d{2,2}$/),
    ]),
    birthday: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
  })

  /**
   * Флаг просмотра администратором
   */
  public supervisedByAdmin$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)

  /**
   * Отслеживаемый логин
   */
  public changedLogin$$: Subject<string> = new Subject<string>()

  /**
   * Отслеживаемое имя пользователя
   */
  public changedUsername$$: Subject<string> = new Subject<string>()

  /**
   * Отслеживаемый мобильный номер
   */
  public changedPhone$$: Subject<string> = new Subject<string>()

  /**
   * Отслеживаемый email
   */
  public changedEmail$$: Subject<string> = new Subject<string>()

  /**
   * Отслеживаемая дата рождения
   */
  public changedBirthday$$: Subject<Moment> = new Subject<Moment>()

  /**
   * Разрешённые типы файла
   */
  public avatarTypes: string = imageMimeTypes.join(',')

  /**
   * Прогресс загрузки файла
   */
  public uploadProgress: number | null = null

  /** Флаг ошибки изменения данных */
  private isFailedChangeEvent: boolean = false

  /**
   * Подписка на изменение данных аккаунта
   */
  private profileSub: Subscription | null = null

  /**
   * Подписка на загрузку аватара
   */
  private uploadSub: Subscription | null = null

  /**
   * Подписка на подтверждение загрузки аватара
   */
  private acceptUploadSub: Subscription | null = null

  /** Подписка на обновление авторизационных данных аккаунта */
  private authSub: Subscription | null = null

  /**
   * Массив вторичных подписок внутри методов изменения
   */
  private otherChangeSubs: Subscription[] = []

  /**
   * Конструктор компонента аккаунта
   * @param {AuthService} authService Сервис авторизации
   * @param {ToastService} toastService Сервис уведомлений
   * @param {Apollo} apolloService Сервис Apollo
   * @param {Title} titleService Сервис заголовка страницы
   * @param {Router} routerService Сервис роутинга
   * @param {ActivatedRoute} route Текущий маршрут приложения
   * @param {HttpClient} httpClient HTTP-клиент
   */
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private apolloService: Apollo,
    private titleService: Title,
    private routerService: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private dialogService: MatDialog,
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

    // Смена доступности формы в зависимости от роли пользователя
    this.otherChangeSubs.push(
      this.supervisedByAdmin$$.subscribe((val) => {
        Object.keys(this.profileForm.controls).forEach((item) =>
          val
            ? this.profileForm.controls[item].enable()
            : this.profileForm.controls[item].disable(),
        )
      }),
    )

    this.supervisedByAdmin$$.next(currentUser?.role === 'ADMIN')

    if (this.isMe) {
      this.profileForm.controls['birthday'].enable()
      this.profileForm.controls['phone'].enable()
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
    this.profileQuery = this.apolloService.watchQuery({
      query: GET_PROFILE,
      variables: {
        login: this.profile$$.value.login,
      },
      errorPolicy: 'ignore',
    })

    this.profileSub = this.profileQuery.valueChanges.subscribe({
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
          birthday: data.account.birthday ? data.account.birthday : null,
        })

        let profile = this.profile$$.value

        if (
          profile.team?._id === this.authService.currentUser?.team?._id &&
          this.authService.currentUser?.role === ROLE.HEAD
        ) {
          this.supervisedByAdmin$$.next(true)
        }

        this.profileForm.controls['username'].setValue(profile.username)
        this.profileForm.controls['email'].setValue(profile.email)
        this.profileForm.controls['phone'].setValue(profile.phone)
        this.profileForm.controls['login'].setValue(profile.login)
        this.profileForm.controls['birthday'].setValue(moment(profile.birthday))

        this.titleService.setTitle(profile.login ? profile.login : 'Профиль')

        // Отслеживаем изменение логина
        this.changedLogin$$
          .asObservable()
          .pipe(debounceTime(CHANGE_TIMEOUT))
          .subscribe((value) => {
            if (
              this.profileForm.controls['login'].valid &&
              this.profileForm.controls['login'].value !==
                this.profile$$.value.login &&
              !this.isFailedChangeEvent
            )
              this.changeLogin(value)

            if (this.isFailedChangeEvent) {
              this.isFailedChangeEvent = false
            }
          })

        // Отслеживаем изменение имени пользователя
        this.changedUsername$$
          .asObservable()
          .pipe(debounceTime(CHANGE_TIMEOUT))
          .subscribe((value) => {
            if (
              this.profileForm.controls['username'].valid &&
              this.profileForm.controls['username'].value !==
                this.profile$$.value.username &&
              !this.isFailedChangeEvent
            )
              this.changeUsername(value)

            if (this.isFailedChangeEvent) {
              this.isFailedChangeEvent = false
            }
          })

        // Отслеживаем изменение мобильного номера
        this.changedPhone$$
          .asObservable()
          .pipe(debounceTime(CHANGE_TIMEOUT))
          .subscribe((value) => {
            if (
              this.profileForm.controls['phone'].valid &&
              this.profileForm.controls['phone'].value !==
                this.profile$$.value.phone &&
              !this.isFailedChangeEvent
            )
              this.changePhone(value)

            if (this.isFailedChangeEvent) {
              this.isFailedChangeEvent = false
            }
          })

        // Отслеживаем изменение email
        this.changedEmail$$
          .asObservable()
          .pipe(debounceTime(CHANGE_TIMEOUT))
          .subscribe((value) => {
            if (
              this.profileForm.controls['email'].valid &&
              this.profileForm.controls['email'].value !==
                this.profile$$.value.email &&
              !this.isFailedChangeEvent
            )
              this.changeEmail(value)

            if (this.isFailedChangeEvent) {
              this.isFailedChangeEvent = false
            }
          })

        // Отслеживаем изменение даты рождения
        this.changedBirthday$$
          .asObservable()
          .pipe(debounceTime(CHANGE_TIMEOUT))
          .subscribe((value) => {
            if (
              this.profileForm.controls['birthday'].valid &&
              this.profileForm.controls['birthday'].value.toISOString() !==
                this.profile$$.value.birthday &&
              !this.isFailedChangeEvent
            )
              this.changeBirthday(value.toDate())

            if (this.isFailedChangeEvent) {
              this.isFailedChangeEvent = false
            }
          })
      },
    })
  }

  /**
   * Обработка события изменения логина
   * @param {string} val Новое значение логина
   * @returns {void}
   */
  public handleChangeLogin(val: string): void {
    if (val.trim().length === 0 || !this.profileForm.controls['login'].valid)
      return

    this.changedLogin$$.next(val)
  }

  /**
   * Обработка изменения логина
   * @param {string} val Новое значение логина
   * @returns {void}
   */
  public changeLogin(val: string): void {
    this.otherChangeSubs.push(
      this.toastService
        .show('Изменить логин?', 'Да', 3)
        .onAction()
        .subscribe(() =>
          this.mutate<
            { changeAccount: { login: string } },
            { login: string; newLogin: string }
          >(CHANGE_LOGIN, {
            login: this.profile$$.value.login || '',
            newLogin: val,
          }).subscribe({
            error: () => {
              this.toastService.show(
                'Ошибка при изменении логина',
                undefined,
                2,
              )

              this.isFailedChangeEvent = true

              this.profileForm.controls['login'].setValue(
                this.profile$$.value.login,
              )
            },
            next: ({ data }) => {
              this.profile$$.next({
                ...this.profile$$.value,
                login: data?.changeAccount.login || '',
              })

              this.toastService.show('Логин успешно изменён', undefined, 2)

              if (this.isMe) {
                this.otherChangeSubs.push(
                  this.authService.me().subscribe((payload) => {
                    this.routerService
                      .navigate([`/u/${data?.changeAccount.login}`])
                      .then(() =>
                        this.titleService.setTitle(
                          data?.changeAccount.login || 'Профиль',
                        ),
                      )
                  }),
                )
              }
            },
          }),
        ),
    )
  }

  /**
   * Обработка события изменения имени пользователя
   * @param {string} val Новое значение имени пользователя
   * @returns {void}
   */
  public handleChangeUsername(val: string): void {
    if (val.trim().length === 0 || !this.profileForm.controls['username'].valid)
      return

    this.changedUsername$$.next(val)
  }

  /**
   * Обработка изменения имени пользователя
   * @param {string} val Новое значение имени пользователя
   * @returns {void}
   */
  public changeUsername(val: string): void {
    const firstname = val.split(' ')[0]
    const surname = val.split(' ')[1]

    this.otherChangeSubs.push(
      this.toastService
        .show('Изменить имя пользователя?', 'Да', 3)
        .onAction()
        .subscribe(() =>
          this.mutate<
            { changeAccount: { firstname: string; surname: string } },
            { login: string; firstname: string; surname: string }
          >(CHANGE_USERNAME, {
            login: this.profile$$.value.login || '',
            firstname,
            surname,
          }).subscribe({
            error: () => {
              this.toastService.show(
                'Ошибка при изменении имени пользователя',
                undefined,
                2,
              )

              this.isFailedChangeEvent = true

              this.profileForm.controls['username'].setValue(
                this.profile$$.value.username,
              )
            },
            next: ({ data }) => {
              this.profile$$.next({
                ...this.profile$$.value,
                username: `${data?.changeAccount.firstname} ${data?.changeAccount.surname}`,
              })

              this.toastService.show(
                'Имя пользователя успешно изменено',
                undefined,
                2,
              )

              if (this.isMe) {
                this.otherChangeSubs.push(this.authService.me().subscribe())
              }
            },
          }),
        ),
    )
  }

  /**
   * Обработка события изменения мобильного номера
   * @param {string} val Новое значение мобильного номера
   * @returns {void}
   */
  public handleChangePhone(val: string): void {
    if (val.trim().length === 0 || !this.profileForm.controls['phone'].valid)
      return

    this.changedPhone$$.next(val)
  }

  /**
   * Обработка изменения своего мобильного номера
   * @param {string} val Новое значение мобильного номера
   * @returns {void}
   */
  public changePhone(val: string): void {
    this.otherChangeSubs.push(
      this.toastService
        .show('Изменить мобильный номер?', 'Да', 3)
        .onAction()
        .subscribe(() => {
          this.isMe
            ? this.mutate<
                { changeYourself: { phone: string } },
                { phone: string }
              >(CHANGE_YOURSELF_PHONE, { phone: val }).subscribe({
                error: () => {
                  this.toastService.show(
                    'Ошибка при изменении мобильного номера',
                    undefined,
                    2,
                  )

                  this.isFailedChangeEvent = true

                  this.profileForm.controls['phone'].setValue(
                    this.profile$$.value.phone,
                  )
                },
                next: ({ data }) => {
                  this.profile$$.next({
                    ...this.profile$$.value,
                    phone: data?.changeYourself.phone || '',
                  })

                  this.toastService.show(
                    'Мобильный номер успешно изменён',
                    undefined,
                    2,
                  )
                },
              })
            : this.mutate<
                { changeAccount: { phone: string } },
                { login: string; phone: string }
              >(CHANGE_PHONE, {
                login: this.profile$$.value.login || '',
                phone: val,
              }).subscribe({
                error: () => {
                  this.toastService.show(
                    'Ошибка при изменении мобильного номера',
                    undefined,
                    2,
                  )

                  this.isFailedChangeEvent = true

                  this.profileForm.controls['phone'].setValue(
                    this.profile$$.value.phone,
                  )
                },
                next: ({ data }) => {
                  this.profile$$.next({
                    ...this.profile$$.value,
                    phone: data?.changeAccount.phone || '',
                  })

                  this.toastService.show(
                    'Мобильный номер успешно изменён',
                    undefined,
                    2,
                  )
                },
              })
        }),
    )
  }

  /**
   * Обработка события изменения email
   * @param {string} val Новое значение email
   * @returns {void}
   */
  public handleChangeEmail(val: string): void {
    if (val.trim().length === 0 || !this.profileForm.controls['email'].valid)
      return

    this.changedEmail$$.next(val)
  }

  /**
   * Обработка изменения email
   * @param {string} val Новое значение email
   * @returns {void}
   */
  public changeEmail(val: string): void {
    this.otherChangeSubs.push(
      this.toastService
        .show('Изменить email?', 'Да', 3)
        .onAction()
        .subscribe(() =>
          this.isMe
            ? this.mutate<
                { changeYourself: { email: string } },
                { email: string }
              >(CHANGE_YOURSELF_EMAIL, {
                email: val,
              }).subscribe({
                error: (err) => {
                  this.toastService.show(
                    'Ошибка при изменении почты',
                    undefined,
                    2,
                  )

                  this.isFailedChangeEvent = true

                  this.profileForm.controls['email'].setValue(
                    this.profile$$.value.email,
                  )
                },
                next: ({ data }) => {
                  this.profile$$.next({
                    ...this.profile$$.value,
                    email: data?.changeYourself.email || '',
                  })

                  this.toastService.show('Почта успешно изменена', undefined, 2)
                },
              })
            : this.mutate<
                { changeAccount: { email: string } },
                { login: string; email: string }
              >(CHANGE_EMAIL, {
                login: this.profile$$.value.email || '',
                email: val,
              }).subscribe({
                error: (err) => {
                  this.toastService.show(
                    'Ошибка при изменении почты',
                    undefined,
                    2,
                  )

                  this.isFailedChangeEvent = true

                  this.profileForm.controls['email'].setValue(
                    this.profile$$.value.email,
                  )
                },
                next: ({ data }) => {
                  this.profile$$.next({
                    ...this.profile$$.value,
                    email: data?.changeAccount.email || '',
                  })

                  this.toastService.show('Почта успешно изменена', undefined, 2)
                },
              }),
        ),
    )
  }

  /**
   * Обработка события изменения даты рождения
   * @param {string} val Новое значение даты рождения
   * @returns {void}
   */
  public handleChangeBirthday(val: Moment): void {
    if (!this.profileForm.controls['birthday'].valid) return

    this.changedBirthday$$.next(val)
  }

  /**
   * Обработка изменения даты рождения
   * @param {string} val Новое значение даты рождения
   * @returns {void}
   */
  public changeBirthday(val: Date): void {
    this.otherChangeSubs.push(
      this.toastService
        .show('Изменить дату рождения?', 'Да', 3)
        .onAction()
        .subscribe(() =>
          this.isMe
            ? this.mutate<
                { changeYourself: { birthday: string } },
                { birthday: string }
              >(CHANGE_YOURSELF_BIRTHDAY, {
                birthday: val.toISOString(),
              }).subscribe({
                error: () => {
                  this.toastService.show(
                    'Ошибка при изменении даты рождения',
                    undefined,
                    2,
                  )

                  this.isFailedChangeEvent = true

                  this.profileForm.controls['birthday'].setValue(
                    this.profile$$.value.birthday,
                  )
                },
                next: ({ data }) => {
                  this.profile$$.next({
                    ...this.profile$$.value,
                    birthday: data?.changeYourself.birthday || '',
                  })

                  this.toastService.show(
                    'Дата рождения успешно изменена',
                    undefined,
                    2,
                  )
                },
              })
            : this.mutate<
                { changeAccount: { birthday: string } },
                { login: string; birthday: string }
              >(CHANGE_BIRTHDAY, {
                login: this.profile$$.value.login || '',
                birthday: val.toISOString(),
              }).subscribe({
                error: () => {
                  this.toastService.show(
                    'Ошибка при изменении даты рождения',
                    undefined,
                    2,
                  )

                  this.isFailedChangeEvent = true

                  this.profileForm.controls['birthday'].setValue(
                    this.profile$$.value.birthday,
                  )
                },
                next: ({ data }) => {
                  this.profile$$.next({
                    ...this.profile$$.value,
                    birthday: data?.changeAccount.birthday || '',
                  })

                  this.toastService.show(
                    'Дата рождения успешно изменена',
                    undefined,
                    2,
                  )
                },
              }),
        ),
    )
  }

  /**
   * Обработка клика на смену пароля
   * @returns {void}
   */
  public handleChangePass(): void {
    this.dialogService.open(ChangePassComponent, {
      width: '300px',
    })
  }

  /**
   * Обработчик клика для смены аватара
   */
  public handleClickFile(event: Event): void {
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
  public handleSelectFile(event: any): void {
    if (!(this.isMe || this.supervisedByAdmin$$)) {
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
   * Абстрактный метод изменения данных профиля
   * @param {TypedDocument<TResult, TVars>} mutation Мутация в виде gql
   * @param {TVars} variables Объект с переменными запроса
   * @returns {Observable<MutationResult<TResult>>} Observable GraphQL-запроса на мутацию
   */
  private mutate<TResult, TVars>(
    mutation: TypedDocumentNode<TResult, TVars>,
    variables: TVars,
  ): Observable<MutationResult<TResult>> {
    return this.apolloService.mutate({
      mutation,
      variables,
    })
  }

  /**
   * Метод загрузки аватара
   * @param {File} file Выбранный файл
   */
  private uploadAvatar(file: File): void {
    const formData = new FormData()

    formData.append('file', file)

    const upload$ = this.httpClient
      .put<IUpload>(ENV.API_HOST + API.UPLOADS_AVATAR, formData, {
        reportProgress: true,
        observe: 'events',
        withCredentials: true,
        params: {
          u: this.profile$$.value.login || '',
        },
      })
      .pipe(
        finalize(() => this.reset()),
        catchError((err) => {
          console.log(err)

          this.reset()

          return of(null)
        }),
      )

    this.uploadSub = upload$.subscribe((event) => {
      if (!event) {
        return
      }

      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(
          100 * (event.loaded / (event.total || 1)),
        )
      }

      if (event.type == HttpEventType.Response) {
        let uploadedFile = event.body

        if (uploadedFile) {
          this.authSub = this.authService.me().subscribe(() => {})
          this.profileQuery?.refetch()
          this.toastService.show('Аватар успешно изменён')
        }
      }
    })
  }

  /**
   * Метод отмены загрузки аватара
   */
  private cancelUpload(): void {
    this.uploadSub?.unsubscribe()
    this.reset()
  }

  /**
   * Метод локализации роли
   * @param {ROLE} role Системная роль пользователя
   * @returns {string} Русифицированная роль
   */
  public translateRole(role: ROLE): string {
    return IntlRole[role]
  }

  /**
   * Откат загрузки
   */
  private reset(): void {
    this.uploadProgress = null
    this.uploadSub = null
  }

  /**
   * Отмена подписки на изменение аккаунта при размонтировании компонента
   */
  ngOnDestroy(): void {
    this.profileSub?.unsubscribe()
    this.uploadSub?.unsubscribe()
    this.acceptUploadSub?.unsubscribe()
    this.authSub?.unsubscribe()
    this.changedPhone$$.unsubscribe()
    this.changedBirthday$$.unsubscribe()
    this.changedEmail$$.unsubscribe()
    this.changedLogin$$.unsubscribe()
    this.changedUsername$$.unsubscribe()

    this.otherChangeSubs.forEach((item) => item.unsubscribe())
  }
}
