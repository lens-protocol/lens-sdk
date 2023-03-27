import { ProfileId } from '../../entities';

export type ProfileIdentifier = {
  id: ProfileId;
  handle: string;
};

export interface IActiveProfilePresenter {
  presentActiveProfile(profileIdentifier: ProfileIdentifier | null): Promise<void>;
}
