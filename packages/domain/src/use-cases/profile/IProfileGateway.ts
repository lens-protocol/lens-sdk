import { Profile } from '../../entities';

export interface IProfileGateway {
  getAllProfilesByOwnerAddress(address: string): Promise<Profile[]>;

  getProfileById(id: string): Promise<Profile | null>;
}
