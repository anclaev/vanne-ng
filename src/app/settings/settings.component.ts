import { Component, OnInit } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

@Component({
  selector: 'vanne-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
  animations: [inOutComponentAnimation],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
