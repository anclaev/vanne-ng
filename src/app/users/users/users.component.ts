import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { BehaviorSubject, map, Observable, startWith } from 'rxjs'
import { MatChipInputEvent } from '@angular/material/chips'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatDialog } from '@angular/material/dialog'
import { Apollo, QueryRef } from 'apollo-angular'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { Account, GET_ACCOUNTS } from '@/common/schemes/query/getAccounts'

import { TeamsService } from '@/app/shared/services/teams.service'
import { AuthService } from '@/app/shared/services/auth.service'
import { translateRole } from '@/app/shared/utils/funcs'

import { AddUserComponent } from './add-user/add-user.component'

/**
 * Компонент страницы пользователей
 */
@Component({
  selector: 'vanne-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  animations: [inOutComponentAnimation],
})
export class UsersComponent implements OnInit {
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

  public separatorKeyCodes: any[] = [ENTER, COMMA]

  public roleCtrl = new FormControl()
  public companyCtrl = new FormControl()

  public filteredRoles$: Observable<string[]>
  public filteredCompanies$: Observable<string[]>

  public roles: string[] = []
  public companies: string[] = []

  public allRoles: string[] = [
    'Администратор',
    'Руководитель',
    'Студент',
    'Куратор',
    'Преподаватель',
  ]

  public allCompanies: string[] = []

  private _start: number = 0
  private _limit: number = 9
  private _isLoading: boolean = false

  private accountsQuery!: QueryRef<any>

  @ViewChild('roleInput')
  roleInput!: ElementRef<HTMLInputElement>

  @ViewChild('companyInput')
  companyInput!: ElementRef<HTMLInputElement>

  constructor(
    private readonly authService: AuthService,
    private readonly apolloService: Apollo,
    private readonly teamService: TeamsService,
    private readonly routerService: Router,
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

  public fetchMoreAccounts() {
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

  public addRole(event: MatChipInputEvent) {
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

  public addCompany(event: MatChipInputEvent) {
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

  public removeRole(role: string) {
    const index = this.roles.indexOf(role)

    if (index >= 0) {
      this.roles.splice(index, 1)
    }
  }

  public removeCompany(company: string) {
    const index = this.companies.indexOf(company)

    if (index >= 0) {
      this.companies.splice(index, 1)
    }
  }

  public selectedRole(event: any) {
    const isCurrentRole = this.roles.indexOf(event.option.viewValue) === -1

    if (isCurrentRole) this.roles.push(event.option.viewValue)

    this.roleInput.nativeElement.value = ''
    this.roleCtrl.setValue(null)
  }

  public selectedCompany(event: any) {
    const isCurrentCompany =
      this.companies.indexOf(event.option.viewValue) === -1

    if (isCurrentCompany) this.companies.push(event.option.viewValue)

    this.companyInput.nativeElement.value = ''
    this.companyCtrl.setValue(null)
  }

  public translate(role: string) {
    translateRole(role)
  }

  public handleAddUser() {
    this.dialogService.open(AddUserComponent, {
      width: '600px',
    })
  }

  public handleScrollDown(event: any) {
    this.fetchMoreAccounts()
  }

  public handleSelectAccount(login: string) {
    this.routerService.navigate([`/u/${login}`])
  }

  private _filterRoles(value: string): string[] {
    const filterValue = value.toUpperCase()

    return this.allRoles.filter((role) =>
      role.toUpperCase().includes(filterValue),
    )
  }
  private _filterCompanies(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.allCompanies.filter((company) =>
      company.toLowerCase().includes(filterValue),
    )
  }
}
