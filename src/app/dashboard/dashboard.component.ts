import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { Component } from '@angular/core'

@Component({
  selector: 'vanne-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  animations: [inOutComponentAnimation],
})
export class DashboardComponent {
  constructor() {}
}
