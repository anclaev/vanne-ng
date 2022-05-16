import { gql } from 'apollo-angular'

import { ROLE } from '@/common/enums'

export interface Account {
  login: string
  role: ROLE
  firstname?: string
  surname?: string
  avatar?: {
    url: string
  }
}

export type Variables = {
  start: number
  limit: number
  role?: ROLE
  company?: string
}

/**
 * Запрос на получение аккаунтов
 */
export const GET_ACCOUNTS = gql<{ accounts: Account[] }, Variables>`
  query getAccounts(
    $start: Float!
    $limit: Float!
    $role: String
    $company: String
  ) {
    accounts(start: $start, limit: $limit, role: $role, team: $company) {
      firstname
      surname
      login
      avatar {
        url
      }
      role
    }
  }
`
