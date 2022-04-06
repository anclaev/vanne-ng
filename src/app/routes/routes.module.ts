import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { AuthComponent } from '@/app/auth/auth.component'

/**
 * Базовые маршруты приложения
 */
const APP_ROUTES: Routes = [
  {
    path: 'sign-in',
    component: AuthComponent,
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
