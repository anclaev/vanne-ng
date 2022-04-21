import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatsComponent } from './chats.component'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [ChatsComponent],
  imports: [CommonModule, SharedModule],
})
export class ChatsModule {}
