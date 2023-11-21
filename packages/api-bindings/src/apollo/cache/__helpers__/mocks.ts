import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { faker } from '@faker-js/faker';
import { mockCreatePostRequest } from '@lens-protocol/domain/mocks';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';

import { createLensCache } from '../createLensCache';
import { TransactionState, TxStatus } from '../transactions';

export function mockLensCache(): ApolloCache<NormalizedCacheObject> {
  return createLensCache();
}

export function mockTransactionState<T extends AnyTransactionRequest>(
  partial: Partial<TransactionState<T>>,
): TransactionState<T> {
  return {
    id: faker.datatype.uuid(),
    status: TxStatus.PENDING,
    request: mockCreatePostRequest() as T,
    ...partial,
  } as TransactionState<T>;
}
