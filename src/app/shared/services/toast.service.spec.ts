import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar'
import { TestBed } from '@angular/core/testing'

import { ToastService } from './toast.service'

describe('ToastService', () => {
  let service: ToastService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatSnackBarModule],
    })

    service = TestBed.inject(ToastService)
  })

  it('Создание сервиса', () => {
    expect(service).toBeTruthy()
  })

  it('Показ уведомления', () => {
    expect(service.show('Test')).toBeInstanceOf(MatSnackBarRef)
  })
})
