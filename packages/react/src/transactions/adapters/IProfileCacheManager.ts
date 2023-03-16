import { ProfileFragment } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { XOR } from '@lens-protocol/shared-kernel';

export type FetchProfileArgs = XOR<
  {
    handle: string;
  },
  {
    id: ProfileId;
  }
>;

export interface IProfileCacheManager {
  fetchProfile(args: FetchProfileArgs): Promise<ProfileFragment | null>;

  refreshProfile(id: ProfileId): Promise<ProfileFragment>;

  updateProfile(id: ProfileId, updateFn: (current: ProfileFragment) => ProfileFragment): void;
}
