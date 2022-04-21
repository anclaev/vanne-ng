import { Component, OnInit } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.sass'],
  animations: [inOutComponentAnimation],
})
export class ChatsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
