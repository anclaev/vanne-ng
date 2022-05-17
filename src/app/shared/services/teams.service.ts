import { BehaviorSubject, Subscription } from 'rxjs'
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'

import { GET_TEAMS } from '@/common/schemes/query/getTeams'
import { Team } from '@/common/interfaces'

import { ToastService } from './toast.service'

/**
 * Сервис организаций
 */
@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  /**
   * Массив имеющихся организаций
   */
  public teams$$: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([])

  /**
   * Конструктор сервиса организаций
   * @param {Apollo} apolloService Сервис Apollo
   * @param {ToastService} toastService Сервис уведомлений
   */
  constructor(
    private apolloService: Apollo,
    private toastService: ToastService,
  ) {}

  /**
   * Метод получения организаций
   * @description Получает полный список организаций для последующего использования в приложении
   * @returns {Subscription} Подписка на запрос
   */
  public fetchTeams(): Subscription {
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
