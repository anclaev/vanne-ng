import { gql } from 'apollo-angular'

/**
 * Мутация на изменение логина аккаунта
 */
export const CHANGE_LOGIN = gql<
  { changeAccount: { login: string } },
  { login: string }
>`
  mutation changeAccountLogin($login: String!, $newLogin: String!) {
    changeAccount(data: { login: $login, newLogin: $newLogin }) {
      login
    }
  }
`

/**
 * Мутация на изменение имени аккаунта
 */
export const CHANGE_USERNAME = gql<
  { changeAccount: { firstname: string; surname: string } },
  { login: string; firstname: string; surname: string }
>`
  mutation changeAccountUsername(
    $login: String!
    $firstname: String!
    $surname: String!
  ) {
    changeAccount(
      data: { login: $login, firstname: $firstname, surname: $surname }
    ) {
      firstname
      surname
    }
  }
`

/**
 * Мутация на изменение даты рождения аккаунта
 */
export const CHANGE_BIRTHDAY = gql<
  { changeAccount: { birthday: string } },
  { login: string; birthday: string }
>`
  mutation changeAccountBirthday($login: String!, $birthday: String!) {
    changeAccount(data: { login: $login, birthday: $birthday }) {
      birthday
    }
  }
`

/**
 * Мутация на изменение email аккаунта
 */
export const CHANGE_EMAIL = gql<
  { changeAccount: { email: string } },
  { login: string; email: string }
>`
  mutation changeAccountEmail($login: String!, $email: String!) {
    changeAccount(data: { login: $login, email: $email }) {
      email
    }
  }
`

/**
 * Мутация на изменение мобильного номера аккаунта
 */
export const CHANGE_PHONE = gql<
  { changeAccount: { phone: string } },
  { login: string; phone: string }
>`
  mutation changeAccountPhone($login: String!, $phone: String!) {
    changeAccount(data: { login: $login, phone: $phone }) {
      phone
    }
  }
`
