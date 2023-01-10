import { ApolloCache, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';

import { createApolloCache } from '../createApolloCache';

export function createMockApolloCache(): ApolloCache<NormalizedCacheObject> {
  return createApolloCache();
}

export function createMockApolloClientWithMultipleResponses(
  mocks: ReadonlyArray<MockedResponse<unknown>>,
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),
    cache: createMockApolloCache(),
  });
}
