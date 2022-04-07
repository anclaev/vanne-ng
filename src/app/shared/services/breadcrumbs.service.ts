import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private breadcrumbs$$: BehaviorSubject<string[]>

  constructor() {
    this.breadcrumbs$$ = new BehaviorSubject<string[]>([])
  }

  public get breadcrumbs(): string[] {
    return this.breadcrumbs$$.value
  }

  public push(items: string[]): void {
    this.breadcrumbs$$.next(items)
  }
}
