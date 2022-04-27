import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Apollo, gql } from 'apollo-angular'
import { Subscription } from 'rxjs'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'
import { AuthService } from '@shared/services/auth.service'

import { GET_PROFILE } from '@common/schemes/query/getProfile'

@Component({
  selector: 'vanne-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  animations: [inOutComponentAnimation],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public login: string

  private sub: Subscription | null = null

  constructor(
    private authService: AuthService,
    private apolloService: Apollo,
    private titleService: Title,
  ) {
    this.login = this.authService.currentUser?.login || ''
  }

  ngOnInit(): void {
    this.sub = this.apolloService
      .watchQuery({
        query: GET_PROFILE,
        variables: {
          login: this.login,
        },
      })
      .valueChanges.subscribe({ next: ({ data }) => console.log(data) })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
