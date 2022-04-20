import { CanActivate, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'

import { AuthService } from '@shared/services/auth.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(_: any, state: RouterStateSnapshot) {
    const user = this.authService.currentUser
    if (user) {
      return true
    }

    return this.authService.check(state.url)
  }
}
