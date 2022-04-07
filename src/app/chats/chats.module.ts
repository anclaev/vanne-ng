import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChatsRoutingModule } from './chats-routing.module'

@NgModule({
  imports: [CommonModule, ChatsRoutingModule],
})
export class ChatsModule {}
