import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core'

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter'

import {
  BehaviorSubject,
  catchError,
  debounceTime,
  finalize,
  of,
  Subject,
  Subscription,
  throttleTime,
} from 'rxjs'

import { FormControl, FormGroup, Validators } from '@angular/forms'

import { HttpClient, HttpEventType } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { Apollo, QueryRef } from 'apollo-angular'
import moment, { Moment } from 'moment'

import { ToastService } from '@shared/services/toast.service'
import { AuthService } from '@shared/services/auth.service'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { IAccount, initialAccount } from '@/common/models/account'
import { IUpload } from '@/common/interfaces/upload.interface'
import { GET_PROFILE } from '@common/schemes/query/getProfile'
import { imageMimeTypes } from '@/common'
import { API } from '@/common/enums'

import { ENV } from '@/environments/env'

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
   * Флаг просмотра администратором
   */
  public supervisedByAdmin: boolean = false

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
          Validators.pattern('[a-zA-Z]+s[a-zA-Z]+'),
        ],
      },
    ),
    login: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
    ]),
    phone: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('[0-9]+s[0-9]+s[0-9]+s[0-9]+s[0-9]+'),
    ]),
    birthday: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
  })

  public changedLogin: Subject<string> = new Subject<string>()
  public changedUsername: Subject<string> = new Subject<string>()
  public changedPhone: Subject<string> = new Subject<string>()
  public changedEmail: Subject<string> = new Subject<string>()
  public changedBirthday: Subject<Moment> = new Subject<Moment>()

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
  ) {
    // Инициализация пустого аккаунта
    let initial = initialAccount

    // Логин нужного аккаунта
    let target = this.route.snapshot.params['login']

    // Текущий пользователь ИС
    let currentUser = this.authService.currentUser

    this.supervisedByAdmin =
      currentUser?.role === 'ADMIN' || currentUser?.role === 'HEAD'

    // Проверка на свою страницу
    if (target && currentUser && currentUser.login === target) {
      this.isMe = true
    }

    // Смена доступности формы в зависимости от пользователя
    if (this.supervisedByAdmin) {
      Object.keys(this.profileForm.controls).forEach((item) =>
        this.profileForm.controls[item].enable(),
      )
    }

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

        this.profileForm.controls['username'].setValue(profile.username)
        this.profileForm.controls['email'].setValue(profile.email)
        this.profileForm.controls['phone'].setValue(profile.phone)
        this.profileForm.controls['login'].setValue(profile.login)
        this.profileForm.controls['birthday'].setValue(moment(profile.birthday))

        this.titleService.setTitle(profile.login ? profile.login : 'Профиль')

        this.changedLogin
          .asObservable()
          .pipe(debounceTime(5000))
          .subscribe((value) => {
            this.changeLogin(value)
          })

        this.changedUsername
          .asObservable()
          .pipe(debounceTime(5000))
          .subscribe((value) => {
            this.changeUsername(value)
          })

        this.changedPhone
          .asObservable()
          .pipe(debounceTime(5000))
          .subscribe((value) => {
            this.changePhone(value)
          })

        this.changedEmail
          .asObservable()
          .pipe(debounceTime(5000))
          .subscribe((value) => {
            this.changeEmail(value)
          })

        this.changedBirthday
          .asObservable()
          .pipe(debounceTime(5000))
          .subscribe((value) => {
            this.changeBirthday(value.toDate())
          })
      },
    })
  }

  public onChangeLogin(val: string) {
    if (val.trim().length === 0 || !this.profileForm.controls['login'].valid)
      return

    this.changedLogin.next(val)
  }

  public changeLogin(val: string) {
    console.log('Change login: ', val)
  }

  public onChangeUsername(val: string) {
    if (val.trim().length === 0 || !this.profileForm.controls['username'].valid)
      return

    this.changedUsername.next(val)
  }

  public changeUsername(val: string) {
    console.log('Change username: ', val)
  }

  public onChangePhone(val: string) {
    if (val.trim().length === 0 || !this.profileForm.controls['phone'].valid)
      return

    this.changedPhone.next(val)
  }

  public changePhone(val: string) {
    console.log('Change phone: ', val)
  }

  public onChangeEmail(val: string) {
    if (val.trim().length === 0 || !this.profileForm.controls['email'].valid)
      return

    this.changedEmail.next(val)
  }

  public changeEmail(val: string) {
    console.log('Change email: ', val)
  }

  public onChangeBirthday(val: Moment) {
    if (!this.profileForm.controls['birthday'].valid) return

    this.changedBirthday.next(val)
  }

  public changeBirthday(val: Date) {
    console.log('Change birthday: ', val)
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
  }
}
