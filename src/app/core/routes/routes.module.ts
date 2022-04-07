import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

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
      title: 'Дашборд',
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
