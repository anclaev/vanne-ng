import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { DashboardComponent } from '@/app/dashboard/dashboard.component'
import { SignInComponent } from '@/app/auth/sign-in/sign-in.component'
import { ProgressComponent } from './progress/progress.component'
import { SettingsComponent } from './settings/settings.component'
import { AlarmsComponent } from './alarms/alarms.component'
import { UsersComponent } from './users/users.component'
import { DebtsComponent } from './debts/debts.component'
import { ChatsComponent } from './chats/chats.component'
import { MeComponent } from './me/me.component'

import { AuthGuard } from '@shared/guards/auth.guard'

import { Routes } from '@common/interfaces'

/**
 * Базовые маршруты приложения
 */
const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'me',
    pathMatch: 'full',
    component: MeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'progress',
    pathMatch: 'full',
    component: ProgressComponent,
    data: {
      title: 'Progress',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'debts',
    pathMatch: 'full',
    component: DebtsComponent,
    data: {
      title: 'Debts',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'alarms',
    pathMatch: 'full',
    component: AlarmsComponent,
    data: {
      title: 'Alarms',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'chats',
    pathMatch: 'full',
    component: ChatsComponent,
    data: {
      title: 'Chats',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
    data: {
      title: 'Users',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent,
    data: {
      title: 'Settings',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: {
      title: 'Vanne',
    },
  },
  {
    path: '**',
    redirectTo: '/',
    data: {
      title: 'Vanne',
    },
  },
]

/**
 * Базовый модуль роутинга
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
