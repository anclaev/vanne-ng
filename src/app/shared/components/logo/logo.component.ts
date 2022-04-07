import { Component, Input } from '@angular/core'

@Component({
  selector: 'vanne-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.sass'],
})
export class LogoComponent {
  @Input() width: string = '153'
  @Input() height: string = '36'
  @Input() type: 'default' | 'small' = 'default'
}
