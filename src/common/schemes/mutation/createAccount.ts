import { gql } from 'apollo-angular'

import { IUser } from '@/common/interfaces'

export type CreateAccountDto = {
  login: string
  firstname: string
  surname: string
  email: string
  phone: string
  birthday: string
  role: string
  confirmed: boolean
  banned: boolean
  team: string
}

/**
 * Мутация на создание аккаунта
 */
export const CREATE_ACCOUNT = gql<
  { createAccount: IUser },
  { login: CreateAccountDto & { password: string } }
>`
  mutation createAccount(
    $login: String!
    $firstname: String
    $surname: String
    $password: String!
    $email: String
    $phone: String
    $birthday: DateTime
    $role: String!
    $team: String!
    $confirmed: Boolean
    $banned: Boolean
  ) {
    createAccount(
      data: {
        login: $login
        firstname: $firstname
        surname: $surname
        password: $password
        email: $email
        phone: $phone
        birthday: $birthday
        role: $role
        team: $team
        confirmed: $confirmed
        banned: $banned
      }
    ) {
      _id
      login
    }
  }
`
