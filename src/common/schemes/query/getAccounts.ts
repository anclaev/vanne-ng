import { gql } from 'apollo-angular'

import { ROLE } from '@/common/enums'

/**
 * DTO получаемого аккаунта в списке
 */
export interface Account {
  /**
   * Логин аккаунта
   */
  login: string

  /**
   * Роль аккаунта
   */
  role: ROLE

  /**
   * Имя аккаунта
   */
  firstname?: string

  /**
   * Фамилия аккаунта
   */
  surname?: string

  /**
   * Аватар аккаунта
   */
  avatar?: {
    url: string
  }
}

/**
 * Переменные запроса
 */
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
