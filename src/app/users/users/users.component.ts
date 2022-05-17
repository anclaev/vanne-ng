import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

import { BehaviorSubject, map, Observable, startWith } from 'rxjs'
import { MatChipInputEvent } from '@angular/material/chips'
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatDialog } from '@angular/material/dialog'
import { Apollo, QueryRef } from 'apollo-angular'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { Account, GET_ACCOUNTS } from '@/common/schemes/query/getAccounts'

import { StorageService } from '@/app/shared/services/storage.service'
import { TeamsService } from '@/app/shared/services/teams.service'
import { AuthService } from '@/app/shared/services/auth.service'
import { translateRole } from '@/app/shared/utils/funcs'

import { AddUserComponent } from './add-user/add-user.component'
import { STORAGE } from '@/common/enums'

/**
 * Компонент страницы пользователей
 */
@Component({
  selector: 'vanne-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  animations: [inOutComponentAnimation],
})
export class UsersComponent implements OnInit, OnDestroy {
  /**
   * Флаг мобильного устройства
   */
  public isMobile = window.innerWidth < 576

  /**
   * Контейнер для бесконечного скролла
   */
  public scrollContainer = 'main'

  /**
   * Флаг просмотра администратором
   */
  public supervisedByAdmin$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)

  /**
   * Массив аккаунтов
   */
  public accounts$$: BehaviorSubject<Account[]> = new BehaviorSubject<
    Account[]
  >([])

  /**
   * Коды символов-разделителей
   */
  public separatorKeyCodes: any[] = [ENTER, COMMA]

  /**
   * Поле выбора роли
   */
  public roleCtrl = new FormControl()

  /**
   * Поле выбора организации
   */
  public companyCtrl = new FormControl()

  /**
   * Наблюдатель за отфильтрованными ролями
   */
  public filteredRoles$: Observable<string[]>

  /**
   * Наблюдатель за отфильтрованными ролями
   */
  public filteredCompanies$: Observable<string[]>

  /**
   * Массив ролей для выбора
   */
  public roles: string[] = []

  /**
   * Массив организаций для выбора
   */
  public companies: string[] = []

  /**
   * Массив всех доступных ролей аккаунта
   */
  public allRoles: string[] = [
    'Администратор',
    'Руководитель',
    'Студент',
    'Куратор',
    'Преподаватель',
  ]

  /**
   * Массив всех организаций
   */
  public allCompanies: string[] = []

  /**
   * Начальный индекс выборки аккаунтов
   */
  private _start: number = 0

  /**
   * Лимит выборки аккаунтов
   */
  private _limit: number = 9

  /**
   * Флаг статуса загрузки
   */
  private _isLoading: boolean = false

  /**
   * Ссылка на запрос на получение аккаунтов
   */
  private accountsQuery!: QueryRef<any>

  /**
   * Ссылка на поле выбора роли
   */
  @ViewChild('roleInput')
  roleInput!: ElementRef<HTMLInputElement>

  /**
   * Ссылка на поле выбора организации
   */
  @ViewChild('companyInput')
  companyInput!: ElementRef<HTMLInputElement>

  /**
   * Конструктор компонения просмотра аккаунтов
   * @param {AuthService} authService Сервис авторизации
   * @param {Apollo} apolloService Сервис Apollo
   * @param {TeamService} teamService Сервис организаций
   * @param {Router} routerService Сервис роутера
   * @param {StorageService} storageService Сервис взаимодействия с storage
   * @param {MatDialog} dialogService Сервис диалоговых окон
   */
  constructor(
    private readonly authService: AuthService,
    private readonly apolloService: Apollo,
    private readonly teamService: TeamsService,
    private readonly routerService: Router,
    private readonly storageService: StorageService,
    private readonly dialogService: MatDialog,
  ) {
    if (window.innerWidth <= 768 || window.innerHeight <= 415) {
      this._limit = 6
    }

    if (window.innerWidth <= 576 || window.innerHeight <= 415) {
      this._limit = 3
    }

    this.teamService.teams$$.subscribe((data) => {
      if (data.length > 0) {
        this.allCompanies = data.map((item) => item.short_name)
      }
    })

    this.supervisedByAdmin$$.next(
      this.authService.currentUser?.role === 'ADMIN',
    )

    if (this.supervisedByAdmin$$.value) {
      this.teamService.fetchTeams()
    }

    this.filteredRoles$ = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) =>
        role ? this._filterRoles(role) : this.allRoles.slice(),
      ),
    )

    this.filteredCompanies$ = this.companyCtrl.valueChanges.pipe(
      startWith(null),
      map((company: string | null) =>
        company ? this._filterCompanies(company) : this.allCompanies.slice(),
      ),
    )
  }

  /**
   * Метод инициализации компонента
   * @description Отправляет запрос на получение аккаунтов и подписывается на изменение полученных данных
   * @returns {void}
   */
  ngOnInit(): void {
    this.accountsQuery = this.apolloService.watchQuery<Account, {}>({
      query: GET_ACCOUNTS,
      variables: {
        start: this._start,
        limit: this._limit,
      },
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    })

    this._isLoading = true

    this.accountsQuery.valueChanges.subscribe({
      next: ({ data }) => {
        const accounts = data.accounts.map((item: Account) => ({
          ...item,
          role: translateRole(item.role),
          avatar: item.avatar
            ? item.avatar
            : {
                url: '/assets/media/ava-default.webp',
              },
        }))

        this.accounts$$.next([...this.accounts$$.value, ...accounts])

        this._start += this._limit
        this._isLoading = false
      },
      error: (err) => console.log(err.networkError),
    })
  }

  /**
   * Метод получения дополнительных аккаунтов для бесконечной ленты
   * @returns {void}
   */
  public fetchMoreAccounts(): void {
    if (!this._isLoading) {
      this._isLoading = true

      this.accountsQuery.fetchMore({
        variables: {
          start: this._start,
          limit: this._limit,
        },
      })
    }
  }

  /**
   * Обработчик выбора роли для поиска
   * @param {MatChipInputEvent} event Событие выбора
   * @returns {void}
   */
  public handleAddRole(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    let isValidRole = !!this.allRoles.find(
      (item) => translateRole(item) === value,
    )

    if (!!value && isValidRole) {
      this.roles.push(value)
    }

    event.chipInput!.clear()

    this.roleCtrl.setValue(null)
  }

  /**
   * Обработчик выбора организации для поиска
   * @param {MatChipInputEvent} event Событие выбора
   * @returns {void}
   */
  public handleAddCompany(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    if (
      value &&
      !!!this.companies.find((item) => item === value) &&
      this.allCompanies.indexOf(value) >= 0
    ) {
      this.companies.push(value)
    }

    event.chipInput!.clear()

    this.companyCtrl.setValue(null)
  }

  /**
   * Обработчик отмены выбора роли
   * @param {string} role Выбранная роль
   * @returns {void}
   */
  public handleRemoveRole(role: string): void {
    const index = this.roles.indexOf(role)

    if (index >= 0) {
      this.roles.splice(index, 1)
    }
  }

  /**
   * Обработчик отмены выбора организации
   * @param {string} company Выбранная организация
   * @returns {void}
   */
  public handleRemoveCompany(company: string): void {
    const index = this.companies.indexOf(company)

    if (index >= 0) {
      this.companies.splice(index, 1)
    }
  }

  /**
   * Обработчик выбора роли через Autocomplete
   * @param {MatAutocompleteSelectedEvent} event Событие выбора
   * @returns {void}
   */
  public handleSelectedRole(event: MatAutocompleteSelectedEvent): void {
    const isCurrentRole = this.roles.indexOf(event.option.viewValue) === -1

    if (isCurrentRole) this.roles.push(event.option.viewValue)

    this.roleInput.nativeElement.value = ''
    this.roleCtrl.setValue(null)
  }

  /**
   * Обработчик выбора организации через Autocomplete
   * @param {MatAutocompleteSelectedEvent} event Событие выбора
   * @returns {void}
   */
  public handleSelectedCompany(event: MatAutocompleteSelectedEvent): void {
    const isCurrentCompany =
      this.companies.indexOf(event.option.viewValue) === -1

    if (isCurrentCompany) this.companies.push(event.option.viewValue)

    this.companyInput.nativeElement.value = ''
    this.companyCtrl.setValue(null)
  }

  /**
   * Обработчик клика на создание аккаунта
   * @description Открывает модальное окно создания аккаунта
   * @returns {void}
   */
  public handleAddUser(): void {
    this.dialogService.open(AddUserComponent, {
      width: '600px',
    })
  }

  /**
   * Обработчик прокрутки сттраницы
   * @description Запускает получение аккаунтов при прокрутке до конца страницы
   * @param {IInfiniteScrollEvent} event Событие бесконечной прокрутки
   * @returns {void}
   */
  public handleScrollDown(event: IInfiniteScrollEvent): void {
    console.log('scroll!')
    this.fetchMoreAccounts()
  }

  /**
   * Обработчик клика на аккаунт
   * @description Открывает страницу профиля выбранного аккаунта
   * @param {string} login Логин аккаунта
   * @returns {void}
   */
  public handleSelectAccount(login: string): void {
    this.routerService.navigate([`/u/${login}`])
  }

  /**
   * Функция фильтрации списка ролей после выбора
   * @param {string} value Выбранная роль
   * @returns {string[]} Обновлённый список ролей
   */
  private _filterRoles(value: string): string[] {
    const filterValue = value.toUpperCase()

    return this.allRoles.filter((role) =>
      role.toUpperCase().includes(filterValue),
    )
  }

  /**
   * Функция фильтрации списка организаций после выбора
   * @param {string} value Выбранная организация
   * @returns {string[]} Обновлённый список организаций
   */
  private _filterCompanies(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.allCompanies.filter((company) =>
      company.toLowerCase().includes(filterValue),
    )
  }

  /**
   * Удаление временных данных из session storage
   */
  ngOnDestroy(): void {
    this.storageService.removeSessionStorage(STORAGE.ADD_USER_LOGIN)
    this.storageService.removeSessionStorage(STORAGE.ADD_USER_ROLE)
    this.storageService.removeSessionStorage(STORAGE.ADD_USER_TEAM)
    this.storageService.removeSessionStorage(STORAGE.ADD_USER_USERNAME)
    this.storageService.removeSessionStorage(STORAGE.ADD_USER_PHONE)
    this.storageService.removeSessionStorage(STORAGE.ADD_USER_EMAIL)
    this.storageService.removeSessionStorage(STORAGE.ADD_USER_BIRTHDAY)
  }
}
