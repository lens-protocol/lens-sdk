import { ApolloCache, makeVar, NormalizedCacheObject, ReactiveVar } from '@apollo/client';
import { faker } from '@faker-js/faker';
import { mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { createApolloCache } from '../createApolloCache';
import { PendingTransactionState, TxStatus } from '../transactions';

export type MockCacheConfiguration = {
  activeWalletVar?: ReactiveVar<WalletData | null>;
};

export function createMockApolloCache({
  activeWalletVar = makeVar<WalletData | null>(null),
}: MockCacheConfiguration = {}): ApolloCache<NormalizedCacheObject> {
  return createApolloCache({ activeWalletVar });
}

export function mockPendingTransactionState<T extends SupportedTransactionRequest>(
  partial: Partial<PendingTransactionState<T>>,
): PendingTransactionState<T> {
  return {
    id: faker.datatype.uuid(),
    status: TxStatus.BROADCASTING,
    request: mockCreatePostRequest() as T,
    ...partial,
  };
}
