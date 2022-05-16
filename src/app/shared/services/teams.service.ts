import { BehaviorSubject, Subscription } from 'rxjs'
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'

import { GET_TEAMS } from '@/common/schemes/query/getTeams'
import { Team } from '@/common/interfaces'

import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  public teams$$: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([])

  constructor(
    private apolloService: Apollo,
    private toastService: ToastService,
  ) {}

  public fetchTeams() {
    return this.apolloService
      .watchQuery({
        query: GET_TEAMS,
        variables: {
          start: 0,
          limit: 10,
        },
        errorPolicy: 'all',
      })
      .valueChanges.subscribe({
        next: ({ data }) => this.teams$$.next(data.teams),
        error: (e) => {
          console.log(e.message)

          this.toastService.show('Ошибка загрузки организаций')
        },
      })
  }
}
