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
      title: 'Dashboard',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'me',
    pathMatch: 'full',
    loadChildren: () => import('./me/me.module').then((m) => m.MeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'progress',
    pathMatch: 'full',
    loadChildren: () =>
      import('./progress/progress.module').then((m) => m.ProgressModule),
    data: {
      title: 'Progress',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'debts',
    pathMatch: 'full',
    loadChildren: () =>
      import('./debts/debts.module').then((m) => m.DebtsModule),
    data: {
      title: 'Debts',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'alarms',
    pathMatch: 'full',
    loadChildren: () =>
      import('./alarms/alarms.module').then((m) => m.AlarmsModule),
    data: {
      title: 'Alarms',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'chats',
    pathMatch: 'full',
    loadChildren: () =>
      import('./chats/chats.module').then((m) => m.ChatsModule),
    data: {
      title: 'Chats',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    pathMatch: 'full',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    data: {
      title: 'Users',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    pathMatch: 'full',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
    data: {
      title: 'Settings',
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
