import { IAccount } from '@/common/models/account'
import { gql } from 'apollo-angular'

type ChangeYourselfInput = Pick<IAccount, 'email' | 'birthday' | 'phone'>

/**
 * Запрос на изменение своих данных
 */
export const CHANGE_YOURSELF = gql<{ account: IAccount }, ChangeYourselfInput>`
  query getProfile($data: ChangeYourselfInput!) {
    account(data: $data) {
      birthday
      email
      phone
    }
  }
`
