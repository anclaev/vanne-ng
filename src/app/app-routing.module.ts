import { PreloadAllModules, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { AuthGuard } from '@shared/guards/auth.guard'

import { Routes } from '@common/interfaces'

/**
 * Базовые маршруты приложения
 */
const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      title: 'Дашборд',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'progress',
    pathMatch: 'full',
    loadChildren: () =>
      import('./progress/progress.module').then((m) => m.ProgressModule),
    data: {
      title: 'Успеваемость',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'debt',
    pathMatch: 'full',
    loadChildren: () =>
      import('./debts/debts.module').then((m) => m.DebtsModule),
    data: {
      title: 'Задолженности',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'alarm',
    pathMatch: 'full',
    loadChildren: () =>
      import('./alarms/alarms.module').then((m) => m.AlarmsModule),
    data: {
      title: 'Уведомления',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    pathMatch: 'full',
    loadChildren: () =>
      import('./chats/chats.module').then((m) => m.ChatsModule),
    data: {
      title: 'Мессенджер',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    pathMatch: 'full',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
    data: {
      title: 'Настройки',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: {
      title: 'Vanne',
    },
  },
  {
    path: 'u',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    data: {
      title: 'Аккаунты',
    },
    canActivate: [AuthGuard],
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
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
