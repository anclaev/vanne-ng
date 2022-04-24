import { Component } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент страницы задолженностей
 */
@Component({
  selector: 'vanne-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.sass'],
  animations: [inOutComponentAnimation],
})
export class DebtsComponent {}
