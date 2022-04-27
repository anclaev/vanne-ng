import { gql } from 'apollo-angular'

export const GET_PROFILE = gql`
  query getProfile($login: String!) {
    account(login: $login) {
      _id
    }
  }
`
