import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { DashboardComponent } from '@/app/dashboard/dashboard.component'
import { SignInComponent } from '@/app/auth/sign-in/sign-in.component'

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
export class RoutesModule {}
