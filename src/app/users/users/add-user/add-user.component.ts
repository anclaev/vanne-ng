import { FormControl, FormGroup, Validators } from '@angular/forms'
import { map, Observable, startWith, Subject } from 'rxjs'
import { StepperOrientation } from '@angular/cdk/stepper'
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatDialogRef } from '@angular/material/dialog'
import { Component } from '@angular/core'
import { Apollo } from 'apollo-angular'
import moment, { Moment } from 'moment'

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core'

import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

import { CREATE_ACCOUNT } from '@/common/schemes/mutation/createAccount'

import { ERROR, STORAGE } from '@/common/enums'
import { Team } from '@/common/interfaces'
import { MY_FORMATS } from '@/common'

import { StorageService } from '@/app/shared/services/storage.service'
import { ToastService } from '@/app/shared/services/toast.service'
import { TeamsService } from '@/app/shared/services/teams.service'
import { codingRole, intlRoles } from '@/app/shared/utils/funcs'

import { UsersComponent } from '../users.component'

/**
 * Тип полей формы создания аккаунта
 */
type AddUserFormField =
  | 'login'
  | 'password'
  | 'role'
  | 'team'
  | 'username'
  | 'email'
  | 'phone'
  | 'birthday'

/**
 * Компонент создания аккаунта
 */
