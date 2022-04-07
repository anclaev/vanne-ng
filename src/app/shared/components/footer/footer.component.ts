import { Component, Input } from '@angular/core'

import { ComponentType } from '@/common/interfaces'

@Component({
  selector: 'vanne-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  me = {
    title: 'anclaev',
    link: 'https://t.me/anclaev',
  }

  @Input() type: ComponentType = 'public'
}
