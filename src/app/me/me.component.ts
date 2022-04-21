import { Component, OnInit } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.sass'],
  animations: [inOutComponentAnimation],
})
export class MeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
