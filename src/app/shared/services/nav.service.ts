import { Injectable } from '@angular/core'

import { STORAGE } from '@common/enums'

@Injectable({ providedIn: 'root' })
export class NavService {
  public isHidden: boolean = localStorage.getItem(STORAGE.NAV_HIDDEN) === 'true'

  public toggleStatus(): void {
    this.isHidden = !this.isHidden
    localStorage.setItem(STORAGE.NAV_HIDDEN, this.isHidden.toString())
  }
}