@Component({
  selector: 'vanne-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass'],
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
export class AddUserComponent {
  /**
   * Массив организаций для выбора
   */
  public teams: Team[] = []

  /**
   * Массив ролей для выбора
   */
  public roles: string[] = []

  /**
   * Отфильтрованные организации в списке выбора
   */
  public filteredTeams$: Observable<string[]>

  /**
   * Отфильтрованные роли в списке выбора
   */
  public filteredRoles$: Observable<string[]>

  /**
   * Ориентация формы
   */
  public stepperOrientation$: Observable<StepperOrientation>

  /**
   * Сабжект с датой рождения
   */
  public birthday$$: Subject<Moment> = new Subject<Moment>()

  /**
   * Флаг на процесс загрузки
   */
  public loading$$: Subject<boolean> = new Subject<boolean>()

  /**
   * Форма создания пользователя (шан 1)
   */
  public addUserForm_1 = new FormGroup({
    login: new FormControl(
      this.storageService.getSessionStorage(STORAGE.ADD_USER_LOGIN) || '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[A-Z, a-z, 0-9]+\S$/),
      ],
    ),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
    role: new FormControl(
      this.storageService.getSessionStorage(STORAGE.ADD_USER_ROLE) || '',
      {
        validators: [Validators.required],
      },
    ),
    team: new FormControl(
      this.storageService.getSessionStorage(STORAGE.ADD_USER_TEAM) || '',
      Validators.required,
    ),
  })

  /**
   * Форма создания пользователя (шаг 2)
   */
  public addUserForm_2 = new FormGroup({
    username: new FormControl(
      this.storageService.getSessionStorage(STORAGE.ADD_USER_USERNAME) || '',
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
    email: new FormControl(
      this.storageService.getSessionStorage(STORAGE.ADD_USER_EMAIL) || '',
      [Validators.required, Validators.email, Validators.minLength(6)],
    ),
    phone: new FormControl(
      this.storageService.getSessionStorage(STORAGE.ADD_USER_PHONE) || '',
      [
        Validators.minLength(6),
        Validators.pattern(/^\d{1,1}\s\d{3,3}\s\d{3,3}\s\d{2,2}\s\d{2,2}$/),
      ],
    ),
    birthday: new FormControl(
      new Date(
        this.storageService.getSessionStorage(
          STORAGE.ADD_USER_BIRTHDAY,
        ) as string,
      ),
      Validators.required,
    ),
  })

  /**
   * Конструктор компонента создания аккаунта
   * @param {Apollo} apolloService Сервис Apollo
   * @param {ToastService} toastService Сервис уведомлений
   * @param {TeamsService} teamsService Сервис организаций
   * @param {StorageService} storageService Сервис взаимодействия с storage
   * @param {BreakpointObserver} breakpointObserver Наблюдатель за изменением разрешения экрана
   * @param {MatDialogRef<UsersComponent>} dialogRef Ссылка на родителя формы
   */
  constructor(
    private apolloService: Apollo,
    private toastService: ToastService,
    private teamsService: TeamsService,
    public storageService: StorageService,
    private breakpointObserver: BreakpointObserver,
    public dialogRef: MatDialogRef<UsersComponent>,
  ) {
    this.stepperOrientation$ = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')))

    let currentTeams = this.teamsService.teams$$.value

    if (currentTeams.length === 0) {
      this.teamsService.fetchTeams()

      this.teamsService.teams$$.subscribe((data) => (this.teams = data))
    } else {
      this.teams = currentTeams
    }

    this.filteredTeams$ = this.addUserForm_1.controls['team'].valueChanges.pipe(
      startWith(''),
      map((val) => this._filterTeams(val)),
    )

    this.filteredRoles$ = this.addUserForm_1.controls['role'].valueChanges.pipe(
      startWith(''),
      map((val) => this._filterRoles(val)),
    )

    this.roles = intlRoles()
  }

  /**
   * Обработчик изменения данных в полях формы
   * @description Записывает данные в session storage
   * @param {AddUserFormField} field Ключ поля формы
   * @param {any} event Новое значение
   */
  public handleChangeField(field: AddUserFormField, event: any): void {
    switch (field) {
      case 'login':
        this.storageService.setSessionStorage(
          STORAGE.ADD_USER_LOGIN,
          event.target.value,
        )
        return

      case 'birthday':
        this.storageService.setSessionStorage(
          STORAGE.ADD_USER_BIRTHDAY,
          event.target.value,
        )
        return

      case 'team':
        this.storageService.setSessionStorage(
          STORAGE.ADD_USER_TEAM,
          event.option.value,
        )
        return

      case 'role':
        this.storageService.setSessionStorage(
          STORAGE.ADD_USER_ROLE,
          event.option.value,
        )
        return

      case 'phone':
        this.storageService.setSessionStorage(
          STORAGE.ADD_USER_PHONE,
          event.target.value,
        )
        return

      case 'email':
        this.storageService.setSessionStorage(
          STORAGE.ADD_USER_EMAIL,
          event.target.value,
        )
        return

      case 'username':
        this.storageService.setSessionStorage(
          STORAGE.ADD_USER_USERNAME,
          event.target.value,
        )
        return
    }
  }

  /**
   * Обработчик клика на создание пользователя
   * @description Полностью валидирует форму и вызывает метод создания аккаунта при успехе
   * @param {Event} event Событие клика
   * @returns {void}
   */
  public handleAddUser(event: Event): void {
    if (!this._validateForm()) return

    this.createAccount()
  }

  /**
   * Метод создания аккаунта
   * @description Отправляет запрос на создание аккаунта и, в случае успеха, информирует об этом пользователя
   * @returns {void}
   */
  public createAccount(): void {
    let username: string = this.addUserForm_2.controls['username'].value
    let firstname = username.split(' ')[0]
    let surname = username.split(' ')[1]

    let team =
      this.teams.find(
        (item) => item.name === this.addUserForm_1.controls['team'].value,
      )?._id || ''

    this.loading$$.next(true)

    this.apolloService
      .mutate<any>({
        mutation: CREATE_ACCOUNT,
        variables: {
          password: this.addUserForm_1.controls['password'].value,
          birthday: moment(
            this.addUserForm_2.controls['birthday'].value,
          ).toDate(),
          email: this.addUserForm_2.controls['email'].value,
          login: this.addUserForm_1.controls['login'].value,
          phone: this.addUserForm_2.controls['phone'].value,
          role: codingRole(this.addUserForm_1.controls['role'].value),
          firstname,
          surname,
          team,
        },
        errorPolicy: 'all',
      })
      .subscribe({
        next: ({ data, errors }) => {
          this.loading$$.next(false)

          if (errors) {
            errors.map((item) => {
              if (item.message === ERROR.ACCOUNT_ALREADY_EXISTS) {
                this.toastService.show('Аккаунт уже зарегистрирован')
              }
            })

            return
          }

          if (data && data.createAccount.login) {
            this.toastService.show('Аккаунт успешно зарегистрирован')

            this.storageService.removeSessionStorage(STORAGE.ADD_USER_LOGIN)
            this.storageService.removeSessionStorage(STORAGE.ADD_USER_ROLE)
            this.storageService.removeSessionStorage(STORAGE.ADD_USER_TEAM)
            this.storageService.removeSessionStorage(STORAGE.ADD_USER_USERNAME)
            this.storageService.removeSessionStorage(STORAGE.ADD_USER_PHONE)
            this.storageService.removeSessionStorage(STORAGE.ADD_USER_EMAIL)
            this.storageService.removeSessionStorage(STORAGE.ADD_USER_BIRTHDAY)

            this.onNoClick()
          }
        },
        error: (e) => {
          this.toastService.show('Ошибка при создании пользователя')
          this.loading$$.next(false)
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
   * Функция валидации формы
   * @description Валидирует поля формы, сообщает о найденных ошибках и возвращает статус валидации
   * @returns {boolean} Флаг валидности формы
   */
  private _validateForm(): boolean {
    if (!this.addUserForm_1.controls['login'].valid) {
      this.toastService.show('Логин обязателен')
      return false
    }

    if (!this.addUserForm_1.controls['password'].valid) {
      this.toastService.show('Пароль должен быть не менее 8 символов')
      return false
    }

    if (!this.addUserForm_2.controls['username'].valid) {
      this.toastService.show('Некорректное имя и фамилия')
      return false
    }

    if (!this.addUserForm_2.controls['email'].valid) {
      this.toastService.show('Некорректный email')
      return false
    }

    if (!this.addUserForm_2.controls['birthday'].valid) {
      this.toastService.show('Некорректная дата рождения')
      return false
    }

    if (!this.addUserForm_2.controls['phone'].valid) {
      this.toastService.show('Некорректный мобильный номер')
      return false
    }

    if (!this.addUserForm_1.controls['team'].valid) {
      this.toastService.show('Некорректная организация')
      return false
    }

    if (
      !!!this.roles.find(
        (item) => item === this.addUserForm_1.controls['role'].value,
      )
    ) {
      this.toastService.show('Некорректная роль')
      return false
    }

    return true
  }

  /**
   * Функция фильтрации организаций
   * @description Фильтрует выбранную в списке организацию и возвращает новый массив организаций
   * @param {string} value Выбранная организаций
   * @returns {string[]} Массив отфильтрованных организаций
   */
  private _filterTeams(value: string): string[] {
    const filterValue = value.toLowerCase() || this.teams[0].name.toLowerCase()

    return this.teams
      .filter((team) => team.name.toLowerCase().includes(filterValue))
      .map((item) => item.name)
  }

  /**
   * Функция фильтрации ролей
   * @description Фильтрует выбранную в списке роль и возвращает новый массив ролей
   * @param {string} value Выбранная роль
   * @returns {string[]} Массив отфильтрованных ролей
   */
  private _filterRoles(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.roles.filter((role) => role.toLowerCase().includes(filterValue))
  }
}
