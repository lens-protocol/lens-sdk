export type ProfileIdentifier = {
  id: string;
  handle: string;
};

export interface IActiveProfilePresenter {
  presentActiveProfile(profileIdentifier: ProfileIdentifier | null): Promise<void>;
}
