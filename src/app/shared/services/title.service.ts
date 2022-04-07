import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title$$: BehaviorSubject<string>

  constructor() {
    this.title$$ = new BehaviorSubject<string>('')
  }

  public get title(): string {
    return this.title$$.value
  }

  public push(title: string): void {
    this.title$$.next(title)
  }
}
