import { Component, Input } from '@angular/core'

@Component({
  selector: 'vanne-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Input('status') status: boolean = false

  constructor() {}
}
