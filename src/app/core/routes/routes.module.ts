import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { NonExistentComponent } from '@/app/shared/components/non-existent/non-existent.component'
import { DashboardComponent } from '@/app/dashboard/dashboard.component'
import { SettingsComponent } from '@/app/settings/settings.component'
import { ProgressComponent } from '@/app/progress/progress.component'
import { AlertsComponent } from '@/app/alerts/alerts.component'
import { ChatsComponent } from '@/app/chats/chats.component'
import { UsersComponent } from '@/app/users/users.component'
import { AuthComponent } from '@/app/auth/auth.component'
import { MeComponent } from '@/app/me/me.component'

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
    component: ProgressComponent,
    data: {
      title: 'Progress',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    data: {
      title: 'Alerts',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'chats',
    component: ChatsComponent,
    data: {
      title: 'Chats',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'me',
    component: MeComponent,
    data: {
      title: 'I am',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
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
