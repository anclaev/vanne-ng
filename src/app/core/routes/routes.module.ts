import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { NonExistentComponent } from '@/app/shared/components/non-existent/non-existent.component'
import { DashboardComponent } from '@/app/dashboard/dashboard.component'
import { AuthComponent } from '@/app/auth/auth.component'

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
    path: 'auth',

    component: AuthComponent,
    data: {
      title: 'Vanne',
    },
  },
  {
    path: 'progress',
    loadChildren: () =>
      import('../../progress/progress.module').then((m) => m.ProgressModule),
    data: {
      title: 'Progress',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'alerts',
    loadChildren: () =>
      import('../../alerts/alerts.module').then((m) => m.AlertsModule),
    data: {
      title: 'Alerts',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'chats',
    loadChildren: () =>
      import('../../chats/chats.module').then((m) => m.ChatsModule),
    data: {
      title: 'Chats',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../users/users.module').then((m) => m.UsersModule),
    data: {
      title: 'Users',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'me',
    loadChildren: () => import('../../me/me.module').then((m) => m.MeModule),
    data: {
      title: 'I am',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../../settings/settings.module').then((m) => m.SettingsModule),
    data: {
      title: 'Settings',
    },
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: NonExistentComponent,
    data: {
      title: 'Vanne',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
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
export class RoutesModule {}
