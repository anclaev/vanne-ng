import { Component, Input } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
  animations: [inOutComponentAnimation],
})
export class NavComponent {
  @Input('status') status: boolean = false

  constructor() {}
}
