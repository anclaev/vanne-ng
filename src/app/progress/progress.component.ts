import { Component, OnInit } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass'],
  animations: [inOutComponentAnimation],
})
export class ProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
