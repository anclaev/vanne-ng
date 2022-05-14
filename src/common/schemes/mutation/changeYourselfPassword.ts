import { gql } from 'apollo-angular'

/**
 * Мутация на изменение своего пароля
 */
export const CHANGE_YOURSELF_PASSWORD = gql<
  { changeYourselfPassword: boolean },
  { oldPassword: string; newPassword: string }
>`
  mutation changeYourselfPassword(
    $oldPassword: String!
    $newPassword: String!
  ) {
    changeYourselfPassword(
      data: { oldPassword: $oldPassword, newPassword: $newPassword }
    )
  }
`
