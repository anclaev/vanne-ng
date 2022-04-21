import { Component, Input } from '@angular/core'

@Component({
  selector: 'vanne-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent {
  @Input('status') status: boolean = false

  constructor() {}
}
