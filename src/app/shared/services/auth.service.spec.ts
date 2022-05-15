import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing'

import { RouterTestingModule } from '@angular/router/testing'
import { TestBed } from '@angular/core/testing'

import { AuthService } from './auth.service'

import { mockHttpProvider } from '../interceptors/mockHttp.interceptor'
import { testingUser } from '@/common/interfaces/user.interface'

describe('AuthService', () => {
  let service: AuthService
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [mockHttpProvider],
    })

    service = TestBed.inject(AuthService)
    http = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    http.verify()
  })

  it('Создание сервиса', () => {
    expect(service).toBeTruthy()
  })

  describe('Вход в систему', () => {
    it('Вход выполнен', (done) => {
      service.login({ login: 'test', password: 'test' }).subscribe({
        next: (data) => {
          expect(data).withContext('testing user').toEqual(testingUser)
          done()
        },
        error: done.fail,
      })
    })

    it('Пользователь авторизируется после входа', (done) => {
      service.login({ login: 'test', password: 'test' }).subscribe(() => {
        service.user$$.subscribe((data) => {
          expect(data).toEqual(testingUser)
          done()
        })
      })
    })

    it('Вход не выполнен', (done) => {
      service.login({ login: 'test', password: 'test1' }).subscribe({
        next: () => {
          done.fail
        },
        error: () => {
          expect(true).toBe(true)
          done()
        },
      })
    })

    it('Пользователь вышел из системы', (done) => {
      service.logout(false).add(() => {
        service.user$$.subscribe((data) => {
          expect(data).toBeNull()
          done()
        })
      })
    })
  })

  it('Геттер текущего пользователя', () => {
    expect(service.currentUser).toBeNull()
  })
})
