import { testingUser } from '@/common/interfaces/user.interface'
import { ICredentials, User } from '@/common/interfaces'

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'

import { Injectable } from '@angular/core'

import {
  delay,
  dematerialize,
  materialize,
  mergeMap,
  Observable,
  ObservableInput,
  of,
  throwError,
} from 'rxjs'

/**
 * Перехватчик HTTP-запросов для тестирования
 */
@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {
  /**
   * Обработчик перехватчика
   * @param {HttpRequest<any>} req Объект запроса
   * @param {HttpHandler} next Handler запроса
   * @returns {Observable<HttpEvent<any>>} HTTP-событие
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req

    // handler

    return of(null)
      .pipe(
        mergeMap(
          handleRoute as unknown as (
            value: null,
            index: number,
          ) => ObservableInput<any>,
        ),
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize())

    function handleRoute() {
      switch (true) {
        case url.endsWith('/auth/sign-in') && method === 'POST':
          return signIn()
        case url.endsWith('/auth/sign-out') && method === 'POST':
          return signOut()
        default:
          return next.handle(req)
      }
    }

    // routes

    function signIn() {
      const { login, password } = body as ICredentials

      let primaryUser = {
        login: 'test',
        password: 'test',
      }

      if (login !== primaryUser.login || password !== primaryUser.password) {
        return badRequest('Invalid credentials')
      }

      return ok<User>(testingUser)
    }

    function signOut() {
      return ok()
    }

    // helpers

    function ok<T>(body?: T) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
      return throwError(() => new Error(message))
    }

    function unauthorized(message: string = 'Unauthorized') {
      return new HttpErrorResponse({
        status: 401,
        error: {
          message,
        },
      })
    }

    function badRequest(message: string = 'Bad request') {
      return new HttpErrorResponse({
        status: 400,
        error: {
          message,
        },
      })
    }

    function forbidden(message: string = 'Forbidden') {
      return new HttpErrorResponse({
        status: 403,
        error: {
          message,
        },
      })
    }
  }
}

/**
 * Провайдер HTTP-перехватчика для тестирования
 */
export const mockHttpProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockHttpInterceptor,
  multi: true,
}
