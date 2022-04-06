import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { NgModule } from '@angular/core'

import { ENV } from '@env/env'

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
  }),
  cache: new InMemoryCache(),
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
export class GQLModule {}
