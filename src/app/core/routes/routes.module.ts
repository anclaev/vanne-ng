import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { Routes } from '@common/interfaces'

/**
 * Базовые маршруты приложения
 */
const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../../auth/auth.module').then((m) => m.AuthModule),
    data: {
      title: 'Auth',
    },
  },
  {
    path: 'progress',
    loadChildren: () =>
      import('../../progress/progress.module').then((m) => m.ProgressModule),
    data: {
      title: 'Progress',
    },
  },
  {
    path: 'alerts',
    loadChildren: () =>
      import('../../alerts/alerts.module').then((m) => m.AlertsModule),
    data: {
      title: 'Alerts',
    },
  },
  {
    path: 'chats',
    loadChildren: () =>
      import('../../chats/chats.module').then((m) => m.ChatsModule),
    data: {
      title: 'Chats',
    },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../users/users.module').then((m) => m.UsersModule),
    data: {
      title: 'Users',
    },
  },
  {
    path: 'me',
    loadChildren: () => import('../../me/me.module').then((m) => m.MeModule),
    data: {
      title: 'I am',
    },
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../../settings/settings.module').then((m) => m.SettingsModule),
    data: {
      title: 'Settings',
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
export class RoutesModule {}
