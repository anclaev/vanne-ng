import { gql } from 'apollo-angular'

import { ITeam } from '@/common/interfaces/team.interface'

/**
 * Запрос на получение всех организаций
 */
export const GET_TEAMS = gql<{ teams: ITeam[] }, { start: number }>`
  query {
    teams(start: 0) {
      _id
      name
      short_name
      activated
    }
  }
`
