import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';

import generatedIntrospection from '../../graphql/generated';

export function createMockApolloClientWithMultipleResponses<TData>(
  mocks: ReadonlyArray<MockedResponse<TData>>,
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),
    cache: new InMemoryCache({
      addTypename: true,
      possibleTypes: generatedIntrospection.possibleTypes,
    }),
  });
}
