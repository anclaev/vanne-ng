import { APP_BASE_HREF } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { TestBed, waitForAsync } from '@angular/core/testing'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { GqlModule } from './core/gql/gql.module'
import { AuthService } from './shared/services/auth.service'
import { ToastService } from './shared/services/toast.service'
import { SharedModule } from './shared/shared.module'

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        GqlModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule,
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        AuthService,
        ToastService,
      ],
      declarations: [AppComponent],
      teardown: { destroyAfterEach: true },
    }).compileComponents()
  }))

  it('Приложение отрендерено', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance

    expect(app).toBeDefined()
  })
})
