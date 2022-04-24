import { Component } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент страницы успеваемости
 */
@Component({
  selector: 'vanne-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass'],
  animations: [inOutComponentAnimation],
})
export class ProgressComponent {}
