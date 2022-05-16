import { BehaviorSubject, map, Observable, startWith } from 'rxjs'
import { Component, ElementRef, ViewChild } from '@angular/core'
import { MatChipInputEvent } from '@angular/material/chips'
import { COMMA, ENTER, I } from '@angular/cdk/keycodes'
import { MatDialog } from '@angular/material/dialog'
import { FormControl } from '@angular/forms'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

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
export class UsersComponent {
  /**
   * Флаг просмотра администратором
   */
  public supervisedByAdmin$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)

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

  @ViewChild('roleInput')
  roleInput!: ElementRef<HTMLInputElement>

  @ViewChild('companyInput')
  companyInput!: ElementRef<HTMLInputElement>

  constructor(
    private readonly authService: AuthService,
    private readonly teamService: TeamsService,
    private readonly dialogService: MatDialog,
  ) {
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

    if (value) {
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
    this.roles.push(event.option.viewValue)

    const currentRole = this.allRoles.find(
      (item) => item === event.option.viewValue,
    )

    if (currentRole) this.allRoles.splice(this.allRoles.indexOf(currentRole), 1)

    this.roleInput.nativeElement.value = ''
    this.roleCtrl.setValue(null)
  }

  public selectedCompany(event: any) {
    this.companies.push(event.option.viewValue)
    this.companyInput.nativeElement.value = ''
    this.companyCtrl.setValue(null)
  }

  public translate(role: string) {
    translateRole(role)
  }

  public handleAddUser() {
    this.dialogService.open(AddUserComponent, {
      width: '500px',
    })
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
