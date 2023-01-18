import {
  ApolloCache,
  ApolloClient,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
} from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { ProfileFieldsFragment } from '../../graphql/generated';
import { createApolloCache } from '../createApolloCache';

type MockCacheConfiguration = {
  activeProfileVar?: ReactiveVar<ProfileFieldsFragment | null>;
  activeWalletVar?: ReactiveVar<WalletData | null>;
};

export function createMockApolloCache({
  activeProfileVar,
  activeWalletVar,
}: MockCacheConfiguration = {}): ApolloCache<NormalizedCacheObject> {
  return createApolloCache({
    activeProfileVar: activeProfileVar ?? makeVar<ProfileFieldsFragment | null>(null),
    activeWalletVar: activeWalletVar ?? makeVar<WalletData | null>(null),
  });
}

export function createMockApolloClientWithMultipleResponses(
  mocks: ReadonlyArray<MockedResponse<unknown>>,
  cacheConfiguration: MockCacheConfiguration = {},
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),
    cache: createMockApolloCache(cacheConfiguration),
  });
}
