import { Component, Input } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент меню приложения
 */
@Component({
  selector: 'vanne-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
  animations: [inOutComponentAnimation],
})
export class NavComponent {
  /**
   * Статус отображения меню
   */
  @Input('status') status: boolean = false
}
