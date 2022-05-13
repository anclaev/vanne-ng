import { gql } from 'apollo-angular'

import { IAccount } from '@/common/models/account'

/**
 * Мутация на изменение даты своего рождения
 */
export const CHANGE_YOURSELF_BIRTHDAY = gql<
  { birthday: string },
  { birthday: string }
>`
  mutation changeYourselfBirthday($birthday: String!) {
    changeYourself(data: { birthday: $birthday }) {
      birthday
    }
  }
`

/**
 * Мутация на изменение своего email
 */
export const CHANGE_YOURSELF_EMAIL = gql<{ email: string }, { email: string }>`
  mutation changeYourselfEmail($email: String!) {
    changeYourself(data: { email: $email }) {
      email
    }
  }
`

/**
 * Мутация на изменение своего мобильного номера
 */
export const CHANGE_YOURSELF_PHONE = gql<{ phone: string }, { phone: string }>`
  mutation changeYourselfPhone($phone: String!) {
    changeYourself(data: { phone: $phone }) {
      phone
    }
  }
`
