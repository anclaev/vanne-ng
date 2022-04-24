import { Component } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент страницы чатов
 */
@Component({
  selector: 'vanne-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.sass'],
  animations: [inOutComponentAnimation],
})
export class ChatsComponent {}
