import { Component, OnInit } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  animations: [inOutComponentAnimation],
})
export class UsersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
