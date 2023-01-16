import { Profile } from '../../entities';

export interface IActiveProfileGateway {
  setActiveProfile(profile: Profile): Promise<void>;

  getActiveProfile(): Promise<Profile | null>;
}
