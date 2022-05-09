import { IAccount } from '@/common/models/account'
import { gql } from 'apollo-angular'

type Login = Pick<IAccount, 'login'>

/**
 * Запрос на получение профиля по логину
 */
export const GET_PROFILE = gql<
  { account: IAccount & { avatar: { url: string } } },
  Login
>`
  query getProfile($login: String!) {
    account(login: $login) {
      birthday
      email
      phone
      avatar {
        url
      }
    }
  }
`
