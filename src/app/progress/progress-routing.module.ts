import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { ProgressComponent } from './progress.component'

const routes: Routes = [
  {
    path: '',
    component: ProgressComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressRoutingModule {}
