import { gql } from 'apollo-angular'

/**
 * Мутация на изменение даты своего рождения
 */
export const CHANGE_YOURSELF_BIRTHDAY = gql<
  { changeYourself: { birthday: string } },
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
export const CHANGE_YOURSELF_EMAIL = gql<
  { changeYourself: { email: string } },
  { email: string }
>`
  mutation changeYourselfEmail($email: String!) {
    changeYourself(data: { email: $email }) {
      email
    }
  }
`

/**
 * Мутация на изменение своего мобильного номера
 */
export const CHANGE_YOURSELF_PHONE = gql<
  { changeYourself: { phone: string } },
  { phone: string }
>`
  mutation changeYourselfPhone($phone: String!) {
    changeYourself(data: { phone: $phone }) {
      phone
    }
  }
`
