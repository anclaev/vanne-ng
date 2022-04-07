import { Component, Inject, OnInit } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'vanne-404',
  templateUrl: './non-existent.component.html',
  styleUrls: ['./non-existent.component.sass'],
})
export class NonExistentComponent implements OnInit {
  private document: Document

  constructor(private router: Router, @Inject(DOCUMENT) document: Document) {
    this.document = document
  }

  ngOnInit(): void {
    this.document.body.dataset['404'] = 'true'
  }

  ngOnDestroy(): void {
    this.document.body.dataset['404'] = 'false'
  }

  toHome() {
    this.router.navigate(['/'])
  }
}
