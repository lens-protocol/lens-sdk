import { Profile } from '@lens-protocol/api-bindings';
import { mockProfileFragment } from '@lens-protocol/api-bindings/mocks';
import { EvmAddress } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { ProfileSession, SessionType, WalletOnlySession } from '../useSession';

export function mockProfileSession({
  profile = mockProfileFragment(),
}: { profile?: Profile } = {}): ProfileSession {
  return {
    type: SessionType.WithProfile,
    authenticated: true,
    address: profile.ownedBy.address,
    profile,
  };
}

export function mockWalletOnlySession({
  address = mockEvmAddress(),
}: {
  address?: EvmAddress;
} = {}): WalletOnlySession {
  return {
    type: SessionType.JustWallet,
    authenticated: true,
    address,
  };
}
