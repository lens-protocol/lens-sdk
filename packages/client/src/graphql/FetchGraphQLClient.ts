import { GraphQLClient } from 'graphql-request';

type ClientOptions = ConstructorParameters<typeof GraphQLClient>[1];
type Options = Omit<ClientOptions, 'fetch'>;

export class FetchGraphQLClient extends GraphQLClient {
  constructor(url: string, options?: Options) {
    super(url, {
      ...options,
      fetch: fetch,
    });
  }
}
