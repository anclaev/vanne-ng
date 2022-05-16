import { FormControl, FormGroup, Validators } from '@angular/forms'
import { map, Observable, startWith, Subject } from 'rxjs'
import { StepperOrientation } from '@angular/cdk/stepper'
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatDialogRef } from '@angular/material/dialog'
import { Component, OnDestroy } from '@angular/core'
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

import { Team } from '@/common/interfaces'
import { ERROR } from '@/common/enums'

import { ToastService } from '@/app/shared/services/toast.service'
import { TeamsService } from '@/app/shared/services/teams.service'
import { codingRole, intlRoles } from '@/app/shared/utils/funcs'

import { UsersComponent } from '../users.component'

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
export class AddUserComponent implements OnDestroy {
  public teams: Team[] = []
  public roles: string[] = []

  public filteredTeams$: Observable<string[]>
  public filteredRoles$: Observable<string[]>
  public stepperOrientation$: Observable<StepperOrientation>

  public birthday$$: Subject<Moment> = new Subject<Moment>()
  public loading$$: Subject<boolean> = new Subject<boolean>()

  /**
   * Форма создания пользователя (шан 1)
   */
  public addUserForm_1 = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[A-Z, a-z, 0-9]+\S$/),
    ]),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
    role: new FormControl('', {
      validators: [Validators.required],
    }),
    team: new FormControl('', Validators.required),
  })

  /**
   * Форма создания пользователя (шаг 2)
   */
  addUserForm_2 = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(
          /^[A-Z, А-Я][a-z, а-я, ё]+\s[A-Z, А-Я][a-z, а-я, ё]+$/,
        ),
      ],
    }),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
    ]),
    phone: new FormControl('', [
      Validators.minLength(6),
      Validators.pattern(/^\d{1,1}\s\d{3,3}\s\d{3,3}\s\d{2,2}\s\d{2,2}$/),
    ]),
    birthday: new FormControl('', Validators.required),
  })

  public addUserForm_3 = new FormGroup({})

  constructor(
    private apolloService: Apollo,
    private toastService: ToastService,
    private teamsService: TeamsService,
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

  public handleAddUser(event: Event): void {
    if (!this._validateForm()) return

    this.createAccoount()
  }

  public createAccoount() {
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

  ngOnDestroy(): void {}

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

  private _filterTeams(value: string): string[] {
    const filterValue = value.toLowerCase() || this.teams[0].name.toLowerCase()

    return this.teams
      .filter((team) => team.name.toLowerCase().includes(filterValue))
      .map((item) => item.name)
  }

  private _filterRoles(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.roles.filter((role) => role.toLowerCase().includes(filterValue))
  }
}
