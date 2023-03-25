import { Profile } from '@lens-protocol/api-bindings';
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
  fetchProfile(args: FetchProfileArgs): Promise<Profile | null>;

  refreshProfile(id: ProfileId): Promise<Profile>;

  updateProfile(id: ProfileId, updateFn: (current: Profile) => Profile): void;
}
