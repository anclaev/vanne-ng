import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { first } from 'rxjs'

import { ToastService } from '@/app/shared/services/toast.service'
import { AuthService } from '@/app/shared/services/auth.service'

@Component({
  selector: 'vanne-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  private loading: boolean = false
  private returnUrl: string = '/'

  public authForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  })

  constructor(
    private readonly toastService: ToastService,
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.authService.currentUser) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  onSubmit() {
    if (this.loading) return

    let login = this.authForm.controls['login']
    let password = this.authForm.controls['password']

    // Validate credentials

    if (login.invalid && password.invalid) {
      this.toastService.show('Incorrect credentials')
      return
    }

    if (login.invalid) {
      this.toastService.show('Incorrent login')
    }

    if (password.invalid) {
      this.toastService.show('Incorrect password')
    }

    if (this.authForm.invalid) return

    // Sign in

    this.loading = true

    this.authService
      .login({
        login: login.value.trim(),
        password: password.value.trim(),
      })
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data && 'login' in data)
            this.toastService.show(`Welcome, ${data.login}!`)

          this.loading = false

          this.router.navigate([this.returnUrl])
        },
        error: () => {
          this.loading = false

          this.toastService.show('Wrong credentials')
        },
      })
  }
}
