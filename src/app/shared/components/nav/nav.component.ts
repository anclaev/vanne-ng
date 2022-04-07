import { Component } from '@angular/core'

import { ComponentType } from '@common/interfaces'

import { NavService } from '@shared/services/nav.service'

@Component({
  selector: 'vanne-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent {
  public type: ComponentType = 'public'

  constructor(public navService: NavService) {}
}
