import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { ChatsComponent } from './chats.component'

const routes: Routes = [
  {
    path: '',
    component: ChatsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
