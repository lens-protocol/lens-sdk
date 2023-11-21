import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Wallet } from '../../../entities';
import { mockProfileId, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveWallet } from '../ActiveWallet';
import { LoginRequest } from '../Login';

export function mockProfileLoginRequest(overrides?: Partial<LoginRequest>): LoginRequest {
  return {
    address: mockEvmAddress(),
    profileId: mockProfileId(),
    ...overrides,
  };
}

export function mockJustWalletLoginRequest(overrides?: Partial<LoginRequest>): LoginRequest {
  return {
    address: mockEvmAddress(),
    ...overrides,
  };
}

export function mockActiveWallet({ wallet = mockWallet() }: { wallet?: Wallet } = {}) {
  const activeWallet = mock<ActiveWallet>();

  when(activeWallet.requireActiveWallet).mockResolvedValue(wallet);

  return activeWallet;
}
