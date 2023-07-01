import { ApolloCache, NormalizedCacheObject, ReactiveVar } from '@apollo/client';
import { faker } from '@faker-js/faker';
import { mockCreatePostRequest, mockWalletData } from '@lens-protocol/domain/mocks';
import { ProfileIdentifier, WalletData } from '@lens-protocol/domain/use-cases/lifecycle';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';

import { createLensCache } from '../createLensCache';
import {
  authenticatedProfile,
  authenticatedWallet,
  notAuthenticated,
  updateSession,
} from '../session';
import { TransactionState, TxStatus } from '../transactions';

export type MockCacheConfiguration = {
  activeWalletVar?: ReactiveVar<WalletData | null>;
};

export function mockLensCache(): ApolloCache<NormalizedCacheObject> {
  return createLensCache();
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

export function simulateAuthenticatedWallet(wallet = mockWalletData()) {
  updateSession(authenticatedWallet(wallet));
}

export function simulateAuthenticatedProfile(
  profile: ProfileIdentifier,
  wallet = mockWalletData(),
) {
  updateSession(authenticatedProfile(wallet, profile));
}

export function simulateNotAuthenticated() {
  updateSession(notAuthenticated());
}
