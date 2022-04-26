import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'

import { ChatsRoutingModule } from './chats-routing.module'
import { ChatsComponent } from './chats.component'

@NgModule({
  declarations: [ChatsComponent],
  imports: [CommonModule, SharedModule, ChatsRoutingModule],
})
export class ChatsModule {}
