import { IAccount } from '@/common/models/account'
import { gql } from 'apollo-angular'

type Login = Pick<IAccount, 'login'>

export const GET_PROFILE = gql<{ account: IAccount }, Login>`
  query getProfile($login: String!) {
    account(login: $login) {
      birthday
      email
      phone
    }
  }
`
