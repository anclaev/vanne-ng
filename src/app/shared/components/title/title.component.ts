import { Component, Input, OnInit } from '@angular/core'

import { TitleService } from '@shared/services/title.service'

@Component({
  selector: 'vanne-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass'],
})
export class TitleComponent implements OnInit {
  @Input() title: string = 'Vanne'

  constructor(public titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.push(this.title)
  }
}
