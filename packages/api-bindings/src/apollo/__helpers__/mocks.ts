import {
  ApolloCache,
  ApolloClient,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
} from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { createApolloCache } from '../createApolloCache';

type MockCacheConfiguration = {
  activeWalletVar?: ReactiveVar<WalletData | null>;
};

export function createMockApolloCache({
  activeWalletVar = makeVar<WalletData | null>(null),
}: MockCacheConfiguration = {}): ApolloCache<NormalizedCacheObject> {
  return createApolloCache({ activeWalletVar });
}

export function createMockApolloClientWithMultipleResponses(
  mocks: ReadonlyArray<MockedResponse<unknown>>,
  cacheConfiguration: MockCacheConfiguration = {},
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: createMockApolloCache(cacheConfiguration),

    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),
  });
}
  });
}
