import { Profile } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

export interface IProfileCacheManager {
  fetchProfileById(id: ProfileId): Promise<Profile | null>;
  fetchProfileByHandle(fullHandle: string): Promise<Profile | null>;
  refresh(id: ProfileId): Promise<void>;
  refreshCurrentProfile(): Promise<void>;
  updateProfile(id: ProfileId, updateFn: (current: Profile) => Profile): void;
}
