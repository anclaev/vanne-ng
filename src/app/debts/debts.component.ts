import { Component, OnInit } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.sass'],
  animations: [inOutComponentAnimation],
})
export class DebtsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
