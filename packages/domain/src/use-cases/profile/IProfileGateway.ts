import { Profile } from '../../entities';

export interface IProfileGateway {
  getAllProfilesByOwnerAddress(address: string): Promise<Profile[]>;

  getProfileByHandle(handle: string): Promise<Profile | null>;

  getProfileById(id: string): Promise<Profile | null>;
}
