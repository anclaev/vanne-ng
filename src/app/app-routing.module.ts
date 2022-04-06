import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

const APP_ROUTES: Routes = []

/**
 * Базовый модуль роутинга
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
