import { Account } from '@/common/models/account'
import { gql } from 'apollo-angular'

type Login = Pick<Account, 'login'>

/**
 * Запрос на получение профиля по логину
 */
export const GET_PROFILE = gql<
  { account: Account & { avatar: { url: string } } },
  Login
>`
  query getProfile($login: String!) {
    account(login: $login) {
      birthday
      email
      firstname
      surname
      phone
      avatar {
        url
      }
    }
  }
`
