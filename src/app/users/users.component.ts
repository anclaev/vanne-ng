import { Component } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент страницы пользователей
 */
@Component({
  selector: 'vanne-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  animations: [inOutComponentAnimation],
})
export class UsersComponent {}
