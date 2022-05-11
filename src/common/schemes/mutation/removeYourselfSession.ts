import { gql } from 'apollo-angular'

/**
 * Мутация на удаление своей сессии
 */
export const REMOVE_YOURSELF_SESSION = gql<boolean, { fingerprint: string }>`
  mutation removeSession($fingerprint: String!) {
    removeYourselfSession(data: { fingerprint: $fingerprint })
  }
`
