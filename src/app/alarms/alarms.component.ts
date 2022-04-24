import { Component } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент страницы уведомлений
 */
@Component({
  selector: 'vanne-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.sass'],
  animations: [inOutComponentAnimation],
})
export class AlarmsComponent {}
