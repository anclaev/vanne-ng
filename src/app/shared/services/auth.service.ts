import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { Credentials, User } from '@/common/interfaces'
import { API } from '@/common/enums'

import { ENV } from '@env/env'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$$: BehaviorSubject<User>
  private user$: Observable<User>

  private api: string = ENV.API_HOST

  constructor(private httpClient: HttpClient, private router: Router) {
    this.user$$ = new BehaviorSubject<User>(null)
    this.user$ = this.user$$.asObservable()
  }

  public get currentUser(): User {
    return this.user$$.value
  }

  public login(credentials: Credentials): Observable<User> {
    return this.httpClient
      .post<User>(this.api + API.AUTH_SIGN_IN, credentials, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          this.user$$.next(user)
          return user
        }),
        catchError(() => {
          this.user$$.next(null)
          return of(null)
        }),
      )
  }

  public me(): Observable<User> {
    return this.httpClient
      .get<User>(this.api + API.AUTH_DATA, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          this.user$$.next(user)
          return user
        }),
        catchError(() => {
          console.log('Unauthorized')
          return of(null)
        }),
      )
  }

  public check(returnUrl: string): Observable<boolean> {
    return this.me().pipe(
      map((data) => !!data),
      catchError((err) => {
        this.router.navigate(['/auth'], {
          queryParams: { returnUrl },
        })

        return of(err !== 'Unauthorized')
      }),
    )
  }

  public logout() {
    return this.httpClient
      .post(
        this.api + API.AUTH_SIGN_OUT,
        {},
        {
          withCredentials: true,
          responseType: 'text',
        },
      )
      .pipe(catchError(() => of(console.log('Unauthorized'))))
      .subscribe({
        next: () => {
          this.user$$.next(null)
          this.router.navigate(['/auth'])
        },
      })
  }
}
