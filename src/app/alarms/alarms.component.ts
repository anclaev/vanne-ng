import { Component, OnInit } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.sass'],
  animations: [inOutComponentAnimation],
})
export class AlarmsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
