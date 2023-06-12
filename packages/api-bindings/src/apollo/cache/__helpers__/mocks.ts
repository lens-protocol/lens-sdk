import { ApolloCache, makeVar, NormalizedCacheObject, ReactiveVar } from '@apollo/client';
import { faker } from '@faker-js/faker';
import { mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { createLensCache } from '../createLensCache';
import { TransactionState, TxStatus } from '../transactions';

export type MockCacheConfiguration = {
  activeWalletVar?: ReactiveVar<WalletData | null>;
};

export function mockLensCache({
  activeWalletVar = makeVar<WalletData | null>(null),
}: MockCacheConfiguration = {}): ApolloCache<NormalizedCacheObject> {
  return createLensCache({ activeWalletVar });
}

export function mockTransactionState<T extends AnyTransactionRequest>(
  partial: Partial<TransactionState<T>>,
): TransactionState<T> {
  return {
    id: faker.datatype.uuid(),
    status: TxStatus.BROADCASTING,
    request: mockCreatePostRequest() as T,
    ...partial,
  };
}
