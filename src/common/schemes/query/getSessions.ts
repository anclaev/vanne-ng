import { gql } from 'apollo-angular'

import { ISession } from '@/common/interfaces/session.interface'
import { IAccount } from '@/common/models/account'

type Login = Pick<IAccount, 'login'>
type Sessions = ISession[]

/**
 * Запрос на получение профиля по логину
 */
export const GET_SESSIONS = gql<{ account: { sessions: Sessions } }, Login>`
  query getProfile($login: String!) {
    account(login: $login) {
      sessions {
        browser
        os
        device
        fingerprint
        expiration
      }
    }
  }
`
