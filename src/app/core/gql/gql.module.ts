import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { NgModule } from '@angular/core'

import { ENV } from '@/environments/env'

/**
 * Фабрика Apollo Client
 * @param {HttpLink} httpLink Ссылка на http
 * @returns {ApolloClientOptions} Конфигурация Apollo
 */
export const createApolloClient = (
  httpLink: HttpLink,
): ApolloClientOptions<any> => ({
  link: httpLink.create({
    uri: ENV.GQL_HOST,
    withCredentials: true,
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          account: {
            merge(existing, incoming) {
              return { ...existing, sessions: incoming.sessions }
            },
          },
          accounts: offsetLimitPagination(),
        },
      },
    },
  }),
})

/**
 * Модуль GraphQL
 */
@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloClient,
      deps: [HttpLink],
    },
  ],
})
export class GqlModule {}
