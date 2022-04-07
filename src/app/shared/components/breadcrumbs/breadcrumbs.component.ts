import { Component, Input, OnInit } from '@angular/core'

import { BreadcrumbsService } from '@shared/services/breadcrumbs.service'

@Component({
  selector: 'vanne-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() items: string[] = ['']

  constructor(public service: BreadcrumbsService) {}

  ngOnInit(): void {
    this.service.push(this.items)
  }
}
