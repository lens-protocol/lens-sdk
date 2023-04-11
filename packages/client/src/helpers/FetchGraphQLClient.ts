import { GraphQLClient } from 'graphql-request';
import { PatchedRequestInit } from 'graphql-request/dist/types';

export class FetchGraphQLClient extends GraphQLClient {
  constructor(url: string, options?: PatchedRequestInit) {
    super(url, {
      ...options,
      fetch: fetch,
    });
  }
}
